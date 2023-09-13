import React, { useEffect, useState } from "react";
import getProducts from "../../hooks/getProducts";
import { Content } from "antd/es/layout/layout";
import { Button, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import deleteProduct from "../../hooks/deleteProduct";
import getProductById from "../../hooks/getProductById";
import getCommentsById from "../../hooks/getCommentsById";
import getWishlistCount from "../../hooks/getWishlistCount";

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
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        Product Title: {product.productTitle}
      </Content>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        Product Rating: {Math.round(product.productRating)}
      </Content>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <ul>
          Product Comment:{" "}
          {comments.map((comment) => {
            return <li>{comment.content} </li>;
          })}
        </ul>
      </Content>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        Wishlist count: {wishlistCount}
      </Content>
    </>
  );
}
