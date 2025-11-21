import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
    baseURL: "/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.detail || "Something went wrong";

        if (error.response?.status === 401) {
            toast.error("Session expired. Please login again.");
            // Optional: Redirect to login
            // window.location.href = "/login";
        } else if (error.response?.status >= 500) {
            toast.error("Server error. Please try again later.");
        } else {
            toast.error(message);
        }

        return Promise.reject(error);
    }
);
