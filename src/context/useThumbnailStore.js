import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const useThumbnailStore = create((set) => ({
  thumbnail: [],
  thumbnailDetail: null,
  isGettingThumbnail: false,
  myThumbnail: null,
  isUploading: false,
  savedThumbnails: null,

  // setThumbnail: (thumbnail) => {
  //   set({ thumbnail });
  // },

  getThumbnail: async (query = "") => {
    set({ isGettingThumbnail: true });
    try {
      let uri = query ? `/thumbnails/search?query=${query}` : "/thumbnails/";
      const response = await axiosInstance.get(uri);
      set({ thumbnail: response.data });
    } catch (error) {
      console.log("Error in getThumbnail", error);
    } finally {
      set({ isGettingThumbnail: false });
    }
  },

  uploadThumbnail: async (formData) => {
    set({ isUploading: true });
    try {
      const response = await axiosInstance.post(
        "/thumbnails/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.data;
      set({ thumbnail: data });
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
    } finally {
      set({ isUploading: false });
    }
  },

  getThumbnailDetails: async (id) => {
    try {
      const response = await axiosInstance.get(`thumbnails/${id}`);
      set({ thumbnailDetail: response.data });
    } catch (error) {
      console.log("Error in getting thumbnail details", error);
    }
  },

  getMyThumbnail: async () => {
    try {
      const response = await axiosInstance.get(
        "/thumbnails/myUploadedThumbnail"
      );
      set({ myThumbnail: response.data });
    } catch (error) {
      console.log("Error in getting my uploaded thumbnail details", error);
    }
  },

  saveThumbnail: async (thumbnailId) => {
    try {
      await axiosInstance.post(`/thumbnails/save/${thumbnailId}`);
      console.log(thumbnailId);

      set((state) => ({
        thumbnailDetail: {
          ...state.thumbnailDetail,
          saves: state.thumbnailDetail.saves + 1,
        },
      }));
      toast.success("thumbnail saved successful");
    } catch (error) {
      console.error("Error saving thumbnail in thumbnailstore:", error);
      toast.error(error.response.data.message);
    }
  },

  getSavedThumbnails: async () => {
    try {
      const response = await axiosInstance.get("/thumbnails/saved");
      set({ savedThumbnails: response.data });
    } catch (error) {
      console.error("Error fetching saved thumbnails:", error);
    }
  },

  downloadThumbnail: async (thumbnailId) => {
    try {
      const response = await axiosInstance.get(
        `thumbnails/download/${thumbnailId}`
      );

      const downloadUrl = response.data.downloadUrl;
      //TRIGGER DOWNLOAD
      const imageResponse = await fetch(downloadUrl);
      const blob = await imageResponse.blob();
      const link = document.createElement("a");
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      link.setAttribute("download", `thumbnail-${thumbnailId}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);

      //UPDATE THE STATE
      set((state) => ({
        thumbnailDetail: {
          ...state.thumbnailDetail,
          downloads: state.thumbnailDetail.downloads + 1,
        },
      }));
      toast.success("Thumbnail downloaded successfully!");
    } catch (error) {
      console.error("Error downloading Thumbnail", error);
      toast.error("Something went wrong");
    }
  },

  //IMPRESSION
  updateImpression: async (thumbnailId) => {
    try {
      await axiosInstance.post(`/thumbnails/impression/${thumbnailId}`);
      set((state) => ({
        thumbnailDetail: {
          ...state.thumbnailDetail,
          impressions: state.thumbnailDetail.impressions,
        },
      }));
    } catch (error) {
      console.error("Error updating impression:", error);
    }
  },

  //CTR
  updateCtr: async (thumbnailId) => {
    try {
      const ctr = await axiosInstance.post(`/thumbnails/ctr/${thumbnailId}`);
      const thumbnailDetails = await axiosInstance.get(
        `thumbnails/${thumbnailId}`
      );
      const impression = thumbnailDetails.impression;
      console.log(impression);
      console.log(ctr);
      //     const ctrResponse = thumbnailDetails?.impressions > 0
      // ? ((thumbnailDetails?.clicks || 0) / thumbnailDetails.impressions * 100).toFixed(2)
      // : 0;
    } catch (error) {
      console.error("Error updating ctr:", error);
    }
  },

  //FILTER THUMBNAIL
  filterThumbnail: async (category) => {
    set({ isGettingThumbnail: true });
    try {
      const response = await axiosInstance.get(`/thumbnails/filter/${category}`
      );
      set({ thumbnail: response.data.thumbnails });
    } catch (error) {
      console.error("Error updating filerThumbnail:", error);
    } finally {
      set({ isGettingThumbnail: false });
    }
  },
}));

export default useThumbnailStore;
