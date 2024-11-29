export const deleteContextChat = (setingestData) => {
  fetch(`http://54.198.190.149:5000/chat/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then((data) => {
      setingestData(data);
    })
    .catch((error) => console.error(error));
};
