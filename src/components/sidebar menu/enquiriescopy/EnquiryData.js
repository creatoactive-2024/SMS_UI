import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";

const EnquiryData = ({ form, onFinish, recordData, handleNewModalCancel, CancelBothModel }) => {
  useEffect(() => {
    if (recordData) {
      form.setFieldsValue({
        preferred_course_categories: recordData.preferred_course_categories,
        preferred_course_level: recordData.preferred_course_level,
        preferred_accommodation_category: recordData.preferred_accommodation_category,
        preferred_accommodation_rooms: recordData.preferred_accommodation_rooms,
        preferred_boards: recordData.preferred_boards,
        preferred_types_of_transfer: recordData.preferred_types_of_transfer,
        preferred_transfer_locations: recordData.preferred_transfer_locations,
        // Add more fields as needed
      });
      console.log("in enquiryData", recordData);
    }
  }, [recordData, form]);

  const handleFinish = async (values) => {
    console.log("EnquiryData form values:", values);
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
        label="Preferred course categories"
        name="preferred_course_categories"
      >
        <Input placeholder="Enter Preferred course categories" />
      </Form.Item>

      <Form.Item label="Preferred course levels" name="preferred_course_level">
        <Input placeholder="Enter Preferred course levels" />
      </Form.Item>

      <hr />
      <h5>Accommodation</h5>

      <Form.Item
        label="Preferred accommodation category"
        name="preferred_accommodation_category"
      >
        <Input placeholder="Enter Preferred accommodation category" />
      </Form.Item>

      <Form.Item
        label="Preferred accommodation rooms"
        name="preferred_accommodation_rooms"
      >
        <Input placeholder="Enter Preferred accommodation rooms" />
      </Form.Item>

      <Form.Item label="Preferred boards" name="preferred_boards">
        <Input placeholder="Enter Preferred boards" />
      </Form.Item>

      <hr />
      <h5>Transfer</h5>

      <Form.Item
        label="Preferred types of transfer"
        name="preferred_types_of_transfer"
      >
        <Input placeholder="Enter Preferred types of transfer" />
      </Form.Item>

      <Form.Item
        label="Preferred transfer locations"
        name="preferred_transfer_locations"
      >
        <Input placeholder="Enter Preferred transfer locations" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default EnquiryData;
