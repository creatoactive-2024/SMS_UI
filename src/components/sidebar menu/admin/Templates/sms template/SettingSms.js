import React, { useState, useEffect } from "react";
import { Form, Select, Input, Checkbox, Alert, Space, List } from "antd";

import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const SettingSms = ({ onFinish, recordData, CancelBothModel }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        name: recordData.name,
        correspondence_languages: recordData.correspondence_languages,
        school: recordData.school,
        overview: recordData.overview,
        recipient_group: recordData.recipient_group,
        check_box: recordData.check_box,
      });
    }
  }, [recordData, form]);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("courseData form values:", values);

    // Trigger the callback to inform the parent component about the form submission
    onFinish(values);
  };

  const data = ["Save the settings once to see the content related details"];

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Alert
          message=""
          description={
            <List
              size="small"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <span style={{ display: "inline-block", marginRight: "5px" }}>
                    •
                  </span>
                  {item}
                </List.Item>
              )}
            />
          }
          type="info"
          showIcon
        />
      </Space>
      <br />
      <br />
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter name!" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        name="correspondence_languages"
        label="Correspondence Languages"
        rules={[
          {
            required: true,
            message: "Please select Correspondence Languages",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="english">english</Option>
          <Option value="spanish">spanish</Option>
          <Option value="portugese">portugese</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="school"
        label="Schools"
        rules={[
          {
            required: true,
            message: "Please select schools",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="speackuplondon">speackuplondon</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Overviews"
        name="overview"
        rules={[
          {
            required: true,
            message: "Please select overviews",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="Bookings">Bookings</Option>
          <Option value="job offers">job offers</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="recipient_group"
        label="Recipient group"
        rules={[{ required: true, message: "Please select Recipient group!" }]}
      >
        <Select placeholder="Please select">
          <Option value="Deleted entry">Deleted entry</Option>
        </Select>
      </Form.Item>

      <Form.Item name="check_box" label="Check box">
        <Input placeholder="Enter check box" />
      </Form.Item>

      <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />
    </Form>
  );
};

export default SettingSms;
