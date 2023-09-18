import React, { useEffect, useState } from "react";
import getProducts from "../../hooks/getProducts";
import { Content } from "antd/es/layout/layout";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import deleteProduct from "../../hooks/deleteProduct";

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      let data = await getProducts();
      let dataSource = data.reverse().map((p) => {
        return {
          ...p,
          productActions: [
            <Button
              type="dashed"
              onClick={() => navigate("/products/detail/" + p._id)}
              key={1}
            >
              See Details
            </Button>,
            " ",
            <Button
              type="primary"
              key={2}
              onClick={() => navigate("/products/edit/" + p._id)}
            >
              Edit
            </Button>,
            " ",
            <Button key={3} onClick={() => deleteProduct(p._id)}>
              Delete
            </Button>,
          ],
        };
      });
      setProducts(dataSource);
    })();
  }, []);

  const columns = [
    {
      title: "Product Title",
      dataIndex: "productTitle",
      key: "productTitle",
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Slug",
      dataIndex: "productSlug",
      key: "productSlug",
    },
    {
      title: "Actions",
      dataIndex: "productActions",
      key: "productActions",
    },
  ];

  if (products.length == 0) {
    return <p>Loading..</p>;
  }
  return (
    <Content style={{ padding: "0 24px", minHeight: 280 }}>
      <Table dataSource={products} rowKey={"_id"} columns={columns} />
    </Content>
  );
}
