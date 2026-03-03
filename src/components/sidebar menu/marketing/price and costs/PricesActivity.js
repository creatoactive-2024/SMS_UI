import React from 'react';
import { Button, Form, Input, Select, Space, Breadcrumb } from 'antd';
import { Link } from "react-router-dom";


const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const PricesActivity = () => {
  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        break;
      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        break;
      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
        break;
      default:
    }
  };
  const onFinish = (values) => {
    console.log(values);
  };
 
 
  return (
    <>  <Breadcrumb>
    <Breadcrumb.Item>
      <Link to="">Marketing</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Prices & Costs</Breadcrumb.Item>
    <Breadcrumb.Item>Price-Activities</Breadcrumb.Item>
  </Breadcrumb>
  <hr/>
  <br/>
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="season"
        label="Season"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="--Select season--"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="option1">option1</Option>
          <Option value="option2">option2</Option>
          <Option value="option3">option3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="currency"
        label="Currency"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="--Select currency--"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="option1">option1</Option>
          <Option value="option2">option2</Option>
          <Option value="option3">option3</Option>
        </Select>
      </Form.Item>
     
      <Form.Item {...tailLayout}>
        <Space>
          {/* <Button type="primary" htmlType="submit">
            Submit
          </Button>
          */}
        </Space>
      </Form.Item>
    </Form></>
  );
};
export default PricesActivity; ;
 
