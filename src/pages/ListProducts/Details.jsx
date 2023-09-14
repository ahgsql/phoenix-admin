import React, { useEffect, useState } from "react";
import getProducts from "../../hooks/getProducts";
import { Content } from "antd/es/layout/layout";
import { Button, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import deleteProduct from "../../hooks/deleteProduct";
import getProductById from "../../hooks/getProductById";
import getCommentsById from "../../hooks/getCommentsById";
import getWishlistCount from "../../hooks/getWishlistCount";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
import { Card } from "antd";
import { Rating } from "react-simple-star-rating";
import commentStyles from "./comments.module.css";
export default function Details() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  useEffect(() => {
    (async () => {
      let data = await getProductById(id);
      let comments = await getCommentsById(id);
      let wishlist = await getWishlistCount(id);
      setComments(comments);
      console.log(`comments:`, comments);
      setProduct(data);
      setWishlistCount(wishlist);
    })();
  }, []);
  if (product == null) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <Card
        title={<h1>{product.productTitle}</h1>}
        size="xl"
        bordered={false}
        style={{ width: 1300, border: "1px solid black", margin: "40px" }}
      >
        <h2>Description:</h2>
        <h2 style={{ fontWeight: "normal" }}>{product.productDescription}</h2>

        <h2>
          <b>Price:</b>{" "}
          <span style={{ fontWeight: "normal" }}>${product.productPrice}</span>
        </h2>
        <h2>
          <b>Product Rating:</b>{" "}
          <Rating
            initialValue={Math.round(product.productRating)}
            readonly={true}
          />
        </h2>
        <h2>
          {wishlistCount}{" "}
          <span style={{ fontWeight: "normal" }}>
            users have this product in their wishlist
          </span>
        </h2>
        <div className={commentStyles.comments}>
          <h1>Product Comments</h1>
          {comments.map((comment) => {
            return (
              <div className={commentStyles.singleComment}>
                <span className={commentStyles.userName}>
                  {comment.userName}
                </span>
                <span className={commentStyles.content}>{comment.content}</span>
                <span className={commentStyles.time}>
                  {" "}
                  {timeAgo.format(new Date(comment.createdAt))}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
