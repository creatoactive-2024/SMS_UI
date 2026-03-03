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
  DatePicker,
} from "antd";
import axios from "axios";
import baseURL from "../../../../config";
import { Link } from "react-router-dom";

import { handleDelete } from "../../commonComponents/DeleteApi";

import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";
import {
  SaveBtn,
  UpdateBtn,
  SearchInput,
  AddEditDelete,
  CsvExcelImport1,
} from "../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;
const { RangePicker } = DatePicker;

const ManualCreditNote = () => {
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
      "manualcreditnotes1",
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
    const collectionName = "manualcreditnotes1";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      agent: values.agent || null,
      school: values.school || null,
      inbox: values.inbox || null,
      pdf_template: values.pdf_template || null,
      language: values.language || null,
      type: values.type || null,
      quantity: values.quantity || null,
      amount: values.amount || null,
      currency: values.currency || null,
      note: values.note || null,
      number_range: values.number_range || null,
      subject_credit_note: values.subject_credit_note || null,
    };
    // agent school inbox pdf_template language type quantity amount currency note subject_credit_note number_range

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
      title: "CN No.",
      dataIndex: "",
      key: "",
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Used",
      dataIndex: "",
      key: "",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Subject of the credit",
      dataIndex: "subject_credit_note",
      key: "subject_credit_note",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "PDF",
      dataIndex: "",
      key: "",
    },
    {
      title: "Released",
      dataIndex: "",
      key: "",
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
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        agent: `${entry.agent} ` || null,
        amount: entry.amount || null,
        type: entry.type || null,
        note: entry.note || null,
        subject_credit_note: entry.subject_credit_note || null,
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
        collectionName: "manualcreditnotes1",
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
  //   useEffect(() => {
  //     if (editingRecordData) {
  //       const formattedDate = editingRecordData.date
  //         ? moment(editingRecordData.date).format("YYYY-MM-DD")
  //         : null;

  //       form.setFieldsValue({
  //         ...editingRecordData,
  //         date: formattedDate,
  //       });

  //       document.getElementById("date-picker-class").value = formattedDate;
  //     }
  //   }, [editingRecordData, form]);

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
      "manualcreditnotes1",
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
        <Breadcrumb.Item>Manual Credit notes</Breadcrumb.Item>
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
            <div style={{ marginRight: "20px" }}>
              <RangePicker onChange={handleDateChange} />
            </div>
            <label style={{ marginRight: "10px" }}>
              Based On date of creation :
            </label>

            <Select style={{ width: 155 }} placeholder="-Agent-">
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>
            <Select
              style={{ width: 155 }}
              placeholder="-Subject of credit note-"
            >
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>
            <Select style={{ width: 155 }} placeholder="-Status-">
              <Option value="option1">option1</Option>
              <Option value="option">option</Option>
            </Select>
          </Space>
        </div>

        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Space>
            <CsvExcelImport1 />
          </Space>
        </div>
        <Modal
          title="Add new credit note"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000}
          style={{ top: 20 }}
          footer={null}
        >
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Form.Item
              name="agent"
              label="Agent"
              rules={[
                {
                  required: true,
                  message: "Please select agent",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="Agent">Agent</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="school"
              label="School"
              rules={[
                {
                  required: true,
                  message: "Please select schools",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="SpeakUp London">SpeakUp London</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="inbox"
              label="Inbox"
              rules={[
                {
                  required: true,
                  message: "Please select inbox",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="Default Inbox">Default Inbox</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="pdf_template"
              label="PDF-Template"
              rules={[
                {
                  required: true,
                  message: "Please select pdf template",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="language"
              label="Language"
              rules={[
                {
                  required: true,
                  message: "Please select language",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: "Please select type",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="One time fee">One time fee</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "Please select Quantity",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: "Please select amount",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="currency"
              label="Currency"
              rules={[
                {
                  required: true,
                  message: "Please select currency",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="€">€</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="subject_credit_note"
              label="Subject of the credit note"
            >
              <Input />
            </Form.Item>

            <Form.Item name="note" label="Note">
              <TextArea />
            </Form.Item>

            <Form.Item name="number_range" label="Number range">
              <Select placeholder="Please select">
                <Option value="Default maunal credinotes">
                  Default maunal credinotes
                </Option>
              </Select>
            </Form.Item>

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>
        <Modal
          title="Edit credit note"
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
              name="agent"
              label="Agent"
              rules={[
                {
                  required: true,
                  message: "Please select agent",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="Agent">Agent</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="school"
              label="School"
              rules={[
                {
                  required: true,
                  message: "Please select schools",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="SpeakUp London">SpeakUp London</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="inbox"
              label="Inbox"
              rules={[
                {
                  required: true,
                  message: "Please select inbox",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="Default Inbox">Default Inbox</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="pdf_template"
              label="PDF-Template"
              rules={[
                {
                  required: true,
                  message: "Please select pdf template",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="language"
              label="Language"
              rules={[
                {
                  required: true,
                  message: "Please select language",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: "Please select type",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="One time fee">One time fee</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "Please select Quantity",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: "Please select amount",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="currency"
              label="Currency"
              rules={[
                {
                  required: true,
                  message: "Please select currency",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="€">€</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="subject_credit_note"
              label="Subject of the credit note"
            >
              <Input />
            </Form.Item>

            <Form.Item name="note" label="Note">
              <TextArea />
            </Form.Item>

            <Form.Item name="number_range" label="Number range">
              <Select placeholder="Please select">
                <Option value="Default maunal credinotes">
                  Default maunal credinotes
                </Option>
              </Select>
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
      <br />
    </>
  );
};

export default ManualCreditNote;
