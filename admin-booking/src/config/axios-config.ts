import axios from "axios";
const baseAxios = axios.create({
  baseURL: "http://localhost:8000",
});
baseAxios.interceptors.request.use(
  async (config) => {
    let token;
    try {
      token = localStorage.getItem("token_admin");
    } catch (error) {
      throw error;
    }
    if (token !== null) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: Error) => {
    Promise.reject(error);
  }
);
baseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default baseAxios;
