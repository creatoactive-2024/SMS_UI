import React, { useEffect, useState } from "react";
import { Form, Input, Select, Checkbox, Alert, Button } from "antd";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";

const { Option } = Select;

const DataSpecial = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
}) => {
  const [form] = Form.useForm();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const responseData = await FieldListDropdown("courses", "title_english");
      if (responseData) {
        // Extract category names from response data
        const names = responseData.map((category) => ({
          value: category._id, // Use the appropriate property for the value
          label: category.title_english, // Use the appropriate property for the label
        }));
        // const names = responseData.map((category) => category.title_english);
        setCourses(names);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  useEffect(() => {
    if (recordData) {
      const {
        title,
        cost_center,
        active,
        based_on,
        availibility_type,
        valid_from,
        valid_until,
        value_for,
        depending_on_student_status,
        type_of_discount,
        percentage,
        type,
        course,
        depending_on_duration,
        agencies_grouped_by,
      } = recordData;

      // Format dates where necessary
      const formattedValidFrom = moment(valid_from);
      const formattedValidUntil = moment(valid_until);

      // Set form fields values
      form.setFieldsValue({
        title,
        cost_center,
        active,
        based_on,
        availibility_type,
        valid_from: formattedValidFrom,
        valid_until: formattedValidUntil,
        value_for,
        depending_on_student_status,
        type_of_discount,
        percentage,
        type,
        course,
        depending_on_duration,
        agencies_grouped_by,
      });

      // Handle direct DOM manipulation for date inputs
      document.getElementById("date-picker-special1").value =
        formattedValidFrom.format("YYYY-MM-DD");
      document.getElementById("date-picker-special2").value =
        formattedValidUntil.format("YYYY-MM-DD");

      console.log("Form values set:", form.getFieldsValue());
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
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please select title",
          },
        ]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item label="Cost center" name="cost_center">
        <Input placeholder="Enter Cost center" />
      </Form.Item>

      <Form.Item label="Active" name="active" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      {/* 
      <Alert message="Warning" type="warning" showIcon closable /> */}

      <Alert
        message={
          <div>
            <span
              className="warningText"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Warning
            </span>
            <br />
            <span
              className="adText"
              style={{ fontSize: "16px", color: "#666" }}
            >
              Some setting cant't be adjusted. Once a special has been
              assignedto at least one booking.
            </span>
          </div>
        }
        type="warning"
        showIcon
        closable
      />

      <br />
      <hr />
      <h5>Validity</h5>

      <Form.Item
        label="Based on"
        name="based_on"
        rules={[{ required: true, message: "Please select based on" }]}
      >
        <Select placeholder="SELECT BASED ON" onChange={handleChange}>
          <Option value="Deleted entry">Deleted entry</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Valid from"
        name="valid_from"
        rules={[{ required: true, message: "Please select Valid from!" }]}
      >
        <div className="date-picker-container">
          <input
            type="date"
            id="date-picker-special1"
            className="date-picker"
            name="valid_from"
          />
        </div>
      </Form.Item>

      <Form.Item
        label="Valid until"
        name="valid_until"
        rules={[{ required: true, message: "Please select Valid until!" }]}
      >
        <div className="date-picker-container">
          <input
            type="date"
            id="date-picker-special2"
            className="date-picker"
            name="valid_until"
          />
        </div>
      </Form.Item>

      <hr />

      <h5>Availibilty</h5>
      <Form.Item
        label="Availibilty type"
        name="availibility_type"
        rules={[{ required: true, message: "Please select Availibilty type" }]}
      >
        <Select placeholder="SELECT Availibilty type" onChange={handleChange}>
          <Option value="Unlimited availibility">Unlimited availibility</Option>
        </Select>
      </Form.Item>

      <hr />

      <h5>Availibilty type</h5>
      <Form.Item
        label="Value for"
        name="value_for"
        rules={[{ required: true, message: "Please select Value for" }]}
      >
        <Input placeholder="Enter value for" />
      </Form.Item>

      <Form.Item label="Agencies grouped by" name="agencies_grouped_by">
        <Select
          placeholder="SELECT Agencies grouped by"
          onChange={handleChange}
        >
          <Option value="All">All</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Student status</h5>

      <Form.Item
        label="Depending on student status"
        name="depending_on_student_status"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Terms and condotions</h5>

      <Form.Item label="Type of discount" name="type_of_discount">
        <Input placeholder="Enter Type of discount" />
      </Form.Item>

      <hr />

      <Form.Item
        label="Percentage"
        name="percentage"
        rules={[
          {
            required: true,
            message: "Please enter Percentage",
          },
        ]}
      >
        <Input type="Number" placeholder="Enter Percentage" />
      </Form.Item>

      <Form.Item label="Type" name="type">
        <Select placeholder="SELECT Type" onChange={handleChange}>
          <Option value="Course">Course</Option>
        </Select>
      </Form.Item>

      <Form.Item name="course" label="Course">
        <Select mode="multiple" placeholder="Please select">
          {courses.map((name) => (
            <Option key={name._id} value={name.label}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Depending on duration"
        name="depending_on_duration"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />

      <Form.List name="additionalFields">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                {" "}
                {/* Remove inline style for marginBottom */}
                {/* Percentage */}
                <Form.Item
                  {...restField}
                  label="Percentage"
                  name={[name, "percentage"]}
                  fieldKey={[fieldKey, "percentage"]}
                  rules={[
                    {
                      required: true,
                      message: "Please enter Percentage",
                    },
                  ]}
                >
                  <Input type="Number" placeholder="Enter Percentage" />
                </Form.Item>
                {/* Type */}
                <Form.Item
                  {...restField}
                  label="Type"
                  name={[name, "type"]}
                  fieldKey={[fieldKey, "type"]}
                >
                  <Select placeholder="SELECT Type" onChange={handleChange}>
                    <Option value="Course">Course</Option>
                    <Option value="option2">option2</Option>
                  </Select>
                </Form.Item>
                {/* Course */}
                <Form.Item
                  {...restField}
                  name={[name, "course"]}
                  label="Course"
                  fieldKey={[fieldKey, "course"]}
                >
                  <Select mode="multiple" placeholder="Please select">
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                  </Select>
                </Form.Item>
                {/* Depending on duration */}
                <Form.Item
                  {...restField}
                  label="Depending on duration"
                  name={[name, "depending_on_duration"]}
                  fieldKey={[fieldKey, "depending_on_duration"]}
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                {/* Delete button */}
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
                <hr />
              </div>
            ))}

            {/* Divider */}
            {/* <Divider /> */}

            {/* Add new button */}
            {/* <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
            </Form.Item> */}
          </>
        )}
      </Form.List>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default DataSpecial;
