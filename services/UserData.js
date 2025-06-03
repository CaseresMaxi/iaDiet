import { createAbortableFetch } from "./Utils";

export const fetchUserData = async (setuserData, setLoading, signal = null) => {
  setLoading(true); // Indica que la carga ha comenzado
  //console.log(window.sessionStorage?.user_id, "asdasdasd");
  try {
    const { promise } = createAbortableFetch(
      `https://ainutritioner.click/users/${window.localStorage?.user_id}`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
        },
        signal,
      }
    );

    const response = await promise;
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
    if (error.name === "AbortError") {
      console.log("Fetch de datos de usuario cancelado");
      return;
    }
    console.error(error);
  } finally {
    setLoading(false); // Indica que la carga ha terminado
  }
};

export const modifyUserData = async (
  payload,
  setLoading = () => {},
  callback = () => {},
  signal = null
) => {
  try {
    const { promise } = createAbortableFetch(
      `https://ainutritioner.click/users/${window.localStorage?.user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
        },
        body: JSON.stringify(payload),
        signal,
      }
    );

    const response = await promise;
    if (!response.ok) throw new Error("Network response was not ok.");
    setLoading(true);
    setTimeout(() => {
      callback();
    }, 1000);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Modificación de datos de usuario cancelada");
      return;
    }
    console.error(error);
  }
};

export const deleteAccount = async (
  setLoading = () => {},
  onSuccess = () => {},
  onError = () => {},
  signal = null
) => {
  setLoading(true);
  try {
    const { promise } = createAbortableFetch(
      `https://ainutritioner.click/users/${window.localStorage?.user_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${window.localStorage?.getItem("token")}`,
        },
        signal,
      }
    );

    const response = await promise;
    if (!response.ok) throw new Error("Error deleting account");

    // Clear local storage
    window.localStorage?.removeItem("user_id");
    window.localStorage?.removeItem("token");
    window.sessionStorage?.clear();

    onSuccess();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Eliminación de cuenta cancelada");
      return;
    }
    console.error("Error deleting account:", error);
    onError(error);
  } finally {
    setLoading(false);
  }
};
