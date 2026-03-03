import React, { useState } from 'react';
import { Form, Input, Upload, Button, Checkbox, Space, Select, DatePicker, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';




const { Option } = Select;

const MyForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState({
    photo: [],
    passport: [],
    idCard: [],
    cv: [],
    visa: [],
    otherDocument: [],
    applicationForm: [],
  });

  const handleFileChange = (fileType) => ({ fileList: newFileList }) => {
    setFileList((prevFileList) => ({
      ...prevFileList,
      [fileType]: newFileList,
    }));
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} labelCol={{ span: 8}} wrapperCol={{ span: 16 }}>
      <Form.Item label="Photo" name="photo">
        <Upload
          beforeUpload={() => false}
          fileList={fileList.photo}
          onChange={handleFileChange('photo')}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />}>Upload </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Passport" name="passport">
        <Upload
          beforeUpload={() => false}
          fileList={fileList.passport}
          onChange={handleFileChange('passport')}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />}>Upload </Button>
        </Upload>
      </Form.Item>

      {/* Add similar Form.Items for other document types */}

      <Form.Item label="Identification Card" name="otherDocument">
        <Upload
          beforeUpload={() => false}
          fileList={fileList.otherDocument}
          onChange={handleFileChange('otherDocument')}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />}>Upload </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="CV" name="applicationForm">
        <Upload
          beforeUpload={() => false}
          fileList={fileList.applicationForm}
          onChange={handleFileChange('applicationForm')}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Visa" name="photo">
        <Upload
          beforeUpload={() => false}
          fileList={fileList.photo}
          onChange={handleFileChange('photo')}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />}>Upload </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Any other document" name="photo">
        <Upload
          beforeUpload={() => false}
          fileList={fileList.photo}
          onChange={handleFileChange('photo')}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />}>Upload </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Application form" name="photo">
        <Upload
          beforeUpload={() => false}
          fileList={fileList.photo}
          onChange={handleFileChange('photo')}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />}>Upload </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Certificate of registration" name="photo">
        <Upload
          beforeUpload={() => false}
          fileList={fileList.photo}
          onChange={handleFileChange('photo')}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />}>Upload </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Parental Consent" name="photo">
        <Upload
          beforeUpload={() => false}
          fileList={fileList.photo}
          onChange={handleFileChange('photo')}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />}>Upload </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Induction package received" name="automatedMailing">
  <Checkbox></Checkbox>
</Form.Item>



<hr />
<h5>Book 1</h5>

<Form.Item label="Book 1" name="book1" >
        <Select placeholder="Select...">
        <Option value="Cutting Edge A1">Cutting Edge A1</Option>
        <Option value="Cutting Edge A2">Cutting Edge A2</Option>
        <Option value="Cutting Edge B1">Cutting Edge B1</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>
        <Option value="Cutting Edge C1">Cutting Edge C1</Option>
  <Option value="Speak Out A1">Speak Out A1</Option>
  <Option value="Speak Out A2">Speak Out A2</Option>
  <Option value="Speak Out B1">Speak Out B1</Option>
  <Option value="Speak Out B2">Speak Out B2</Option>
  <Option value="Speak Out C1">Speak Out C1</Option>
  <Option value="Headway A1">Headway A1</Option>
  <Option value="Headway A2">Headway A2</Option>
  <Option value="Headway B1">Headway B1</Option>
  <Option value="Headway B2">Headway B2</Option>
  <Option value="Headway C1">Headway C1</Option>
  <Option value="Language Hub A1">Language Hub A1</Option>
  <Option value="Language Hub A2">Language Hub A2</Option>
  <Option value="Language Hub B1">Language Hub B1</Option>
  <Option value="Language Hub B2">Language Hub B2</Option>
  <Option value="Language Hub C1">Language Hub C1</Option>
  <Option value="IELTS Expert 7.5">IELTS Expert 7.5</Option>
  <Option value="Outcomes B2">Outcomes B2</Option>
  <Option value="Roadmap A2">Roadmap A2</Option>
  <Option value="Roadmap A2+">Roadmap A2+</Option>
  <Option value="Roadmap B1">Roadmap B1</Option>
  <Option value="Roadmap B1+">Roadmap B1+</Option>
  <Option value="Roadmap B2">Roadmap B2</Option>
  <Option value="Roadmap C1/C2">Roadmap C1/C2</Option>
  <Option value="Outcomes Elementary">Outcomes Elementary</Option>
  <Option value="Outcomes Pre-Intermediate">Outcomes Pre-Intermediate</Option>
  <Option value="Outcomes Intermediate">Outcomes Intermediate</Option>
  <Option value="Outcomes Upper-Intermediate">Outcomes Upper-Intermediate</Option>
  <Option value="Outcomes Advanced">Outcomes Advanced</Option>
  <Option value="English File Pre-Intermediate">English File Pre-Intermediate</Option>
  <Option value="English File Intermediate">English File Intermediate</Option>
  <Option value="English File Upper-Intermediate">English File Upper-Intermediate</Option>
  <Option value="English File Advanced ">English File Advanced</Option>
  
      </Select>
      </Form.Item>

      <Form.Item label="Book 1 Inventory" name="level" >
        <Select placeholder="Select a course level">
        <Option value="Purchased">Purchased</Option>
        <Option value="Rented">Rented</Option>
        <Option value="Returned">Returned</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>

        </Select>
      </Form.Item>
      
      <Form.Item label="Book 1 Purchase Date" name="note">
        <DatePicker />
      </Form.Item>

      <hr />
