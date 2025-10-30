import axios, { AxiosError } from "axios";

interface ApiError {
  error: string;
}

export async function sendOTP(data: { email: string }) {
    try {
        const res = await axios.post("/api/send-otp", data);
        return res.data;
    } catch (error) {
        const axiosErr = error as AxiosError<ApiError>;
        throw new Error(axiosErr.response?.data?.error || "Something went wrong");
    }
}