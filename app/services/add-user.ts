import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function addUser() {
  try {
    const response = await axios.post("/api/auth/register");
    return response.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
