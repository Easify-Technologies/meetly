import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function getProfileDetails() {
    try {
        
    } catch (error) {
        console.error('Error fetching profile:', error);
        const axiosErr = error as AxiosError<ApiError>;
        throw new Error(axiosErr.response?.data?.error || "Something went wrong");
    }
}