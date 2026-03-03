import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { SubmitCancelButtonGroup } from "../../../sidebar menu/commonComponents/ButtonsDropdown";

const BankFormData = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  useEffect(() => {
    // Set initial form values when recordData changes
    if (recordData) {
      form.setFieldsValue({
        account_holder: recordData.account_holder,
        account_number: recordData.account_number,
        bank_code: recordData.bank_code,
        name_of_bank: recordData.name_of_bank,
        bank_address: recordData.bank_address,
        iban: recordData.iban,
        swift_bic: recordData.swift_bic,
        beneficiary_address: recordData.beneficiary_address,
      });
      console.log("in enquiry", recordData);
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
      <h5>Bank details</h5>

      <br />
      <Form.Item label="Account holder" name="account_holder">
        <Input placeholder="Enter Account holder" />
      </Form.Item>

      <Form.Item label="Name of bank" name="name_of_bank">
        <Input placeholder="Enter Name of bank" />
      </Form.Item>

      <Form.Item label="Bank code" name="bank_code">
        <Input placeholder="Enter Bank code" />
      </Form.Item>

      <Form.Item label="Account number" name="account_number">
        <Input placeholder="Enter Account number" />
      </Form.Item>

      <Form.Item label="SWIFT/BIC" name="swift_bic">
        <Input placeholder="Enter SWIFT/BIC" />
      </Form.Item>

      <Form.Item label="IBAN" name="iban">
        <Input placeholder="Enter IBAN" />
      </Form.Item>

      <Form.Item label="Beneficiary Address" name="beneficiary_address">
        <Input placeholder="Enter Beneficiary Address" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default BankFormData;
