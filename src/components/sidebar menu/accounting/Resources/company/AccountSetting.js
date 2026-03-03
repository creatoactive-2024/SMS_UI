import React, { useEffect } from "react";
import { Form, Select, Input, Checkbox, Button, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const AccountSetting = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  // const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        name: recordData.name,
        currency: recordData.currency,
        accounting: recordData.accounting,
        schools: recordData.schools,
        accounting_interface: recordData.accounting_interface,
        automatic_release: recordData.automatic_release,
        execute_further_processing: recordData.execute_further_processing,
        cost_center: recordData.cost_center,
        invoice_text_adjustable: recordData.invoice_text_adjustable,
        recording_net_invoices: recordData.recording_net_invoices,
        separate_booking_record: recordData.separate_booking_record,
        automatic_accounts: recordData.automatic_accounts,
        start_financial_year: recordData.start_financial_year,
        split_financial_years: recordData.split_financial_years,
        services: recordData.services,
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
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter Name!" }]}
      >
        <Input />
      </Form.Item>
      <hr />

      <Form.Item
        label="Schools"
        name="schools"
        rules={[
          {
            required: true,
            message: "Please select Schools",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="speakuplondon">speakuplondon</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Services (Courses, Accommodation, ...)&nbsp;
            <Tooltip title="Services (Courses, Accommodation, ...)">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="services"
      >
        <Input placeholder="Enter Services (Courses, Accommodation, ...) " />
      </Form.Item>
      <hr />

      <Form.List name="formGroups">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div
                key={key}
                style={{
                  marginBottom: 16,
                  alignItems: "center",
                }}
              >
                <Form.Item
                  {...restField}
                  label="Schools"
                  name={[name, "schools"]}
                  fieldKey={[fieldKey, "schools"]}
                  // rules={[
                  //   {
                  //     message: "Please select Schools",
                  //     type: "array",
                  //   },
                  // ]}
                >
                  <Select mode="multiple" placeholder="Please select">
                    <Option value="speakuplondon">speakuplondon</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  label={
                    <span>
                      Services (Courses, Accommodation, ...)&nbsp;
                      <Tooltip title="Services (Courses, Accommodation, ...)">
                        <AiOutlineQuestionCircle />
                      </Tooltip>
                    </span>
                  }
                  name={[name, "services"]}
                  fieldKey={[fieldKey, "services"]}
                >
                  <Input placeholder="Enter Services (Courses, Accommodation, ...) " />
                </Form.Item>
                <Button
                  type="link"
                  style={{
                    backgroundColor: "#ff4d4f",
                    color: "#fff",
                    marginRight: 8,
                    marginTop: 13,
                  }}
                  onClick={() => remove(name)}
                >
                  <DeleteOutlined /> Delete
                </Button>
                <Divider />
              </div>
            ))}

            {/* <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add entry
              </Button>
            </Form.Item> */}
          </>
        )}
      </Form.List>
      {/* <hr /> */}

      <Form.Item
        label="Currency"
        name="currency"
        rules={[{ required: true, message: "Please select Currency !" }]}
      >
        <Select placeholder="Select a Currency">
          <Option value="GBP (£)">GBP (£)</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Accounting"
        name="accounting"
        rules={[{ required: true, message: "Please select Accounting!" }]}
      >
        <Select placeholder="Select Accounting">
          <Option value="Single-Entry">Single-Entry</Option>
          <Option value="Double-Entry">Double-Entry</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Accounting interface"
        name="accounting_interface"
        rules={[
          { required: true, message: "Please select Accounting interface!" },
        ]}
      >
        <Select placeholder="Select Accounting interface">
          <Option value="Datev">Datev</Option>
          <Option value="General">General</Option>
          <Option value="Quickbooks">Quickbooks</Option>
          <Option value="Sage">Sage</Option>
          <Option value="Xero">Xero</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Automatic processing</h5>
      <Form.Item
        label="Automatic release"
        name="automatic_release"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item
        label="Execute further processing automatically"
        name="execute_further_processing"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Automatic processing</h5>

      <Form.Item label="Cost center" name="cost_center">
        <Input type="text" placeholder="Enter Cost center" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Invoice text adjustable of released invoices?&nbsp;
            <Tooltip title="Invoice text adjustable of released invoices?">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="invoice_text_adjustable"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item
        label="Recording net invoices with gross amount and commission amount"
        name="recording_net_invoices"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item
        label="Create discounts as a separate booking record"
        name="separate_booking_record"
      >
        <Select placeholder="Select...">
          <Option value="No">No</Option>
          <Option value="Everywhere">Everywhere</Option>
          <Option value="All Except Commission">All Except Commission</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Automatic accounts" name="automatic_accounts">
        <Select placeholder="Select Automatic accounts">
          <Option value="No Automatic Accounts (Allocation According To Tax)">
            No Automatic Accounts (Allocation According To Tax)
          </Option>
          <Option value="All Accounts Are Automatic Accounts (No Allocation By Tax)">
            All Accounts Are Automatic Accounts (No Allocation By Tax)
          </Option>
          <Option value="Setting Per Account">Setting Per Account</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Start of financial year"
        name="start_financial_year"
        rules={[
          { required: true, message: "Please select Start of financial year!" },
        ]}
      >
        <Select placeholder="Select Start of financial year">
          <Option value="January">January</Option>
          <Option value="February">February</Option>
          <Option value="March">March</Option>
          <Option value="April">April</Option>
          <Option value="May">May</Option>
          <Option value="June">June</Option>
          <Option value="July">July</Option>
          <Option value="August">August</Option>
          <Option value="September">September</Option>
          <Option value="October">October</Option>
          <Option value="November">November</Option>
          <Option value="December">December</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Split exports between financial years"
        name="split_financial_years"
        valuePropName="checked"
      >
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

export default AccountSetting;
