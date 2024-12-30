export const login = async (
  data,
  callback = () => {},
  callbackError = () => {}
) => {
  try {
    const response = await fetch("http://54.198.190.149:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("invalid credentials.");
    }

    const result = await response.json();

    if (result?.user?.user_id && result?.token) {
      window.sessionStorage.setItem("user_id", result.user.user_id);
      window.sessionStorage.setItem("token", result.token);
    }

    callback();
  } catch (error) {
    callbackError();
    console.error(error);
  }
};

export const createUser = async (data, callback = () => {}) => {
  try {
    const response = await fetch("http://54.198.190.149:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("invalid credentials.");
    }
    const result = await response.json();
    //console.log(response);

    if (result?.user_id) {
      window.sessionStorage?.setItem("user_id", data.user_id);
    }
    login({ email: data.email, password: data.password });
    callback();
  } catch (error) {
    console.error(error);
  }
};
