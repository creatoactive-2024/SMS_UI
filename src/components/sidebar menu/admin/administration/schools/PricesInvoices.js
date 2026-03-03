import React, { useEffect } from "react";
import { Form, Select, Checkbox, Input } from "antd";

import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const PricesInvoices = ({
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
        price_weekly_course: recordData.price_weekly_course,
        price_individual_lessons: recordData.price_individual_lessons,

        price_calculation: recordData.price_calculation,
        tax: recordData.tax,
        agent_invoice_net_price: recordData.agent_invoice_net_price,
        tax_on_pdf: recordData.tax_on_pdf,
        standard_payment_term: recordData.standard_payment_term,
        credit_note_commission: recordData.credit_note_commission,
        additional_fee_charged: recordData.additional_fee_charged,
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
      <h5>Prices</h5>

      <Form.Item
        label={
          <span>
            Price structure for weekly courses&nbsp;
            <Tooltip title="Price structure for weekly courses">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="price_weekly_course"
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="Regular price structure">
            Regular price structure
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Price structure for individual lessons"
        name="price_individual_lessons"
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="Regular price structure">
            Regular price structure
          </Option>
        </Select>
      </Form.Item>

      <Form.Item label="Price calculation" name="price_calculation">
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="Normal">Normal</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Tax" name="tax">
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="No tax">No tax</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Tax on pdf" name="tax_on_pdf">
        <Select mode="multiple" placeholder="Select Tax on pdf">
          <Option value="display tax percentage in addintional column">
            display tax percentage in addintional column
          </Option>
          <Option value="display tax amount in additional column ">
            display tax amount in additional column{" "}
          </Option>
          <Option value="Total amount per tax-% in additional line">
            Total amount per tax-% in additional line
          </Option>
        </Select>
      </Form.Item>
      <hr />
      <h5>Invoices</h5>
      <Form.Item
        label={
          <span>
            Standard payment term&nbsp;
            <Tooltip title="Standard payment term">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="standard_payment_term"
        rules={[
          { required: true, message: "Please select Standard payment term!" },
        ]}
      >
        <Input placeholder="Enter Standard payment term" />
      </Form.Item>

      <Form.Item
        label="Agent invoice with net prices only (no gross and commision amounts)"
        name="agent_invoice_net_price"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Credit note with commision only (no net and gross amounts)"
        name="credit_note_commission"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Additional fees charged as to paid at school"
        name="additional_fee_charged"
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

export default PricesInvoices;
