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
import { AiOutlineQuestionCircle } from "react-icons/ai";
import axios from "axios";
import baseURL from "../../../../config";
import { Link } from "react-router-dom";
import englishFlag from "../../../../../src/components/img/englishFlag.png";
import portugeseFlag from "../../../../../src/components/img/Portugal-flag.png";
import spanishFlag from "../../../../../src/components/img/Spain-flag.png";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";
import { Tooltip } from "antd";
import { handleDelete } from "../../commonComponents/DeleteApi";
import {
  SaveBtn,
  UpdateBtn,
  SearchInput,
  AddEditDelete,
} from "../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";

const { Option } = Select;

const AdditionalFees = () => {
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
  const [courses, setCourses] = useState([]);

  const [form] = Form.useForm();

  const fetchCourses = async () => {
    try {
      const responseData = await FieldListDropdown("courses", "title_english");
      if (responseData) {
        // Extract category names from response data
        const names = responseData
          .map((category) => ({
            value: category._id, // Use the appropriate property for the value
            label: category.title_english, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        // const names = responseData.map((category) => category.title_english);
        setCourses(names);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  //----------------table functions-----------------------

  const fetchData = async () => {
    // Call the common fetch API with the selected record IDs
    await fetchDataCommon(
      "additionalfees",
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
    const collectionName = "additionalfees";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      title_english: values.title_english || null,
      // title_portuguese: values.title_portuguese || null,
      // title_spanish: values.title_spanish || null,
      type: values.type || null,
      couses: values.couses || null,
      limited_quantity: values.limited_quantity || null,
      limited_availability: values.limited_availability || null,
      calculation: values.calculation || null,
      price_calculation: values.price_calculation || null,
      depending_on_duration: values.depending_on_duration || null,
      depending_on_age: values.depending_on_age || null,
      display_if_price_0: values.display_if_price_0 || null,
      date_of_booking: values.date_of_booking || null,
      cost_center_based_category: values.cost_center_based_category || null,
      cost_center: values.cost_center || null,
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
      title: "Title",
      dataIndex: "title_english",
      key: "title_english",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Calculation",
      dataIndex: "calculation",
      key: "calculation",
    },

    {
      title: "Price Calculation	",
      dataIndex: "price_calculation",
      key: "price_calculation",
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
        title_english: `${entry.title_english} ` || null,
        type: entry.type || null,
        calculation: entry.calculation || null,
        price_calculation: entry.price_calculation || null,
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
        collectionName: "additionalfees",
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
      //   form.setFieldsValue({
      //     name_english: editingRecordData.name_english || null,

      //   });
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
      "additionalfees",
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
          <Link to="">Marketing</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Resourses</Breadcrumb.Item>
        <Breadcrumb.Item>Additional Fees</Breadcrumb.Item>
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
          title="Add New Additional Fees"
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
            {/* <Form.Item
              label="Title"
              name="title_english"
              rules={[
                { required: true, message: "Please enter the category name!" },
              ]}
              style={{ position: "relative" }}
            >
              <Input
                style={{
                  paddingLeft: "30px", // Adjust the padding to accommodate the flag
                  background: `url(${englishFlag}) no-repeat 5px center`, // Set the background image
                  backgroundSize: "20px 20px", // Adjust the background image size
                }}
              />
            </Form.Item>

            <Form.Item
              label=" "
              name="title_portuguese"
              style={{ position: "relative" }}
            >
              <Input
                style={{
                  paddingLeft: "30px", // Adjust the padding to accommodate the flag
                  background: `url(${portugeseFlag}) no-repeat 5px center`, // Set the background image
                  backgroundSize: "24px 21px", // Adjust the background image size
                }}
              />
            </Form.Item>

            <Form.Item
              label=" "
              name="title_spanish"
              style={{ position: "relative" }}
            >
              <Input
                style={{
                  paddingLeft: "30px", // Adjust the padding to accommodate the flag
                  background: `url(${spanishFlag}) no-repeat 5px center`, // Set the background image
                  backgroundSize: "24px 24px", // Adjust the background image size
                }}
              />
            </Form.Item> */}

            <Form.Item
              label="Title"
              name="title_english"
              rules={[{ required: true, message: "Please enter the Title!" }]}
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
                <Form.Item name="title_english" noStyle>
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
              name="title_portuguese"
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
                <Form.Item name="title_portuguese" noStyle>
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
              name="title_spanish"
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
                <Form.Item name="title_spanish" noStyle>
                  <Input
                    style={{
                      paddingLeft: "42px",
                    }}
                  />
                </Form.Item>
              </div>
            </Form.Item> */}

            <Form.Item label="Type" name="type">
              <Select placeholder="Select Type">
                <Option value="Additional Course Fees">
                  Additional Course Fees
                </Option>
                <Option value="Additional Accommodation Fees">
                  Additional Accommodation Fees
                </Option>
                <Option value="General Fees">General Fees</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="couses"
              label="Couses"
              rules={[
                {
                  message: "Please select Couses",
                  type: "array",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select a course"
                showSearch
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {courses.map((name) => (
                  <Option key={name._id} value={name.label}>
                    {name.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* 
General English Part Time(12:30 - 03:30)
General English Part Time(12:30 - 03:30)
General English Part Time(12:30 - 03:30)
General English Part Time(16:00 - 19:00)
General English Part Time(16:00 - 19:00)
General English Part Time(16:00 - 19:00)
IELTS Full Time (12:30 - 15:30)
IELTS 4 days/week (12:30 - 15:30)
IELTS Part Time (12:30 - 15:30)
CAE Exam Preparation Full Time (12:30 - 15:30)
General English Mon-Wed-Thu (19:10 - 21:10)
IELTS Mon-Wed-Thu (19:10 - 21:10)
Advanced/Business English Mon-Wed-Thu (19:10 - 21:10)
Intensive English Monday to Friday (9:00-15:30)
Intensive English Monday to Friday (12:30-19:00)
Saturday Grammar&Vocabulary (12:00 - 14:00)
Saturday Speaking & Listening (14:30 - 16:30)
Saturday Intensive (12:00-16:30)
Saturday Advanced Plus (12:00-14:00)
Saturday Advanced Business (14:30-16:30)
Saturday Advanced+/Business English (12:00-16:30)
Individual Lesson 1 to 1
Individual Lesson 2 to 1 (per student)
Online Individual Lessons
General English ONLINE Full-time (9.00-12.00)
General English ONLINE Part-time (9.00-12.00)
Trial 3 hrs 9.00-12.00
Trial 3 hrs 12.30-15.30
Trial 3 hrs 16.00-19.00
Trial 2hrs 19.10-21.10
Trial 2 hrs Saturday
« FCE Full Time (09:00 - 12:00)
« CAE Full Time (09:00 - 12:00)
« Saturday IELTS (12:00-14:00)
« Saturday IELTS (12:00-16:30)
Junior Summer Programme (12:30-15:30)
IELTS Full Time (09:00-12:00)
Online Lower Level (4 weeks) Monday/Wednesday (A2/B1)
Online Higher Level (4 weeks) Tuesday/Thursday (B2/C1)
Online Lower Level (8 weeks) Monday/Wednesday (A2/B1)
Online Higher Level (8 weeks) Tuesday/Thursday (B2/C1)
Online Lower Level (12 weeks) Monday/Wednesday (A2/B1)
Online Higher Level (12 weeks) Tuesday/Thursday (B2/C1) */}

            <Form.Item
              label="Limited quantity"
              name="limited_quantity"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Limited availability&nbsp;
                  <Tooltip title="Limited availability">
                    <AiOutlineQuestionCircle />
                  </Tooltip>
                </span>
              }
              name="limited_availability"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <hr />
            <h5>Price calculation</h5>

            <Form.Item
              name="calculation"
              label={
                <span>
                  Calculation&nbsp;
                  <Tooltip title="Calculation">
                    <AiOutlineQuestionCircle />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please select Calculation",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="Automatic">Automatic</Option>
                <Option value="Semi-Automatic">Semi-Automatic</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="price_calculation"
              label="Price calculation"
              rules={[
                {
                  message: "Please select Price calculation",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="One Time Fee">One Time Fee</Option>
                <Option value="Per Course / Accommodation">
                  Per Course / Accommodation
                </Option>
                <Option value="Per Course / Accommodation Week">
                  Per Course / Accommodation Week
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Depending on duration"
              name="depending_on_duration"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              label="Depending on age"
              name="depending_on_age"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              label="Display if price is 0?"
              name="display_if_price_0"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <hr />
            <h5>Accounting</h5>

            <Form.Item
              name="date_of_booking"
              label="Date of booking"
              rules={[
                {
                  message: "Please select Date of booking",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="First Day Of Course">First Day Of Course</Option>
                <Option value="Last Day Of Course">Last Day Of Course</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Cost center based on service category"
              name="cost_center_based_category"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item label="Cost center" name="cost_center">
              <Input placeholder="Enter Cost center" />
            </Form.Item>

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit Additional Fees"
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
              name="title_english"
              rules={[{ required: true, message: "Please enter the Title!" }]}
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
                <Form.Item name="title_english" noStyle>
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
              name="title_portuguese"
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
                <Form.Item name="title_portuguese" noStyle>
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
              name="title_spanish"
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
                <Form.Item name="title_spanish" noStyle>
                  <Input
                    style={{
                      paddingLeft: "42px",
                    }}
                  />
                </Form.Item>
              </div>
            </Form.Item> */}

            <Form.Item label="Type" name="type">
              <Select placeholder="Select Type">
                <Option value="Additional Course Fees">
                  Additional Course Fees
                </Option>
                <Option value="Additional Accommodation Fees">
                  Additional Accommodation Fees
                </Option>
                <Option value="General Fees">General Fees</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="couses"
              label="Couses"
              rules={[
                {
                  message: "Please select Couses",
                  type: "array",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select a course"
                showSearch
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {courses.map((name) => (
                  <Option key={name._id} value={name.label}>
                    {name.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* 
General English Part Time(12:30 - 03:30)
General English Part Time(12:30 - 03:30)
General English Part Time(12:30 - 03:30)
General English Part Time(16:00 - 19:00)
General English Part Time(16:00 - 19:00)
General English Part Time(16:00 - 19:00)
IELTS Full Time (12:30 - 15:30)
IELTS 4 days/week (12:30 - 15:30)
IELTS Part Time (12:30 - 15:30)
CAE Exam Preparation Full Time (12:30 - 15:30)
General English Mon-Wed-Thu (19:10 - 21:10)
IELTS Mon-Wed-Thu (19:10 - 21:10)
Advanced/Business English Mon-Wed-Thu (19:10 - 21:10)
Intensive English Monday to Friday (9:00-15:30)
Intensive English Monday to Friday (12:30-19:00)
Saturday Grammar&Vocabulary (12:00 - 14:00)
Saturday Speaking & Listening (14:30 - 16:30)
Saturday Intensive (12:00-16:30)
Saturday Advanced Plus (12:00-14:00)
Saturday Advanced Business (14:30-16:30)
Saturday Advanced+/Business English (12:00-16:30)
Individual Lesson 1 to 1
Individual Lesson 2 to 1 (per student)
Online Individual Lessons
General English ONLINE Full-time (9.00-12.00)
General English ONLINE Part-time (9.00-12.00)
Trial 3 hrs 9.00-12.00
Trial 3 hrs 12.30-15.30
Trial 3 hrs 16.00-19.00
Trial 2hrs 19.10-21.10
Trial 2 hrs Saturday
« FCE Full Time (09:00 - 12:00)
« CAE Full Time (09:00 - 12:00)
« Saturday IELTS (12:00-14:00)
« Saturday IELTS (12:00-16:30)
Junior Summer Programme (12:30-15:30)
IELTS Full Time (09:00-12:00)
Online Lower Level (4 weeks) Monday/Wednesday (A2/B1)
Online Higher Level (4 weeks) Tuesday/Thursday (B2/C1)
Online Lower Level (8 weeks) Monday/Wednesday (A2/B1)
Online Higher Level (8 weeks) Tuesday/Thursday (B2/C1)
Online Lower Level (12 weeks) Monday/Wednesday (A2/B1)
Online Higher Level (12 weeks) Tuesday/Thursday (B2/C1) */}

            <Form.Item
              label="Limited quantity"
              name="limited_quantity"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Limited availability&nbsp;
                  <Tooltip title="Limited availability">
                    <AiOutlineQuestionCircle />
                  </Tooltip>
                </span>
              }
              name="limited_availability"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <hr />
            <h5>Price calculation</h5>

            <Form.Item
              name="calculation"
              label={
                <span>
                  Calculation&nbsp;
                  <Tooltip title="Calculation">
                    <AiOutlineQuestionCircle />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please select Calculation",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="Automatic">Automatic</Option>
                <Option value="Semi-Automatic">Semi-Automatic</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="price_calculation"
              label="Price calculation"
              rules={[
                {
                  message: "Please select Price calculation",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="One Time Fee">One Time Fee</Option>
                <Option value="Per Course / Accommodation">
                  Per Course / Accommodation
                </Option>
                <Option value="Per Course / Accommodation Week">
                  Per Course / Accommodation Week
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Depending on duration"
              name="depending_on_duration"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              label="Depending on age"
              name="depending_on_age"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              label="Display if price is 0?"
              name="display_if_price_0"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <hr />
            <h5>Accounting</h5>

            <Form.Item
              name="date_of_booking"
              label="Date of booking"
              rules={[
                {
                  message: "Please select Date of booking",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="First Day Of Course">First Day Of Course</Option>
                <Option value="Last Day Of Course">Last Day Of Course</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Cost center based on service category"
              name="cost_center_based_category"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item label="Cost center" name="cost_center">
              <Input placeholder="Enter Cost center" />
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

export default AdditionalFees;
