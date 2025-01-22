export const fetchDiet = (setdietData, setdietLoading) =>
  fetch(
    `https://ainutritioner.click/diets/last/${window.sessionStorage?.getItem(
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
      setdietLoading(false);
      setdietData(data);
    })
    .catch((error) => {
      setdietLoading(false);
      console.error(error);
    });
