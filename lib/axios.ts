import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { supabase } from "@/lib/supabase/supabase";

const axiosHandler = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API!,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

// Request interceptor
axiosHandler.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Only retrieve the browser session in the browser
      if (typeof window !== "undefined") {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Failed to retrieve session:", error.message);
        }

        if (session?.access_token) {
          config.headers.set("Authorization", `Bearer ${session.access_token}`);
        }
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response interceptor
axiosHandler.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          break;

        case 403:
          console.error("You don't have permission to perform this action.");
          break;

        case 404:
          console.error("Requested resource not found.");
          break;

        case 500:
          console.error("Something went wrong on the server.");
          break;

        default:
          console.error("API Error:", error.response.data);
      }
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosHandler;
