import React, { useEffect, useState } from "react";
import { Form, Select, Input, DatePicker, TimePicker, Checkbox, Button,Divider,AutoComplete, Alert, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";
import moment from "moment";


const { Option } = Select;

const Visa = ({
  fetchData,
  setEditModalVisible,
  recordData,
  handleNewModalCancel,
  setNewModalVisible,
  selectedRecordId,
  candidateId,
  CancelBothModel,
  onFinish
  
}) => {
    const [options, setOptions] = useState([]);
const [form] = Form.useForm();


useEffect(() => {
    if (!recordData) return;

    form.setFieldsValue({
      student_visa: recordData.student_visa || false,
      id: recordData.id || '',
      mail_number: recordData.mail_number || '',
      passport_number: recordData.passport_number || '',
      visa_from: recordData.visa_from ? moment(recordData.visa_from) : null,
      visa_until: recordData.visa_until ? moment(recordData.visa_until) : null,
      passport_from: recordData.passport_from ? moment(recordData.passport_from) : null,
      passport_until: recordData.passport_until ? moment(recordData.passport_until) : null,
      visa_status: recordData.visa_status || '',
      visa_type: recordData.visa_type || '',
    });
  }, [recordData, form]);
  // const onFinish = (values) => {
  //   console.log('Form values:', values);
  // };
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
const handleFinish = (values) => {
    try {
      const payload = {
        ...values,
        student_visa: !!values.student_visa,
        visa_from: values.visa_from ? values.visa_from.toDate() : null,
        visa_until: values.visa_until ? values.visa_until.toDate() : null,
        passport_from: values.passport_from ? values.passport_from.toDate() : null,
        passport_until: values.passport_until ? values.passport_until.toDate() : null,
      };

      console.log("Form Payload:", payload);
      onFinish(payload);
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Error",
        description: err.message || "Failed to save visa details",
      });
    }
  };


 const resetAllFields = () => {
      form.resetFields();
   
  };
  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
    // console.log("its running");
  };

  return (
   <Form
  form={form}
  onFinish={handleFinish}
  labelCol={{ span: 8, style: { whiteSpace: 'normal' } }}
  wrapperCol={{ span: 16 }}
>
  <Form.Item label="Student with visa" name="student_visa" valuePropName="checked">
    <Checkbox />
  </Form.Item>

  <Form.Item label="ID" name="id" rules={[{ required: true, message: "Please enter ID!" }]}>
    <Input />
  </Form.Item>

  <Form.Item label="Mail tracking number" name="mail_number" rules={[{ required: true, message: "Please enter mail tracking number!" }]}>
    <Input />
  </Form.Item>

  <Form.Item label="Passport: Number" name="passport_number" rules={[{ required: true, message: "Please enter passport number!" }]}>
    <Input />
  </Form.Item>

  <Form.Item label="Visa valid from" name="visa_from" rules={[{ required: true, message: "Please select date of visa valid from!" }]}>
    <DatePicker format="DD/MM/YYYY" style={{ width: '30%' }} />
  </Form.Item>

  <Form.Item label="Visa valid until" name="visa_until" rules={[{ required: true, message: "Please select date of visa valid until!" }]}>
    <DatePicker format="DD/MM/YYYY" style={{ width: '30%' }} />
  </Form.Item>

  <Form.Item label="Passport valid from" name="passport_from" rules={[{ required: true, message: "Please select date of passport valid from!" }]}>
    <DatePicker format="DD/MM/YYYY" style={{ width: '30%' }} />
  </Form.Item>

  <Form.Item label="Passport valid until" name="passport_until" rules={[{ required: true, message: "Please select date of passport valid until!" }]}>
    <DatePicker format="DD/MM/YYYY" style={{ width: '30%' }} />
  </Form.Item>

  <Form.Item label="Status" name="visa_status" rules={[{ required: true, message: "Please select status!" }]}>
    <Select placeholder="Select a Status">
      <Option value="no visa">No Visa</Option>
      <Option value="visa">Visa</Option>
    </Select>
  </Form.Item>

  <Form.Item label="Type of Visa" name="visa_type" rules={[{ required: true, message: "Please select type of visa!" }]}>
    <Select placeholder="Select type of visa">
      <Option value="Family Visa">Family Visa</Option>
      <Option value="Short Term Student Visa">Short Term Student Visa</Option>
      <Option value="Standard Visitor Visa">Standard Visitor Visa</Option>
      <Option value="Tier 4">Tier 4</Option>
    </Select>
  </Form.Item>

  <SubmitCancelButtonGroup
    recordData={recordData}
    handleNewModalCancel={handleNewModalCancel}
    CancelBothModel={CancelBothModel1}
  />
</Form>

  );
};

export default Visa;
