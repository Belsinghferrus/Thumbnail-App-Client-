import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const useCommentStore = create((set) => ({
  isCommentLoading: false,
  comments: [],

  setComments: (data) => set({ comments: data }),

  postComment: async (thumbnailId, content) => {
    set({ isCommentLoading: true });
    try {
      const response = await axiosInstance.post(
        `comments/${thumbnailId}/`,{content}
      );
      set((state) => ({
        comments: [ response.data, ...state.comments],
      }));
      toast.success(  "Suggestion posted" );
    } catch (error) {
      console.log("Error in postComment", error);
    }finally {
        set({ isCommentLoading: false });
      }
  },

  getComment: async (thumbnailId) => {
    set({isCommentLoading: true})
    try {
      const response = await axiosInstance.get(
        `/comments/${thumbnailId}`
      );
      console.log(response.data);
      
      set({ comments: response.data });
    } catch (error) {
      console.log("Error in get comment", error);
    } finally{
        set({isCommentLoading: false})
    }
  },
}));

export default useCommentStore;
