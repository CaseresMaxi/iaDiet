import { createAbortableFetch } from "./Utils";

export const getIngests = (
  setingestData,
  period = null,
  setloadingIngest = () => {},
  signal = null
) => {
  const { promise, abort } = createAbortableFetch(
    `https://ainutritioner.click/ingests/user/${window.localStorage?.getItem("user_id")}${period?.start ? `/by_date?start_date=${period.start}&end_date=${period.end}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
      },
      signal,
    }
  );

  promise
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then((data) => {
      setingestData(data);
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("Fetch de ingests cancelado");
        return;
      }
      console.error(error);
    })
    .finally(() => {
      setloadingIngest(false);
    });

  return abort;
};

export const postIngest = (
  setingestData = () => {},
  formData,
  lastSelectedImg,
  signal = null
) => {
  const { promise, abort } = createAbortableFetch(
    "https://ainutritioner.click/ingests",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id: window.localStorage?.getItem("user_id"),
        ingest: formData.nombre,
        calories: formData.calorias,
        description: formData.nombre,
        proteins: formData.proteinas,
        images: lastSelectedImg ? [lastSelectedImg] : null,
        carbs: formData.carbohidratos,
        fats: formData.grasas,
      }),
      signal,
    }
  );

  promise
    .then((response) => response.json())
    .then(() => {
      const { promise: refreshPromise } = createAbortableFetch(
        `https://ainutritioner.click/ingests/user/${window.localStorage?.getItem("user_id")}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
          },
          signal,
        }
      );

      refreshPromise
        .then((response) => response.json())
        .then((data) => {
          setingestData(data);
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Refresh de ingests cancelado");
            return;
          }
          console.error(error);
        });
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("Post de ingest cancelado");
        return;
      }
      console.error(error);
    });

  return abort;
};

export const getIngest = (ingestId, sets3Img, signal = null) => {
  const { promise, abort } = createAbortableFetch(
    `https://ainutritioner.click/ingests/${ingestId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
      },
      signal,
    }
  );

  promise
    .then((response) => response.json())
    .then((data) => {
      sets3Img(data.signed_url);
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("Fetch de ingest cancelado");
        return;
      }
      console.error(error);
    });

  return abort;
};
