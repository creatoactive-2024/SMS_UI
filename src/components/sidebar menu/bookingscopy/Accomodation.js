import React, { useEffect, useState } from 'react';
import { Form, Select, InputNumber, notification, DatePicker } from 'antd';
import moment from 'moment';
import { SubmitCancelButtonGroup } from '../commonComponents/ButtonsDropdown';

const { Option } = Select;

const Accomodation = ({
  onFinish,
  recordData,
  handleNewModalCancel,
  CancelBothModel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!recordData) return;

    // Populate form fields when editing
    form.setFieldsValue({
      accommodation: (recordData.accommodation || "").trim(),
      room: recordData.room || "",
      board: recordData.board || "",
      no_of_weeks_accommodation: recordData.no_of_weeks_accommodation || "",
      accommodation_from_date: recordData.accommodation_from_date
        ? moment(recordData.accommodation_from_date)
        : null,
      accommodation_to_date: recordData.accommodation_to_date
        ? moment(recordData.accommodation_to_date)
        : null,
    });
  }, [recordData, form]);

  // ✅ Auto-calc end date when start date or weeks change
  const updateEndDate = () => {
    const startDate = form.getFieldValue("accommodation_from_date");
    const weeks = form.getFieldValue("no_of_weeks_accommodation");

    if (startDate && weeks) {
const newEndDate = moment(startDate).add(weeks, 'weeks').subtract(1, 'day'); // Sept 7
      form.setFieldsValue({ accommodation_to_date: newEndDate });
    }
  };

  const handleFinish = (values) => {
    try {
      const payload = {
        ...values,
        no_of_weeks_accommodation: values.no_of_weeks_accommodation
          ? Number(values.no_of_weeks_accommodation)
          : null,
        accommodation_from_date: values.accommodation_from_date
          ? values.accommodation_from_date.toDate()
          : null,
        accommodation_to_date: values.accommodation_to_date
          ? values.accommodation_to_date.toDate()
          : null,
      };

      console.log("Form Payload:", payload);
      onFinish(payload);
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Error",
        description: err.message || "Failed to save accommodation details",
      });
    }
  };

  const resetAllFields = () => {
    form.resetFields();
  };

  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: 'normal' } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Accommodation"
        name="accommodation"
        rules={[{ required: true, message: "Please select accommodation!" }]}
      >
        <Select placeholder="Select a accommodation">
          <Option value="No accommodation">No accommodation</Option>
          <Option value="Student Residences Zone 3">Student Residences Zone 3</Option>
          <Option value="Student Residences Zone 2">Student Residences Zone 2</Option>
          <Option value="Student Residences Zone 1">Student Residences Zone 1</Option>
          <Option value="Standard Single Zone 3/4 Homestay (Shared bathroom)">
            Standard Single Zone 3/4 Homestay (Shared bathroom)
          </Option>
          <Option value="Standard Single Zone 2 Homestay (Shared bathroom)">
            Standard Single Zone 2 Homestay (Shared bathroom)
          </Option>
          <Option value="Residence Offer">Residence Offer</Option>
          <Option value="Zone 1/2 Homestay (Shared bathroom)">Zone 1/2 Homestay (Shared bathroom)</Option>
          <Option value="Zone 3 Homestay (Shared bathroom)">Zone 3 Homestay (Shared bathroom)</Option>
          <Option value="Zone 4 Homestay (Shared bathroom)">Zone 4 Homestay (Shared bathroom)</Option>
          <Option value="Under 18 Zones 2/3 Homestay">Under 18 Zones 2/3 Homestay</Option>
          <Option value="Under 18 Zones 3/4 Homestay">Under 18 Zones 3/4 Homestay</Option>
          <Option value="Flat Share Offer">Flat Share Offer</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Room"
        name="room"
        rules={[{ required: true, message: "Please select room!" }]}
      >
        <Select placeholder="Select room">
          <Option value="room 1">Room 1</Option>
          <Option value="room 2">Room 2</Option>
          <Option value="room 3">Room 3</Option>
          <Option value="room 4">Room 4</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Board"
        name="board"
        rules={[{ required: true, message: "Please select board!" }]}
      >
        <Select placeholder="Select board">
          <Option value="full board">Full Board</Option>
          <Option value="breakfast and dinner">Breakfast and Dinner</Option>
          <Option value="self catering (18+ only)">Self Catering (18+ only)</Option>
          <Option value="breakfast only">Breakfast Only</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Number of weeks"
        name="no_of_weeks_accommodation"
        rules={[
          { required: true, message: "Please enter number of weeks!" },
          { type: "number", min: 1, max: 44, message: "Value must be between 1 and 44!" },
        ]}
      >
        <InputNumber 
          min={1} 
          max={44} 
          style={{ width: '100%' }} 
          onChange={updateEndDate} // ✅ recalc on weeks change
        />
      </Form.Item>

      <Form.Item
        label="From"
        name="accommodation_from_date"
        rules={[{ required: true, message: "Please select date!" }]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="dd/mm/yyyy"
          style={{ width: "30%" }}
          onChange={updateEndDate} // ✅ recalc on start date change
        />
      </Form.Item>

      <Form.Item
        label="End"
        name="accommodation_to_date"
        rules={[{ required: true, message: "Please select date!" }]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="dd/mm/yyyy"
          style={{ width: "30%" }}
        />
      </Form.Item>

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel1}
      />
    </Form>
  );
};

export default Accomodation;
