import React, { useEffect } from "react";
import { Form, Select, Input, Checkbox } from "antd";
import { Tooltip } from "antd";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const EmailTemplate2Setting = ({
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
        available_overview: recordData.available_overview, // Convert to boolean
        available_school: recordData.available_school,
        correspondence_languages: recordData.correspondence_languages,
        preticked_setting: recordData.preticked_setting,
        default_identity: recordData.default_identity,
        cc_semicolon: recordData.cc_semicolon,
        bcc_semicolon: recordData.bcc_semicolon,
        html: recordData.html,
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

      <Form.Item
        label="Available in the following overviews"
        name="available_overview"
      >
        <Input placeholder="Enter Available in the following overviews" />
      </Form.Item>

      <Form.Item
        name="available_school"
        label="Available for the following schools"
      >
        <Input placeholder="Enter Available for the following schools" />
      </Form.Item>

      <Form.Item
        name="correspondence_languages"
        label="Correspondence Languages"
        rules={[
          {
            message: "Please select Correspondence Languages",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="English">English</Option>
          <Option value="Portugese">Portugese</Option>
          <Option value="Spanish">Spanish</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="preticked_setting"
        label={
          <span>
            Preticked settings&nbsp;
            <Tooltip title="Preticked settings">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
      >
        <Input placeholder="Enter Preticked settings" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Default Identity&nbsp;
            <Tooltip title="Default Identity">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="default_identity"
      >
        <Input />
      </Form.Item>

      <Form.Item label="CC (Seperated with semicolon" name="cc_semicolon">
        <Input />
      </Form.Item>
      <Form.Item label="BCC (Seperated with a semicolon" name="bcc_semicolon">
        <Input />
      </Form.Item>

      <Form.Item label="HTML" name="html" valuePropName="checked">
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

export default EmailTemplate2Setting;
