import React, { useState, useEffect } from "react";
import { Form, Select, Input, Button, Tooltip } from "antd";
import moment from "moment";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../sidebar menu/commonComponents/ButtonsDropdown";

const { Option } = Select;

const AgentInfo = ({
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
        foundation_year: recordData.foundation_year,
        start_cooperation: recordData.start_cooperation,

        no_of_employee: recordData.no_of_employee,
        partner_school_location: recordData.partner_school_location,
        // dob: recordData.dob ? moment(recordData.dob) : null,

        customer_per_year: recordData.customer_per_year,
        currency: recordData.currency,
        payment_method: recordData.payment_method,
        comment_for_student: recordData.comment_for_student,
        tax_number: recordData.tax_number,
        invoice: recordData.invoice,
        loa: recordData.loa,
        notes2: recordData.notes2,

        // foundation_year  start_cooperation no_of_employee partner_school_location customer_per_year

        // currency payment_method comment_for_student tax_number invoice loa notes2
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
      <br />

      <Form.Item label="Year of foundation" name="foundation_year">
        <Input placeholder="Enter Year of foundation" />
      </Form.Item>
      <Form.Item label="Start of co-operation" name="start_cooperation">
        <Input placeholder="Enter Start of co-operation" />
      </Form.Item>
      <Form.Item label="Number of employees" name="no_of_employee">
        <Input placeholder="Enter Number of employees" />
      </Form.Item>
      <Form.Item
        label="Partnerschools in same location"
        name="partner_school_location"
      >
        <Input placeholder="Enter Partnerschools in same location" />
      </Form.Item>
      <Form.Item label="Customers per year (Total)" name="customer_per_year">
        <Input placeholder="Enter Customers per year (Total)" />
      </Form.Item>

      <hr />
      <h5>Accounting</h5>

      <Form.Item
        label="Currency"
        name="currency"
        rules={[{ required: true, message: "Please select a Currency!" }]}
      >
        <Select placeholder="Select a Currency">
          <Option value="GBP (£)">GBP (£)</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Payment method" name="payment_method">
        <Select placeholder="Select a Payment method">
          <Option value="Net Prior To Arrival">Net Prior To Arrival</Option>
          <Option value="Gross Prior To Arrival">Gross Prior To Arrival</Option>
          <Option value="Net At School">Net At School</Option>
          <Option value="Gross At School">Gross At School</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Comment for student record&nbsp;
            <Tooltip title="Comment for student record">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="comment_for_student"
      >
        <Input />
      </Form.Item>

      <Form.Item label="Tax number" name="tax_number">
        <Input placeholder="Enter Tax number" />
      </Form.Item>

      <hr />
      <h5>Required documents from agent per student</h5>

      <Form.Item label="Invoice" name="invoice">
        <Select placeholder="Select a Invoice">
          <Option value="Gross">Gross</Option>
          <Option value="Net">Net</Option>
        </Select>
      </Form.Item>

      <Form.Item label="LoA" name="loa">
        <Select placeholder="Select a LoA">
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Note" name="notes2">
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

export default AgentInfo;
