import { createAbortableFetch } from "./Utils";

export const fetchDiet = (
  setDietData,
  setdietLoading = () => {},
  signal = null
) => {
  const { promise, abort } = createAbortableFetch(
    `https://ainutritioner.click/diets/last/${window.localStorage?.getItem("user_id")}`,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
      },
      signal,
    }
  );

  promise
    .then((response) => response.json())
    .then((data) => {
      setdietLoading(false);
      setDietData(data);
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("Fetch de dieta cancelado");
        return;
      }
      setdietLoading(false);
      console.error(error);
    });

  return abort;
};
