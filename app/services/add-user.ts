import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";

interface ApiError {
  error: string;
}

export async function addUser(data: {
  name: string;
  email: string;
  age: number;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  cafe_id: string;
  city_id: string;
  connectionStyle: string;
  communicationStyle: string;
  socialStyle: string;
  healthFitnessStyle: string;
  family: string;
  spirituality: string;
  politicsNews: string;
  humor: string;
  peopleType: string[];
  password: string;
}) {
  try {
    const response = await axios.post("/api/auth/register", data);

    if (response.status === 201) {
      await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/bookings"
      });
    }

    return response.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
