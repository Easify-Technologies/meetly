import axios,{ AxiosError } from "axios";

type ApiError = { error: string };

export async function fetchUsers() {
  try {
    const res = await axios.get('/api/admin/fetch-users');
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(
      axiosErr.response?.data?.error || "Something went wrong"
    );
  }
}