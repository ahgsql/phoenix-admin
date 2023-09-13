import axios from "axios";

export default async function getWishlistCount(productId) {
  try {
    let response = await axios.get(
      import.meta.env.VITE_BASE_URL + `api/wishlist/checkUserCount/${productId}`
    );
    if (response.data.success) {
      return response.data.count;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
