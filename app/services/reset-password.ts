import axios, { AxiosError } from "axios";

interface ApiError {
  error: string;
}

export async function resetPassword(data: {
    password: string;
    confirm_password: string;
}) {
    try {
        const res = await axios.post("/api/reset-password", data);
        return res.data;
    } catch (error) {
        const axiosErr = error as AxiosError<ApiError>;
        throw new Error(axiosErr.response?.data?.error || "Something went wrong");
    }
}