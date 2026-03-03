import React, { useEffect, useState } from "react";
import { Form, Select, Checkbox, Input, Upload, Button, message } from "antd";
import { ChromePicker } from "react-color";
import { FieldListDropdown } from "../../../commonComponents/FieldListDropdown";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const FirstSchoolForm = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  const [currentColor, setCurrentColor] = useState("#ffffff");

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
        name: recordData.name,
        nickname: recordData.nickname,

        logo: recordData.logo,
        code: recordData.code,

        address: recordData.address,
        address_addon: recordData.address_addon,
        postal_code: recordData.postal_code,
        city: recordData.city,
        state: recordData.state,
        country: recordData.country,
        time_zone: recordData.time_zone,
        url: recordData.url,
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

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
        rules={[{ required: true, message: "Please enter name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nickname"
        name="nickname"
        rules={[{ required: true, message: "Please enter nickname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="logo" label="Logo">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label={
          <span>
            System Colour&nbsp;
            <Tooltip title="System Colour">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="code"
      >
        <Input
          placeholder="Enter Colour"
          value={form.getFieldValue("code")}
          readOnly
        />
        <ChromePicker
          color={currentColor}
          onChange={(color) => {
            setCurrentColor(color.hex);
            form.setFieldsValue({
              code: color.hex,
            });
          }}
        />
      </Form.Item>
      <hr />
      <h5>Address</h5>
      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="Address addon" name="address_addon">
        <Input />
      </Form.Item>
      <Form.Item label="ZIP/Postal code" name="postal_code">
        <Input />
      </Form.Item>
      <Form.Item label="City" name="city">
        <Input />
      </Form.Item>
      <Form.Item label="State" name="state">
        <Input />
      </Form.Item>
      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please select country!" }]}
      >
        <Select
          placeholder="SELECT..."
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
      <h5>General settings for all of your schools</h5>

      <Form.Item label="Time zone" name="time_zone">
        <Input placeholder="Enter Time zone" />
      </Form.Item>

      <hr />
      <h5>Contact details</h5>

      <Form.Item label="URL" name="url">
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

export default FirstSchoolForm;
