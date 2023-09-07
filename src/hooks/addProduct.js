import axios from "axios";

export default async function addProduct(data) {
  try {
    let response = await axios.post(
      import.meta.env.VITE_BASE_URL + `api/products/newProduct`,
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
