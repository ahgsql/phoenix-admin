import axios from "axios";
import FormData from "form-data";

export default async (base64) => {
  const form = new FormData();
  form.append("image", base64.split(",")[1]);

  try {
    const response = await axios.post("https://api.imgbb.com/1/upload", form, {
      params: {
        key: "78f1b5e685dc99bee6d496abc6079ae1",
      },
    });
    return response.data.data.url;
  } catch (error) {
    return false;
  }
};
