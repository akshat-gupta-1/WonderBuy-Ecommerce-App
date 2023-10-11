import axios from "axios";
const BASE_URL = "https://wonder-buy-api.vercel.app";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
