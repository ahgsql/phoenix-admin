import axios from "axios";

export default async function getProductById(productId) {
  try {
    let response = await axios.get(
      import.meta.env.VITE_BASE_URL + `api/products/${productId}`
    );
    if (response.data.success) {
      return response.data.product;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
