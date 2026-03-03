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
  Button,
  Alert,
  List,
} from "antd";
import {
  AiOutlineFileText,
  AiOutlineSafety,
  AiOutlineSetting,
} from "react-icons/ai";
import axios from "axios";
import baseURL from "../../../../config";
import { Link } from "react-router-dom";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../../commonComponents/DeleteApi";
import {
  SaveBtn,
  UpdateBtn,
  SearchInput,
  AddEditDelete,
} from "../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const { Option } = Select;

const NumberRange = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  //   const [activeKey, setActiveKey] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  //   const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({});

  const [form] = Form.useForm();

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

  //-----------------new button functions-------------------------------
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
  //-------------------------edit button functions-------------------
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
        collectionName: "numberranges",
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

  //-----------------------delete button functions-------------------------------
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
      "numberranges",
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

  const handleAccessRights = () => {
    // Logic to export data as CSV
    message.success("Access Rights logic goes here");
  };
  const handleSettings = () => {
    // Logic to export data as CSV
    message.success("Settings logic goes here");
  };
  const handleAssignments = () => {
    // Logic to export data as CSV
    message.success("Assignments logic goes here");
  };

  const data1 = [
    "Day of the month starting with zero:%d",
    "Month displayed as a number:%m",
    "Year as a 2-digit number:%y",
    "Year as a 4-digit number:%Y",
  ];

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
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
            <Button icon={<AiOutlineSetting />} onClick={handleSettings}>
              Settings
            </Button>
            <Button icon={<AiOutlineFileText />} onClick={handleAssignments}>
              Assignments
            </Button>
            <Button icon={<AiOutlineSafety />} onClick={handleAccessRights}>
              Access Rights
            </Button>
          </Space>
        </div>

        <Modal
          title="Add New Number range"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name!" }]}
            >
              <Input placeholder="enter name" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select category!" }]}
            >
              {/* <Select placeholder="Select Category">
                <Option value="option1">option1</Option>
                <Option value="option2">option2</Option>
              </Select> */}
              <Input placeholder="Enter category" />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Initial value of counter&nbsp;
                  <Tooltip title="Initial value of counter">
                    <AiOutlineQuestionCircle />
                  </Tooltip>
                </span>
              }
              name="initial_counter"
              rules={[
                {
                  required: true,
                  message: "Please enter Initial value of counter!",
                },
              ]}
            >
              <Input placeholder="enter Initial value of counter" />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Start value of counter&nbsp;
                  <Tooltip title="Start value of counter">
                    <AiOutlineQuestionCircle />
                  </Tooltip>
                </span>
              }
              name="start_counter"
              rules={[
                {
                  required: true,
                  message: "Please enter Start value of counter!",
                },
              ]}
            >
              <Input placeholder="enter Start value of counter" />
            </Form.Item>

            <Form.Item
              label="Minimum number of digits of the counter"
              name="minimum_counter"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter Minimum number of digits of the counter!",
                },
              ]}
            >
              <Input placeholder="0" />
            </Form.Item>

            <Form.Item
              label="Number format"
              name="number_format"
              rules={[
                { required: true, message: "Please enter Number format!" },
              ]}
            >
              <Input placeholder="enter Number format" />
            </Form.Item>

            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <Alert
                message="Available placeholders for customising document name"
                description={
                  <List
                    size="small"
                    dataSource={data1}
                    renderItem={(item) => (
                      <List.Item>
                        <span
                          style={{
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        >
                          •
                        </span>
                        {item}
                      </List.Item>
                    )}
                  />
                }
                type="info"
                showIcon
              />
            </Space>
            <br />
            <br />

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit Number range"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name!" }]}
            >
              <Input placeholder="enter name" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select category!" }]}
            >
              {/* <Select placeholder="Select Category">
                <Option value="option1">option1</Option>
                <Option value="option2">option2</Option>
              </Select> */}
              <Input placeholder="Enter category" />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Initial value of counter&nbsp;
                  <Tooltip title="Initial value of counter">
                    <AiOutlineQuestionCircle />
                  </Tooltip>
                </span>
              }
              name="initial_counter"
              rules={[
                {
                  required: true,
                  message: "Please enter Initial value of counter!",
                },
              ]}
            >
              <Input placeholder="enter Initial value of counter" />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Start value of counter&nbsp;
                  <Tooltip title="Start value of counter">
                    <AiOutlineQuestionCircle />
                  </Tooltip>
                </span>
              }
              name="start_counter"
              rules={[
                {
                  required: true,
                  message: "Please enter Start value of counter!",
                },
              ]}
            >
              <Input placeholder="enter Start value of counter" />
            </Form.Item>

            <Form.Item
              label="Minimum number of digits of the counter"
              name="minimum_counter"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter Minimum number of digits of the counter!",
                },
              ]}
            >
              <Input placeholder="0" />
            </Form.Item>

            <Form.Item
              label="Number format"
              name="number_format"
              rules={[
                { required: true, message: "Please enter Number format!" },
              ]}
            >
              <Input placeholder="enter Number format" />
            </Form.Item>

            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <Alert
                message="Available placeholders for customising document name"
                description={
                  <List
                    size="small"
                    dataSource={data1}
                    renderItem={(item) => (
                      <List.Item>
                        <span
                          style={{
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        >
                          •
                        </span>
                        {item}
                      </List.Item>
                    )}
                  />
                }
                type="info"
                showIcon
              />
            </Space>
            <br />
            <br />

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

export default NumberRange;
