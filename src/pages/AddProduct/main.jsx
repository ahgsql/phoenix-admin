import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import addProduct from "../../hooks/addProduct";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import uploadImage from "../../hooks/uploadImage";
import { toast } from "react-toastify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function AddProduct() {
  const [form] = Form.useForm();
  const onFinish = async () => {
    let response = await uploadImage(image.url);
    let formData = form.getFieldsValue();
    let data = {
      productTitle: formData.title,
      productPrice: formData.price,
      productSlug: formData.slug,
      productImg: [{ url: response }],
      productPhotoFull: response,
    };
    addProduct(data);
    toast(" Product Successfully Added!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          padding: 40,
        }}
      >
        <Title level={2} type="danger">
          Add Product
        </Title>
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
          <Input />
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
          label="Slug"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Upload
          name="image"
          beforeUpload={async (file) => {
            file.url = await getBase64(file);
            setImage(file);
          }}
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
