import axios, { AxiosError } from "axios";

interface ApiError {
  error: string;
}

export async function editUserDetails(
  data: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    date_of_birth?: string;
    gender?: string;
  },
  userId: string
) {
  try {
    const payload = {
      ...data,
      name: `${data.first_name} ${data.last_name}`.trim(),
    };
    delete payload.first_name;
    delete payload.last_name;

    const res = await axios.put(
      "/api/user/edit",
      { payload, userId },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ApiError>;
    throw new Error(axiosErr.response?.data?.error || "Something went wrong");
  }
}
