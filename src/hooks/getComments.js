import axios from "axios";

export default async function getComments() {
    try {
        let response = await axios.get(
            import.meta.env.VITE_BASE_URL + `api/comments`
        );
        if (response.data.success) {
            return response.data.comments;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
