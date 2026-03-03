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
} from "antd";

import axios from "axios";
import baseURL from "../../../config";
import { Link } from "react-router-dom";
import englishFlag from "../../../components/img/englishFlag.png";
import portugeseFlag from "../../../components/img/Portugal-flag.png";
import spanishFlag from "../../../components/img/Spain-flag.png";
import { fetchDataCommon } from "../commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../commonComponents/DeleteApi";
import {
  AddEditDeleteDeactivate,
  SaveBtn,
  UpdateBtn,
  SearchInput,
} from "../../sidebar menu/commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../commonComponents/CreateUpdateApi";

const { Option } = Select;

const TransferLocation = () => {
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

  const [filterValue3, setFilterValue3] = useState(null);

  const [form] = Form.useForm();

  //----------------filter functions-----------------

  const handleFilter3Change = (value) => {
    setFilterValue3(value);
  };

  //----------------table functions------------

  const fetchData = async () => {
    // Call the common fetch API with the selected record IDs
    await fetchDataCommon(
      "transferlocations",
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
      title: "Name",
      dataIndex: "name_english",
      key: "name_english",
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "Schools",
      dataIndex: "schools",
      key: "schools",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        name_english: `${entry.name_english}` || null,
        nickname: entry.nickname || null,
        schools: entry.schools || null,
      }))
    : [];
  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

  //----------------edit button functions-----------
  const handleEditModalOpen = () => {
    setEditModalVisible(true);

    // Set the active tab based on whether a record is being edited
    // const activeKey = editingRecordData ? "1" : "2";
    // setActiveKey(activeKey);
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
        collectionName: "transferlocations",
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
      form.setFieldsValue({
        name_english: editingRecordData.name_english || null,
        // name_portuguese: editingRecordData.name_portuguese || null,
        // name_spanish: editingRecordData.name_spanish || null,
        nickname: editingRecordData.nickname || null,
        schools: editingRecordData.schools || null,
        address: editingRecordData.address || null,
      });
    }
  }, [editingRecordData, form]);

  const onFinish = async () => {
    const values = form.getFieldsValue();

    // Replace the hardcoded values with dynamic ones from your form or other sources
    const collectionName = "transferlocations";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      name_english: values.name_english || null,
      name_portuguese: values.name_portuguese || null,
      name_spanish: values.name_spanish || null,
      nickname: values.nickname || null,
      schools: values.schools || null,
      address: values.address || null,
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

  //---------------delete record---------------------------
  const handleDeleteModalOk = async () => {
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "transferlocations",
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
          <Link to="">Transfer</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Transfer Location</Breadcrumb.Item>
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
            <AddEditDeleteDeactivate
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
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
            {/* New dropdowns for filtering */}

            <Select
              style={{ width: 120 }}
              placeholder="--Validity--"
              onChange={handleFilter3Change}
              value={filterValue3}
            >
              <Option value="activated">Activated</Option>
              <Option value="deactivated">Deactivated</Option>
              {/* Add more options as needed */}
            </Select>

            <Select
              style={{ width: 120 }}
              placeholder="--Schools--"
              onChange={handleFilter3Change}
              value={filterValue3}
            >
              <Option value="speakuplondon">SpeeakUpLondon</Option>
              {/* Add more options as needed */}
            </Select>
          </Space>
        </div>

        <Modal
          title="Add New Transfer Locatioins"
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
              label="Name"
              name="name_english"
              rules={[{ required: true, message: "Please enter the name!" }]}
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
                <Form.Item name="name_english" noStyle>
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
              name="name_spanish"
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
                <Form.Item name="name_spanish" noStyle>
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
              name="name_portuguese"
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
                <Form.Item name="name_portuguese" noStyle>
                  <Input
                    style={{
                      paddingLeft: "42px",
                    }}
                  />
                </Form.Item>
              </div>
            </Form.Item> */}

            <Form.Item
              label="Nickname"
              name="nickname"
              rules={[
                { required: true, message: "Please enter the Nickname!" },
              ]}
            >
              <Input placeholder="Enter Nickname" />
            </Form.Item>

            <Form.Item
              name="schools"
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

            <Form.Item label="Address" name="address">
              <Input placeholder="Enter Address" />
            </Form.Item>

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit Transfer Locatioins"
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
              label="Name"
              name="name_english"
              rules={[{ required: true, message: "Please enter the name!" }]}
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
                <Form.Item name="name_english" noStyle>
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
              name="name_spanish"
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
                <Form.Item name="name_spanish" noStyle>
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
              name="name_portuguese"
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
                <Form.Item name="name_portuguese" noStyle>
                  <Input
                    style={{
                      paddingLeft: "42px",
                    }}
                  />
                </Form.Item>
              </div>
            </Form.Item> */}

            <Form.Item
              label="Nickname"
              name="nickname"
              rules={[
                { required: true, message: "Please enter the Nickname!" },
              ]}
            >
              <Input placeholder="Enter Nickname" />
            </Form.Item>

            <Form.Item
              name="schools"
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

            <Form.Item label="Address" name="address">
              <Input placeholder="Enter Address" />
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

export default TransferLocation;
