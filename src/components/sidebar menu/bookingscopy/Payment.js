import React, { useEffect, useState } from "react";
import { Form, Select, Input, DatePicker, TimePicker, Checkbox, Button,Divider,AutoComplete, Alert, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";
import moment from "moment";


const { Option } = Select;

const Payment = ({
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
     
      id: recordData.id || '',
      payment_date: recordData.payment_date ? moment(recordData.payment_date) : null,
      payment_method: recordData.payment_method || "",
      payment_paid_by: recordData.payment_paid_by || '',
      payment_comment: recordData.payment_comment || '',
      payment_invoice_number: recordData.payment_invoice_number || '',
      payment_currency: recordData.payment_currency || '',
      payment_amount: recordData.payment_amount || '',
      payment_purpose: recordData.payment_purpose || '',
      payment_scheme: recordData.payment_scheme || '',   



    
      
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
      payment_date: values.payment_date ? values.payment_date.toDate() : null,
      payment_method: values.payment_method || "",
      payment_paid_by: values.payment_paid_by || '',
      payment_comment: values.payment_comment || '',
      payment_invoice_number: values.payment_invoice_number || '',
      payment_currency: values.payment_currency || '',
      payment_amount: values.payment_amount || '',
      payment_purpose: values.payment_purpose || '',
      payment_scheme: values.payment_scheme || '',

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
<Form.Item label="Payment Scheme" name="payment_scheme" rules={[{ required: true, message: "Please select payment scheme!" }]}>
              <Select placeholder="Select payment scheme" >
              <Option value="full prepaid">Full Prepaid</Option>
              <Option value="partial prepaid">Partial Prepaid</Option>
              <Option value="postpaid">Postpaid</Option>
              </Select>
            </Form.Item>

 <Form.Item label="Payment date" name="payment_date" rules={[{ required: true, message: "Please select payment date!" }]}>
    <DatePicker format="DD/MM/YYYY" style={{ width: '30%' }} />
  </Form.Item>

 <Form.Item label="Method" name="payment_method" rules={[{ required: true, message: "Please select payment method!" }]}>
    <Select placeholder="Select payment method">
      <Option value="cash">Cash</Option>
      <Option value="debit/credit cards">Debit/credit cards</Option>
      <Option value="bank transfer">Bank transfer</Option>
      <Option value="hubSpot">HubSpot</Option>
      <Option value="payPal">PayPal</Option>
      <Option value="wechat Pay">WeChat Pay</Option>
    </Select>
  </Form.Item>

<Form.Item label="Paid by" name="payment_paid_by" rules={[{ required: true, message: "Please select payment paid by!" }]}>
    <Select placeholder="Select paid by">
      <Option value="student">Student</Option>
      <Option value="agent">Agent</Option>
    </Select>
  </Form.Item>

<Form.Item label="Comment" name="payment_comment">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Invoice number" name="payment_invoice_number" rules={[{ required: true, message: "Please enter invoice number!" }]}>
    <Input />
  </Form.Item>

  {/* <Form.Item label="Currency" name="payment_currency" rules={[{ required: true, message: "Please select currency!" }]}>
    <Select placeholder="Select currency">
      <Option value="prior to arrival">Prior to arrival</Option>
      <Option value="refund">Refund</Option>
    </Select>
  </Form.Item> */}

    <Form.Item label="Currency" name="payment_currency" rules={[{ required: true, message: "Please enter currency!" }]}>
    <Input />
  </Form.Item>
  <Form.Item label="Amount" name="payment_amount" rules={[{ required: true, message: "Please enter amount!" }]}>
    <Input />
  </Form.Item>

  <Form.Item label="Payment purpose" name="payment_purpose" rules={[{ required: true, message: "Please enter payment purpose!" }]}>
    <Input />
  </Form.Item>



  <SubmitCancelButtonGroup
    recordData={recordData}
    handleNewModalCancel={handleNewModalCancel}
    CancelBothModel={CancelBothModel1}
  />
</Form>

  );
};

export default Payment;
