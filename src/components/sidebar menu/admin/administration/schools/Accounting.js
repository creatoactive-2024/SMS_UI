import React, { useEffect } from "react";
import { Form, Select, Input, Space, Alert, List } from "antd";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const Accounting = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        currency: recordData.currency,
        standard_currency: recordData.standard_currency,

        teacher_payment: recordData.teacher_payment,
        accommodation_payment: recordData.accommodation_payment,

        transfer_payment: recordData.transfer_payment,
        teacher_payment_per: recordData.teacher_payment_per,
        cost_center: recordData.cost_center,
        file_format: recordData.file_format,
        intended_use: recordData.intended_use,
        export_per: recordData.export_per,
      });

      console.log("in all data", recordData);
    }
  }, [recordData, form]);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("AllData form values:", values);

    // Trigger the callback to inform the parent component about the form submission
    onFinish(values);
  };

  const data1 = [
    "First name: {firstname}",
    "Surname: {surname}",
    "Start date: {start}",
    "End date: {end}",
    "Starting week: {start_week}",
    "Ending week: {end_week}",
    "Provider name: {provider_name}",
  ];

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Currencies"
        name="currency"
        rules={[
          { type: Array, required: true, message: "Please select Currencies!" },
        ]}
      >
        <Select mode="multiple" placeholder="SELECT..." onChange={handleChange}>
          <Option value="EUR (€)">EUR (€)</Option>
          <Option value="USD ($)">USD ($)</Option>
          <Option value="JPY (¥)">JPY (¥)</Option>
          <Option value="BGN (лв)">BGN (лв)</Option>
          <Option value="CZK (Kč)">CZK (Kč)</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Stamdard currency" name="standard_currency">
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="EUR (€)">EUR (€)</Option>
          <Option value="USD ($)">USD ($)</Option>
          <Option value="JPY (¥)">JPY (¥)</Option>
          <Option value="BGN (лв)">BGN (лв)</Option>
          <Option value="CZK (Kč)">CZK (Kč)</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Teacher payments" name="teacher_payment">
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="EUR (€)">EUR (€)</Option>
          <Option value="USD ($)">USD ($)</Option>
          <Option value="JPY (¥)">JPY (¥)</Option>
          <Option value="BGN (лв)">BGN (лв)</Option>
          <Option value="CZK (Kč)">CZK (Kč)</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Accommodation payments" name="accommodation_payment">
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="EUR (€)">EUR (€)</Option>
          <Option value="USD ($)">USD ($)</Option>
          <Option value="JPY (¥)">JPY (¥)</Option>
          <Option value="BGN (лв)">BGN (лв)</Option>
          <Option value="CZK (Kč)">CZK (Kč)</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Transfer payments" name="transfer_payment">
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="EUR (€)">EUR (€)</Option>
          <Option value="USD ($)">USD ($)</Option>
          <Option value="JPY (¥)">JPY (¥)</Option>
          <Option value="BGN (лв)">BGN (лв)</Option>
          <Option value="CZK (Kč)">CZK (Kč)</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Teacher payment per" name="teacher_payment_per">
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="Lesson">Lesson</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Cost center" name="cost_center">
        <Input />
      </Form.Item>
      <hr />
      <h5>Accommodation payments:Export</h5>
      <Form.Item label="File format" name="file_format">
        <Input placeholder="Enter File format" />
      </Form.Item>
      <Form.Item label="Export per" name="export_per">
        <Input placeholder="Enter Export per" />
      </Form.Item>

      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Alert
          message="Available placeholder for customising document name:"
          description={
            <List
              size="small"
              dataSource={data1}
              renderItem={(item) => (
                <List.Item>
                  <span
                    style={{
                      display: "inline-block",
                      marginRight: "5px",
                    }}
                  >
                    •
                  </span>
                  {item}
                </List.Item>
              )}
            />
          }
          type="info"
          showIcon
        />
      </Space>
      <br />
      <br />

      <Form.Item label="Intended use" name="intended_use">
        <TextArea />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default Accounting;
