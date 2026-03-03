import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const CourseDocument = ({ onFinish, recordData, CancelBothModel, form }) => {
  // const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        templates: recordData.templates,
        // ... other fields
      });
      console.log("in CourseDocument", recordData);
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
      <Form.Item
        name="templates"
        label={
          <span>
            Templates&nbsp;
            <Tooltip title="Templates">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
       
      >
        
        <Input placeholder="Enter templates" />
      </Form.Item>

      <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />
    </Form>
  );
};

export default CourseDocument;
