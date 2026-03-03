import React, { useEffect } from "react";
import { Form, Select, Input, Checkbox } from "antd";
import { Tooltip } from "antd";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const Layout = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  useEffect(() => {
    if (recordData) {
      form.setFieldsValue({
        name: recordData.name,
        display_html: recordData.display_html === "true", // Convert to boolean
        size: recordData.size,
        width: recordData.width,
        height: recordData.height,
        margin_left: recordData.margin_left,
        margin_top: recordData.margin_top,

        horizontal_margin: recordData.horizontal_margin,
        vertical_margin: recordData.vertical_margin,
        background: recordData.background,
        standard_font: recordData.standard_font,
        minimizing_file_size: recordData.minimizing_file_size,
        standard_font_size: recordData.standard_font_size,
        default_char_spacing: recordData.default_char_spacing,
        top: recordData.top,
        right: recordData.right,

        bottom: recordData.bottom,
        left: recordData.left,
        top_first: recordData.top_first,
        right_first: recordData.right_first,
        bottom_first: recordData.bottom_first,
        left_first: recordData.left_first,
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
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Display HTML fields as text fields"
        name="display_html"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Size</h5>

      <Form.Item label="Size" name="size">
        <Select placeholder="Select size">
          <Option value="User-defined">User-defined</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Width (mm)"
        name="width"
        rules={[{ required: true, message: "Please enter width!" }]}
      >
        <Input placeholder="210.00" />
      </Form.Item>

      <Form.Item
        label="Height (mm)"
        name="height"
        rules={[{ required: true, message: "Please enter height!" }]}
      >
        <Input placeholder="297.00" />
      </Form.Item>

      <hr />
      <h5>Placement of the background PDF (only for labels)</h5>
      <Form.Item label="Margin from left (mm)" name="margin_left">
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item label="Margin from top (mm)" name="margin_top">
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item
        label="Horizontal margin between two elements (mm)"
        name="horizontal_margin"
      >
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item
        label="Vertical margin between two elements (mm)"
        name="vertical_margin"
      >
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item label="Background" name="background">
        {/* <Select placeholder="Select Background">
          <Option value="option1">option1</Option>
          <Option value="option2">option2</Option>
        </Select> */}
        <Input placeholder="Enter background" />
      </Form.Item>

      <hr />
      <h5>Font</h5>

      <Form.Item
        label="Standard font"
        name="standard_font"
        rules={[{ required: true, message: "Please select Standard font!" }]}
      >
        {/* <Select placeholder="Select Standard font">
          <Option value="option1">option1</Option>
          <Option value="option2">option2</Option>
        </Select> */}
        <Input placeholder="Enter Standard font" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Minimizing the file size by reducing the font characters (generation
            takes longer)&nbsp;
            <Tooltip title="Minimizing the file size by reducing the font characters (generation takes longer)">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="minimizing_file_size"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Standard font size (mm)" name="standard_font_size">
        <Input placeholder="9.00" />
      </Form.Item>

      <Form.Item
        label="Default character spacing (mm)"
        name="default_char_spacing"
      >
        <Input placeholder="0.0000" />
      </Form.Item>

      <hr />
      <h5>Margins:First page (mm)</h5>
      <Form.Item label="Top (mm)" name="top_first">
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item label="Right (mm)" name="right_first">
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item label="Bottom (mm)" name="bottom_first">
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item label="Left (mm)" name="left_first">
        <Input placeholder="0.00" />
      </Form.Item>

      <hr />
      <h5>Margins:Further page (mm)</h5>

      <Form.Item label="Top (mm)" name="top">
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item label="Right (mm)" name="right">
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item label="Bottom (mm)" name="bottom">
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item label="Left (mm)" name="left">
        <Input placeholder="0.00" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default Layout;
