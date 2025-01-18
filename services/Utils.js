export const deleteContextChat = (setingestData) => {
  fetch(`https://ainutritioner.click/chat/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
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
      Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      window.sessionStorage.setItem("token", data.token);
    })

    .catch((error) => console.error(error));
};
