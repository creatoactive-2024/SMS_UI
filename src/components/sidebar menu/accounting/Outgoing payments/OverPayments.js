import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Modal,
  message,
  Select,
  Breadcrumb,
  Form,
  DatePicker,
} from "antd";
import axios from "axios";
import baseURL from "../../../../config";
import { Link } from "react-router-dom";
import { handleDelete } from "../../commonComponents/DeleteApi";

import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";
import {
  SearchInput,
  CsvExcelImport1,
} from "../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const OverPayments = () => {
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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [error, setError] = useState(null);

  const [form] = Form.useForm();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [labelValue, setLabelValue] = useState("");

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setFromDate(dates[0]);
      setToDate(dates[1]);
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setLabelValue((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  //-------------table functions-----------------

  const fetchData = async () => {
    // Call the common delete API with the selected record IDs
    await fetchDataCommon(
      "overpayments",
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

  //---------------new button functions------------
  const handleNewModalOpen = () => {
    setSelectedRecordId(null);
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

    // Replace the hardcoded values with dynamic ones from your form or other sources
    const collectionName = "overpayments";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      agent: values.agent || null,
      date: values.date || null,
      amount1: values.amount1 || null,
      amount2: values.amount2 || null,
      amount3: values.amount3 || null,
      fee_payment_currency: values.fee_payment_currency || null,
      method: values.method || null,
      note: values.note || null,
    };
    // agent date  amount1  amount2 amount3 fee_payment_currency method note

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
      title: "Personal details ",
      children: [
        {
          title: "First name",
          dataIndex: "",
          key: "",
        },
        {
          title: "Surname",
          dataIndex: "",
          key: "",
        },

        {
          title: "Student ID",
          dataIndex: "",
          key: "",
        },
        {
          title: "Inv.No.",
          dataIndex: "",
          key: "",
        },
        {
          title: "Agent",
          dataIndex: "",
          key: "",
        },
        {
          title: "Agency number",
          dataIndex: "",
          key: "",
        },
      ],
    },

    {
      title: "Course",
      children: [
        {
          title: "Payment method",
          dataIndex: "",
          key: "",
        },
        {
          title: "Course",
          dataIndex: "",
          key: "",
        },
        {
          title: "Start date",
          dataIndex: "",
          key: "",
        },
        {
          title: "End date",
          dataIndex: "",
          key: "",
        },
      ],
    },
    {
      title: "Accommodation",
      children: [
        {
          title: "Accommodation",
          dataIndex: "",
          key: "",
        },
      ],
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        agent: `${entry.agent} ` || null,
        date: entry.date || null,
        method: entry.method || null,
        amount1: entry.amount1 || null,
        fee_payment_currency: entry.fee_payment_currency || null,
        // Add more fields as needed
      }))
    : [];

  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

  //-----------------edit button functions--------------
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
        collectionName: "overpayments",
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

  // useEffect(() => {
  //   if (editingRecordData) {
  //     form.setFieldsValue(editingRecordData);
  //   }
  // }, [editingRecordData, form]);
  useEffect(() => {
    if (editingRecordData) {
      const formattedDate = editingRecordData.date
        ? moment(editingRecordData.date).format("YYYY-MM-DD")
        : null;

      form.setFieldsValue({
        ...editingRecordData,
        date: formattedDate,
      });

      document.getElementById("date-picker-class").value = formattedDate;
    }
  }, [editingRecordData, form]);

  //--------------import export functions----------
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

  //----------delete button functions-----------
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
      "overpayments",
      selectedRowKeys,
      fetchData,
      setDeleteModalVisible
    );
  };

  const CancelBothModel = () => {
    setNewModalVisible(false);
    setEditModalVisible(false);
  };

  const handleDeleteModalCancel = () => {
    // Close the delete confirmation modal without performing the deletion
    setDeleteModalVisible(false);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Accounting</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Outgoing payments</Breadcrumb.Item>
        <Breadcrumb.Item>OverPayments</Breadcrumb.Item>
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
            <CsvExcelImport1 />
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
            <Select style={{ width: 155 }} placeholder="-Booking type-">
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>
            <Select style={{ width: 155 }} placeholder="-Agent-">
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>
            <Select style={{ width: 155 }} placeholder="-Currency-">
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>

            <Select style={{ width: 155 }} placeholder="-Country-">
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>

            <Select style={{ width: 155 }} placeholder="-Nationality-">
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>
            <Select style={{ width: 155 }} placeholder="-Inbox-">
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>
            <Select style={{ width: 155 }} placeholder="-Group-">
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>
          </Space>
        </div>

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

export default OverPayments;
