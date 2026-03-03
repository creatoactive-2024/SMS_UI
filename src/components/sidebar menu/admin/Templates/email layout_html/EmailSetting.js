import React, { useEffect } from "react";
import { Form, Select, Input, Space, Alert, List } from "antd";

import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const EmailSetting = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (recordData) {
      form.setFieldsValue({
        name: recordData.name,
      });
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

  const data = [
    "Please use {email-content} as a placeholder for the email content",
  ];

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
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input />
      </Form.Item>

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

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default EmailSetting;
