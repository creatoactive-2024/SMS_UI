import React, { useEffect } from "react";
import { Form, Select, Input, Space, Alert, List, Checkbox } from "antd";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const ClassAccommodation = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  useEffect(() => {
    // Set initial form values based on recordData when available
    if (recordData) {
      form.setFieldsValue({
        start_day_course: recordData.start_day_course,
        accommodation_start_date: recordData.accommodation_start_date,
        price_accommodation_week: recordData.price_accommodation_week,
        price_charged_week: recordData.price_charged_week,
        price_paid_week: recordData.price_paid_week,
        info_matching_overview: recordData.info_matching_overview,
        allow_parallel_assignment: recordData.allow_parallel_assignment,
        critical_attendance: recordData.critical_attendance,
        min_age_student: recordData.min_age_student,
        start_time: recordData.start_time,
        interval: recordData.interval,
        start_time_activity: recordData.start_time_activity,
        end_time: recordData.end_time,
        end_time_activity: recordData.end_time_activity,
        student_can_book_activity: recordData.student_can_book_activity,
        welcome_msg: recordData.welcome_msg,
        template_password_email: recordData.template_password_email,
        template_sending_cards: recordData.template_sending_cards,
        available_fields: recordData.available_fields,
        display_field_default: recordData.display_field_default,
        use_email_address: recordData.use_email_address,
        display_internal_comment: recordData.display_internal_comment,
        default_view_tracking: recordData.default_view_tracking,
        automated_after_holiday: recordData.automated_after_holiday,
        transcript_score: recordData.transcript_score,
        automatic_error_detection: recordData.automatic_error_detection,
        use_classroom_school: recordData.use_classroom_school,
        templete_password_email: recordData.templete_password_email,
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

  const data1 = [
    "Age: {age}",
    "First name: {firstname}",
    "short version of firstname: {firstname_capital}",
    "Surname: {surname}",
    "Language: {language}",
    "Nationality: {nationality}",
    "Gender: {gender}",
    " Group: {group}",
  ];

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <h5>Courses</h5>

      <Form.Item
        label={
          <span>
            Start day of courses&nbsp;
            <Tooltip title="Start day of courses">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="start_day_course"
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="Monday">Monday</Option>
          <Option value="Tuesday">Tuesday</Option>
          <Option value="Wednesday">Wednesday</Option>
          <Option value="Thursday">Thursday</Option>
          <Option value="Friday">Friday</Option>
          <Option value="Saturday">Saturday</Option>
          <Option value="Sunday">Sunday</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Accommodation</h5>

      <Form.Item
        label="Accommodation starting date"
        name="accommodation_start_date"
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="Sunday">Sunday</Option>
          <Option value="Monday">Monday</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Prices: Number of nights per accommodation week"
        name="price_accommodation_week"
        rules={[
          {
            required: true,
            message:
              "Please select Prices: Number of nights per accommodation week!",
          },
        ]}
      >
        <Input placeholder="Enter Prices: Number of nights per accommodation week" />
      </Form.Item>

      <Form.Item
        label="Prices:Number of additional nights charged as a week"
        name="price_charged_week"
        rules={[
          {
            required: true,
            message:
              "Please select Prices:Number of additional nights charged as a week!",
          },
        ]}
      >
        <Input placeholder="Enter Prices:Number of additional nights charged as a week" />
      </Form.Item>
      <Form.Item
        label="Costs:Number of additional nights paid as a week"
        name="price_paid_week"
        rules={[
          {
            required: true,
            message:
              "Please select Costs:Number of additional nights paid as a week!",
          },
        ]}
      >
        <Input placeholder="Enter Costs:Number of additional nights paid as a week" />
      </Form.Item>

      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Alert
          message="Available placeholder for customising document name:"
          description={
            <List
              size="small"
              dataSource={data1}
              renderItem={(item) => (
                <List.Item>
                  <span
                    style={{
                      display: "inline-block",
                      marginRight: "5px",
                    }}
                  >
                    •
                  </span>
                  {item}
                </List.Item>
              )}
            />
          }
          type="info"
          showIcon
        />
      </Space>
      <br />
      <br />

      <Form.Item
        label="Information of matched students in acc. matching overview"
        name="info_matching_overview"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Allow paralled assignment(same time/same student)"
        name="allow_parallel_assignment"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>School</h5>
      <Form.Item
        label="Critical attendance (%)"
        name="critical_attendance"
        rules={[
          { required: true, message: "Please select Critical attendance (%)!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Minimum age to be an adult student"
        name="min_age_student"
        rules={[
          {
            required: true,
            message:
              "Please select Costs:Number of additional nights paid as a week!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <hr />
      <h5>Class times</h5>

      <Form.Item
        label="Start time"
        name="start_time"
        rules={[{ required: true, message: "Please select Start time!" }]}
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="08:00">08:00</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="End time"
        name="end_time"
        rules={[{ required: true, message: "Please select End time!" }]}
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="17:00">17:00</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Interval&nbsp;
            <Tooltip title="Interval">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="interval"
        rules={[{ required: true, message: "Please select Interval!" }]}
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="15 minutes">15 minutes</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Activity times</h5>

      <Form.Item
        label="Start time"
        name="start_time_activity"
        rules={[{ required: true, message: "Please select Start time!" }]}
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="08:00">08:00</Option>
          <Option value="09:00">09:00</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="End time"
        name="end_time_activity"
        rules={[{ required: true, message: "Please select End time!" }]}
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="17:00">17:00</Option>
          <Option value="20:00">20:00</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Students can book activities in the frontend that run parallel to their courses"
        name="student_can_book_activity"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Teacher portal</h5>
      <Form.Item label="Welcome message" name="welcome_msg">
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Template for password e-mail"
        name="template_password_email"
      >
        <Input placeholder="Enter Template for password e-mail" />
      </Form.Item>
      <Form.Item
        label="Template for sending report cards"
        name="template_sending_cards"
      >
        <Input placeholder="Enter Template for sending report cards" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Available fields&nbsp;
            <Tooltip title="Available fields">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="available_fields"
      >
        <Select
          mode="multiple"
          placeholder="--select--"
          onChange={handleChange}
        >
          <Option value="Attendance-Student Email">
            Attendance-Student Email
          </Option>
          <Option value="Attendance-Trial Feedback">
            Attendance-Trial Feedback
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Display fields by default&nbsp;
            <Tooltip title="Display fields by default">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="display_field_default"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Communication:Use teacher's e-mail address as reply address&nbsp;
            <Tooltip title="Communication:Use teacher's e-mail address as reply address">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="use_email_address"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Display internal class comment"
        name="display_internal_comment"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Default view attendance tracking"
        name="default_view_tracking"
      >
        <Select placeholder="--select--" onChange={handleChange}>
          <Option value="Extended">Extended</Option>
        </Select>
      </Form.Item>
      <hr />
      <h5>Class scheduling</h5>

      <Form.Item
        label="Automated assinment to classes after holidays"
        name="automated_after_holiday"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Transcripts:Score needed to pass"
        name="transcript_score"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Automatic error detection"
        name="automatic_error_detection"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Use classrooms of other schools"
        name="use_classroom_school"
      >
        <Select placeholder="SELECT..." onChange={handleChange}>
          <Option value="SpeakUp-Room 1">SpeakUp-Room 1</Option>
          <Option value="SpeakUp-Room 2">SpeakUp-Room 2</Option>
          <Option value="SpeakUp-Room 3">SpeakUp-Room 3</Option>
          <Option value="SpeakUp-Room 4">SpeakUp-Room 4</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Accommodation login</h5>

      <Form.Item
        label="Template for password e-mail"
        name="templete_password_email"
      >
        <Select placeholder="--Template--" onChange={handleChange}>
          <Option value="Sunday">Sunday</Option>
          <Option value="Monday">Monday</Option>
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

export default ClassAccommodation;
