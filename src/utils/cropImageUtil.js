export const getCroppedImg = (imageSrc, crop) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        canvas.width = crop.width;
        canvas.height = crop.height;
  
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
  
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          const file = new File([blob], "profile_pic.jpg", { type: "image/jpeg" });
          resolve(file);
        }, "image/jpeg");
      };
      image.onerror = (error) => reject(error);
    });
  };
  