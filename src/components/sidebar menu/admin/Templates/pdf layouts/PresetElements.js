import React, { useEffect } from "react";
import { Form, Select, Checkbox } from "antd";

import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const PresetElements = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  useEffect(() => {
    if (recordData) {
      form.setFieldsValue({
        active_date: recordData.active_date === "true",
        active_address: recordData.active_address === "true",
        active_subject: recordData.active_subject === "true",
        active_intro: recordData.active_intro === "true",
        active_sign_img: recordData.active_sign_img === "true",
        active_sign_text: recordData.active_sign_text === "true",
      });
      console.log("in all data", recordData);
    }
  }, [recordData, form]);

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
      <hr />
      <h5>Date</h5>

      <Form.Item label="Active" name="active_date" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Address</h5>
      <Form.Item label="Active" name="active_address" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Subject</h5>

      <Form.Item label="Active" name="active_subject" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Introduction</h5>

      <Form.Item label="Active" name="active_intro" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Signature Image</h5>
      <Form.Item label="Active" name="active_sign_img" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <hr />
      <h5>Signature text</h5>
      <Form.Item label="Active" name="active_sign_text" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default PresetElements;
