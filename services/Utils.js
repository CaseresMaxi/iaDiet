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

export const renewToken = () => {
  fetch(`https://ainutritioner.click/users/renew-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.localStorage.setItem("token", data.token);
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

  const promise = fetch(url, fetchOptions);

  return {
    promise,
    abort: () => controller.abort(),
  };
};
