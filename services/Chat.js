export const createImage = (
  setGeneratedImage = () => {},
  prompt = "",
  keywords = ""
) =>
  fetch(`https://ainutritioner.click/chat/create-image`, {
    headers: {
      Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      keywords: "ensalada_salmon_palta_queso_filadelfia_arroz",
      prompt: "Ensalada de salmon, palta, queso filadelfia y arroz.",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setGeneratedImage(data.response);
    })
    .catch((error) => console.error(error));
