import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const useAuth = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isProfileUpdating: false,
  isCheckingAuth: true,
  updateUser: null,


  
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in checkauth", error);
      set({ authUser: null});
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
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
      toast.error("Something went wrong");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful");
    } catch (error) {
      console.log("Error in logout", error);
      toast.error("Error in logout");
    }
  },

  updateProfile : async (id, formData) => {
    set({isProfileUpdating: true})
    try {
      const response = await axiosInstance.put(`/auth/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });      
      set({ authUser: response.data });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    } finally {
      set({isProfileUpdating: false})
    }
  }
}));

export default useAuth;
