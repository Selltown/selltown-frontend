import axios from "axios";

export const getFriendlyErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    // Backend responded
    if (error.response) {
      const data = error.response.data;

      // detail: "Invalid or expired OTP."
      if (data?.detail) {
        return data.detail;
      }

      if (error.response?.status === 429) {
        return error.response.data?.detail || "Too many requests. Please try again later.";
      }

      // field error: { phone_number: ["user with this phone number already exists."] }
      const firstFieldError = Object.values(data || {}).flat()[0];

      if (typeof firstFieldError === "string") {
        return firstFieldError;
      }

      // Backend responded but didn't give us a usable message
      return "Something went wrong. Please try again.";
    }

    // Request was made but no response came back
    if (error.request) {
      return "Unable to connect to the server. Please check your internet connection and try again.";
    }
  }

  // Non-Axios / unexpected error
  return "Something went wrong. Please try again.";
};