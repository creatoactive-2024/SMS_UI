import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import englishFlag from "../../../img/englishFlag.png";
import portugeseFlag from "../../../img/Portugal-flag.png";
import spanishFlag from "../../../img/Spain-flag.png";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const CourseFrontend = ({ onFinish, recordData, CancelBothModel, form }) => {
  // const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values when recordData changes
    if (recordData) {
      form.setFieldsValue({
        accommodation_combinations_name:
          recordData.accommodation_combinations_name,
        overarching_course_name: recordData.overarching_course_name,
        frontend_name_english: recordData.frontend_name_english,
        frontend_name_portugle: recordData.frontend_name_portugle,
        frontend_name_spanish: recordData.frontend_name_spanish,
        frontend_desciprtion_english: recordData.frontend_desciprtion_english,
        frontend_desciprtion_portugle: recordData.frontend_desciprtion_portugle,
        frontend_desciprtion_spanish: recordData.frontend_desciprtion_spanish,
        contact_persons: recordData.contact_persons,
        frontend_min_bookable_days_ahead:
          recordData.frontend_min_bookable_days_ahead,
      });
      console.log("in coursefrontend", recordData);
    }
  }, [recordData, form]);

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("EnquiryData form values:", values);

    // Trigger the callback to inform the parent component about the form submission
    onFinish(values);
  };
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <h5>Course</h5>

      <Form.Item
        name="accommodation_combinations_name"
        label={
          <span>
            Accommodation&nbsp;
            <Tooltip title="Accommodation">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
      >
        <Input placeholder="Enter Accommodation" />
      </Form.Item>

      <Form.Item label="Overarching course" name="overarching_course_name">
        <Input placeholder="Enter Overarching course" />
      </Form.Item>

      <Form.Item
        label="Name"
        name="frontend_name_english"
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
          <Form.Item name="frontend_name_english" noStyle>
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
        name="frontend_name_spanish"
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
          <Form.Item name="frontend_name_spanish" noStyle>
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
        name="frontend_name_portugle"
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
          <Form.Item name="frontend_name_portugle" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item
        label="Description"
        name="frontend_desciprtion_english"
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
          <Form.Item name="frontend_desciprtion_english" noStyle>
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
        name="frontend_desciprtion_spanish"
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
          <Form.Item name="frontend_desciprtion_spanish" noStyle>
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
        name="frontend_desciprtion_portugle"
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
          <Form.Item name="frontend_desciprtion_portugle" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item name="contact_persons" label="Contact person">
        <Input placeholder="Enter Contact person" />
      </Form.Item>

      <Form.Item
        label="Minimum number of days before the start of the service"
        name="frontend_min_bookable_days_ahead"
      >
        <Input placeholder="Enter Minimum number of days before the start of the service" />
      </Form.Item>

      <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />
    </Form>
  );
};

export default CourseFrontend;
