import React, { useEffect, useState } from "react";
import { Form, Select, Input } from "antd";

import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../../../commonComponents/FieldListDropdown";

const { Option } = Select;

const Setting = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  // const [form] = Form.useForm();
  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    try {
      const responseData = await FieldListDropdown("addtopics", "name_english");
      if (responseData) {
        // Extract category names from response data
        const names = responseData
          .map((category) => ({
            value: category._id, // Use the appropriate property for the value
            label: category.name_english, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        // const names = responseData.map((category) => category.name_english);
        setTopics(names);
      }
    } catch (error) {
      console.error("Error fetching coursecategories:", error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        topic: recordData.topic,
        type_answer: recordData.type_answer,

        depending_on: recordData.depending_on,
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
        label="Topic"
        name="topic"
        rules={[{ required: true, message: "Please select Topic!" }]}
      >
        <Select
          placeholder="SELECT TOPIC"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {topics.map((item) => (
            <Select.Option key={item._id} value={item.label}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Type of Answer"
        name="type_answer"
        rules={[{ required: true, message: "Please select Type of Answer!" }]}
      >
        <Input placeholder="Enter type of answer" />
      </Form.Item>

      <Form.Item label="Depending On" name="depending_on">
        <Input placeholder="Enter Depending On" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default Setting;
