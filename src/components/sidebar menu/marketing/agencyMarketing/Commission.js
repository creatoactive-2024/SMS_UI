import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Input,
  Space,
  Modal,
  message,
  Select,
  Form,
  notification,
} from "antd";
import {
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import axios from "axios";
import baseURL from "../../../../config";

const { Option } = Select;

const Commission = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [formValues, setFormValues] = useState({});



  const [form] = Form.useForm();

  

  //----------------table functions------------
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/getdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionName: "commisions",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const responseData = await response.json();

      // Reverse the order of responseData
      const reversedData = responseData.reverse();

      setData(reversedData);
      setSelectedRowKeys([]);

      console.log("Response Data:", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    // Assuming the first selected row contains the desired record ID
    if (selectedRows.length > 0) {
      setSelectedRecordId(selectedRows[0]._id);
    } else {
      setSelectedRecordId(null);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: () => null, // Render an empty cell to hide the content
      fixed: "left", // Fix this column to the left to keep it visible
      width: 0, // Set the width to 0 to make it effectively hidden
    },
    {
      title: "Commission category",
      dataIndex: "",
      key: "",
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Valid from ",
      dataIndex: "valid_from ",
      key: "valid_from ",
    },
    {
      title: "Valid until",
      dataIndex: "valid_until",
      key: "valid_until",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        name: `${entry.name}` || null,
      }))
    : [];

  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

  //----------------edit button functions-----------
  const handleEditModalOpen = () => {
    setEditModalVisible(true);

  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditModalOk = () => {
    // Handle logic when submitting the edit form
    setEditModalVisible(false);
  };

  const handleEditButtonClick = async () => {
    try {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Record ID Before Fetch:", selectedRecordId);

      if (!selectedRecordId) {
        // No record selected, show a message
        Modal.warning({
          title: "Please Select a Record",
          content: "Please select a record to edit.",
        });
        return;
      }

      if (selectedRowKeys.length > 1) {
        // More than one record selected, show a message
        Modal.warning({
          title: "Select Only One Record",
          content: "Please select only one record at a time for editing.",
        });
        return;
      }

      // Send the selected record ID in the request body
      const response = await axios.post(`${baseURL}/getdata`, {
        collectionName: "commisions",
        id: selectedRecordId,
      });

      // The response.data should contain the data for the selected record
      console.log("API Response for Edit:", response.data);

      // Set the editing record data
      setEditingRecordData(response.data);

      // Open the edit modal
      handleEditModalOpen();
    } catch (error) {
      console.error("Error fetching data for edit:", error);
      // Handle the error (show a message or return)
    }
  };

  useEffect(() => {
    if (editingRecordData) {
      form.setFieldsValue(editingRecordData);
    
    }
  }, [editingRecordData, form]);

  const onFinish2 = async () => {
    const values = form.getFieldsValue();

    try {
      // Your API call logic here
      const response = await axios.post(
        `${baseURL}/createdata`,
        [
          {
            collectionName: "commisions",
            data: {
              _id: selectedRecordId,
              name: values.name || null,
            },
          },
        ],
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the API call was successful based on the structure of your response
      if (response.data && response.data[0] && response.data[0].message) {
        // Notify user of success
        notification.success({
          message: "Success",
          description: response.data[0].message,
        });

        // Close the modal
        setEditModalVisible(false);

        // Optionally, reset the form values
        form.resetFields();

        // Refresh data after addition
        fetchData();
      } else {
        // Notify user of failure
        notification.error({
          message: "Error",
          description: "Failed to add course category. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (show message or other error handling)
    }
  };

  //-----------------import export functions------------------
  const handleCsvExport = () => {
    // Logic to export data as CSV
    message.success("CSV export logic goes here");
  };

  const handleExcelExport = () => {
    // Logic to export data as Excel
    message.success("Excel export logic goes here");
  };

  const handleImport = (file) => {
    // Logic to handle file import
    message.success(`File ${file.name} uploaded successfully`);
  };

  const importProps = {
    beforeUpload: (file) => {
      // Disable default upload behavior
      return false;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        handleImport(info.file.originFileObj);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //---------------new button functions-------------------
  const handleNewModalOpen = () => {
    setNewModalVisible(true);
    form.resetFields();
  };
  const handleNewModalOk = async () => {
    try {
      // Use formValues in your API call
      console.log("Form Values:", formValues);

      // Your API call logic here

      // Close the modal
      setNewModalVisible(false);

      // Optionally, reset the form values
      setFormValues({});
    } catch (error) {
      console.error("Error:", error);
      // Handle error (show message or other error handling)
    }
  };

  const onFinish = async () => {
    const values = form.getFieldsValue();

    try {
      // Your API call logic here
      const response = await axios.post(
        `${baseURL}/createdata`,
        [
          {
            collectionName: "commisions",
            data: {
              name: values.name || null,
            },
          },
        ],
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the API call was successful based on the structure of your response
      if (response.data && response.data[0] && response.data[0].message) {
        // Notify user of success
        notification.success({
          message: "Success",
          description: response.data[0].message,
        });

        // Close the modal
        setNewModalVisible(false);

        // Optionally, reset the form values
        form.resetFields();

        // Refresh data after addition
        fetchData();
      } else {
        // Notify user of failure
        notification.error({
          message: "Error",
          description: "Failed to add course category. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (show message or other error handling)
    }
  };

  const handleNewModalCancel = () => {
    // Close the modal without performing any action
    setNewModalVisible(false);

    // Optionally, reset the form values
    setFormValues({});
  };

  // Form layout settings
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  //---------------delete button functions---------------
  const handleDeleteButtonClick = () => {
    if (selectedRowKeys.length === 0) {
      // No record selected, show a warning message
      message.warning("Please select records to delete.");
    } else {
      // Records are selected, show the delete confirmation modal
      setDeleteModalVisible(true);
    }
  };

  const handleDeleteModalOk = async () => {
    try {
      const requestBody = [
        {
          collectionName: "commisions",
          ids: selectedRowKeys,
        },
      ];

      console.log("Request Body:", requestBody);

      // Call the delete API with the selected record IDs
      const response = await axios.post(`${baseURL}/deleteRecord`, requestBody);

      console.log("API Response:", response.data);

      // Handle success (show message, refresh data, etc.)
      message.success("Records deleted successfully");

      // Refresh data after deletion
      fetchData();

      // Close the delete confirmation modal
      setDeleteModalVisible(false);
    } catch (error) {
      console.error("Error deleting records:", error);
      // Handle error (show message or other error handling)
    }
  };

  const handleDeleteModalCancel = () => {
    // Close the delete confirmation modal without performing the deletion
    setDeleteModalVisible(false);
  };

  return (
    <>
      <hr />
      <div>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <Space>
            <Button icon={<AiOutlineQuestionCircle />}>Support</Button>
            <Input
              placeholder="Search"
              prefix={<AiOutlineSearch style={{ marginRight: 8 }} />}
            />
            <Button
              type="primary"
              icon={<AiOutlineFilter />}
              style={{ marginLeft: 8 }}
            >
              Filter
            </Button>
          </Space> */}
          <Space>
            <Button
              type="primary"
              style={{ backgroundColor: "green", borderColor: "#ff4d4f" }}
              icon={<AiOutlinePlusCircle />}
              onClick={handleNewModalOpen}
            >
              New
            </Button>
            <Button
              type="primary"
              icon={<AiOutlineEdit />}
              onClick={handleEditButtonClick}
            >
              Edit
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
              icon={<AiOutlineDelete />}
              onClick={handleDeleteButtonClick}
            >
              Delete
            </Button>
          </Space>
        </div>

        <Modal
          title="Add New "
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
        >
          {/* Ant Design Form */}
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Form.Item label="Title" name="name">
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Edit "
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
        >
          {/* Ant Design Form */}
          <Form
            {...formLayout}
            onFinish={onFinish2}
            initialValues={formValues}
            form={form}
          >
            <Form.Item label="Title" name="name">
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Delete Confirmation"
          visible={deleteModalVisible}
          onOk={handleDeleteModalOk}
          onCancel={handleDeleteModalCancel}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete the selected records?</p>
        </Modal>

        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
            fixed: true,
          }}
          columns={visibleColumns}
          dataSource={transformedData}
          rowKey={(record) => record._id} // Use a unique key for each row
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
};

export default Commission;
