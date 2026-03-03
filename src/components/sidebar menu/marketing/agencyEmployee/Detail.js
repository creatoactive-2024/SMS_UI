import React, { useEffect, useState } from "react";
import { Checkbox, Form, Input, Select } from "antd";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";
import TextArea from "antd/es/input/TextArea";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";

const { Option } = Select;

const Detail = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
}) => {
  const [form] = Form.useForm();
  const [agentlist, setAgentList] = useState([]);

  const fetchAgentList = async () => {
    try {
      const responseData = await FieldListDropdown("agents", "name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Agent = responseData.map((agent) => ({
          value: agent._id, // Use the appropriate property for the value
          label: agent.name, // Use the appropriate property for the label
        }));
        setAgentList(Agent);
      }
    } catch (error) {
      console.error("Error fetching Agents:", error);
    }
  };

  useEffect(() => {
    fetchAgentList();
  }, []);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  useEffect(() => {
    // Set initial form values when recordData changes
    if (recordData) {
      form.setFieldsValue({
        main_contact_person: recordData.main_contact_person,
        salutation: recordData.salutation,
        firstname: recordData.firstname,
        surname: recordData.surname,
        email: recordData.email,
        phone: recordData.phone,
        fax: recordData.fax,
        skype: recordData.skype,
        note: recordData.note,
        department: recordData.department,
        agent: recordData.agent,
      });
      //   console.log("in enquiryData", recordData);
    }
  }, [recordData, form]);

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("agencyemployees", values);

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
        label="Main contact person"
        name="main_contact_person"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Salutaion"
        name="salutation"
        rules={[{ required: true, message: "Please select salutation!" }]}
      >
        <Select placeholder="select salutation" onChange={handleChange}>
          <Option value="Mr">Mr</Option>
          <Option value="Mrs">Mrs</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Agent"
        name="agent"
        rules={[{ required: true, message: "Please select agent!" }]}
      >
        <Select placeholder="select agent" onChange={handleChange}>
          {agentlist.map((agent) => (
            <Option key={agent._id} value={agent.label}>
              {agent.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="First name"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Please enter First name",
          },
        ]}
      >
        <Input placeholder="Enter First name" />
      </Form.Item>

      <Form.Item
        label="Surname"
        name="surname"
        rules={[
          {
            required: true,
            message: "Please enter surname",
          },
        ]}
      >
        <Input placeholder="Enter surname" />
      </Form.Item>

      <hr />

      <h5>Contact details</h5>

      <Form.Item label="Email" name="email">
        <Input type="email" placeholder="Enter email" />
      </Form.Item>

      <Form.Item label="Phone" name="phone">
        <Input type="number" placeholder="Enter phone" />
      </Form.Item>

      <Form.Item label="Fax" name="fax">
        <Input placeholder="Enter fax" />
      </Form.Item>

      <Form.Item label="Skype" name="skype">
        <Input placeholder="Enter skype" />
      </Form.Item>

      <hr />

      <h5>Other</h5>

      <Form.Item label="Note" name="note">
        <TextArea placeholder="Enter note" />
      </Form.Item>

      <Form.Item label="Department" name="department">
        <Input placeholder="Enter department" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default Detail;
