import React, { useState, useEffect } from "react";
import { Table, Space, Modal, message, Select, Breadcrumb } from "antd";
import axios from "axios";
import baseURL from "../../../config";
import { Link } from "react-router-dom";
import ProviderForm from "./ProviderForm";
import { fetchDataCommon } from "../commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../commonComponents/DeleteApi";
import {
  AddEditDeleteDeactivate,
  FiltersDropdown2,
  SearchInput,
} from "../../../components/sidebar menu/commonComponents/ButtonsDropdown";

const { Option } = Select;

const TransferProvider = () => {
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

  const [filterValue1, setFilterValue1] = useState(null);

  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  //------------------fetch table data function-------------------------------------

  const fetchData = async () => {
    // Call the common fetch API with the selected record IDs
    await fetchDataCommon(
      "transferproviders",
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

  const handleNewModalOpen = () => {
    setSelectedRecordId(null);
    setNewModalVisible(true);
    setSelectedRowKeys([]);
    // form.resetFields();
    setFormValues({});
  };

  const handleNewModalCancel = () => {
    setNewModalVisible(false);
  };

  const handleNewModalOk = () => {
    // Handle logic when submitting the new form
    setNewModalVisible(false);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Cellphone",
      dataIndex: "cellphone",
      key: "cellphone",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
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
        title: `${entry.title} ` || null,
        email: entry.email || null,
        phone: entry.phone || null,
        cellphone: entry.cellphone || null,
        // Add more fields as needed
      }))
    : [];

  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

  const handleEditModalOpen = () => {
    setEditModalVisible(true);

    // Set the active tab based on whether a record is being edited
    const activeKey = editingRecordData ? "1" : "2";
    setActiveKey(activeKey);
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
        collectionName: "transferproviders",
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

  const handleDeleteButtonClick = () => {
    if (selectedRowKeys.length === 0) {
      // No record selected, show a warning message
      message.warning("Please select records to delete.");
    } else {
      // Records are selected, show the delete confirmation modal
      setDeleteModalVisible(true);
    }
  };

  //------------------delete record-------------------------------

  const handleDeleteModalOk = async () => {
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "transferproviders",
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
        <Breadcrumb.Item>Transfer Provider</Breadcrumb.Item>
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
            <FiltersDropdown2
              handleFilter1Change={handleFilter1Change}
              filterValue1={filterValue1}
            />
          </Space>
        </div>

        <Modal
          title="Add New Transfer Provider"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null}
        >
          <ProviderForm
            setNewModalVisible={setNewModalVisible}
            fetchData={fetchData}
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
            setSelectedRecordId={setSelectedRecordId}
          />
        </Modal>

        <Modal
          title="Edit Transfer Provider"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
          footer={null}
        >
          {/* Pass the editing record data to the BookingForm component */}
          <ProviderForm
            selectedRecordId={selectedRecordId}
            recordData={editingRecordData}
            setEditModalVisible={setEditModalVisible}
            fetchData={fetchData}
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
            setSelectedRecordId={setSelectedRecordId}
          />
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

export default TransferProvider;
