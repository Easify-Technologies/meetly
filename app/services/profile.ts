import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function getProfileDetails(data: { userId: string }) {
    try {
        const res = await axios.post('/api/profile', data);
        return res.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        const axiosErr = error as AxiosError<ApiError>;
        throw new Error(axiosErr.response?.data?.error || "Something went wrong");
    }
}