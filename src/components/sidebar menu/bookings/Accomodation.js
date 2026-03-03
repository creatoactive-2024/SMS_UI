import React from 'react';
import { Form, Select, Input, DatePicker, TimePicker, Checkbox, Button,Divider,Row,Col, Alert, List } from 'antd';
// import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';


const { Option } = Select;

const Accomodation = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  return (
    <Form onFinish={onFinish} labelCol={{ span: 8, style: { whiteSpace: 'normal' }  }} wrapperCol={{ span: 16 }}>

      <Form.Item label="Accommodation" name="category">
        <Select placeholder="Select a category">
          <Option value="Executive Zone 1/2">Executive Zone 1/2</Option>
          <Option value="Superior Zone 2/3">Superior Zone 2/3</Option>
          <Option value="Standard Zone 3/4">Standard Zone 3/4</Option>
          <Option value="Under 18 Zones 2&3">Under 18 Zones 2&3</Option>
          <Option value="Under 18 Zones 3&4">Under 18 Zones 3&4</Option>
          <Option value="Axo Islington**">Axo Islington**</Option>
          <Option value="Drapery/Liberty Plaza">Drapery/Liberty Plaza</Option>
          <Option value="Don Gratton House">Don Gratton House</Option>
          <Option value="Lightfoot Hall (Twin En-Suite) / Per Person">Lightfoot Hall (Twin En-Suite) / Per Person</Option>
          <Option value="King's Cross Residence">King's Cross Residence</Option>
          <Option value="White City Residence">White City Residence</Option>
          <Option value="Old Street Residence">Old Street Residence</Option>
          <Option value="House & Flat Share - Zone 2">House & Flat Share - Zone 2</Option>
         
        </Select>
      </Form.Item>
      
      <Form.Item label="Room" name="level" >
        <Select placeholder="Select a course level">
          {/* Add course level options */}
        </Select>
      </Form.Item>

      <Form.Item label="Board" name="level" >
        <Select placeholder="Select a course level">
          {/* Add course level options */}
        </Select>
      </Form.Item>

      <Form.Item label="Number of weeks" name="availability" >
      <Input type="number" />
      </Form.Item>

      
      <Form.Item label="From" name="timeFrame" >
        <Row gutter={8}>
          <Col span={12}>
            <DatePicker />
          </Col>
          <Col span={8}>
            <Input placeholder="Check In" />
          </Col>
        </Row>
      </Form.Item>
      
      <Form.Item label="End" name="timeFrame" >
        <Row gutter={8}>
          <Col span={12}>
            <DatePicker />
          </Col>
          <Col span={8}>
            <Input placeholder="Check Out" />
          </Col>
        </Row>
      </Form.Item>

    

      <Form.Item label="Note" name="note">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Additional services" name="additionalServices">
        <Input />
      </Form.Item>

<hr />


<Form.Item label="Involvement in homestay activities?" name="involvement" >
        <Select placeholder="Select a course level">
        <Option value="yes">Yes</Option>
        <Option value="no">No</Option>

        </Select>
      </Form.Item>
       <Form.Item label="Preferred accommodation start weekday" name="preferred_accommodation" >
        <Select placeholder="Select a course level">
        <Option value="Saturday">Saturday</Option>
        <Option value="Sunday">Sunday</Option>
      
        </Select>
      </Form.Item>


<hr />
<h5>UK Address</h5>

<Form.Item label="Address" name="additionalServices">
        <Input />
      </Form.Item>
      <Form.Item label="Postcode" name="additionalServices">
        <Input />
      </Form.Item>
      <Form.Item label="City" name="additionalServices">
        <Input />
      </Form.Item>


<Form.Item label="Online form - Do you need accommodation" name="level" >
        <Select placeholder="Select...">
        <Option value="yes">Yes</Option>
        <Option value="no">No</Option>   
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

export default Accomodation;
