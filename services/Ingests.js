export const getIngests = (setingestData) => {
  fetch(
    `https://ainutritioner.click/ingests/user/${window.sessionStorage?.getItem("user_id")}`,
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
      },
    }
  )
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then((data) => {
      setingestData(data);
    })
    .catch((error) => console.error(error));
};

export const postIngest = (setingestData, formData, lastSelectedImg) => {
  console.log("formData", formData);
  fetch("https://ainutritioner.click/ingests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
    },
    body: JSON.stringify({
      user_id: window.sessionStorage?.getItem("user_id"),
      ingest: formData.nombre,
      calories: formData.calorias,
      description: formData.nombre,
      proteins: formData.proteinas,
      images: lastSelectedImg ? [lastSelectedImg] : null,
      carbs: formData.carbohidratos,
      fats: formData.grasas,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      getIngests(setingestData);
    })
    .catch((error) => console.error(error));
};

export const getIngest = (ingestId, sets3Img) => {
  fetch(`https://ainutritioner.click/ingests/${ingestId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      sets3Img(data.signed_url);
    })
    .catch((error) => console.error(error));
};
