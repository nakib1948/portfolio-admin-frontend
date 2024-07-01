export const imgUpload = async (file) => {
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${process.env.Image_Upload_Token}`;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });
  
      const imgResponse = await response.json();
      const imgURL = imgResponse.data.display_url;
      return imgURL;
    } catch (error) {
      return "file not uploaded.Try again";
    }
  };