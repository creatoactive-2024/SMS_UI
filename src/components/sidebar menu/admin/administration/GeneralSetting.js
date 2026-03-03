import React, { useState, useEffect } from "react";
import {
  message,
  Checkbox,
  Select,
  Breadcrumb,
  Form,
  Button,
  Upload,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ChromePicker } from "react-color"; // Import the color picker component

import axios from "axios";
import baseURL from "../../../../config";
import { Link } from "react-router-dom";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";

import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";

import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const GeneralSetting = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({});
  const [currentColor, setCurrentColor] = useState("#ffffff");

  const [form] = Form.useForm();

  //------------filter functions----------------------

  //----------------table functions-----------------------

  const fetchData = async () => {
    // Call the common delete API with the selected record IDs
    await fetchDataCommon(
      "numberranges",
      setData,
      setSelectedRowKeys,
      setLoading
    );
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty depsures the effect runs only once on mount

  // Log the data after it has been set in the state
  useEffect(() => {
    console.log("check data", data);
  }, [data]);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onFinish = async () => {
    const values = form.getFieldsValue();

    // Replace the hardcoded values with dynamic ones from your form or other sources
    const collectionName = "numberranges";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      name: values.name || null,
      category: values.category || null,
      initial_counter: values.initial_counter || null,
      start_counter: values.start_counter || null,
      minimum_counter: values.minimum_counter || null,
      number_format: values.number_format || null,
    };
    // Call the common API function with dynamic collection name and data
    await CommonFormSubmit(
      collectionName,
      setSelectedRecordId,
      data,
      setNewModalVisible,
      setEditModalVisible,
      form,
      fetchData,
      setErrorMessage,
      setSuccessMessage
    );
  };

  // Form layout settings
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: () => null,
      fixed: "left",
      width: 0,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User group",
      dataIndex: "user_group",
      key: "user_group",
    },
    {
      title: "Last action",
      dataIndex: "last_action",
      key: "last_action",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        name: `${entry.name} ` || null,
      }))
    : [];

  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Admin</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Administration</Breadcrumb.Item>
        <Breadcrumb.Item>General Setting</Breadcrumb.Item>
      </Breadcrumb>
      <hr />

      <h5>General Settings for all of your schools</h5>

      <hr />
      <Form
        {...formLayout}
        onFinish={onFinish}
        initialValues={formValues}
        form={form}
      >
        <Form.Item label="Client" name="client">
          <Select placeholder="Select client">
            <Option value="option1">option1</Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Show students in lists" name="">
          <Select placeholder="Select Show students in lists">
            <Option value="show confirmed students without proforma / invoice">
              show confirmed students without proforma / invoice
            </Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Confirm bookings automatically" name="">
          <Select placeholder="Select Confirm bookings automatically">
            <Option value="All">All</Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Price structure for insurance (if weekly)" name="">
          <Select placeholder="Select...">
            <Option value="Regular price structure">
              Regular price structure
            </Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="User-defined flexibility (Sorting and deactivating columns)"
          name=""
          valuePropName="checked"
        >
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item
          label="Automatically format phone numbers "
          name=""
          valuePropName="checked"
        >
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item
          label="Automatically offset payments when credit notes are issued "
          name=""
          valuePropName="checked"
        >
          <Checkbox></Checkbox>
        </Form.Item>

        <Form.Item
          name=""
          label="Logo for all schools (Individuals logos are overwritten)"
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="current logo"
          name="current_logo"
          valuePropName="checked"
        >
          {/* <Checkbox></Checkbox> */}
        </Form.Item>

        <Form.Item label="Time zone" name="time_zone">
          <Select placeholder="Select Time zone">
            <Option value="Europe/London">Europe/London</Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Execution time of accommodation payment entries"
          name="exe_time_acc_payment"
        >
          <Select placeholder="00:00:00">
            <Option value="option1">option1</Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Update of statistic cache" name="update_stat_cache">
          <Select placeholder="00:00:00">
            <Option value="option1">option1</Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>
        <Form.Item label="System colour" name="system_colour">
          <Input
            placeholder="Enter System colour"
            value={form.getFieldValue("code")}
            readOnly
          />
          <ChromePicker
            color={currentColor}
            onChange={(color) => {
              setCurrentColor(color.hex);
              form.setFieldsValue({
                code: color.hex,
              });
            }}
          />
        </Form.Item>

        <Form.Item label="Password strength" name="password_strength">
          <Select placeholder="Select Password strength">
            <Option value="Weak">Weak</Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Available frontend languages" name="available_lang">
          <Select
            mode="multiple"
            placeholder="Select Available frontend languages"
          >
            <Option value="option1">option1</Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>

        {/*  */}

        {/* 
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter message!" }]}
        >
          <TextArea placeholder="enter message" />
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <div style={{ marginRight: "8px", display: "inline-block" }}>
            <Button type="primary" htmlType="submit">
              Send Message
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default GeneralSetting;
