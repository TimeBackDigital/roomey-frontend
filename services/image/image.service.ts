import axios from "axios";

const ImageService = {
  uploadImage: async (
    image: File,
    opts: {
      opts?: { folder?: string; publicId?: string };
    }
  ) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("folder", opts.opts?.folder || "default");

    const response = await axios.post(`/api/image/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as {
      url: string;
      public_id: string;
    };
  },
  deleteImage: async (imageId: string) => {
    const response = await axios.delete(
      `/api/image/${encodeURIComponent(imageId)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.status) {
      throw new Error(response.data.message);
    }

    return response.data;
  },
};

export default ImageService;
