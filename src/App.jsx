import { useState } from "react";
import { Button } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />

      <BrowserRouter>
        <LeftMenu />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/list" element={<ListProducts />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/customers" element={<Customers />} />
          <LiveChat />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
