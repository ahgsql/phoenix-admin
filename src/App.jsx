import React, { useState } from "react";
import { Button } from "antd";

import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct/main";
import DashBoard from "./pages/Dashboard/main";
import ListProducts from "./pages/ListProducts/main";
import ProductDetail from "./pages/ProductDetail/main";
import EditProduct from "./pages/EditProduct/main";
import Orders from "./pages/Orders/main";
import Comments from "./pages/Comments/main";
import Customers from "./pages/Customers/main";
import LiveChat from "./components/LiveChat";
import LeftMenu from "./components/LeftMenu";
import Navbar from "./components/Navbar";
function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Router>
            <LeftMenu />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/list" element={<ListProducts />} />
              <Route path="/productdetail/:id" element={<ProductDetail />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </Router>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Phoenix Admin Panel as Final Project for DevelHoooope
      </Footer>
    </Layout>
  );
}

export default App;
