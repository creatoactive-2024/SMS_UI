import React, { useState } from "react";
import { Form, Select, Input, DatePicker, TimePicker, Checkbox, Button,Divider,AutoComplete, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const { Option } = Select;

const Visa = () => {
    const [options, setOptions] = useState([]);




  const onFinish = (values) => {
    console.log('Form values:', values);
  };
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const handleSearch = (value) => {
    const suggestions = [
      "First Name",
      "Last Name",
      "Email Address",
      "Date of Birth",
    ];
    setOptions(
      value ? suggestions.map((suggestion) => ({ value: suggestion })) : []
    );
  };

  const onSelect = (value) => {
    console.log("Selected:", value);
  };




  return (
    <Form onFinish={onFinish} labelCol={{ span: 8, style: { whiteSpace: 'normal' }  }} wrapperCol={{ span: 16 }}>
<Form.Item label="Student with visa" name="student_visa">
  <Checkbox></Checkbox>
</Form.Item>
      <Form.Item label="ID" name="id">
        <Input />
      </Form.Item>
      <Form.Item label="Mail tracking number" name="mail_number">
        <Input />
      </Form.Item>
      <Form.Item label="Passport: Number" name="passport_number">
        <Input />
      </Form.Item>


      <Form.Item label="Visa valid from" name="visa_from" >
      <DatePicker />
      </Form.Item>
      <Form.Item label="Visa valid until" name="visa_until" >
      <DatePicker />
      </Form.Item>
      <Form.Item label="Passport valid from" name="passport_from" >
      <DatePicker />
      </Form.Item>
      <Form.Item label="Passport valid until" name="passport_until" >
      <DatePicker />
      </Form.Item>

      <Form.Item label="Status" name="status">
        <Select placeholder="Select a Status">
          <Option value="no visa">No VIsa</Option>
          <Option value="visa">Visa</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Type of Visa" name="visa_type" >
        <Select placeholder="Select type of visa">
          <Option value="Family Visa">Family Visa</Option>
          <Option value="Short Term Student Visa">Short Term Student Visa</Option>
          <Option value="Standard Visitor Visa">Standard Visitor Visa</Option>
          <Option value="Tier 4">Tier 4</Option>
        </Select>
      </Form.Item>


      




      <Alert
          message="Note : In progress..."
          description=" "
          type="info"
          showIcon
        />
        <br/>







      <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={true}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Visa;
