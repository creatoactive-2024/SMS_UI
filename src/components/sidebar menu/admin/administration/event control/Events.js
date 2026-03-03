import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";

import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const Events = ({ onFinish, recordData, CancelBothModel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (recordData) {
      form.setFieldsValue({
        title: recordData.title,
        event: recordData.event,
      });
    }
  }, [recordData, form]);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("courseData form values:", values);

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
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title!" }]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item
        name="event"
        label="Event"
        rules={[{ required: true, message: "Please select Event!" }]}
      >
        <Input placeholder="Enter Event" />
      </Form.Item>

      <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />
    </Form>
  );
};

export default Events;
