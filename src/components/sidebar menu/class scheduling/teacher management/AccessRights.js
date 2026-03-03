import React, { useEffect } from "react";
import { Form, Checkbox } from "antd";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";

const AccessRights = ({ onFinish, recordData, CancelBothModel, form }) => {
  // const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values when recordData changes
    if (recordData) {
      console.log("recordData in useEffect:", recordData); // Debug log
      form.setFieldsValue({
        
        schedule: recordData.schedule,
        attendance: recordData.attendance,
        communication: recordData.communication,
        report_card: recordData.report_card,
        classes_assingment: recordData.classes_assingment,
      });
    }
  }, [recordData, form]);

  const handleFinish = async (values) => {
    console.log("Form submitted values:", values); // Debug log
    onFinish(values);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Schedule" name="schedule" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Attendance" name="attendance" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Communication" name="communication" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Report cards" name="report_card" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="All classes/assignments" name="classes_assingment" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
      <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />
    </Form>
  );
};

export default AccessRights;
