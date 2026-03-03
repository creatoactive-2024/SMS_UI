import React, { useState, useEffect } from "react";
import {
    Form,
  Space,
  Breadcrumb,
  Button,
  Select,
  DatePicker,
  message, Row, Col 
} from "antd";
import { Link } from "react-router-dom";
import { AiOutlineFileExcel } from "react-icons/ai";

const { Option } = Select;
const { RangePicker } = DatePicker;

const FeedbackSums = () => {
  const [filterValue1, setFilterValue1] = useState(null);

  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  const handleExcelExport = () => {
    // Logic to export data as Excel
    message.success("Excel export logic goes here");
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Reporting</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Feedback sums</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <label htmlFor="filter1">Select : : Date </label>
          <label htmlFor="dateRange">From - To: </label>
          <RangePicker id="dateRange" />
          <label htmlFor="dateRange">Based on: </label>
          <Select
            style={{ width: 250 }}
            placeholder="select..."
            onChange={handleFilter1Change}
            value={filterValue1}
          >
            <Option value="Answered">Answered</Option>

            <Option value="option1">option1</Option>
            <Option value="option2">option2</Option>
          </Select>{" "}
        </Space>
        </div>


        <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <Button icon={<AiOutlineFileExcel />} onClick={handleExcelExport}>
            Excel
          </Button>
        </Space>
        </div>
        <hr/>
        <h5>Filter</h5>
        
        
    <Form style={{ width: "100%" }}>
      <Form.Item
        label="Questionnaires"
        name="questionnaires"
        labelCol={{ span: 4, offset: 2 }}
        wrapperCol={{ span: 16 }}
        rules={[{ required: true, message: "Please select an option!" }]}
      >
        <Select style={{ width: "100%" }}>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
          <Option value="option3">Option 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Dependancy"
        name="dependancy"
        labelCol={{ span: 4, offset: 2 }}
        wrapperCol={{ span: 16 }}
        rules={[{ required: true, message: "Please select an option!" }]}
      >
        <Select style={{ width: "100%" }}>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
          <Option value="option3">Option 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Topic"
        name="topic"
        labelCol={{ span: 4, offset: 2 }}
        wrapperCol={{ span: 16 }}
        rules={[{ required: true, message: "Please select an option!" }]}
      >
        <Select style={{ width: "100%" }}>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
          <Option value="option3">Option 3</Option>
        </Select>
      </Form.Item>
    </Form>
    <hr/>
    </>
  );
};
export default FeedbackSums;
