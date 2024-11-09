export const createUser = (data, callback = () => {}) => {
  fetch("http://54.198.190.149:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.sessionStorage.setItem("user_id", data.user_id);
      callback();
    })
    .catch((error) => console.error(error));
};

export const login = (data, callback = () => {}) => {
  fetch("http://54.198.190.149:5000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.sessionStorage.setItem("user_id", data.user_id);
      callback();
    })
    .catch((error) => console.error(error));
};
