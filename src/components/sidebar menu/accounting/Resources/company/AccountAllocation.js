import React, { useEffect } from "react";
import { Form, Select, Checkbox, Button } from "antd";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const AccountAllocation = ({
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
        switch_all_signs: recordData.switch_all_signs,
        credit_invoices_reduction_income:
          recordData.credit_invoices_reduction_income,
        allocation_courses: recordData.allocation_courses,
        additional_course_fees: recordData.additional_course_fees,
        additional_allocation_fees: recordData.additional_allocation_fees,
        allocation_general_fees: recordData.allocation_general_fees,
        allocation_insurance: recordData.allocation_insurance,
        allocation_cancellation_fees: recordData.allocation_cancellation_fees,
        allocation_cancellation_fees2: recordData.allocation_cancellation_fees,
        allocation_per_currency: recordData.allocation_per_currency,
        accounting_activities: recordData.accounting_activities,
        allocation_accommodation: recordData.allocation_accommodation,
        allocation_per_currency2: recordData.allocation_per_currency2,
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
      <hr />
      <h5>Settings</h5>
      <Form.Item label="Switch all signs" name="switch_all_signs">
        <Select placeholder="Select a Switch all signs">
          <Option value="All Positions Except Agency Commission Invoices">
            All Positions Except Agency Commission Invoices
          </Option>
          <Option value="All Positions Except Agency Commission Invoices And Receivables Items">
            All Positions Except Agency Commission Invoices And Receivables
            Items
          </Option>
          <Option value="All Positions">All Positions</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Credit invoices as reduction of income?"
        name="credit_invoices_reduction_income"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Incomes</h5>
      <Form.Item
        label="Allocation of courses"
        name="allocation_courses"
        rules={[
          { required: true, message: "Please select Allocation of courses !" },
        ]}
      >
        <Select placeholder="Select a Allocation of courses">
          <Option value="Different Accounts Per Course">
            Different Accounts Per Course
          </Option>
          <Option value="Different Accounts Per Category">
            Different Accounts Per Category
          </Option>
          <Option value="One Account For All Courses">
            One Account For All Courses
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Allocation of additional course fees"
        name="additional_course_fees"
        rules={[
          {
            required: true,
            message: "Please select Allocation of additional course fees !",
          },
        ]}
      >
        <Select placeholder="Select a Allocation of additional course fees">
          <Option value=" Different Accounts Per Fee">
            {" "}
            Different Accounts Per Fee
          </Option>
          <Option value="Different Accounts Per Course">
            Different Accounts Per Course
          </Option>
          <Option value="One Account For All Fees">
            One Account For All Fees
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Allocation of accommodation"
        name="allocation_accommodation"
        rules={[
          {
            required: true,
            message: "Please select Allocation of accommodation !",
          },
        ]}
      >
        <Select placeholder="Select a Allocation of accommodation">
          <Option value="Different Accounts Per Category">
            Different Accounts Per Category
          </Option>
          <Option value="One Account For All Accommodation">
            One Account For All Accommodation
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Allocation of additional allocation fees"
        name="additional_allocation_fees"
        rules={[
          {
            required: true,
            message: "Please select Allocation of additional allocation fees !",
          },
        ]}
      >
        <Select placeholder="Select a Allocation of additional allocation fees">
          <Option value=" Different Accounts Per Fee">
            {" "}
            Different Accounts Per Fee
          </Option>
          <Option value="Different Accounts Per Course">
            Different Accounts Per Course
          </Option>
          <Option value="One Account For All Fees">
            One Account For All Fees
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Allocation of general fees"
        name="allocation_general_fees"
        rules={[
          {
            required: true,
            message: "Please select Allocation of general fees !",
          },
        ]}
      >
        <Select placeholder="Select a Allocation of general fees">
          <Option value="Different Accounts Per Fee">
            Different Accounts Per Fee
          </Option>
          <Option value="One Account For All Fees">
            One Account For All Fees
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Allocation of insurance"
        name="allocation_insurance"
        rules={[
          {
            required: true,
            message: "Please select Allocation of insurance !",
          },
        ]}
      >
        <Select placeholder="Select a Allocation of insurance">
          <Option value="Different Accounts Per Fee">
            Different Accounts Per Fee
          </Option>
          <Option value="One Account For All Fees">
            One Account For All Fees
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Allocation of cancellation fees"
        name="allocation_cancellation_fees"
        rules={[
          {
            required: true,
            message: "Please select Allocation of cancellation fees !",
          },
        ]}
      >
        <Select placeholder="Select a Allocation of cancellation fees">
          <Option value="Different Accounts Per Fee">
            Different Accounts Per Fee
          </Option>
          <Option value="One Account For All Fees">
            One Account For All Fees
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Allocation per Currency"
        name="allocation_per_currency"
        rules={[
          {
            required: true,
            message: "Please select Allocation per Currency !",
          },
        ]}
      >
        <Select placeholder="Select a Allocation per Currency">
          <Option value="Different Accounts Per Fee">
            Different Accounts Per Fee
          </Option>
          <Option value="One Account For All Fees">
            One Account For All Fees
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Accounting for activities"
        name="accounting_activities"
        rules={[
          {
            required: true,
            message: "Please select Accounting for activities !",
          },
        ]}
      >
        <Select placeholder="Select a Accounting for activities">
          <Option value="Different Accounts Per Fee">
            Different Accounts Per Fee
          </Option>
          <Option value="One Account For All Fees">
            One Account For All Fees
          </Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>General expenses</h5>
      <Form.Item
        label="Allocation of cancellation fees"
        name="allocation_cancellation_fees2"
        rules={[
          {
            required: true,
            message: "Please select Allocation of cancellation fees !",
          },
        ]}
      >
        <Select placeholder="Select a Allocation of cancellation fees">
          <Option value="Different Accounts Per Fee">
            Different Accounts Per Fee
          </Option>
          <Option value="One Account For All Fees">
            One Account For All Fees
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Allocation per currency"
        name="allocation_per_currency2"
      >
        <Select placeholder="Select a Allocation per currency">
          <Option value="Weekly">Weekly</Option>
          <Option value="Per Block">Per Block</Option>
        </Select>
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default AccountAllocation;
