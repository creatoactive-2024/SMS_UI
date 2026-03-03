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
  Row,
  Col,
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
  CsvExcelImport1,
  AddEditDelete,
} from "../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";

const { Option } = Select;

const Source = () => {
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

  //----------------table functions-----------------------

  const fetchData = async () => {
    // Call the common delete API with the selected record IDs
    await fetchDataCommon(
      "sourceadmins",
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
    const collectionName = "sourceadmins";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      name: values.name || null,
      surcharge: values.surcharge || null,
      url_xml: values.url_xml || null,
      course_date: values.course_date || null,
      address_addon: values.address_addon || null,
      source_currency: values.source_currency || null,
      target_currency: values.target_currency || null,
      course: values.course || null,
      divisor: values.divisor || null,
      format: values.format || null,
      child_element: values.child_element || null,
      search_expression1: values.search_expression1 || null,
      search_expression2: values.search_expression2 || null,
      search_expression3: values.search_expression3 || null,
      seperator: values.seperator || null,
      reversal: values.reversal || null,
    };
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
        collectionName: "sourceadmins",
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

  //   useEffect(() => {
  //     if (editingRecordData) {
  //       form.setFieldsValue(editingRecordData);
  //     }
  //   }, [editingRecordData, form]);

  useEffect(() => {
    if (editingRecordData) {
      form.setFieldsValue({
        ...editingRecordData,
        child_element:
          editingRecordData.child_element === "true" ? "Yes" : "No",
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

  const handleDeleteModalOk = async () => {
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "sourceadmins",
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

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Source</Link>
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item>Administration</Breadcrumb.Item>
        <Breadcrumb.Item>Source</Breadcrumb.Item> */}
      </Breadcrumb>
      <hr />
      <div>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
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
            <CsvExcelImport1 />
          </Space>
        </div>

        <Modal
          title="Add New source"
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
              label="Surcharge"
              name="surcharge"
              rules={[{ required: true, message: "Please enter surcharge!" }]}
            >
              <Input placeholder="enter surcharge" />
            </Form.Item>

            <Form.Item
              label="URL of the XML"
              name="url_xml"
              rules={[
                { required: true, message: "Please enter URL of the XML!" },
              ]}
            >
              <Input placeholder="enter URL of the XML" />
            </Form.Item>

            <Row justify="center" style={{ marginTop: "24px" }}>
              <Col span={12}>
                <Form.Item
                  label="Course date"
                  name="course_date"
                  rules={[
                    { required: true, message: "Please enter course date!" },
                  ]}
                >
                  <Input placeholder="Enter Course date" />
                </Form.Item>

                <Form.Item
                  label="Container"
                  name="address_addon"
                  rules={[
                    { required: true, message: "Please enter container!" },
                  ]}
                >
                  <Input placeholder="Enter Add on" />
                </Form.Item>
                <Form.Item
                  label="Source currency (or fixed currency key)"
                  name="source_currency"
                  rules={[
                    {
                      required: true,
                      message: "Please enter source currency!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Source currency" />
                </Form.Item>

                <Form.Item
                  label="Target currency (or fixed currency key)"
                  name="target_currency"
                  rules={[
                    {
                      required: true,
                      message: "Please enter target currency!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Target currency" />
                </Form.Item>
                <Form.Item
                  label="Course"
                  name="course"
                  rules={[{ required: true, message: "Please enter course!" }]}
                >
                  <Input placeholder="Enter Course" />
                </Form.Item>
                <Form.Item label="Divisor" name="divisor">
                  <Input placeholder="Enter Divisor" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Format" name="format">
                  <Input placeholder="Enter format" />
                </Form.Item>
                <Form.Item
                  label="Child element"
                  name="child_element"
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item label="Search expression" name="search_expression1">
                  <Input placeholder="Enter Search expression" />
                </Form.Item>
                <Form.Item label="Search expression" name="search_expression2">
                  <Input placeholder="Enter Search expression" />
                </Form.Item>

                <Form.Item label="Seperator" name="seperator">
                  <Input placeholder="Enter Seperator" />
                </Form.Item>
                <Form.Item
                  label="Reversal"
                  name="reversal"
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item label="Search expression" name="search_expression3">
                  <Input placeholder="Enter Search expression" />
                </Form.Item>
              </Col>
            </Row>

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit source"
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
              label="Surcharge"
              name="surcharge"
              rules={[{ required: true, message: "Please enter surcharge!" }]}
            >
              <Input placeholder="enter surcharge" />
            </Form.Item>

            <Form.Item
              label="URL of the XML"
              name="url_xml"
              rules={[
                { required: true, message: "Please enter URL of the XML!" },
              ]}
            >
              <Input placeholder="enter URL of the XML" />
            </Form.Item>

            <Row justify="center" style={{ marginTop: "24px" }}>
              <Col span={12}>
                <Form.Item
                  label="Course date"
                  name="course_date"
                  rules={[
                    { required: true, message: "Please enter course date!" },
                  ]}
                >
                  <Input placeholder="Enter Course date" />
                </Form.Item>

                <Form.Item
                  label="Container"
                  name="address_addon"
                  rules={[
                    { required: true, message: "Please enter container!" },
                  ]}
                >
                  <Input placeholder="Enter Add on" />
                </Form.Item>
                <Form.Item
                  label="Source currency (or fixed currency key)"
                  name="source_currency"
                  rules={[
                    {
                      required: true,
                      message: "Please enter source currency!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Source currency" />
                </Form.Item>

                <Form.Item
                  label="Target currency (or fixed currency key)"
                  name="target_currency"
                  rules={[
                    {
                      required: true,
                      message: "Please enter target currency!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Target currency" />
                </Form.Item>
                <Form.Item
                  label="Course"
                  name="course"
                  rules={[{ required: true, message: "Please enter course!" }]}
                >
                  <Input placeholder="Enter Course" />
                </Form.Item>
                <Form.Item label="Divisor" name="divisor">
                  <Input placeholder="Enter Divisor" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Format" name="format">
                  <Input placeholder="Enter format" />
                </Form.Item>
                <Form.Item
                  label="Child element"
                  name="child_element"
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item label="Search expression" name="search_expression1">
                  <Input placeholder="Enter Search expression" />
                </Form.Item>
                <Form.Item label="Search expression" name="search_expression2">
                  <Input placeholder="Enter Search expression" />
                </Form.Item>

                <Form.Item label="Seperator" name="seperator">
                  <Input placeholder="Enter Seperator" />
                </Form.Item>
                <Form.Item
                  label="Reversal"
                  name="reversal"
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item label="Search expression" name="search_expression3">
                  <Input placeholder="Enter Search expression" />
                </Form.Item>
              </Col>
            </Row>

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

export default Source;
