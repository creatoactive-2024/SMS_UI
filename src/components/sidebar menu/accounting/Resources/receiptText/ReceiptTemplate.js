import React, { useEffect } from "react";
import { Form, Select, Input, Button } from "antd";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const ReceiptTemplate = ({
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
        school: recordData.school,
        receipt_texts: recordData.receipt_texts,
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
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="school"
        label="School"
        rules={[
          {
            required: true,
            message: "Please select School",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="speakuplondon">speakuplondon</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Receipt texts" name="receipt_texts">
        <Select placeholder="Select a Receipt texts">
          <Option value="Per Document Type">Per Document Type</Option>
          <Option value="Per Service Type">Per Service Type</Option>
          <Option value="Per Service And Document Type">
            Per Service And Document Type
          </Option>
        </Select>
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default ReceiptTemplate;
