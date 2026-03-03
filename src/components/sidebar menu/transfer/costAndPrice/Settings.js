import React, { useEffect } from "react";
import { Form, Select, Button } from "antd";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";

const { Option } = Select;

const Settings = ({
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
        weekdays: recordData.weekdays,
        transfer_locations_from: recordData.transfer_locations_from,
        accommodation_categories_from: recordData.accommodation_categories_from,
        transfer_locations_to: recordData.transfer_locations_to,
        accommodation_categories_to: recordData.accommodation_categories_to,

      });
      console.log("in CourseDocument", recordData);
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
        name="weekdays"
        label="Weekdays"
        rules={[
          {
            required: true,
            message: "Please select Weekdays",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="Monday">Monday</Option>
          <Option value="Tuesday">Tuesday</Option>
          <Option value="Wednesday">Wednesday</Option>
          <Option value="Thursday">Thursday</Option>
          <Option value="Friday">Friday</Option>
          <Option value="Saturday">Saturday</Option>
          <Option value="Sunday">Sunday</Option>
          <Option value="Public holiday">Public holiday</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Transfer from</h5>

      <Form.Item
        name="transfer_locations_from"
        label="Transfer - Locations        "
        rules={[
          {
            message: "Please select Transfer - Locations",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="Gatwick Airport">Gatwick Airport</Option>
          <Option value="London City Airport">London City Airport</Option>
          <Option value="Heathrow Airport">Heathrow Airport</Option>
          <Option value="Luton Airport">Luton Airport</Option>
          <Option value="Stansted Airport">Stansted Airport</Option>
          <Option value="Southend Airport">Southend Airport</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="accommodation_categories_from"
        label="Accommodation-Categories        "
        rules={[
          {
            message: "Please select Accommodation-Categories            ",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="Executive Zone 1/2">Executive Zone 1/2</Option>
          <Option value="Homestay Zone 1">Homestay Zone 1</Option>
          <Option value="Superior Zone 2/3">Superior Zone 2/3</Option>
          <Option value="Standard Zone 3/4">Standard Zone 3/4</Option>
          <Option value="Under 18 Zones 2&3">Under 18 Zones 2&3</Option>
          <Option value="Axo Islington">Axo Islington</Option>
          <Option value="Axo Camden">Axo Camden</Option>
          <Option value="Chapter Portobello">Chapter Portobello</Option>
          <Option value="Drapery/Liberty Plaza">Drapery/Liberty Plaza</Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Transfer to</h5>

      <Form.Item
        name="transfer_locations_to"
        label="Transfer - Locations        "
        rules={[
          {
            message: "Please select Transfer - Locations",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="Gatwick Airport">Gatwick Airport</Option>
          <Option value="London City Airport">London City Airport</Option>
          <Option value="Heathrow Airport">Heathrow Airport</Option>
          <Option value="Luton Airport">Luton Airport</Option>
          <Option value="Stansted Airport">Stansted Airport</Option>
          <Option value="Southend Airport">Southend Airport</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="accommodation_categories_to"
        label="Accommodation-Categories        "
        rules={[
          {
            message: "Please select Accommodation-Categories            ",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="Executive Zone 1/2">Executive Zone 1/2</Option>
          <Option value="Homestay Zone 1">Homestay Zone 1</Option>
          <Option value="Superior Zone 2/3">Superior Zone 2/3</Option>
          <Option value="Standard Zone 3/4">Standard Zone 3/4</Option>
          <Option value="Under 18 Zones 2&3">Under 18 Zones 2&3</Option>
          <Option value="Axo Islington">Axo Islington</Option>
          <Option value="Axo Camden">Axo Camden</Option>
          <Option value="Chapter Portobello">Chapter Portobello</Option>
          <Option value="Drapery/Liberty Plaza">Drapery/Liberty Plaza</Option>
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

export default Settings;
