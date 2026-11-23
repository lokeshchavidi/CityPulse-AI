import axios from "axios";
import storageUtils from "@/utils/storageUtils";
import ENV from "@/config/env";
import API_ENDPOINTS from "@/api/endpoints";

const axiosClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  // Render free tier can take several minutes to wake from sleep.
  timeout: 180000,
});

// Attach JWT token to every request
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = storageUtils.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Automatically use JSON unless the request is FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    } else {
      // Let the browser set multipart/form-data with the correct boundary
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle expired JWT
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest =
      error.config?.url?.includes(API_ENDPOINTS.AUTH.LOGIN) ||
      error.config?.url?.includes(API_ENDPOINTS.AUTH.STAFF_LOGIN);

    if (error.response?.status === 401 && !isLoginRequest) {
      storageUtils.clearStorage();

      const onALoginPage =
        window.location.pathname.startsWith("/login") ||
        window.location.pathname.startsWith("/officer/login");

      if (!onALoginPage) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
