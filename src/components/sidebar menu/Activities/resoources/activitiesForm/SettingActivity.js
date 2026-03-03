import React, { useEffect, useState } from "react";
import { Form, Select, Input, Checkbox, Button } from "antd";
import englishFlag from "../../../../img/englishFlag.png";
import portugeseFlag from "../../../../img/Portugal-flag.png";
import spanishFlag from "../../../../img/Spain-flag.png";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../../../commonComponents/FieldListDropdown";

const { Option } = Select;

const SettingActivity = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  const [course, setCourse] = useState([]);

  const fetchCourses = async () => {
    try {
      const responseData = await FieldListDropdown("courses", "title_english");
      if (responseData) {
        // Extract category names from response data
        const names = responseData
          .map((category) => ({
            value: category._id, // Use the appropriate property for the value
            label: category.title_english, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        // const names = responseData.map((category) => category.name_english);
        setCourse(names);
      }
    } catch (error) {
      console.error("Error fetching coursecategories:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        title_english: recordData.title_english,
        // title_portuguese: recordData.title_portuguese,
        // title_spanish: recordData.title_spanish,
        nickname: recordData.nickname,
        bookable_without_course: recordData.bookable_without_course,
        display_price: recordData.display_price,
        free_of_charge: recordData.free_of_charge,
        billing: recordData.billing,
        availability: recordData.availability,
        school: recordData.school,
        courses: recordData.courses,
        min_students: recordData.min_students,
        max_students: recordData.max_students,
        provider: recordData.provider,
        cost_center: recordData.cost_center,
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
    form.resetFields();
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
        name="title_english"
        rules={[{ required: true, message: "Please enter the category name!" }]}
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "27px",
              height: "22px",
              background: `url(${englishFlag}) no-repeat center center`,
              backgroundSize: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Form.Item name="title_english" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item>

      {/* <Form.Item
        label=" "
        name="title_spanish"
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "27px",
              height: "22px",
              background: `url(${spanishFlag}) no-repeat center center`,
              backgroundSize: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Form.Item name="title_spanish" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item
        label=" "
        name="title_portuguese"
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "35px",
              background: `url(${portugeseFlag}) no-repeat center center`,
              backgroundSize: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Form.Item name="title_portuguese" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item> */}

      <Form.Item
        label="Nickname"
        name="nickname"
        rules={[{ required: true, message: "Please enter Nickname!" }]}
      >
        <Input />
      </Form.Item>

      <hr />
      <h5>Settings</h5>

      <Form.Item
        label={
          <span>
            Bookable without course&nbsp;
            <Tooltip title="Bookable without course">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="bookable_without_course"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Display if price is 0?&nbsp;
            <Tooltip title="Display if price is 0?">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="display_price"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item
        label="Free of charge?"
        name="free_of_charge"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Billing"
        name="billing"
        rules={[{ required: true, message: "Please select Billing !" }]}
      >
        <Select placeholder="Select a Billing">
          <Option value="Weekly">Weekly</Option>
          <Option value="Per Block">Per Block</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Availability"
        name="availability"
        rules={[{ required: true, message: "Please select Availability!" }]}
      >
        <Select placeholder="Select Availability">
          <Option value="Always Available">Always Available</Option>
          <Option value="Limited Availability">Limited Availability</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Schools</h5>

      <Form.Item
        label="School"
        name="school"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select a School">
          <Option value="speakuplondon">speakuplondon</Option>
          {/* Add more options if needed */}
        </Select>
      </Form.Item>

      <Form.Item
        name="courses"
        label="Courses"
        rules={[{ required: true, message: "Please select Courses !" }]}
      >
        <Select
          mode="multiple"
          placeholder="Please select"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {course.map((item) => (
            <Select.Option key={item._id} value={item.label}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <hr />
      <h5>Other</h5>
      <Form.Item label="Min.students" name="min_students">
        <Input type="number" placeholder="Enter Min.students" />
      </Form.Item>
      <Form.Item label="Max.students" name="max_students">
        <Input type="number" placeholder="Enter Max.students" />
      </Form.Item>
      <Form.Item label="Provider" name="provider">
        <Input type="text" placeholder="Enter Provider" />
      </Form.Item>

      <hr />
      <h5>Accounting</h5>

      <Form.Item label="Cost center" name="cost_center">
        <Input type="text" placeholder="Enter Cost center" />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default SettingActivity;
