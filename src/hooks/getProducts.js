import axios from "axios";

export default async function getProducts() {
  try {
    let response = await axios.get(
      import.meta.env.VITE_BASE_URL + "api/products"
    );
    if (response.data.success) {
      return response.data.products;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
