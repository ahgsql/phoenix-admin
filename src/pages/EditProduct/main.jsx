import React, { useState, useEffect } from "react";
import getProductById from "../../hooks/getProductById";
import { useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Select } from "antd";
import updateProductById from "../../hooks/updateProductById";
import TextArea from "antd/es/input/TextArea";
export default function EditProduct() {
  const [form] = Form.useForm();
  const [product, setProduct] = useState(null);
  let { id } = useParams();
  const onFinish = () => {
    let formData = form.getFieldsValue();
    let data = {
      productTitle: formData.title,
      productPrice: formData.price,
      productSlug: formData.slug,
      productImg: product.productImg,
    };
    updateProductById(id, data);
  };
  useEffect(() => {
    (async () => {
      let data = await getProductById(id);
      setProduct(data);
      form.setFieldsValue({
        title: data.productTitle,
        description: data.productDescription,
        price: data.productPrice,
        slug: data.productSlug,
      });
      form.initialValues = {
        title: data.productTitle,
        description: data.productDescription,
        price: data.productPrice,
        slug: data.productSlug,
      };
    })();
  }, []);

  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };
  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        padding: 40,
      }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea autoSize={true} />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
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
