import Api from "../API/ChatterAPI";

export const SaveLocalUpdateData = async () => {
  const email = localStorage.getItem("email");
  const formData = { email: email };
  try {
    const response = await Api.post("/fetch-profile", formData);
    localStorage.removeItem("profile");
    localStorage.setItem("profile", JSON.stringify(response.data.user));
  } catch (err) {
    console.log(err);
  }
};
