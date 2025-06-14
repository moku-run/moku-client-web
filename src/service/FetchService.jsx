import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const get = async (endPoint) => {
  try {
    const res = await apiClient.get(endPoint);
    return { success: true, data: res.data };
  } catch (error) {
    const res = error.response.data;

    return { success: false, error: res };
  }
};

export const post = async (endPoint, dto) => {
  try {
    const res = await apiClient.post(endPoint, dto);
    return { success: true, data: res.data };
  } catch (error) {
    const res = error.response.data;

    if (res.code === "CC001") {
      console.log(res.payload[0]);
      toast.warn(res.payload[0].message);
    }

    if (res.code === "CC002") console.log(`CC002 ${res.payload[0]}`);

    if (res.code === "CC003") {
      console.log(`CC003 ${res.payload}`);
      toast.warn(res.payload.split("problem: ")[1]);
    }

    if (res.code === "CC004") console.log(`CC004 ${res.payload[0]}`);

    if (res.code === "SC001") {
      toast.warn(res.message);
    }

    return { success: false, error: res };
  }
};