<h5>Book 2</h5>

<Form.Item label="Book 2" name="level" >
        <Select placeholder="Select a course level">
        <Option value="Cutting Edge A1">Cutting Edge A1</Option>
        <Option value="Cutting Edge A2">Cutting Edge A2</Option>
        <Option value="Cutting Edge B1">Cutting Edge B1</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>
        <Option value="Cutting Edge C1">Cutting Edge C1</Option>
  <Option value="Speak Out A1">Speak Out A1</Option>
  <Option value="Speak Out A2">Speak Out A2</Option>
  <Option value="Speak Out B1">Speak Out B1</Option>
  <Option value="Speak Out B2">Speak Out B2</Option>
  <Option value="Speak Out C1">Speak Out C1</Option>
  <Option value="Headway A1">Headway A1</Option>
  <Option value="Headway A2">Headway A2</Option>
  <Option value="Headway B1">Headway B1</Option>
  <Option value="Headway B2">Headway B2</Option>
  <Option value="Headway C1">Headway C1</Option>
  <Option value="Language Hub A1">Language Hub A1</Option>
  <Option value="Language Hub A2">Language Hub A2</Option>
  <Option value="Language Hub B1">Language Hub B1</Option>
  <Option value="Language Hub B2">Language Hub B2</Option>
  <Option value="Language Hub C1">Language Hub C1</Option>
  <Option value="IELTS Expert 7.5">IELTS Expert 7.5</Option>
  <Option value="Outcomes B2">Outcomes B2</Option>
  <Option value="Roadmap A2">Roadmap A2</Option>
  <Option value="Roadmap A2+">Roadmap A2+</Option>
  <Option value="Roadmap B1">Roadmap B1</Option>
  <Option value="Roadmap B1+">Roadmap B1+</Option>
  <Option value="Roadmap B2">Roadmap B2</Option>
  <Option value="Roadmap C1/C2">Roadmap C1/C2</Option>
  <Option value="Outcomes Elementary">Outcomes Elementary</Option>
  <Option value="Outcomes Pre-Intermediate">Outcomes Pre-Intermediate</Option>
  <Option value="Outcomes Intermediate">Outcomes Intermediate</Option>
  <Option value="Outcomes Upper-Intermediate">Outcomes Upper-Intermediate</Option>
  <Option value="Outcomes Advanced">Outcomes Advanced</Option>
  <Option value="English File Pre-Intermediate">English File Pre-Intermediate</Option>
  <Option value="English File Intermediate">English File Intermediate</Option>
  <Option value="English File Upper-Intermediate">English File Upper-Intermediate</Option>
  <Option value="English File Advanced ">English File Advanced</Option>
          </Select>
      </Form.Item>

      <Form.Item label="Book 2 Inventory" name="level" >
        <Select placeholder="Select a course level">
        <Option value="Purchased">Purchased</Option>
        <Option value="Rented">Rented</Option>
        <Option value="Returned">Returned</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>        </Select>
      </Form.Item>

      <Form.Item label="Book 2 Purchase Date" name="note">
        <DatePicker />
      </Form.Item>

      <hr />
<h5>Book 3</h5>

