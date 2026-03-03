import React from 'react';
import { Form, Select, Input, DatePicker, TimePicker, Checkbox, Button,Divider,Row,Col, Alert } from 'antd';
// import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';


const { Option } = Select;

const Transfer = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };


  return (
    <Form onFinish={onFinish} labelCol={{ span: 8, style: { whiteSpace: 'normal' }  }} wrapperCol={{ span: 16 }}>

      <Form.Item label="Transfer" name="Transfer" rules={[{  message: 'Please select Transfer!' }]}>
        <Select placeholder="Arrival and Departure">
          <Option value="Not Requested">Not Requested</Option>
          <Option value="Arrival">Arrival</Option>
          <Option value="Departure">Departure</Option>
          <Option value="Arrival And Departure">Arrival And Departure</Option>

        </Select>
      </Form.Item>

      <Form.Item label="Note" name="level" rules={[{  message: 'Please select a course level!' }]}>
      <Input />

      </Form.Item>



      <hr />
      <h5>Arrival</h5>

      <Form.Item label="Pick-up location" name="level" rules={[{ message: 'Please select a course level!' }]}>
        <Select placeholder="Select...">
        <Option value="School">School</Option>
        <Option value="Accommodation">Accommodation</Option>
        <Option value="Gatwick Airport">Gatwick Airport</Option>
        <Option value="London City Airport">London City Airport</Option>
        <Option value="Heathrow Airport">Heathrow Airport</Option>
        <Option value="Luton Airport">Luton Airport</Option>
        <Option value="Stansted Airport">Stansted Airport</Option>
        <Option value="Southend Airport">Southend Airport</Option>

        </Select>
      </Form.Item>
      
      <Form.Item label="Drop off location" name="level" >
        <Select placeholder="Select...">
        <Option value="School">School</Option>
        <Option value="Accommodation">Accommodation</Option>
        <Option value="Gatwick Airport">Gatwick Airport</Option>
        <Option value="London City Airport">London City Airport</Option>
        <Option value="Heathrow Airport">Heathrow Airport</Option>
        <Option value="Luton Airport">Luton Airport</Option>
        <Option value="Stansted Airport">Stansted Airport</Option>
        <Option value="Southend Airport">Southend Airport</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Airline" name="availability" >
      <Input  />
      </Form.Item>

      
      <Form.Item label="Flight number" name="availability" >
      <Input  />
      </Form.Item>

      <Form.Item label="Date" name="timeFrame" >
        <Row gutter={8}>
          <Col span={12}>
            <DatePicker />
          </Col>
          <Col span={8}>
            <Input placeholder="Arrival time" />
          </Col>
        </Row>
      </Form.Item>


    <Form.Item label="Pick up time (Provider)" name="pickup">
        <Input />
      </Form.Item>

      <Form.Item label="Note" name="note">
        <Input />
      </Form.Item>

      <h5>Departure</h5>

<Form.Item label="Pick-up location" name="level">
  <Select placeholder="Select...">
  <Option value="School">School</Option>
  <Option value="Accommodation">Accommodation</Option>
  <Option value="Gatwick Airport">Gatwick Airport</Option>
  <Option value="London City Airport">London City Airport</Option>
  <Option value="Heathrow Airport">Heathrow Airport</Option>
  <Option value="Luton Airport">Luton Airport</Option>
  <Option value="Stansted Airport">Stansted Airport</Option>
  <Option value="Southend Airport">Southend Airport</Option>

  </Select>
</Form.Item>

<Form.Item label="Drop off location" name="level" >
  <Select placeholder="Select...">
  <Option value="School">School</Option>
  <Option value="Accommodation">Accommodation</Option>
  <Option value="Gatwick Airport">Gatwick Airport</Option>
  <Option value="London City Airport">London City Airport</Option>
  <Option value="Heathrow Airport">Heathrow Airport</Option>
  <Option value="Luton Airport">Luton Airport</Option>
  <Option value="Stansted Airport">Stansted Airport</Option>
  <Option value="Southend Airport">Southend Airport</Option>
  </Select>
</Form.Item>

<Form.Item label="Airline" name="availability" >
<Input  />
</Form.Item>


<Form.Item label="Flight number" name="availability" >
<Input  />
</Form.Item>

<Form.Item label="Date" name="timeFrame" >
  <Row gutter={8}>
    <Col span={12}>
      <DatePicker />
    </Col>
    <Col span={8}>
      <Input placeholder="Dep.time" />
    </Col>
  </Row>
</Form.Item>


<Form.Item label="Pick up time (Provider)" name="note">
  <Input />
</Form.Item>

<Form.Item label="Note" name="additionalServices">
  <Input />
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

export default Transfer;
