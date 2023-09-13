import axios from "axios";

export default async function getCommentsById(productId) {
  try {
    let response = await axios.get(
      import.meta.env.VITE_BASE_URL + `api/comments/product/${productId}`
    );
    if (response.data.success) {
      return response.data.comments.length;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