<Form.Item label="Book 3" name="level" >
        <Select placeholder="Select a course level">
        <Option value="Cutting Edge A1">Cutting Edge A1</Option>
        <Option value="Cutting Edge A2">Cutting Edge A2</Option>
        <Option value="Cutting Edge B1">Cutting Edge B1</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>
        <Option value="Cutting Edge C1">Cutting Edge C1</Option>
  <Option value="Speak Out A1">Speak Out A1</Option>
  <Option value="Speak Out A2">Speak Out A2</Option>
  <Option value="Speak Out B1">Speak Out B1</Option>
  <Option value="Speak Out B2">Speak Out B2</Option>
  <Option value="Speak Out C1">Speak Out C1</Option>
  <Option value="Headway A1">Headway A1</Option>
  <Option value="Headway A2">Headway A2</Option>
  <Option value="Headway B1">Headway B1</Option>
  <Option value="Headway B2">Headway B2</Option>
  <Option value="Headway C1">Headway C1</Option>
  <Option value="Language Hub A1">Language Hub A1</Option>
  <Option value="Language Hub A2">Language Hub A2</Option>
  <Option value="Language Hub B1">Language Hub B1</Option>
  <Option value="Language Hub B2">Language Hub B2</Option>
  <Option value="Language Hub C1">Language Hub C1</Option>
  <Option value="IELTS Expert 7.5">IELTS Expert 7.5</Option>
  <Option value="Outcomes B2">Outcomes B2</Option>
  <Option value="Roadmap A2">Roadmap A2</Option>
  <Option value="Roadmap A2+">Roadmap A2+</Option>
  <Option value="Roadmap B1">Roadmap B1</Option>
  <Option value="Roadmap B1+">Roadmap B1+</Option>
  <Option value="Roadmap B2">Roadmap B2</Option>
  <Option value="Roadmap C1/C2">Roadmap C1/C2</Option>
  <Option value="Outcomes Elementary">Outcomes Elementary</Option>
  <Option value="Outcomes Pre-Intermediate">Outcomes Pre-Intermediate</Option>
  <Option value="Outcomes Intermediate">Outcomes Intermediate</Option>
  <Option value="Outcomes Upper-Intermediate">Outcomes Upper-Intermediate</Option>
  <Option value="Outcomes Advanced">Outcomes Advanced</Option>
  <Option value="English File Pre-Intermediate">English File Pre-Intermediate</Option>
  <Option value="English File Intermediate">English File Intermediate</Option>
  <Option value="English File Upper-Intermediate">English File Upper-Intermediate</Option>
  <Option value="English File Advanced ">English File Advanced</Option>
          </Select>
      </Form.Item>

      <Form.Item label="Book 3 Inventory" name="level" >
        <Select placeholder="Select a course level">
        <Option value="Purchased">Purchased</Option>
        <Option value="Rented">Rented</Option>
        <Option value="Returned">Returned</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>        </Select>
      </Form.Item>

      <Form.Item label="Book 3 Purchase Date" name="note">
        <DatePicker />
      </Form.Item>


      <hr />
<h5>Book 4</h5>

<Form.Item label="Book 4" name="level" >
        <Select placeholder="Select a course level">
        <Option value="Cutting Edge A1">Cutting Edge A1</Option>
        <Option value="Cutting Edge A2">Cutting Edge A2</Option>
        <Option value="Cutting Edge B1">Cutting Edge B1</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>
        <Option value="Cutting Edge C1">Cutting Edge C1</Option>
  <Option value="Speak Out A1">Speak Out A1</Option>
  <Option value="Speak Out A2">Speak Out A2</Option>
  <Option value="Speak Out B1">Speak Out B1</Option>
  <Option value="Speak Out B2">Speak Out B2</Option>
  <Option value="Speak Out C1">Speak Out C1</Option>
  <Option value="Headway A1">Headway A1</Option>
  <Option value="Headway A2">Headway A2</Option>
  <Option value="Headway B1">Headway B1</Option>
  <Option value="Headway B2">Headway B2</Option>
  <Option value="Headway C1">Headway C1</Option>
  <Option value="Language Hub A1">Language Hub A1</Option>
  <Option value="Language Hub A2">Language Hub A2</Option>
  <Option value="Language Hub B1">Language Hub B1</Option>
  <Option value="Language Hub B2">Language Hub B2</Option>
  <Option value="Language Hub C1">Language Hub C1</Option>
  <Option value="IELTS Expert 7.5">IELTS Expert 7.5</Option>
  <Option value="Outcomes B2">Outcomes B2</Option>
  <Option value="Roadmap A2">Roadmap A2</Option>
  <Option value="Roadmap A2+">Roadmap A2+</Option>
  <Option value="Roadmap B1">Roadmap B1</Option>
  <Option value="Roadmap B1+">Roadmap B1+</Option>
  <Option value="Roadmap B2">Roadmap B2</Option>
  <Option value="Roadmap C1/C2">Roadmap C1/C2</Option>
  <Option value="Outcomes Elementary">Outcomes Elementary</Option>
  <Option value="Outcomes Pre-Intermediate">Outcomes Pre-Intermediate</Option>
  <Option value="Outcomes Intermediate">Outcomes Intermediate</Option>
  <Option value="Outcomes Upper-Intermediate">Outcomes Upper-Intermediate</Option>
  <Option value="Outcomes Advanced">Outcomes Advanced</Option>
  <Option value="English File Pre-Intermediate">English File Pre-Intermediate</Option>
  <Option value="English File Intermediate">English File Intermediate</Option>
  <Option value="English File Upper-Intermediate">English File Upper-Intermediate</Option>
  <Option value="English File Advanced ">English File Advanced</Option>
          </Select>
      </Form.Item>

      <Form.Item label="Book 4 Inventory" name="level" >
        <Select placeholder="Select a course level">
        <Option value="Purchased">Purchased</Option>
        <Option value="Rented">Rented</Option>
        <Option value="Returned">Returned</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>        </Select>
      </Form.Item>

      <Form.Item label="Book 4 Purchase Date" name="note">
        <DatePicker />
      </Form.Item>


      <hr />
