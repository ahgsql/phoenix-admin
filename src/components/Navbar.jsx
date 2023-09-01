import { Layout } from "antd";
import { Typography } from "antd";
const { Title } = Typography;
const { Header } = Layout;
import React from "react";

export default function Navbar() {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Title type="warning">Phoenix Admin Panel</Title>
    </Header>
  );
}
