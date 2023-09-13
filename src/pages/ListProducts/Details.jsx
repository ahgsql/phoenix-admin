import React, { useEffect, useState } from "react";
import getProducts from "../../hooks/getProducts";
import { Content } from "antd/es/layout/layout";
import { Button, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import deleteProduct from "../../hooks/deleteProduct";
import getProductById from "../../hooks/getProductById";

export default function Details() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      let data = await getProductById(id);
      console.log(data);
      setProduct(data);
    })();
  }, []);
  if (product == null) {
    return <h1>Loading</h1>;
  }
  return (
    <Content style={{ padding: "0 24px", minHeight: 280 }}>
      Product Title: {product.productTitle}
    </Content>
  );
}
