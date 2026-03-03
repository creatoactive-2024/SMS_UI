import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";

import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const InfoFilterSet = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        name: recordData.name,
        used_for: recordData.used_for,
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

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item
        label="To be used for"
        name="used_for"
        rules={[{ required: true, message: "Please select To be used for!" }]}
      >
        <Input placeholder="Enter To be used for" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default InfoFilterSet;
