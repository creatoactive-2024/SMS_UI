import React, { useState, useEffect } from "react";
import { Form, Select, Input, Checkbox, Button, Tooltip } from "antd";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../sidebar menu/commonComponents/ButtonsDropdown";

const { Option } = Select;

const AgentData = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [groupNames, setGroupNames] = useState([]);

  // const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const responseData = await FieldListDropdown("countries", "name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Country = responseData
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCountries(Country);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        active: recordData.active,
        name: recordData.name,

        nickname: recordData.nickname,
        category_name: recordData.category_name,
        // dob: recordData.dob ? moment(recordData.dob) : null,
        agent_group_name: recordData.agent_group_name,
        limit_available: recordData.limit_available,
        website: recordData.website,
        address: recordData.address,
        address_addon: recordData.address_addon,
        pincode: recordData.pincode,
        city: recordData.city,
        state: recordData.state,
        country_name: recordData.country_name,
        tracking_code: recordData.tracking_code,
        notes: recordData.notes,
        language: recordData.language,
        // ... other fields
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

  const fetchCategoryNames = async () => {
    try {
      const responseData = await FieldListDropdown("agentcategories", "name");
      if (responseData) {
        const names = responseData.map((category) => ({
          value: category._id, // Use the appropriate property for the value
          label: category.name, // Use the appropriate property for the label
        }));
        // Extract category names from response data
        // const names = responseData.map((category) => category.name);
        setCategoryNames(names);
      }
    } catch (error) {
      console.error("Error fetching category names:", error);
    }
  };

  const fetchGroupNames = async () => {
    try {
      const responseData = await FieldListDropdown("agentgroups", "name");
      if (responseData) {
        const names = responseData.map((category) => ({
          value: category._id, // Use the appropriate property for the value
          label: category.name, // Use the appropriate property for the label
        }));
        // Extract category names from response data
        // const names = responseData.map((category) => category.name);
        setGroupNames(names);
      }
    } catch (error) {
      console.error("Error fetching category names:", error);
    }
  };

  // Call the fetchCategoryNames function when component mounts
  useEffect(() => {
    fetchCategoryNames();
    fetchGroupNames();
  }, []); // Empty dependency array ensures it runs only once after initial render

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <br />

      <Form.Item label="Active" name="active" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter a  name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nickname"
        name="nickname"
        rules={[{ required: true, message: "Please enter a nickname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Category" name="category_name">
        <Select placeholder="Select a category">
          {categoryNames.map((name) => (
            <Option key={name.value} value={name.value}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="agent_group_name" label="Group">
        <Select placeholder="Please select">
          {groupNames.map((group) => (
            <Option key={group.value} value={group.value}>
              {group.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label=" Limit availability at schools"
        name="limit_available"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item label="Web" name="website">
        <Input placeholder="Enter website" />
      </Form.Item>

      <hr />
      <h5>Address</h5>

      <Form.Item label="Address" name="address">
        <Input placeholder="Enter Address" />
      </Form.Item>

      <Form.Item label="Address addon" name="address_addon">
        <Input placeholder="Enter Add on" />
      </Form.Item>
      <Form.Item label="Zip / Portal code" name="pincode">
        <Input placeholder="Enter zip / postal code" />
      </Form.Item>

      <Form.Item label="City" name="city">
        <Input placeholder="Enter city" />
      </Form.Item>
      <Form.Item label="State" name="state">
        <Input placeholder="Enter state" />
      </Form.Item>

      <Form.Item label="Country" name="country_name">
        <Select
          placeholder="SELECT COUNTRY"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {countries.map((name) => (
            <Option key={name._id} value={name.label}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <hr />
      <h5>Other</h5>

      <Form.Item
        label={
          <span>
            Tracking-Code&nbsp;
            <Tooltip title="Tracking-Code">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="tracking_code"
      >
        <Input type="text" placeholder="Enter Tracking-Code" />
      </Form.Item>

      <Form.Item label="Note" name="notes">
        <Input placeholder="Enter Note" />
      </Form.Item>

      <Form.Item
        label="Correspondence language"
        name="language"
        rules={[
          { required: true, message: "Please enter Correspondence language!" },
        ]}
      >
        <Select
          placeholder="SELECT Correspondence language"
          onChange={handleChange}
        >
          <Option value="English">English</Option>
          <Option value="Spanish">Spanish</Option>
          <Option value="Portuguese">Portuguese</Option>
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

export default AgentData;
