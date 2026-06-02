export const UserData = () => {
  const localData = localStorage.getItem("profile");
  const parsedData = JSON.parse(localData);
  return parsedData;
};
