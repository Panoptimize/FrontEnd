import httpInstance from "../httpInstance";

export const getAuthUser = async () => {
  try {
    const endpoint = "/supervisor/firebase";
    const response = await httpInstance.get(endpoint);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.log("Error fetching data", error);
  }
};
