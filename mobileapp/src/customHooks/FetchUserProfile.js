export const FetchUserProfile = async () => {
  const response = await Chatterapi.post("/fetch-profile", {
    email: emailFromLocalStorage,
  });

  return [response.data];
};
