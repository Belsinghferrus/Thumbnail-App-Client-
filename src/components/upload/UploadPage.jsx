import { useEffect, useState } from "react";
import "./upload.css";
import useThumbnailStore from "../../Store/useThumbnailStore";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import {  useNavigate } from "react-router-dom";
import Logo from "../topBar/component/Logo";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const { uploadThumbnail, isUploading } = useThumbnailStore();
  const navigate = useNavigate();
  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  function handleTitleChange(e) {
    if (e.target.value.length <= 100) {
      setTitle(e.target.value);
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append("imageUrl", image);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    try {
      await uploadThumbnail(formData);
      toast.success("Upload successful");
      navigate("/profile");
    } catch (error) {
      console.log("Error in uploading thumbnail", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="upload">
    <Logo className="logo-upload"/>
    <div className="upload-container">
      {!isUploading && (
        <div className="overlay">
          <div className="spinner-container">
            <ClipLoader color="#ffffff" loading={isUploading} size={50} />
          </div>
        </div>
      )}
      <h1 className="upload-title">Upload Thumbnail</h1>
      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="form-group">
          <label className="label" htmlFor="image">
            Upload Image
          </label>
          <input
            className="input-box"
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
          <p className="preview-format-p" >Allowed format 1280 x 720px</p>
        </div>

        {/* Title Input */}
        <div className="title-section-upload">
          <div className="form-group">
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              className="input-box"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <p className="char-counter">{title.length}/100</p>
          </div>
        </div>

        {/* category Input */}
        <div className="form-group">
          <label className="label" htmlFor="category">
            Category
          </label>
          <select
            className="input-box"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>{" "}
            <option value="Comedy">Comedy</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Film & Animation">Film & Animation</option>
            <option value="Gaming">Gaming</option>
            <option value="Howto & Style">Howto & Style</option>
            <option value="Music">Music</option>
            <option value="News & Politics">News & Politics</option>
            <option value="Nonprofits">Nonprofits</option>
            <option value="People & Blogs">People & Blogs</option>
            <option value="Pets & Animals">Pets & Animals</option>
            <option value="Science & Tech">Science & Tech</option>
            <option value="Sports">Sports</option>
            <option value="Travel & Events">Travel & Events</option>
          </select>
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            className="input-box description-box"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isUploading} className="upload-btn">
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default UploadPage;
