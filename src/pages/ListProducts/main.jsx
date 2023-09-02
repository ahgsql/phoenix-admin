import React, { useEffect, useState } from "react";
import getProducts from "../../hooks/getProducts";
import { Content } from "antd/es/layout/layout";
import { Table } from "antd";

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      let data = await getProducts();
      setProducts(data);
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
  ];

  if (products.length == 0) {
    return <p>Loading..</p>;
  }

  return (
    <Content style={{ padding: "0 24px", minHeight: 280 }}>
      <Table dataSource={products} rowKey={"_id"} columns={columns} />;
    </Content>
  );
}
