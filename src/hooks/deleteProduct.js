import axios from "axios";

export default async function deleteProduct(productId) {
  try {
    let response = await axios.delete(
      import.meta.env.VITE_BASE_URL + `api/products/${productId}`
    );
    if (response.data.success) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
