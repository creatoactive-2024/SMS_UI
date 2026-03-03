import React, { useEffect } from "react";
import { Form } from "antd";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const Allocation = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,form
}) => {
  // const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values when recordData changes
    if (recordData) {
      form.setFieldsValue({
        desc_english: recordData.desc_english,
        desc_portuguese: recordData.desc_portuguese,
        desc_spanish: recordData.desc_spanish,
        class_for_icons: recordData.class_for_icons,
        // Add more fields as needed
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
      <hr />
      <h5>Income accounts</h5>

      <hr />
      <h5>Expense accounts (commission credit notes)</h5>

      <hr />
      <h5>Asset accounts</h5>

      <hr />
      <h5>Clearing accounts</h5>

      {/* <Form.Item
        label="Class for icons"
        name="class_for_icons"
      >
        <Input placeholder="Enter Account holder" />
      </Form.Item> */}

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default Allocation;
