export const fetchDiet = (setdietData) =>
  fetch(
    `http://54.198.190.149:5000/diets/last/${window.sessionStorage?.getItem(
      "user_id"
    )}`,
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      setdietData(data);
    })
    .catch((error) => console.error(error));
