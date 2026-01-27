import axios from "axios";
import { getToken, storeToken, getRefreshToken, updateRefreshToken, removeToken, removeRefreshToken } from "../utils/Secure/secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reset } from "../services/navigationService";
import { triggerToast } from "../services/toast";

let mainURL = "https://api.elunara.ai/api/v1";
export const baseURL = mainURL;
let apiInstance = axios.create({ baseURL });

export const photoFetch = (mediaUrl) => {
  return `https://api.elunara.ai/api/v1/${mediaUrl}`;
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getToken();
     console.log(accessToken,"tokennnn");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh token logic for login and refresh-token endpoints
    if (originalRequest.url.includes('/login') || originalRequest.url.includes('/refresh-token')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return apiInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Get refresh token from secure store
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          console.log("No refresh token available");
          
          throw new Error("No refresh token available");
        }

        const response = await apiInstance.post("/auth/refresh-token", {
          refresh_token: refreshToken,
        });

        const newAccessToken = response?.data?.data?.access_token;
        const newRefreshToken = response?.data?.data?.refresh_token;

        // Store new tokens in secure store
        if (newAccessToken) {
          await storeToken(newAccessToken);
        }

        if (newRefreshToken) {
          await updateRefreshToken(newRefreshToken);
        }

        processQueue(null, newAccessToken);

        // Retry the original request with new token
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return apiInstance(originalRequest);
      } catch (err) {
        // Clear tokens on refresh failure
        await removeToken();
        await removeRefreshToken();
        reset("signin"); 
        triggerToast("Session expired","Looks like your session has expired, please sign in again","error",4000);
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;