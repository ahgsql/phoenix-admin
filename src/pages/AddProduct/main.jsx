import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import addProduct from "../../hooks/addProduct";

export default function AddProduct() {
  const [form] = Form.useForm();
  const onFinish = () => {
    let formData = form.getFieldsValue();
    let data = {
      productTitle: formData.title,
      productPrice: formData.price,
      productSlug: formData.slug,
      productImg: [{ url: formData.productImg }],
    };
    addProduct(data);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="title"
        label="Product Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Product Price"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="slug"
        label="Product Slug"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="productImg"
        label="Image Url"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}
