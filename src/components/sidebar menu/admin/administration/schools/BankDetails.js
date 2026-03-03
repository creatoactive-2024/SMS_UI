import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";

import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const BankDetails = ({
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
        account_holder: recordData.account_holder,
        account_number: recordData.account_number,

        bank_code: recordData.bank_code,
        name_of_bank: recordData.name_of_bank,

        address_of_bank: recordData.address_of_bank,
        iban: recordData.iban,
        bic_swift: recordData.bic_swift,
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

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Account holder" name="account_holder">
        <Input />
      </Form.Item>

      <Form.Item label="Account number" name="account_number">
        <Input />
      </Form.Item>

      <Form.Item label="Bank code" name="bank_code">
        <Input />
      </Form.Item>

      <Form.Item label="Name of bank" name="name_of_bank">
        <Input />
      </Form.Item>

      <Form.Item label="Address of bank" name="address_of_bank">
        <Input />
      </Form.Item>

      <Form.Item label="IBAN" name="iban">
        <Input />
      </Form.Item>

      <Form.Item label="BIC/SWIFT" name="bic_swift">
        <Input />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default BankDetails;
