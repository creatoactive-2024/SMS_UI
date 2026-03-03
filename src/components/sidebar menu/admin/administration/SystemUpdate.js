import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Select,
  Breadcrumb,
  Form,
  Button,
  Alert,
} from "antd";

import axios from "axios";
import baseURL from "../../../../config";
import { Link } from "react-router-dom";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";

import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";

import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const SystemUpdate = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({});

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
  

 

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Admin</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Administration</Breadcrumb.Item>
        <Breadcrumb.Item>Number Range</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      
      <h5>Logged in users</h5>
      <Spin spinning={loading}>
        <Table
        //   rowSelection={{
        //     selectedRowKeys,
        //     onChange: onSelectChange,
        //     fixed: true,
        //   }}
          columns={visibleColumns}
          dataSource={transformedData}
          rowKey={(record) => record._id} // Use a unique key for each row
          scroll={{ x: "max-content" }}
        />
      </Spin>
<hr/>
      <Form
        {...formLayout}
        onFinish={onFinish}
        initialValues={formValues}
        form={form}
      >
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter message!" }]}
        >
          <TextArea placeholder="enter message" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <div style={{ marginRight: "8px", display: "inline-block" }}>
            <Button type="primary" htmlType="submit">
              Send Message
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select placeholder="Select Category">
            <Option value="option1">option1</Option>
            <Option value="option2">option2</Option>
          </Select>
        </Form.Item>

        <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <Alert
                message="All users are logged out after starting the update. A login is just possible once the update is properly performed."
                // description={
                //   <List
                //     size="small"
                //     dataSource={data1}
                //     renderItem={(item) => (
                //       <List.Item>
                //         <span
                //           style={{
                //             display: "inline-block",
                //             marginRight: "5px",
                //           }}
                //         >
                //           •
                //         </span>
                //         {item}
                //       </List.Item>
                //     )}
                //   />
                // }
                type="info"
                showIcon
              />
            </Space>
            <br />
            <br />

      </Form>

<h5>System Updates (New features and maintenance)</h5>
<p>No new updates available</p>

<h5>Database Update (Translation)</h5>
<p>Last change in regards to translation : </p>


    </>
  );
};

export default SystemUpdate;
