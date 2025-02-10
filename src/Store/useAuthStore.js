import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAuth = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isProfileUpdating: false,
  isCheckingAuth: true,
  updateUser: null,
  isLoading: false,
  userDetails: null,
  userThumbnail: [],

  setUserDetails: (data) => set({ userDetails: data }),
  setThumbnails: (data) => set({ thumbnails: data }),
  setAuthUser: (user) => set({ authUser: user }),

  checkAuth: async () => {
    try {
      if (window.location.pathname === "/auth/google") {
        return;
      }
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in checkauth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      window.location.href = response.data.redirectUrl;
      set({ authUser: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Error in Registration");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged in Successful");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid Credentials");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser");
      document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      toast.success("Logout successful");
    } catch (error) {
      console.log("Error in logout", error);
      toast.error("Error in logout");
    }
  },

  updateProfile: async (id, formData) => {
    set({ isProfileUpdating: true });
    try {
      const response = await axiosInstance.put(`/auth/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ authUser: response.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      set({ isProfileUpdating: false });
    }
  },

  googleOAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("auth/google");
      set({ authUser: response.data });
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.log("error in google auth", error);
      toast.error("Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },

  profileView: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`auth/user/${id}`);
      console.log("Thumbnail Data:", response.data.thumbnails);

      set({
        userDetails: response.data.user,
        userThumbnail: response.data.thumbnails,
      });
    } catch (error) {
      console.log("Error in profile view", error);
      toast.error("something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },

  changePassword: async (oldPassword, newPassword, navigate) => {
    try {
      set({ isUpdating: true });
      await axiosInstance.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      toast.success("Password change successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password.");
    } finally {
      set({ isUpdating: false });
    }
  },
}));

export default useAuth;
