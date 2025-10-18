import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function fetchCafes(locationId: string) {
  try {
    const res = await axios.post('/api/fetch-cafes', { locationId });
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}
