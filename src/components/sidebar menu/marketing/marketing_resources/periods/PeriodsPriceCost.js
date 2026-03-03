import React, { useEffect } from "react";
import { Form, Select, Checkbox, Button } from "antd";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const PeriodsPriceCost = ({
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
        copy_from: recordData.copy_from,
        prices: recordData.prices,
        costs: recordData.costs,
        commissions: recordData.commissions,
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
      <Form.Item label="Copy from" name="copy_from">
        <Select placeholder="Select Copy from">
          <Option value="2019">2019</Option>
          <Option value="2018">2018</Option>
          <Option value="20% Discount">20% Discount</Option>
          <Option value="25% Discount">25% Discount</Option>
          <Option value="30% Discount">30% Discount</Option>
          <Option value="2020 Prices">2020 Prices</Option>
          <Option value="30% Discount">30% Discount</Option>
          <Option value="2023 Full Prices">2023 Full Prices</Option>
          <Option value="10% Discount">10% Discount</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Prices" name="prices" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Costs" name="costs" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Commissions" name="commissions" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default PeriodsPriceCost;
