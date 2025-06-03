import AuthService from "./Auth";

// Global counter for token renewal attempts
let tokenRenewalAttempts = 0;
let lastRenewalAttemptTime = 0;

// Reset renewal attempts counter
const resetRenewalAttempts = () => {
  tokenRenewalAttempts = 0;
  lastRenewalAttemptTime = 0;
};

// Export the reset function for external use
export const resetTokenRenewalAttempts = resetRenewalAttempts;

export const deleteContextChat = (setingestData) => {
  fetch(`https://ainutritioner.click/chat/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${AuthService.getToken()}`,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then((data) => {
      // setingestData(data);
    })
    .catch((error) => console.error(error));
};

export const createAbortableFetch = (url, options = {}) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchOptions = {
    ...options,
    signal,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${AuthService.getToken()}`,
    },
  };

  // Helper function to wait for specified milliseconds
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Helper function to attempt token renewal with retry logic
  const attemptTokenRenewal = async (attempt = 1, maxAttempts = 3) => {
    const currentTime = Date.now();

    // Check if we've already exceeded the maximum attempts recently (within 5 minutes)
    if (
      tokenRenewalAttempts >= maxAttempts &&
      currentTime - lastRenewalAttemptTime < 300000
    ) {
      console.error(
        `Maximum token renewal attempts (${maxAttempts}) already reached. Redirecting to login.`
      );
      throw new Error(`Maximum token renewal attempts exceeded`);
    }

    // Reset counter if enough time has passed (5 minutes)
    if (currentTime - lastRenewalAttemptTime > 300000) {
      resetRenewalAttempts();
    }

    try {
      tokenRenewalAttempts++;
      lastRenewalAttemptTime = currentTime;

      console.log(
        `Token renewal attempt ${tokenRenewalAttempts}/${maxAttempts}`
      );
      await AuthService.renewToken();

      // Reset attempts on successful renewal
      resetRenewalAttempts();
      return true;
    } catch (error) {
      console.error(
        `Token renewal attempt ${tokenRenewalAttempts} failed:`,
        error
      );

      if (tokenRenewalAttempts < maxAttempts) {
        console.log(
          `Waiting 10 seconds before retry attempt ${tokenRenewalAttempts + 1}...`
        );
        await wait(10000); // Wait 10 seconds
        return attemptTokenRenewal(tokenRenewalAttempts + 1, maxAttempts);
      }

      // All attempts failed
      throw new Error(`Token renewal failed after ${maxAttempts} attempts`);
    }
  };

  const promise = fetch(url, fetchOptions).then(async (response) => {
    if (response.status === 401) {
      try {
        // Attempt token renewal with retry logic
        await attemptTokenRenewal();

        // Retry the original request with new token
        const retryOptions = {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
        };

        const retryResponse = await fetch(url, retryOptions);
        if (retryResponse.ok) {
          return retryResponse;
        }

        // If retry also fails, clear auth and redirect
        throw new Error("Request failed even after token renewal");
      } catch (error) {
        console.error("Token renewal process failed:", error);
        AuthService.clearAuth();
        window.location.href = "/";
        throw new Error("Unauthorized - redirecting to login");
      }
    }
    return response;
  });

  return {
    promise,
    abort: () => controller.abort(),
  };
};
