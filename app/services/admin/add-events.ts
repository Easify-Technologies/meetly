import axios, { AxiosError } from "axios";

interface ApiError {
  error: string;
}

export async function addEvents(data: {
    date: string;
    city: string;
    country: string;
    cafeId?: string;
}) {
    try {
        const res = await axios.post("/api/event", data);
        return res.data;
    } catch (error) {
        const axiosErr = error as AxiosError<ApiError>;
        throw new Error(axiosErr.response?.data?.error || "Something went wrong");
    }
}