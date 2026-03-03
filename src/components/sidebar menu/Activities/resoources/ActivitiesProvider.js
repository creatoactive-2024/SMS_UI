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
import baseURL from "../../../../config";
import { Link } from "react-router-dom";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../../commonComponents/DeleteApi";
import {
  SaveBtn,
  UpdateBtn,
  SearchInput,
  AddEditDeleteDeactivate,
  FiltersDropdown2,
  CsvExcelImport,
} from "../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";

const { Option } = Select;

const ActivitiesProvider = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  //----------------table functions-----------------------

  const fetchData = async () => {
    // Call the common fetch API with the selected record IDs
    await fetchDataCommon(
      "actvityproviders",
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
    const collectionName = "actvityproviders";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      company: values.company || null,
      surname: values.surname || null,
      first_name: values.first_name || null,
      address: values.address || null,
      address_addon: values.address_addon || null,
      postal_code: values.postal_code || null,
      city: values.city || null,
      country: values.country || null,
      phone: values.phone || null,
      telephone_private: values.telephone_private || null,
      skype: values.skype || null,
      email: values.email || null,
      homepage: values.homepage || null,
      note: values.note || null,
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
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Contact",
      dataIndex: "telephone_private",
      key: "telephone_private",
    },
    {
      title: "Person",
      dataIndex: "Person",
      key: "Person",
    },
    {
      title: "Created by",
      dataIndex: "",
      key: "",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
        company: `${entry.company} ` || null,
        telephone_private: entry.telephone_private || null,
        email: entry.email || null,
        phone: entry.phone || null,
        Person: `${entry.first_name} ${entry.surname}` || null,
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
        collectionName: "actvityproviders",
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

  //----------------delete record---------------------------------

  const handleDeleteModalOk = async () => {
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "actvityproviders",
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
          <Link to="">Social Activities</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Resourses</Breadcrumb.Item>
        <Breadcrumb.Item>Provider</Breadcrumb.Item>
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
            <FiltersDropdown2 />
          </Space>
          <Space>
            <CsvExcelImport
              handleCsvExport={handleCsvExport}
              handleExcelExport={handleExcelExport}
            />
          </Space>
        </div>

        <Modal
          title="Add New Provider"
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
            <Form.Item
              label="Company"
              name="company"
              rules={[
                { required: true, message: "Please enter the Company name!" },
              ]}
            >
              <Input placeholder="Enter Company" />
            </Form.Item>

            <Form.Item
              label="Surname"
              name="surname"
              rules={[{ required: true, message: "Please enter the Surname!" }]}
            >
              <Input placeholder="Enter Surname" />
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
            <hr />
            <h5>Address</h5>
            <Form.Item label="Address" name="address">
              <Input placeholder="Enter Address" />
            </Form.Item>
            <Form.Item label="Address addon" name="address_addon">
              <Input placeholder="Enter Address addon" />
            </Form.Item>
            <Form.Item label="ZIP / Postal code" name="postal_code">
              <Input placeholder="Enter ZIP / Postal code" />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input placeholder="Enter City" />
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Select
                placeholder="SELECT COUNTRY"
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
            </Form.Item>

            <hr />
            <h5>Contact details</h5>
            <Form.Item label="Phone (Office)" name="phone">
              <Input placeholder="Enter Phone (Office)" />
            </Form.Item>
            <Form.Item label="Telephone Private" name="telephone_private">
              <Input placeholder="Enter Telephone Private" />
            </Form.Item>
            <Form.Item label="Skype" name="skype">
              <Input placeholder="Enter Skype" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter the Email!" }]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>
            <hr />
            <h5>Other</h5>
            <Form.Item label="Homepage" name="homepage">
              <Input placeholder="Enter Homepage" />
            </Form.Item>
            <Form.Item label="Note" name="note">
              <Input placeholder="Enter Note" />
            </Form.Item>

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit Provider"
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
            <Form.Item
              label="Company"
              name="company"
              rules={[
                { required: true, message: "Please enter the Company name!" },
              ]}
            >
              <Input placeholder="Enter Company" />
            </Form.Item>

            <Form.Item
              label="Surname"
              name="surname"
              rules={[{ required: true, message: "Please enter the Surname!" }]}
            >
              <Input placeholder="Enter Surname" />
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
            <hr />
            <h5>Address</h5>
            <Form.Item label="Address" name="address">
              <Input placeholder="Enter Address" />
            </Form.Item>
            <Form.Item label="Address addon" name="address_addon">
              <Input placeholder="Enter Address addon" />
            </Form.Item>
            <Form.Item label="ZIP / Postal code" name="postal_code">
              <Input placeholder="Enter ZIP / Postal code" />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input placeholder="Enter City" />
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Select
                placeholder="SELECT COUNTRY"
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
            </Form.Item>

            <hr />
            <h5>Contact details</h5>
            <Form.Item label="Phone (Office)" name="phone">
              <Input placeholder="Enter Phone (Office)" />
            </Form.Item>
            <Form.Item label="Telephone Private" name="telephone_private">
              <Input placeholder="Enter Telephone Private" />
            </Form.Item>
            <Form.Item label="Skype" name="skype">
              <Input placeholder="Enter Skype" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter the Email!" }]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>
            <hr />
            <h5>Other</h5>
            <Form.Item label="Homepage" name="homepage">
              <Input placeholder="Enter Homepage" />
            </Form.Item>
            <Form.Item label="Note" name="note">
              <Input placeholder="Enter Note" />
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

export default ActivitiesProvider;
