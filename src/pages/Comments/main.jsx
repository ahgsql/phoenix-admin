import React, {useEffect, useState} from 'react';
import "./comment.css"

const Comment = ({productId, userId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(``);
                if (response.ok) {
                    const commentData = await response.json();
                    setComments(commentData.comments);
                } else {
                    console.error('Failed to fetch comments.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchData();
    }, [productId, userId]);

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(``, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Comment deleted successfully, update the comment list.
                const updatedComments = comments.filter(comment => comment._id !== commentId);
                setComments(updatedComments);
            } else {
                console.error('Failed to delete comment.');
            }
        } catch (error) {
            console.error('An error occurred while deleting the comment:', error);
        }
    };

    return (
        <div id="CommentContainer">
            {/*{comments.map((comment) => (*/}
            {/*    <div key={comment._id} id="CommentRow">*/}
            {/*        <h3>{comment.username}</h3>*/}
            {/*        <h4>Product: {comment.productName}</h4>*/}
            {/*        <p>{comment.text}</p>*/}
            {/*        <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>*/}
            {/*    </div>*/}
            {/*))}*/}
            <div id="CommentRow">
                <h3>Alptekin</h3>
                <h4>Product: Alptekin Product</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, assumenda deleniti,
                    dolorem ex exercitationem itaque molestiae odio quia sed sint velit. Animi deserunt ea excepturi
                    illum necessitatibus nostrum officia quisquam sapiente. Accusamus aliquam at cupiditate deleniti
                    error fugit, hic illo, incidunt iste molestias ratione, recusandae rem velit? Architecto atque aut
                    debitis eaque earum excepturi expedita inventore ipsa itaque nihil, pariatur porro quaerat
                    reprehenderit, saepe sint sunt suscipit! Accusamus, minima, praesentium! A asperiores atque commodi,
                    consequuntur dolor ducimus hic in libero magnam nam optio pariatur placeat possimus provident, quae
                    quisquam ratione? Ipsum, iste laudantium minus quas quasi vero voluptate voluptatum.</p>
                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
            </div><div id="CommentRow">
                <h3>Alptekin</h3>
                <h4>Product: Alptekin Product</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, assumenda deleniti,
                    dolorem ex exercitationem itaque molestiae odio quia sed sint velit. Animi deserunt ea excepturi
                    illum necessitatibus nostrum officia quisquam sapiente. Accusamus aliquam at cupiditate deleniti
                    error fugit, hic illo, incidunt iste molestias ratione, recusandae rem velit? Architecto atque aut
                    debitis eaque earum excepturi expedita inventore ipsa itaque nihil, pariatur porro quaerat
                    reprehenderit, saepe sint sunt suscipit! Accusamus, minima, praesentium! A asperiores atque commodi,
                    consequuntur dolor ducimus hic in libero magnam nam optio pariatur placeat possimus provident, quae
                    quisquam ratione? Ipsum, iste laudantium minus quas quasi vero voluptate voluptatum.</p>
                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
            </div>
        </div>
    );
};


export default Comment;
