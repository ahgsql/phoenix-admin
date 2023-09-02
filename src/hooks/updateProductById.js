import axios from "axios";

export default async function updateProductById(productId, data) {
  try {
    let response = await axios.put(
      import.meta.env.VITE_BASE_URL + `api/products/${productId}`,
      data
    );
    if (response.data.success) {
      return response.data.product;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
