import axios from "axios";

export default async function getChats() {
  try {
    let response = await axios.get(
      import.meta.env.VITE_BASE_URL + "api/chat/history"
    );
    if (response.data.success) {
      return response.data.chats;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
