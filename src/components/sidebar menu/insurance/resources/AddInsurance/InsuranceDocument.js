import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const InsuranceDocument = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
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
        name="templates"
        label="Templates"
        rules={[
          {
            message: "Please select Templates",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="2021 Terms and Conditons">
            2021 Terms and Conditons
          </Option>
          <Option value="Certificate of Registration">
            Certificate of Registration
          </Option>
          <Option value="Certificate of Registration">
            Certificate of Registration
          </Option>
          <Option value="Certificate of Registration - Agency bookings only">
            Certificate of Registration - Agency bookings only
          </Option>
          <Option value="Group overview">Group overview</Option>
          <Option value="Pretend Gross invoice">Pretend Gross invoice</Option>
          <Option value="Student cards Labels">Student cards Labels</Option>
          <Option value="Transfer voucher">Transfer voucher</Option>
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

export default InsuranceDocument;
