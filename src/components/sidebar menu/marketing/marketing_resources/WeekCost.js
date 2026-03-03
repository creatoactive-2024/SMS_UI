import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Space,
  Modal,
  message,
  Select,
  Breadcrumb,
  Form,
  Checkbox,
} from "antd";

import axios from "axios";
import baseURL from "../../../../config";
import { Link } from "react-router-dom";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";
import {
  SaveBtn,
  UpdateBtn,
  SearchInput,
  AddEditDelete,
  CsvExcelImport,
} from "../../commonComponents/ButtonsDropdown";
import { handleDelete } from "../../commonComponents/DeleteApi";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";

const { Option } = Select;

const WeekCost = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState(null);

  const [form] = Form.useForm();

  const fetchData = async () => {
    // Call the common fetch API with the selected record IDs
    await fetchDataCommon("weekcosts", setData, setSelectedRowKeys, setLoading);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Schools",
      dataIndex: "school_name",
      key: "school_name",
    },
    {
      title: "Additional week",
      dataIndex: "additional_lesson",
      key: "additional_lesson",
    },
    {
      title: "Starting week",
      dataIndex: "starting_lesson",
      key: "starting_lesson",
    },
    {
      title: "Number of weeks",
      dataIndex: "number_of_lesson",
      key: "number_of_lesson",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        title: `${entry.title}` || null,
        school_name: Array.isArray(entry.school_name)
          ? entry.school_name.join(", ")
          : entry.school_name || null,
        additional_lesson: entry.additional_lesson || null,
        starting_lesson: entry.starting_lesson || null,
        number_of_lesson: entry.number_of_lesson || null,
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
        collectionName: "weekcosts",
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

  const onFinish = async () => {
    const values = form.getFieldsValue();

    // Replace the hardcoded values with dynamic ones from your form or other sources
    const collectionName = "weekcosts";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      title: values.title || null,
      school_name: values.school_name || null,
      starting_lesson: values.starting_lesson || null,
      number_of_lesson: values.number_of_lesson || null,
      additional_lesson: values.additional_lesson ? "yes" : "no",
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
    setSelectedRecordId(null);
    setNewModalVisible(true);
    setSelectedRowKeys([]);
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
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "weekcosts",
      selectedRowKeys,
      fetchData,
      setDeleteModalVisible
    );
  };

  const handleDeleteModalCancel = () => {
    // Close the delete confirmation modal without performing the deletion
    setDeleteModalVisible(false);
  };

  const CancelBothModel = () => {
    setNewModalVisible(false);
    setEditModalVisible(false);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Marketing</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Resourses</Breadcrumb.Item>
        <Breadcrumb.Item>Week Cost</Breadcrumb.Item>
      </Breadcrumb>
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
          <Space>
            <SearchInput />
          </Space>
          <Space>
            <AddEditDelete
              onClickNew={handleNewModalOpen}
              onClickEdit={handleEditButtonClick}
              onClickDelete={handleDeleteButtonClick}
            />
          </Space>
        </div>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Space>
            <CsvExcelImport
              handleCsvExport={handleCsvExport}
              handleExcelExport={handleExcelExport}
            />
          </Space>
        </div>

        <Modal
          title="Add New week(cost)"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null}
        >
          {/* Ant Design Form */}
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please select title!" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item
              name="school_name"
              label="Schools"
              rules={[
                {
                  required: true,
                  message: "Please select schools",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="SpeakUp London">SpeakUp London</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Starting week"
              name="starting_lesson"
              rules={[
                { required: true, message: "Please select Starting week!" },
              ]}
            >
              <Input placeholder="Enter starting week" />
            </Form.Item>

            <Form.Item label="Number of weeks" name="number_of_lesson">
              <Input placeholder="Enter number of weeks" />
            </Form.Item>

            <Form.Item
              label="Additional week"
              name="additional_lesson"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit week(cost)"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
          footer={null}
        >
          {/* Ant Design Form */}
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please select title!" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item
              name="school_name"
              label="Schools"
              rules={[
                {
                  required: true,
                  message: "Please select schools",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="SpeakUp London">SpeakUp London</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Starting week"
              name="starting_lesson"
              rules={[
                { required: true, message: "Please select Starting week!" },
              ]}
            >
              <Input placeholder="Enter starting week" />
            </Form.Item>

            <Form.Item label="Number of weeks" name="number_of_lesson">
              <Input placeholder="Enter number of weeks" />
            </Form.Item>

            <Form.Item
              label="Additional week"
              name="additional_lesson"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <UpdateBtn CancelBothModel={CancelBothModel} />
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

        <Spin spinning={loading}>
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
        </Spin>
      </div>
    </>
  );
};

export default WeekCost;
