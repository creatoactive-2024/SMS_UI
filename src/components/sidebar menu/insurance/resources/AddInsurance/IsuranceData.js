import React, { useState, useEffect } from "react";
import { Form, Select, Input, Button } from "antd";
import englishFlag from "../../../../img/englishFlag.png";
import portugeseFlag from "../../../../img/Portugal-flag.png";
import spanishFlag from "../../../../img/Spain-flag.png";
import { SubmitCancelButtonGroup } from "../../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const IsuranceData = ({
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
        title_english: recordData.title_english,
        // title_portuguese: recordData.title_portuguese,
        // title_spanish: recordData.title_spanish,
        provider: recordData.provider,
        number: recordData.number,
        price_structure: recordData.price_structure,
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
    console.log("insuranceData form values:", values);

    // Trigger the callback to inform the parent component about the form submission
    onFinish(values);
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
        label="Provider "
        name="provider"
        rules={[{ required: true, message: "Please enter the category name!" }]}
      >
        <Select placeholder="SELECT Provider " onChange={handleChange}>
          <Option value="Thebing - Sample Insurance Provider">
            The bing - Sample Insurance Provider
          </Option>
          <Option value="Deleted Entry">Deleted Entry</Option>
        </Select>
      </Form.Item>


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

      <Form.Item label="Number" name="number">
        <Input placeholder="Enter Number" />
      </Form.Item>

      <hr />
      <h5>Price calculation</h5>

      <Form.Item label="Price structure" name="price_structure">
        <Select placeholder="SELECT Price structure" onChange={handleChange}>
          <Option value="One Time Fee">One Time Fee</Option>
          <Option value="Per Day">Per Day</Option>
          <Option value="Regular Price Structure">
            Regular Price Structure
          </Option>
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

export default IsuranceData;
