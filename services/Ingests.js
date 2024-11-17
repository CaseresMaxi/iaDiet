export const getIngests = (setingestData) => {
  fetch(
    `http://54.198.190.149:5000/ingests/user/${window.sessionStorage.getItem("user_id")}`,
    { headers: { Authorization: `${window.sessionStorage.getItem("token")}` } }
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

export const postIngest = (setingestData) => {
  fetch("http://54.198.190.149:5000/ingests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${window.sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      user_id: window.sessionStorage.getItem("user_id"),
      ingest: formData.foodName,
      calories: formData.calories,
      description: formData.foodName,
      proteins: formData.proteins,
      images: [lastSelectedImg],
      carbs: formData.carbs,
      fats: formData.fats,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      getIngests(setingestData);
    })
    .catch((error) => console.error(error));
};

export const getIngest = (ingestId, sets3Img) => {
  fetch(`http://54.198.190.149:5000/ingests/${ingestId}`, {
    method: "GET",
    headers: {
      Authorization: `${window.sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      sets3Img(data.signed_url);
    })
    .catch((error) => console.error(error));
};
