import React, { useState, useEffect } from "react";
import { Form, Select, Input, Checkbox, Button, TimePicker } from "antd";
import moment from "moment";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const Details = ({
  onFinish,
  recordData,
  updateCategoryOptions,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        name: recordData.name,
        price_package: recordData.price_package,
        cost_package: recordData.cost_package,
        additional_transfer: recordData.additional_transfer,
        valid_from: recordData.valid_from
          ? moment(recordData.valid_from)
          : null,
        valid_until: recordData.valid_until
          ? moment(recordData.valid_until)
          : null,

        currency: recordData.currency,
        cost_center: recordData.cost_center,
      });
      console.log("in all data", recordData);
    }
    // Fetch category names when the component mounts
    updateCategoryOptions().then((options) => {
      // Ensure that options is an array before updating the state
      if (Array.isArray(options)) {
        setCategoryOptions(options);
      }
    });
  }, [recordData, form]);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("courseData form values:", values);

    // Set the value of the checkbox fields based on whether they are checked or not
    const updatedValues = {
      ...values,
      price_package: values.price_package,
      cost_package: values.cost_package,
      additional_transfer: values.additional_transfer,
    };

    // Trigger the callback to inform the parent component about the form submission
    onFinish(updatedValues);

    // Update the "Category" dropdown options
    const options = await updateCategoryOptions();
    // Ensure that options is an array before updating the state
    if (Array.isArray(options)) {
      setCategoryOptions(options);
    }
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
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Price package&nbsp;
            <Tooltip title="Price package">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="price_package"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Cost package&nbsp;
            <Tooltip title="Cost package">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="cost_package"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Additional transfer&nbsp;
            <Tooltip title="Additional transfer">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="additional_transfer"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Valid from (hh:mm)"
        name="valid_from"
        rules={[
          { required: true, message: "Please enter Valid from (hh:mm)!" },
        ]}
      >
        <TimePicker format="HH:mm" defaultValue={moment("00:00", "HH:mm")} />
      </Form.Item>
      <Form.Item
        label="Valid until (hh:mm)"
        name="valid_until"
        rules={[
          { required: true, message: "Please enter Valid until (hh:mm)!" },
        ]}
      >
        <TimePicker format="HH:mm" defaultValue={moment("00:00", "HH:mm")} />
      </Form.Item>

      <Form.Item
        label="Currency"
        name="currency"
        rules={[{ required: true, message: "Please select Currency!" }]}
      >
        <Select placeholder="SELECT Currency" onChange={handleChange}>
         
          <Option value="£"> £</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Accounting</h5>

      <Form.Item label="Cost center" name="cost_center">
        <Input placeholder="Enter Cost center" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default Details;
