import axios, { AxiosInstance } from "axios";
const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://connected-331518.appspot.com/",
});

export { axiosClient as axios };
