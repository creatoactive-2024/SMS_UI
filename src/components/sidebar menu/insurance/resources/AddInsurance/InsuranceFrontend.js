import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import englishFlag from "../../../../img/englishFlag.png";
import portugeseFlag from "../../../../img/Portugal-flag.png";
import spanishFlag from "../../../../img/Spain-flag.png";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const InsuranceFrontend = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
  form,
}) => {
  // const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values when recordData changes
    if (recordData) {
      form.setFieldsValue({
        frontend_name_english: recordData.frontend_name_english,
        // frontend_name_portugle: recordData.frontend_name_portugle,
        // frontend_name_spanish: recordData.frontend_name_spanish,
        class_of_icons: recordData.class_of_icons,
      });
      console.log("in insurance frontend", recordData);
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
      <Form.Item label="Class for icons" name="class_of_icons">
        <Input placeholder="Enter Class for icons" />
      </Form.Item>

      <Form.Item
        label="Title"
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

      {/* <Form.Item
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
      </Form.Item> */}

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel}
      />
    </Form>
  );
};

export default InsuranceFrontend;
