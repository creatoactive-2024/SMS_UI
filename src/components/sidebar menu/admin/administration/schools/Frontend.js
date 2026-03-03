import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";

import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const Frontend = ({
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
        date_format: recordData.date_format,
        min_number_of_days: recordData.min_number_of_days,

        number_decimal_spaces: recordData.number_decimal_spaces,
        link_placement_test: recordData.link_placement_test,

        link_feedback_form: recordData.link_feedback_form,
        email_address: recordData.email_address,
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
        label={
          <span>
            Date format&nbsp;
            <Tooltip title="Date format">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="date_format"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Minimum number of days before the start of the service"
        name="min_number_of_days"
      >
        <Input placeholder="1" />
      </Form.Item>
      <Form.Item label="Number of decimal spaces" name="number_decimal_spaces">
        <Input placeholder="0" />
      </Form.Item>
      <Form.Item label="Link to placement test" name="link_placement_test">
        <Input />
      </Form.Item>
      <Form.Item label="Link to the feedback form" name="link_feedback_form">
        <Input />
      </Form.Item>
      <Form.Item
        label="Email address (sender) for confirmation of payment"
        name="email_address"
      >
        <Input />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default Frontend;
