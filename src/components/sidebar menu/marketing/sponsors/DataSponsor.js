import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const DataSponsor = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
}) => {
  const [form] = Form.useForm();

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  useEffect(() => {
    // Set initial form values when recordData changes
    if (recordData) {
      form.setFieldsValue({
        name: recordData.name,
        nickname: recordData.nickname,
        school: recordData.school,
        sponsoring: recordData.sponsoring,
        address: recordData.address,
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
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please select name",
          },
        ]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        label="Nickname"
        name="nickname"
        rules={[
          {
            required: true,
            message: "Please select nickname",
          },
        ]}
      >
        <Input placeholder="Enter Nickname" />
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
          <Option value="SpeakUp London">SpeakUp London</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Sponsoring"
        name="sponsoring"
        rules={[{ required: true, message: "Please enter Sponsoring Type!" }]}
      >
        <Select placeholder="SELECT SPONSORING TYPE" onChange={handleChange}>
          <Option value="General">General</Option>
        </Select>
      </Form.Item>

      <hr />

      <h5>Address</h5>

      <Form.Item label="Address" name="address">
        <Input placeholder="Enter address" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default DataSponsor;
