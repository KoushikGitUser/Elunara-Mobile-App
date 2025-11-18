import axios from "axios";

let mainURL = "http://curriculight.test/api/v1";
export const baseURL = mainURL;
let apiInstance = axios.create({ baseURL });

export const photoFetch = (mediaUrl) => {
  return `http://curriculight.test/api/v1/${mediaUrl}`;
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
  (config) => {
    const accessToken = "ejupuiig896968976vtguigjuh87t87gjuhg87tuygvjh";
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers.Accept = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

     if (originalRequest.url.includes('/login')) {
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
        const refreshToken = "refreshlihguibvhiuyh9869876897ybviuo789yo9";
        const response = await apiInstance.post("/refresh-token", {
          refresh_token: refreshToken,
        });
        const newAccessToken = response?.data?.data?.access_token;
        const newRefreshToken = response?.data?.data?.refresh_token;
        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);
        processQueue(null, newAccessToken);
        // YOU will re-dispatch your thunk with the new token
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return apiInstance(originalRequest);
      } catch (err) {
        // toast.error("Session timed out,Please Sign-in again");
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("refresh_token");
        // window.location.reload();
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