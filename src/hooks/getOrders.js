import axios from "axios";

export default async function getOrders() {
  try {
    let response = await axios.get(
      import.meta.env.VITE_BASE_URL + "api/order/all"
    );
    if (response.data.success) {
      return response.data.orders;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
