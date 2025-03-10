import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const useThumbnailStore = create((set, get) => ({
  thumbnail: [],
  loadedThumbnails: [], 
  thumbnailDetail: null,
  isGettingThumbnail: false,
  myThumbnail: null,
  isUploading: false,
  savedThumbnails: [],
  savedImage: false,
  isThumbLoading: false,
  page: 1,
  hasMoreThumbnail: true,
  lastViewedThumbnailId: null,
  lastScrollPosition: 0,


  setThumbnail: (thumbnail) => {
    set({ thumbnail });
  },

  getThumbnail: async (query = "", page ) => {
    const {  isGettingThumbnail, hasMoreThumbnail} = get();
    if(isGettingThumbnail || !hasMoreThumbnail) return;
    set({ isGettingThumbnail: true });
    try {
      let uri = query 
      ? `/thumbnails/search?query=${query}&page=${page}&limit=12` 
      : `/thumbnails?page=${page}&limit=12`;
      const response = await axiosInstance.get(uri);
      if (response.data.length > 0) {
        set ((state) => ({
          thumbnail: [ ...response.data],
          loadedThumbnails: page === 1
          ? [...response.data]
          : [...state.loadedThumbnails, ...response.data],
          page: page + 1,
      }));
      } else {
        set({ hasMoreThumbnail: false }); 
      }
    } catch (error) {
      console.log("Error in getThumbnail", error);
    } finally {
      set({ isGettingThumbnail: false });
    }
  },

  setScrollPosition: (position) => set({ lastScrollPosition: position }),

  resetThumbnails: () => set({ 
    loadedThumbnails: [], 
    page: 1, 
    hasMoreThumbnail: true,
    lastViewedThumbnailId: null
  }), 


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
   
    set({ isThumbLoading: true });
    try {
      const response = await axiosInstance.get(`thumbnails/${id}`);
      set({ thumbnailDetail: response.data  });
    } catch (error) {
      console.log("Error in getting thumbnail details", error);
    }
     finally {
      set({ isThumbLoading: false });
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
      set((state) => ({
        thumbnailDetail: {
          ...state.thumbnailDetail,
          saves: state.thumbnailDetail.saves + 1,
        },
      }));
      set({ savedImage: true});
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


  //FILTER THUMBNAIL
  filterThumbnail: async (category, page = 1) => {
    set({ isGettingThumbnail: true });
    try {
      const response = await axiosInstance.get(
        `/thumbnails/filter/${category}?page=${page}&limit=1`
      );
      // set({ thumbnail: response.data.thumbnails });
      set ({
        loadedThumbnails: page === 1 ? response.data.thumbnails : [...get().thumbnail, ...response.data.thumbnails], 
        hasMoreThumbnail: response.data.thumbnails.length === 1, 
      });
    } catch (error) {
      console.error("Error updating filerThumbnail:", error);
    } finally {
      set({ isGettingThumbnail: false });
    }
  },

  deleteThumbnail: async(thumbnailId , Navigate) =>{
    try {
       await axiosInstance.delete(`thumbnails//delete/${thumbnailId}`)
      set((state) => ({
        thumbnails: state.thumbnails?.filter(
          (thumbnail) => thumbnail._id !== thumbnailId
        ) || [],
      }));
      Navigate(0)
      toast.success("Thumbnail deleted successfully!");
    } catch (error) {
      console.error("Error in deleting Thumbnail:", error);
      toast.error("Failed to delete the thumbnail.");
    }
  }
}));

export default useThumbnailStore;
