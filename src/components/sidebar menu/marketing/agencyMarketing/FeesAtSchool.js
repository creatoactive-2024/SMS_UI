import React, { useEffect } from "react";
import { Form, Button, Select, Checkbox } from "antd";
import { SubmitCancelButtonGroup } from "../../../sidebar menu/commonComponents/ButtonsDropdown";

const { Option } = Select;

const FeesAtSchool = ({
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
        additonal_course_fee_registration:
          recordData.additonal_course_fee_registration,
        additonal_learning_material_standard:
          recordData.additonal_learning_material_standard,
        Additional_learning_material_rental:
          recordData.Additional_learning_material_rental,
        additional_learning_material_intensive:
          recordData.additional_learning_material_intensive,
        additional_learning_intensive_rental:
          recordData.additional_learning_intensive_rental,
        additional_accommodation_placement_fee:
          recordData.additional_accommodation_placement_fee,
        general_fee_standard_visitor_visa:
          recordData.general_fee_standard_visitor_visa,
        general_fee_transportation_fee:
          recordData.general_fee_transportation_fee,
        general_fee_pay_instalment: recordData.general_fee_pay_instalment,
        general_fee_short_term_study_visa:
          recordData.general_fee_short_term_study_visa,
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
      <Form.Item
        label="Additional course fees: Registration Fee"
        name="additonal_course_fee_registration"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Additional course fees: Learning Material Standard"
        name="additonal_learning_material_standard"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Additional course fees: Learning Material Rental"
        name="Additional_learning_material_rental"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Additional course fees: Learning Material Intensive Standard"
        name="additional_learning_material_intensive"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Additional course fees: Learning Material Intensive Rental"
        name="additional_learning_intensive_rental"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Additional accommodation fees: Accommodation Placement fee"
        name="additional_accommodation_placement_fee"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="General fees: Standard visitor visa documentation fee (Up to 6 months)"
        name="general_fee_standard_visitor_visa"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="General fees: Transportation Fee"
        name="general_fee_transportation_fee"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="General fees: Pay in two instalments"
        name="general_fee_pay_instalment"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="General fees: Short-term study visa documentation fee (Up to 11 months)"
        name="general_fee_short_term_study_visa"
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

export default FeesAtSchool;
