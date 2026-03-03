import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ChromePicker } from "react-color";

import TextArea from "antd/es/input/TextArea";
import moment from "moment";

import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const ScreenSettings = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
}) => {
  const [currentColor, setCurrentColor] = useState("#ffffff");

  const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        name: recordData.name,
        logo: recordData.logo,

        code: recordData.code,
        css: recordData.css,
      });
      console.log("in all data", recordData);
    }
  }, [recordData, form]);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("AllData form values:", values);

    // Trigger the callback to inform the parent component about the form submission
    onFinish(values);
  };

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="logo" label="Logo">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Colour"
        name="code"
        rules={[{ required: true, message: "Please enter the Colour!" }]}
      >
        <Input
          placeholder="Enter Colour"
          value={form.getFieldValue("code")}
          readOnly
        />
        <ChromePicker
          color={currentColor}
          onChange={(color) => {
            setCurrentColor(color.hex);
            form.setFieldsValue({
              code: color.hex,
            });
          }}
        />
      </Form.Item>

      <Form.Item label="CSS" name="css">
        <TextArea placeholder="Enter css" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default ScreenSettings;