<h5>Book 5</h5>

<Form.Item label="Book 5" name="level" >
        <Select placeholder="Select a course level">
        <Option value="Cutting Edge A1">Cutting Edge A1</Option>
        <Option value="Cutting Edge A2">Cutting Edge A2</Option>
        <Option value="Cutting Edge B1">Cutting Edge B1</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>
        <Option value="Cutting Edge C1">Cutting Edge C1</Option>
  <Option value="Speak Out A1">Speak Out A1</Option>
  <Option value="Speak Out A2">Speak Out A2</Option>
  <Option value="Speak Out B1">Speak Out B1</Option>
  <Option value="Speak Out B2">Speak Out B2</Option>
  <Option value="Speak Out C1">Speak Out C1</Option>
  <Option value="Headway A1">Headway A1</Option>
  <Option value="Headway A2">Headway A2</Option>
  <Option value="Headway B1">Headway B1</Option>
  <Option value="Headway B2">Headway B2</Option>
  <Option value="Headway C1">Headway C1</Option>
  <Option value="Language Hub A1">Language Hub A1</Option>
  <Option value="Language Hub A2">Language Hub A2</Option>
  <Option value="Language Hub B1">Language Hub B1</Option>
  <Option value="Language Hub B2">Language Hub B2</Option>
  <Option value="Language Hub C1">Language Hub C1</Option>
  <Option value="IELTS Expert 7.5">IELTS Expert 7.5</Option>
  <Option value="Outcomes B2">Outcomes B2</Option>
  <Option value="Roadmap A2">Roadmap A2</Option>
  <Option value="Roadmap A2+">Roadmap A2+</Option>
  <Option value="Roadmap B1">Roadmap B1</Option>
  <Option value="Roadmap B1+">Roadmap B1+</Option>
  <Option value="Roadmap B2">Roadmap B2</Option>
  <Option value="Roadmap C1/C2">Roadmap C1/C2</Option>
  <Option value="Outcomes Elementary">Outcomes Elementary</Option>
  <Option value="Outcomes Pre-Intermediate">Outcomes Pre-Intermediate</Option>
  <Option value="Outcomes Intermediate">Outcomes Intermediate</Option>
  <Option value="Outcomes Upper-Intermediate">Outcomes Upper-Intermediate</Option>
  <Option value="Outcomes Advanced">Outcomes Advanced</Option>
  <Option value="English File Pre-Intermediate">English File Pre-Intermediate</Option>
  <Option value="English File Intermediate">English File Intermediate</Option>
  <Option value="English File Upper-Intermediate">English File Upper-Intermediate</Option>
  <Option value="English File Advanced ">English File Advanced</Option>
          </Select>
      </Form.Item>

      <Form.Item label="Book 5 Inventory" name="level" >
        <Select placeholder="Select a course level">
        <Option value="Purchased">Purchased</Option>
        <Option value="Rented">Rented</Option>
        <Option value="Returned">Returned</Option>
        <Option value="Cutting Edge B2">Cutting Edge B2</Option>        </Select>
      </Form.Item>

      <Form.Item label="Book 5 Purchase Date" name="note">
        <DatePicker />
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

export default MyForm;
