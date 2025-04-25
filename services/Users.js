import { createAbortableFetch } from "./Utils";

export const login = async (
  data,
  callback = () => {},
  callbackError = () => {},
  signal = null
) => {
  try {
    const { promise } = createAbortableFetch(
      "https://ainutritioner.click/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal,
      }
    );

    const response = await promise;

    if (!response.ok) {
      throw new Error("invalid credentials.");
    }

    const result = await response.json();

    if (result?.user?.user_id && result?.token) {
      window.localStorage.setItem("user_id", result.user.user_id);
      window.localStorage.setItem("token", result.token);
    }

    callback();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Login cancelado");
      return;
    }
    callbackError();
    console.error(error);
  }
};

export const createUser = async (data, callback = () => {}, signal = null) => {
  try {
    const { promise } = createAbortableFetch(
      "https://ainutritioner.click/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal,
      }
    );

    const response = await promise;

    if (!response.ok) {
      throw new Error("invalid credentials.");
    }
    const result = await response.json();

    if (result?.user_id) {
      window.localStorage?.setItem("user_id", data.user_id);
    }
    login({ email: data.email, password: data.password }, null, null, signal);
    callback();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Creación de usuario cancelada");
      return;
    }
    console.error(error);
  }
};
