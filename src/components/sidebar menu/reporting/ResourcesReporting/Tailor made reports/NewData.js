import React, { useEffect } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const NewData = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values when recordData changes
    if (recordData) {
      form.setFieldsValue({
        title: recordData.title,
        display: recordData.display,
        based_on: recordData.based_on,
        school: recordData.school,
        agency_client: recordData.agency_client,
        direct_booking: recordData.direct_booking,
        consider_specific: recordData.consider_specific,
        booking_type: recordData.booking_type,
        currency: recordData.currency,
      });
      console.log("in enquiryData", recordData);
    }
  }, [recordData, form]);

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("EnquiryData form values:", values);

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
      <h5>Course</h5>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title!" }]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item
        label="Display"
        name="display"
        rules={[{ required: true, message: "Please select Display!" }]}
      >
        <Input placeholder="Enter display" />
      </Form.Item>

      <Form.Item
        label="Based on"
        name="based_on"
        rules={[{ required: true, message: "Please select Based on!" }]}
      >
        <Input placeholder="Enter Based on" />
      </Form.Item>

      <hr />
      <h5>Filter</h5>
      <Form.Item
        name="school"
        label="Schools"
        rules={[
          {
            message: "Please select school",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="speakuplondon">speakuplondon</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Agency clients"
        name="agency_client"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Direct bookings"
        name="direct_booking"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Consider specific documents only"
        name="consider_specific"
      >
        <Select placeholder="Select...">
          <Option value="Students without proforma or invoice">
            Students without proforma or invoice
          </Option>
        </Select>
      </Form.Item>

      <Form.Item label="Booking type" name="booking_type">
        <Select placeholder="Select booking type">
          <Option value="All">All</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Currency"
        name="currency"
        rules={[{ required: true, message: "Please select Currency!" }]}
      >
        <Select placeholder="Select Currency">
          <Option value="GBP (£)">GBP (£)</Option>
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

export default NewData;
