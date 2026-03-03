import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Input,
  Space,
  Modal,
  message,
  Upload,
  Select,
  Breadcrumb,
  Form,
} from "antd";
import {
  AiOutlineUnlock,
  AiOutlineSafety,
  AiOutlineImport,
} from "react-icons/ai";
import { ReloadOutlined, FileTextOutlined } from "@ant-design/icons";
import moment from "moment";
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
  CsvExcelImport1,
} from "../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";

const { Option } = Select;

const OverviewAdmin = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({});

  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const responseData = await FieldListDropdown("countries", "name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Country = responseData
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCountries(Country);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  //------------filter functions----------------------

  //----------------table functions-----------------------

  const fetchData = async () => {
    // Call the common delete API with the selected record IDs
    await fetchDataCommon(
      "overviewadmins",
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
    const collectionName = "overviewadmins";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      categories: values.categories || null,
      first_name: values.first_name || null,
      surname: values.surname || null,
      gender: values.gender || null,
      // dob: values.dob || null,
      email: values.email || null,
      phone: values.phone || null,
      // state: values.state || null,
      // fax: values.fax || null,
      // address: values.address || null,
      // zipcode: values.zipcode || null,
      // city: values.city || null,
      // country: values.country || null,
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
      title: "Last login",
      dataIndex: "last_login",
      key: "last_login",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User group",
      dataIndex: "user_group",
      key: "user_group",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        name: `${entry.first_name} ${entry.surname}` || null,
        last_login: entry.last_login || null,
        email: entry.email || null,
        user_group: entry.user_group || null,
        last_login: entry.last_login || null,
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
        collectionName: "overviewadmins",
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
      const formattedDob = editingRecordData.dob
        ? moment(editingRecordData.dob).format("YYYY-MM-DD")
        : null;

      form.setFieldsValue({
        ...editingRecordData,
        // dob: editingRecordData.dob ? moment(editingRecordData.dob) : null,
        dob: formattedDob,
      });
      // document.getElementById("date-picker-overview").value = formattedDob;
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
      "overviewadmins",
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

  const handleNotes = () => {
    // Logic to export data as CSV
    message.success("Notes logic goes here");
  };

  const handleResetAuthentication = () => {
    // Logic to export data as CSV
    message.success("Reset Authentication logic goes here");
  };

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Admin</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Employees</Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
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
            <Button icon={<AiOutlineUnlock />} onClick={handleCsvExport}>
              Unlock Account
            </Button>
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
            <CsvExcelImport1
              handleCsvExport={handleCsvExport}
              handleExcelExport={handleExcelExport}
            />
            <Upload {...importProps}>
              <Button icon={<AiOutlineImport />}>File Manager</Button>
            </Upload>
          </Space>

          <Space>
            <Button icon={<AiOutlineSafety />} onClick={handleAccessRights}>
              Access Rights
            </Button>
            <Button icon={<FileTextOutlined />} onClick={handleNotes}>
              Notes
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleResetAuthentication}
            >
              RESET Authentication Key
            </Button>
          </Space>
        </div>

        <Modal
          title="Add New User"
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
              name="categories"
              label="Categories"
              rules={[
                {
                  message: "Please select Categories",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="Sales & Admin">Sales & Admin</Option>
                <Option value="Academics">Academics</Option>
                <Option value="User">User</Option>
                <Option value="Upper management">Upper management</Option>
                <Option value="Teachers">Teachers</Option>

              </Select>
            </Form.Item>

            <Form.Item
              label="First name"
              name="first_name"
              rules={[
                { required: true, message: "Please enter the First name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Surname"
              name="surname"
              rules={[{ required: true, message: "Please enter the Surname!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Gender" name="gender">
              <Select placeholder="SELECT GENDER" onChange={handleChange}>
                <Option value="female">Female</Option>
                <Option value="male">Male</Option>
                <Option value="non-binary">Non-Binary</Option>
              </Select>
            </Form.Item>

            {/* <Form.Item label="Birthdate" name="dob">
              <div className="date-picker-container">
                <input
                  type="date"
                  id="date-picker-overview"
                  className="date-picker"
                  name="dob"
                />
              </div>
            </Form.Item> */}

            <hr />
            <h5>Contact information</h5>

            <Form.Item label="Email" name="email">
              <Input type="email" placeholder="Enter email" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input type="number" placeholder="Enter phone" />
            </Form.Item>
            {/* <Form.Item label="Fax" name="fax">
              <Input placeholder="Enter fax" />
            </Form.Item> */}

            <hr />
            {/* <h5>Address</h5>
            <Form.Item label="Address" name="address">
              <Input placeholder="Enter address" />
            </Form.Item>
            <Form.Item label="Zip / Portal code" name="zipcode">
              <Input type="number" placeholder="Enter zip/postal code" />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item label="State*" name="state">
              <Input placeholder="Enter state" />
            </Form.Item>

            <Form.Item label="Country" name="country">
              <Select
                placeholder="select country"
                showSearch
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {countries.map((name) => (
                  <Option key={name._id} value={name.label}>
                    {name.label}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit User"
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
              name="categories"
              label="Categories"
              rules={[
                {
                  message: "Please select Categories",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="Sales & Admin">Sales & Admin</Option>
                <Option value="Academics">Academics</Option>
                <Option value="User">User</Option>
                <Option value="Upper management">Upper management</Option>
                <Option value="Teachers">Teachers</Option>

              </Select>
            </Form.Item>

            <Form.Item
              label="First name"
              name="first_name"
              rules={[
                { required: true, message: "Please enter the First name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Surname"
              name="surname"
              rules={[{ required: true, message: "Please enter the Surname!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Gender" name="gender">
              <Select placeholder="SELECT GENDER" onChange={handleChange}>
                <Option value="female">Female</Option>
                <Option value="male">Male</Option>
                <Option value="non-binary">Non-Binary</Option>
              </Select>
            </Form.Item>

            {/* <Form.Item label="Birthdate" name="dob">
              <div className="date-picker-container">
                <input
                  type="date"
                  id="date-picker-overview"
                  className="date-picker"
                  name="dob"
                />
              </div>
            </Form.Item> */}

            <hr />
            <h5>Contact information</h5>

            <Form.Item label="Email" name="email">
              <Input type="email" placeholder="Enter email" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input type="number" placeholder="Enter phone" />
            </Form.Item>
            {/* <Form.Item label="Fax" name="fax">
              <Input placeholder="Enter fax" />
            </Form.Item> */}

            <hr />
            {/* <h5>Address</h5>
            <Form.Item label="Address" name="address">
              <Input placeholder="Enter address" />
            </Form.Item>
            <Form.Item label="Zip / Portal code" name="zipcode">
              <Input type="number" placeholder="Enter zip/postal code" />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item label="State*" name="state">
              <Input placeholder="Enter state" />
            </Form.Item>

            <Form.Item label="Country" name="country">
              <Select
                placeholder="select country"
                showSearch
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {countries.map((name) => (
                  <Option key={name._id} value={name.label}>
                    {name.label}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}

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

export default OverviewAdmin;
