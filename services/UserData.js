export const fetchUserData = async (setuserData, setLoading) => {
  setLoading(true); // Indica que la carga ha comenzado
  //console.log(window.sessionStorage?.user_id, "asdasdasd");
  try {
    const response = await fetch(
      `https://ainutritioner.click/users/${window.sessionStorage?.user_id}`,
      {
        headers: {
          Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    setuserData(data);
    // reset({
    //   username: data.username || "",
    //   email: data.email || "",
    //   birdthday: data.birdthday || "",
    //   weight: data.weight || "",
    //   height: data.height || "",
    // });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false); // Indica que la carga ha terminado
  }
};

export const modifyUserData = async (
  payload,
  setLoading = () => {},
  callback = () => {}
) => {
  try {
    const response = await fetch(
      `https://ainutritioner.click/users/${window.sessionStorage?.user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.sessionStorage?.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) throw new Error("Network response was not ok.");
    callback();
  } catch (error) {
    console.error(error);
  } finally {
    // setLoading(false); // Indica que la carga ha terminado
  }
};
