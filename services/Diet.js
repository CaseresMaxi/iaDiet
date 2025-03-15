export const fetchDiet = (setDietData, setdietLoading = () => {}) =>
  fetch(
    `https://ainutritioner.click/diets/last/${window.localStorage?.getItem(
      "user_id"
    )}`,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      setdietLoading(false);
      setDietData(data);
    })
    .catch((error) => {
      setdietLoading(false);
      console.error(error);
    });
