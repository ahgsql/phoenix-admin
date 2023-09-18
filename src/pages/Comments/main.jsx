import React, { useEffect, useState } from "react";
import "./comment.css";
import TimeAgo from "javascript-time-ago";
import getProductById from "../../hooks/getProductById.js";
import getComments from "../../hooks/getComments.js";
import deleteComment from "../../hooks/deleteComment.js";
import { useNavigate } from "react-router-dom";

const timeAgo = new TimeAgo("en-US");

const Comment = ({ productId, userId }) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let commentsFromDb = await getComments();
      if (!commentsFromDb) {
      } else {
        let count = commentsFromDb.length;
        for (const comment of commentsFromDb) {
          try {
            let productData = await getProductById(comment.productId);

            count -= 1;
            comment.productTitle = productData.productTitle;
            if (count == 0) {
              setComments(commentsFromDb);
            }
          } catch (error) {}
        }
      }
    })();
  }, [productId, userId]);

  const handleDeleteComment = async (commentId) => {
    let deleted = await deleteComment(commentId);
    document.getElementById(commentId).remove();
  };

  return (
    <div id="CommentContainer">
      {comments.map((comment) => {
        return (
          <div className="CommentRow" id={comment._id} key={comment._id}>
            <h3>{comment.userName}</h3>
            <span className="time">
              {timeAgo.format(new Date(comment.createdAt))}
            </span>
            {comment.productTitle && <h4>Product: {comment?.productTitle}</h4>}
            <p>{comment.content}</p>
            <div className="navigationButtons">
              <button
                style={{ backgroundColor: "#3498db" }}
                onClick={() =>
                  navigate("/products/detail/" + comment.productId)
                }
              >
                Product Detail
              </button>
              <button onClick={() => handleDeleteComment(comment._id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
