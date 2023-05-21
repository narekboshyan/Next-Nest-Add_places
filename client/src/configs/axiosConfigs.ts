import axios, { AxiosRequestHeaders } from "axios";
import { deleteCookie, setCookie } from "cookies-next";

import { getToken } from "@/helpers/getToken";

const axiosInstance = axios.create({
 baseURL: "http://localhost:5001",
 headers: { "Content-Type": "application/json" },
 //  withCredentials: true,
});

axiosInstance.interceptors.request.use(
 (req) => {
  if (!req.headers["Authorization"] && getToken()) {
   req.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  return req;
 },
 (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
 async (res) => {
  if (
   res?.data?.errors?.length &&
   res.data.errors[0]?.response?.statusCode === 498
  ) {
   const newAccessTokenQuery = `
      query refreshToken {
        refreshToken {
          accessToken
        }
      }
      `;
   try {
    const token = await axios.post(
     process.env.API_URL as string,
     {
      query: newAccessTokenQuery,
      variables: {},
     },
     {
      headers: { Authorization: `Bearer ${getToken()}` },
      withCredentials: true,
     }
    );
    const newAccessToken = token?.data?.data?.refreshToken?.accessToken;
    if (newAccessToken) {
     const { config } = res;
     const { retryCount = 0 } = config as any;
     const maxRetries = 1;
     setCookie("token", newAccessToken, {
      path: "/",
      maxAge: 10 * 60 * 60,
      sameSite: "none",
      secure: true,
     });

     if (retryCount < maxRetries) {
      // create a new config object with a modified value
      const newConfig = { ...config, retryCount: retryCount + 1 };
      newConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
      // retry the request with the modified config object
      const newResponse = await axiosInstance(newConfig);
      return newResponse;
     }
    } else {
     deleteCookie("token");
     localStorage.removeItem("sessionId");
     window.location.href = "/";
    }
   } catch (err) {
    deleteCookie("token");
    localStorage.removeItem("sessionId");
    window.location.href = "/";
   }
  }
  return res;
 },
 async (error) => {
  return Promise.reject(error);
 }
);

export const axiosRequest =
 <TData, TVariables>(
  query: string,
  headers?: AxiosRequestHeaders
 ): ((variables?: TVariables) => Promise<TData>) =>
 async (variables?: TVariables) =>
  axiosInstance
   .post<{ data: TData; errors: any }>(
    "",
    {
     query,
     variables,
    },
    { headers: headers }
   )
   .then((res) => {
    if (res.data.errors) {
     throw new Error(res.data.errors[0].message);
    }
    return res.data.data;
   });
