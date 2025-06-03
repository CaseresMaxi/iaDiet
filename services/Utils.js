import AuthService from "./Auth";

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

  const promise = fetch(url, fetchOptions).then(async (response) => {
    if (response.status === 401) {
      // Try to renew token first
      try {
        await AuthService.renewToken();

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

        // If retry also fails, clear auth
        throw new Error("Token renewal failed");
      } catch (error) {
        console.error("Token renewal failed:", error);
        AuthService.clearAuth();
        window.location.href = "/";
        throw new Error("Unauthorized");
      }
    }
    return response;
  });

  return {
    promise,
    abort: () => controller.abort(),
  };
};
