import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
export default function LeftMenu() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const sideMenu = [
    { key: "1", label: <Link to="/">Dashboard</Link> },
    {
      key: "2",
      label: "Product Operations",
      children: [
        {
          key: 7,
          label: <Link to="/products/list">See All Products</Link>,
        },
        { key: 8, label: <Link to="/products/add">Add New Product</Link> },
      ],
    },
    { key: "3", label: <Link to="/orders">Orders</Link> },

    { key: "5", label: <Link to="/comments">Comments</Link> },
    { key: "6", label: <Link to="/chat">LiveChat</Link> },
  ];

  const leftMenu = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    }
  );
  //  console.log(leftMenu);
  return (
    <Sider style={{ background: colorBgContainer }} width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        items={sideMenu}
      />
    </Sider>
  );
}
