import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function fetchAllLocations() {
  try {
    const res = await axios.get('/api/fetch-locations');
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}
