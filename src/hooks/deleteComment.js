import axios from "axios";

export default async function deleteComment(commentId) {
    try {
        let response = await axios.delete(
            import.meta.env.VITE_BASE_URL + `api/comments/${commentId}`
        );
        if (response.data.success) {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
