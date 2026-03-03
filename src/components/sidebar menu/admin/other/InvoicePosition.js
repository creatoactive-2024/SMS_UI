import React, { useState, useEffect } from "react";
import {
  Table,
  
  Modal,
  message,
  Select,
  Breadcrumb,
  Form,
 
} from "antd";
import { LeftOutlined } from '@ant-design/icons';

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

const { Option } = Select;

const InvoicePosition = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({});

  const [form] = Form.useForm();

  //------------filter functions----------------------

  //----------------table functions-----------------------

  const fetchData = async () => {
    // Call the common delete API with the selected record IDs
    await fetchDataCommon("visatypes", setData, setSelectedRowKeys, setLoading);
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
    const collectionName = "visatypes";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      name: values.name || null,
      fields: values.fields || null,
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

  const handlePlaceholderChange = (value, record) => {
    // Add your logic here to handle the change in the placeholder value
    console.log('Selected value:', value);
    console.log('Record:', record);
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
      title: "Item",
      dataIndex: "",
      key: "",
    },
    {
      title: "Description",
      dataIndex: "",
      key: "",
    },
    {
        title: 'Placeholder',
        dataIndex: 'placeholder',
        key: 'placeholder',
        render: (text, record) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LeftOutlined style={{ color: 'green' }} />
            <Select placeholder="--placeholder--" defaultValue={text} style={{ width: 160 }} onChange={value => handlePlaceholderChange(value, record)}>
              <Option value="Option1">Option 1</Option>
              <Option value="Option2">Option 2</Option>
              <Option value="Option3">Option 3</Option>
            </Select>
          </div>
        ),
      },
    {
      title: "Created by",
      dataIndex: "",
      key: "",
    },
    {
      title: "Created",
      dataIndex: "",
      key: "",
    },
    {
      title: "Updated by",
      dataIndex: "",
      key: "",
    },
    {
      title: "Updated on",
      dataIndex: "",
      key: "",
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
        collectionName: "visatypes",
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
      "visatypes",
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
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Admin</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Other</Breadcrumb.Item>
        <Breadcrumb.Item>Invoice positions</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <div>
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

export default InvoicePosition;
