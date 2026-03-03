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
  Row,
  Col,
  DatePicker,
  Button,
  Divider,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

import axios from "axios";
import baseURL from "../../../config";
import { Link } from "react-router-dom";
import { fetchDataCommon } from "../commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../commonComponents/DeleteApi";
import {
  SaveBtn,
  UpdateBtn,
  SearchInput,
  AddEditDelete,
  CsvExcelImport1,
} from "../../sidebar menu/commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../commonComponents/CreateUpdateApi";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const ContactAdmin = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [filterValue1, setFilterValue1] = useState(null);

  const [form] = Form.useForm();

  //------------filter functions----------------------
  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  //----------------table functions-----------------------

  const fetchData = async () => {
    // Call the common fetch API with the selected record IDs
    await fetchDataCommon(
      "contactadmins",
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
    }
  };

  const onFinish = async () => {
    const values = form.getFieldsValue();

    // Replace the hardcoded values with dynamic ones from your form or other sources
    const collectionName = "contactadmins";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      salutation: values.salutation || null,
      first_name: values.first_name || null,
      surname: values.surname || null,
      dob: values.dob || null,
      email: values.email || null,
      phone: values.phone || null,
      fax: values.fax || null,
      skype: values.skype || null,
      address: values.address?.map((item) => item.address) || [], // Extract address values from the array

      // address: values.address || null,
      note: values.note || null,
      course_info_givenby: values.course_info_givenby || null,
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
      render: () => null, // Render an empty cell to hide the content
      fixed: "left", // Fix this column to the left to keep it visible
      width: 0, // Set the width to 0 to make it effectively hidden
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        name: `${entry.first_name} ${entry.surname}` || null,
        email: entry.email || null,
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
        collectionName: "contactadmins",
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
      const addressValues = editingRecordData.address.map((address, index) => ({
        key: index, // Assuming each address item has a unique key
        address: address, // Assuming the address is stored as a string
      }));

      form.setFieldsValue({
        ...editingRecordData,
        dob: editingRecordData.dob ? moment(editingRecordData.dob) : null,
        address: addressValues, // Set the address field values
      });
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

  //----------------delete record---------------------------------

  const handleDeleteModalOk = async () => {
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "contactadmins",
      selectedRowKeys,
      fetchData,
      setDeleteModalVisible
    );
  };

  const handleDeleteModalCancel = () => {
    // Close the delete confirmation modal without performing the deletion
    setDeleteModalVisible(false);
  };

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const CancelBothModel = () => {
    setNewModalVisible(false);
    setEditModalVisible(false);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Admin</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Contact</Breadcrumb.Item>
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
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
            <Select
              style={{ width: 120 }}
              placeholder="--Type--"
              onChange={handleFilter1Change}
              value={filterValue1}
            >
              <Option value="All">All</Option>
              <Option value="Normal">Normal</Option>
              <Option value="Internal">Internal </Option>
            </Select>{" "}
          </Space>
          <Space>
            <CsvExcelImport1
              handleCsvExport={handleCsvExport}
              handleExcelExport={handleExcelExport}
            />
          </Space>
        </div>

        <Modal
          title="Add New Contact"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null}
        >
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Row justify="center" style={{ marginTop: "24px" }}>
              <Col span={12}>
                <Form.Item
                  label="Salutation"
                  name="salutation"
                  rules={[
                    { required: true, message: "Please select Salutation!" },
                  ]}
                >
                  {/* <Select
                    placeholder="SELECT Salutation"
                    onChange={handleChange}
                  >
                    <Option value="Option 1">Option 1</Option>
                    <Option value="Option 2">Option 2</Option>
                    <Option value="Option 3">Option 3</Option>
                  </Select> */}
                  <Input placeholder="Enter salutation" />
                </Form.Item>
                <Form.Item
                  label="First name"
                  name="first_name"
                  rules={[
                    { required: true, message: "Please enter the First name!" },
                  ]}
                >
                  <Input placeholder="Enter First name" />
                </Form.Item>
                <Form.Item
                  label="Surname"
                  name="surname"
                  rules={[
                    { required: true, message: "Please enter the Surname!" },
                  ]}
                >
                  <Input placeholder="Enter surname" />
                </Form.Item>

                <Form.Item label="Date of birth" name="dob">
                  <DatePicker style={{ width: 318 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input type="email" placeholder="Enter email" />
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                  <Input type="number" placeholder="Enter phone" />
                </Form.Item>
                <Form.Item label="Fax" name="fax">
                  <Input placeholder="Enter fax" />
                </Form.Item>
                <Form.Item label="Skype" name="skype">
                  <Input placeholder="Enter skype" />
                </Form.Item>
              </Col>
            </Row>

            <hr />
            <h5>Addresses</h5>
            <Form.List name="address">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key} style={{ display: "flex", marginBottom: 8 }}>
                      <Form.Item
                        {...restField}
                        label="Address"
                        name={[name, "address"]}
                        fieldKey={[fieldKey, "address"]}
                        style={{ marginRight: 8, flex: 1 }}
                      >
                        <Input placeholder="Enter address" />
                      </Form.Item>

                      <Button
                        type="link"
                        style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                        onClick={() => remove(name)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                  {/* <Divider />

                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add address
                  </Button>
                </Form.Item> */}
                </>
              )}
            </Form.List>
            <hr />
            <h5>other</h5>

            <Form.Item label="Note" name="note">
              <TextArea placeholder="Enter note" />
            </Form.Item>

            <Form.Item
              label="Course information given by"
              name="course_info_givenby"
              rules={[
                {
                  required: true,
                  message: "Please select Course information given by!",
                },
              ]}
            >
              {/* <Select placeholder="SELECT..." onChange={handleChange}>
                <Option value="Option 1">Option 1</Option>
                <Option value="Option 2">Option 2</Option>
                <Option value="Option 3">Option 3</Option>
              </Select> */}
              <Input placeholder="Enter Course information given by" />
            </Form.Item>

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit Contact"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
          footer={null}
        >
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Row justify="center" style={{ marginTop: "24px" }}>
              <Col span={12}>
                <Form.Item
                  label="Salutation"
                  name="salutation"
                  rules={[
                    { required: true, message: "Please select Salutation!" },
                  ]}
                >
                  {/* <Select
                    placeholder="SELECT Salutation"
                    onChange={handleChange}
                  >
                    <Option value="Option 1">Option 1</Option>
                    <Option value="Option 2">Option 2</Option>
                    <Option value="Option 3">Option 3</Option>
                  </Select> */}
                  <Input placeholder="Enter salutation" />
                </Form.Item>
                <Form.Item
                  label="First name"
                  name="first_name"
                  rules={[
                    { required: true, message: "Please enter the First name!" },
                  ]}
                >
                  <Input placeholder="Enter First name" />
                </Form.Item>
                <Form.Item
                  label="Surname"
                  name="surname"
                  rules={[
                    { required: true, message: "Please enter the Surname!" },
                  ]}
                >
                  <Input placeholder="Enter surname" />
                </Form.Item>

                <Form.Item label="Date of birth" name="dob">
                  <DatePicker style={{ width: 318 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input type="email" placeholder="Enter email" />
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                  <Input type="number" placeholder="Enter phone" />
                </Form.Item>
                <Form.Item label="Fax" name="fax">
                  <Input placeholder="Enter fax" />
                </Form.Item>
                <Form.Item label="Skype" name="skype">
                  <Input placeholder="Enter skype" />
                </Form.Item>
              </Col>
            </Row>

            <hr />
            <h5>Addresses</h5>
            <Form.List name="address">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key} style={{ display: "flex", marginBottom: 8 }}>
                      <Form.Item
                        {...restField}
                        label="Address"
                        name={[name, "address"]}
                        fieldKey={[fieldKey, "address"]}
                        style={{ marginRight: 8, flex: 1 }}
                      >
                        <Input placeholder="Enter address" />
                      </Form.Item>

                      <Button
                        type="link"
                        style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                        onClick={() => remove(name)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                  {/* <Divider />

                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add address
                  </Button>
                </Form.Item> */}
                </>
              )}
            </Form.List>
            <hr />
            <h5>other</h5>

            <Form.Item label="Note" name="note">
              <TextArea placeholder="Enter note" />
            </Form.Item>

            <Form.Item
              label="Course information given by"
              name="course_info_givenby"
              rules={[
                {
                  required: true,
                  message: "Please select Course information given by!",
                },
              ]}
            >
              {/* <Select placeholder="SELECT..." onChange={handleChange}>
                <Option value="Option 1">Option 1</Option>
                <Option value="Option 2">Option 2</Option>
                <Option value="Option 3">Option 3</Option>
              </Select> */}
              <Input placeholder="Enter Course information given by" />
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

export default ContactAdmin;
