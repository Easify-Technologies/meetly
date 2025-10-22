import axios, { AxiosError } from "axios";

type ApiError = { error: string };

export async function addUser(data: {
  name: string ,
  email: string ,
  phoneNumber: string ,
  gender: string ,
  dateOfBirth: string ,
  cafe_id: string ,
  city_id: string ,
  connectionStyle: string ,
  communicationStyle: string ,
  socialStyle: string ,
  healthFitnessStyle: string ,
  family: string ,
  spirituality: string ,
  politicsNews: string ,
  humor: string ,
  peopleType: string[] ,
  password: string 
}) {
  try {
    const response = await axios.post("/api/auth/register", data);
    return response.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
