import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";

interface ApiError {
  error: string;
}

export async function adminLogin(data: { email: string; password: string }) {
  try {
    const response = await axios.post("/api/admin/login", data);

    if (response.status === 201) {
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
    }

    return response.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
