import React, { useEffect } from "react";
import { Form, Select, Input, Checkbox } from "antd";
import { Tooltip } from "antd";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const PdfTemplateSetting = ({
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
        layout: recordData.layout, // Convert to boolean
        type: recordData.type,
        schools: recordData.schools,
        inboxes: recordData.inboxes,
        languages: recordData.languages,
        user_defined_sign: recordData.user_defined_sign,
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
        label="Layout"
        name="layout"
        rules={[{ required: true, message: "Please select layout!" }]}
      >
        <Input placeholder="Enter layout" />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please select type!" }]}
      >
        <Input placeholder="Enter type" />
      </Form.Item>

      <Form.Item
        name="schools"
        label="Schools"
        rules={[
          {
            required: true,
            message: "Please select Schools",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="speakuplondon">speakuplondon</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="inboxes"
        label="Inboxes"
        rules={[
          {
            required: true,
            message: "Please select inboxes",
          },
        ]}
      >
        <Input placeholder="Enter inboxes" />
      </Form.Item>

      <Form.Item
        name="languages"
        label="Languages"
        rules={[
          {
            required: true,
            message: "Please select Languages",
          },
        ]}
      >
        <Input placeholder="Enter languages" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            use user-defined signature(signature saved in user record)&nbsp;
            <Tooltip title="use user-defined signature">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="user_defined_sign"
        valuePropName="checked"
      >
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

export default PdfTemplateSetting;
