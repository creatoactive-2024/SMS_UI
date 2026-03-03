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
import { handleDelete } from "../../commonComponents/DeleteApi";
import {
  SaveBtn,
  UpdateBtn,
  SearchInput,
  AddEditDelete,
} from "../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";

const { Option } = Select;

const TermsOfPayment = () => {
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

  //----------------table functions-----------------------

  const fetchData = async () => {
    // Call the common fetch API with the selected record IDs
    await fetchDataCommon(
      "termsofpayments",
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
    const collectionName = "termsofpayment";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      title: values.title || null,
      note: values.note || null,
      surcharge: values.surcharge || null,
      type: values.type || null,
      calculation: values.calculation || null,
      calculate_on: values.calculate_on || null,
      amount: values.amount || null,
      type1: values.type1 || null,
      type2: values.type2 || null,
      type3: values.type3 || null,
      type4: values.type4 || null,
      type5: values.type5 || null,

      due_date: values.due_date || null,
      due_date2: values.due_date2 || null,
      due_date3: values.due_date3 || null,
      due_date4: values.due_date4 || null,
      combine_first_with_second: values.combine_first_with_second || null,
      merge_last_with_previous: values.merge_last_with_previous || null,
      symbol1: values.symbol1 || null,
      symbol2: values.symbol2 || null,
      symbol3: values.symbol3 || null,
      symbol4: values.symbol4 || null,
      symbol5: values.symbol5 || null,

      days1: values.days1 || null,
      days2: values.days2 || null,
      days3: values.days3 || null,
      days4: values.days4 || null,

      invoice_every: values.invoice_every || null,
      additional_fee_with_first: values.additional_fee_with_first || null,
      invoice_text_adjustable: values.invoice_text_adjustable || null,
      presentation: values.presentation || null,
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
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        title: `${entry.title} ` || null,
        note: entry.note || null,
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
        collectionName: "termsofpayments",
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

  //---------------------delete record-----------------------------------------
  const handleDeleteModalOk = async () => {
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "termsofpayments",
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
          <Link to="">Accounting</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Resources</Breadcrumb.Item>
        <Breadcrumb.Item>Terms Of Payment</Breadcrumb.Item>
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

        <Modal
          title="Add New terms of payment"
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
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter title!" }]}
            >
              <Input placeholder="Enter Title" />
            </Form.Item>

            <Form.Item label="Note" name="note">
              <Input placeholder="Enter note" />
            </Form.Item>

            {/* Additional Inputs */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Surcharge/Discount"
                name="surcharge"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Surcharge/Discount" />
              </Form.Item>

              <Form.Item
                label="Type"
                name="type"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter type" />
              </Form.Item>

              <Form.Item
                label="Calculation"
                name="calculation"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter calculation" />
              </Form.Item>

              <Form.Item
                label="Calculate on"
                name="calculate_on"
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter Calculate on" />
              </Form.Item>
            </div>

            <hr />
            <h5>settings</h5>

            <Form.Item label="Type" name="type1">
              <Input placeholder="Enter Type" />
            </Form.Item>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Due Date"
                name="due_date"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Amount" />
              </Form.Item>

              <Form.Item
                name="days1"
                label="Days"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Days" />
              </Form.Item>
              <Form.Item
                name="symbol1"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>

            <hr />

            <Form.Item label="Type" name="type2">
              <Input placeholder="Enter Type" />
            </Form.Item>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Amount"
                name="amount"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Amount" />
              </Form.Item>

              <Form.Item
                name="symbol2"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Due Date"
                name="due_date2"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>

              <Form.Item
                name="days2"
                label="Days"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Days" />
              </Form.Item>
              <Form.Item
                name="symbol3"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>

            <hr />

            <Form.Item label="Type" name="type3">
              <Input placeholder="Enter type" />
            </Form.Item>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Due Date"
                name="due_date3"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>

              <Form.Item
                name="days3"
                label="Days"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Days" />
              </Form.Item>
              <Form.Item
                name="symbol4"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>

            <hr />
            <Form.Item
              name="type4"
              label="Type"
              style={{ marginRight: "10px", flex: 1 }}
            >
              <Input placeholder="Enter type" />
            </Form.Item>
            <Form.Item
              name="type5"
              label="Type"
              style={{ marginRight: "10px", flex: 1 }}
            >
              <Input placeholder="Enter type" />
            </Form.Item>
            <Form.Item
              name="presentation"
              label="Presentation"
              style={{ marginRight: "10px", flex: 1 }}
            >
              <Input placeholder="Enter Presentation" />
            </Form.Item>
            <Form.Item
              label="Invoice every month/week"
              name="invoice_every"
              style={{ marginRight: "10px", flex: 1 }}
            >
              <Input placeholder="Enter Invoice every" />
            </Form.Item>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Due Date"
                name="due_date4"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>

              <Form.Item
                name="days4"
                label="Days"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Days" />
              </Form.Item>
              <Form.Item
                name="symbol5"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Include additional fees in full with the first instalment"
                name="additional_fee_with_first"
                valuePropName="checked"
              >
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item
                label="Combine first installment with second, if first installment is incomplete"
                name="combine_first_with_second"
                valuePropName="checked"
              >
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item
                label="Merge last instalment with previous one if last instalment is incomplete"
                name="merge_last_with_previous"
                valuePropName="checked"
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </div>

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit terms of payment"
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
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter title!" }]}
            >
              <Input placeholder="Enter Title" />
            </Form.Item>

            <Form.Item label="Note" name="note">
              <Input placeholder="Enter note" />
            </Form.Item>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Surcharge/Discount"
                name="surcharge"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Surcharge/Discount" />
              </Form.Item>

              <Form.Item
                label="Type"
                name="type"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter type" />
              </Form.Item>

              <Form.Item
                label="Calculation"
                name="calculation"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter calculation" />
              </Form.Item>

              <Form.Item
                label="Calculate on"
                name="calculate_on"
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter Calculate on" />
              </Form.Item>
            </div>

            <hr />
            <h5>settings</h5>

            <Form.Item label="Type" name="type1">
              <Input placeholder="Enter Type" />
            </Form.Item>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Due Date"
                name="due_date"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>

              <Form.Item
                name="days1"
                label="Days"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Days" />
              </Form.Item>
              <Form.Item
                name="symbol1"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>

            <hr />

            <Form.Item label="Type" name="type2">
              <Input placeholder="Enter Type" />
            </Form.Item>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Amount"
                name="amount"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Amount" />
              </Form.Item>

              <Form.Item
                name="symbol2"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Due Date"
                name="due_date2"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Amount" />
              </Form.Item>

              <Form.Item
                name="days2"
                label="Days"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Days" />
              </Form.Item>
              <Form.Item
                name="symbol3"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>

            <hr />

            <Form.Item label="Type" name="type3">
              <Input placeholder="Enter type" />
            </Form.Item>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Due Date"
                name="due_date3"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Amount" />
              </Form.Item>

              <Form.Item
                name="days3"
                label="Days"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Days" />
              </Form.Item>
              <Form.Item
                name="symbol4"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>

            <hr />
            <Form.Item
              name="type4"
              label="Type"
              style={{ marginRight: "10px", flex: 1 }}
            >
              <Input placeholder="Enter type" />
            </Form.Item>
            <Form.Item
              name="type5"
              label="Type"
              style={{ marginRight: "10px", flex: 1 }}
            >
              <Input placeholder="Enter type" />
            </Form.Item>
            <Form.Item
              name="presentation"
              label="Presentation"
              style={{ marginRight: "10px", flex: 1 }}
            >
              <Input placeholder="Enter Presentation" />
            </Form.Item>
            <Form.Item
              label="Invoice every month/week"
              name="invoice_every"
              style={{ marginRight: "10px", flex: 1 }}
            >
              <Input placeholder="Enter Invoice every" />
            </Form.Item>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item
                label="Due Date"
                name="due_date4"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Amount" />
              </Form.Item>

              <Form.Item
                name="days4"
                label="Days"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter Days" />
              </Form.Item>
              <Form.Item
                name="symbol5"
                style={{ marginRight: "10px", flex: 1 }}
              >
                <Input placeholder="Enter " />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Include additional fees in full with the first instalment"
                name="additional_fee_with_first"
                valuePropName="checked"
              >
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item
                label="Combine first installment with second, if first installment is incomplete"
                name="combine_first_with_second"
                valuePropName="checked"
              >
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item
                label="Merge last instalment with previous one if last instalment is incomplete"
                name="merge_last_with_previous"
                valuePropName="checked"
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </div>
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

export default TermsOfPayment;
