
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
  TimePicker,
} from "antd";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'; // Import default CSS

import axios from "axios";
import baseURL from "../../../../config";
import { Link } from "react-router-dom";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../../commonComponents/DeleteApi";
import {
  SearchInput,
  FileImportBtn,
} from "../../commonComponents/ButtonsDropdown";
import { SaveBtn, UpdateBtn } from "../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";
import moment from "moment";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";
import BookingForm from "../BookingForm";
const { Option } = Select;

const Provisional_booking = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [classroomOptions, setClassroomOptions] = useState([]); // State to store building names for dropdown
  const [coursesOptions, setCoursesOptions] = useState([]); // State to store building names for dropdown
  const [colorOptions, setColorOptions] = useState([]); // State to store building names for dropdown
  const [levelOptions, setLevelOptions] = useState([]); // State to store building names for dropdown
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [initialValuesLoaded, setInitialValuesLoaded] = useState(false); // Track if initial values are loaded
  const [initialValues, setInitialValues] = useState(null);
  const [formValues, setFormValues] = useState({});

  const [filterValue3, setFilterValue3] = useState(null);

  const [teacherList, setTeacherList] = useState([]);
  const [apiData, setApiData] = useState(null);

  const [form] = Form.useForm();

  // Reset form fields and initialValuesLoaded flag on component mount
  useEffect(() => {
    form.resetFields();
    setInitialValuesLoaded(false);
  }, [form]);

  const onFinish = async (values) => {
    const { teacher } = values;
    const selectedTeacher = teacherList.find((t) => t.value === teacher);
    const teacherName = selectedTeacher ? selectedTeacher.label : teacher;

    const collectionName = "provisionalbookings";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      ...values,
      teacher: teacherName,
    };

    try {
      await CommonFormSubmit(
        "provisionalbookings",
        setSelectedRecordId,
        data,
        setNewModalVisible,
        setEditModalVisible,
        form,
        fetchData,
        setErrorMessage,
        setSuccessMessage
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to submit form. Please try again later.");
    }
  };

  const handleFormChange = async (changedValues, allValues = null) => {
    const { start_date, weeks, from, end, weekdays } =
      allValues || form.getFieldsValue();

    try {
      // Always fetch available rooms when form changes
      const response = await fetchAvailableRooms(
        start_date,
        weeks,
        from,
        end,
        weekdays
      );
      if (response.availableRooms.length === 0) {
        setErrorMessage(
          "No available rooms. Please change start date, weeks, time, or weekdays."
        );
      } else {
        setErrorMessage(null);
      }
      setAvailableRooms(response.availableRooms);
    } catch (error) {
      console.error("Error fetching available rooms:", error);
      setErrorMessage(
        "Please enter date, weeks, weekdays and time to get available rooms."
      );
    }
  };



  
  // Fetch available rooms from API
  const fetchAvailableRooms = async (
    start_date,
    weeks,
    from,
    end,
    weekdays
  ) => {
    const apiUrl = `${baseURL}/validate-classes`; // Replace with your actual API endpoint

    // Prepare the request body
    const requestBody = {
      start_date,
      weeks,
      from,
      end,
      weekdays,
    };

    // If editing an existing class, include the class_id in the request body
    if (selectedRecordId) {
      requestBody.class_id = selectedRecordId;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch available rooms");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching available rooms:", error);
      throw new Error("Failed to fetch available rooms");
    }
  };

  // Populate form fields and call API on editingRecordData change
  useEffect(() => {
    if (editingRecordData) {
      // const formattedDate = editingRecordData.start_date
      //   ? moment(editingRecordData.start_date).format("YYYY-MM-DD")
      //   : null;

      form.setFieldsValue({
        ...editingRecordData,
        // start_date: formattedDate,
      });

      // document.getElementById("date-picker-class").value = formattedDate;

      // Call handleFormChange with the existing record data
      handleFormChange(null, {
        ...editingRecordData,
        // start_date: formattedDate,
      });
    }
  }, [editingRecordData, form]);

  // Wrapper for handleFormChange to reset classrooms field
  const handleFormChangeWrapper = async (changedValues, allValues) => {
    const relevantFields = ["start_date", "weeks", "from", "end", "weekdays"];
    const hasRelevantChange = Object.keys(changedValues).some((field) =>
      relevantFields.includes(field)
    );

    if (hasRelevantChange) {
      // Reset classrooms field
      form.setFieldsValue({
        classrooms: undefined,
      });
    }

    // Call the original handleFormChange function
    await handleFormChange(changedValues, allValues);
  };

  const handleFilter3Change = (value) => {
    setFilterValue3(value);
  };

  const fetchTeacherList = async () => {
    try {
      const responseData = await FieldListDropdown("teachers", "first_name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Name = responseData
          .map((name) => ({
            value: name._id, // Use the appropriate property for the value
            label: name.first_name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setTeacherList(Name);
      }
    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  };

  //----------------------populate for dropdown list-----------------------

  const fetchDropdownOptions = async () => {
    try {
      // Fetch and sort classroom options
      const classroomsResponse = await axios.post(`${baseURL}/getdata`, {
        collectionName: "classrooms",
      });
      const sortedClassrooms = classroomsResponse.data
        .map((classroom) => classroom.title)
        .sort((a, b) => a.localeCompare(b));
      setClassroomOptions(sortedClassrooms);

      // Fetch and sort color options
      const colorCodesResponse = await axios.post(`${baseURL}/getdata`, {
        collectionName: "colorcodes",
      });
      const sortedColors = colorCodesResponse.data
        .map((colorCode) => colorCode.title)
        .sort((a, b) => a.localeCompare(b));
      setColorOptions(sortedColors);

      // Fetch and sort course options
      const coursesResponse = await axios.post(`${baseURL}/getdata`, {
        collectionName: "courses",
      });
      const sortedCourses = coursesResponse.data
        .map((course) => course.title_english)
        .sort((a, b) => a.localeCompare(b));
      setCoursesOptions(sortedCourses);

      // Fetch and sort level options
      const courseLevelsResponse = await axios.post(`${baseURL}/getdata`, {
        collectionName: "courselevels",
      });
      const sortedLevels = courseLevelsResponse.data
        .map((courseLevel) => courseLevel.nickname)
        .sort((a, b) => a.localeCompare(b));
      setLevelOptions(sortedLevels);
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };

  useEffect(() => {
    // Fetch dropdown options when the component mounts
    fetchDropdownOptions();
    fetchTeacherList();
  }, []); // Empty deps ensures the effect runs only once on mount

  //----------------table functions-----------------------

  const fetchData = async () => {
    // Call the common delete API with the selected record IDs
    await fetchDataCommon("provisionalbookings", setData, setSelectedRowKeys, setLoading);
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
    setEditingRecordData(null);

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
      setEditModalVisible(false);

      // Optionally, reset the form values
      setFormValues({});
    } catch (error) {
      console.error("Error:", error);
      // Handle error (show message or other error handling)
    }
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
      title: "Status",
      dataIndex: "student_status",
      key: "student_status",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
      
   {
    title: "Salesperson",
    dataIndex: "salesperson",
    key: "salesperson",
   
  }
  ,
    {
      title: "Lead",
      dataIndex: "lead",
      key: "lead",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "First name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Birthdate",
      dataIndex: "dob",
      key: "dob",
      render: (text, record) =>
        record.dob ? moment(record.dob).format("DD-MM-YYYY") : "",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "Country of Birth",
      dataIndex: "country_birth",
      key: "country_birth",
    },
    {
      title: "Country of Residence",
      dataIndex: "country_residence",
      key: "country_residence",
    },
    {
      title: "Mother tongue",
      dataIndex: "mother_tongue",
      key: "mother_tongue",
    },
    // 🔹 Address
    {
      title: "Address",
      dataIndex: "address_address",
      key: "address_address",
    },
    {
      title: "ZIP / Postal code",
      dataIndex: "address_zipcode",
      key: "address_zipcode",
    },
    {
      title: "City",
      dataIndex: "address_city",
      key: "address_city",
    },
    {
      title: "State",
      dataIndex: "address_state",
      key: "address_state",
    },
    {
      title: "Country",
      dataIndex: "address_country",
      key: "address_country",
    },
    // 🔹 Billing
    {
      title: "Billing Address",
      dataIndex: "billing_address",
      key: "billing_address",
    },
    {
      title: "Billing ZIP",
      dataIndex: "billing_zipcode",
      key: "billing_zipcode",
    },
    {
      title: "Billing City",
      dataIndex: "billing_city",
      key: "billing_city",
    },
    {
      title: "Billing State",
      dataIndex: "billing_state",
      key: "billing_state",
    },
    {
      title: "Billing Country",
      dataIndex: "billing_country",
      key: "billing_country",
    },
    // 🔹 Booking Info
    {
      title: "Booking Date",
      dataIndex: "bookingdate",
      key: "bookingdate",
      render: (text, record) =>
        record.bookingdate ? moment(record.bookingdate).format("DD-MM-YYYY") : "",
    },
    {
      title: "Status",
      dataIndex: "student_status",
      key: "student_status",
    },
    // 🔹 Course
    {
      title: "Course Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "No. of Weeks",
      dataIndex: "no_of_weeks",
      key: "no_of_weeks",
    },
    {
      title: "Course Start",
      dataIndex: "course_from_date",
      key: "course_from_date",
      render: (text, record) =>
        record.course_from_date
          ? moment(record.course_from_date).format("DD-MM-YYYY")
          : "",
    },
    {
      title: "Course End",
      dataIndex: "course_to_date",
      key: "course_to_date",
      render: (text, record) =>
        record.course_to_date
          ? moment(record.course_to_date).format("DD-MM-YYYY")
          : "",
    },
    // 🔹 Accommodation
    {
      title: "Accommodation",
      dataIndex: "accommodation",
      key: "accommodation",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Board",
      dataIndex: "board",
      key: "board",
    },
    {
      title: "Accommodation Weeks",
      dataIndex: "no_of_weeks_accommodation",
      key: "no_of_weeks_accommodation",
    },
    {
      title: "Accommodation From",
      dataIndex: "accommodation_from_date",
      key: "accommodation_from_date",
    },
    {
      title: "Accommodation To",
      dataIndex: "accommodation_to_date",
      key: "accommodation_to_date",
    },
    // 🔹 Visa / Passport
    {
      title: "Student Visa",
      dataIndex: "student_visa",
      key: "student_visa",
      render: (val) => (val ? "Yes" : "No"),
    },
    {
      title: "Passport Number",
      dataIndex: "passport_number",
      key: "passport_number",
    },
    {
      title: "Passport Valid From",
      dataIndex: "passport_from",
      key: "passport_from",
    },
    {
      title: "Passport Valid Until",
      dataIndex: "passport_until",
      key: "passport_until",
    },
    {
      title: "Visa From",
      dataIndex: "visa_from",
      key: "visa_from",
    },
    {
      title: "Visa Until",
      dataIndex: "visa_until",
      key: "visa_until",
    },
    {
      title: "Visa Status",
      dataIndex: "visa_status",
      key: "visa_status",
    },
    {
      title: "Visa Type",
      dataIndex: "visa_type",
      key: "visa_type",
    },
    {
      title: "Payment Amount",
      dataIndex: "payment_amount",
      key: "payment_amount",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
  ];
  

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        source: `${entry.source} ` || null,
        salesperson: `${entry.salesperson} ` || null,
        lead: `${entry.lead} ` || null,
        surname: `${entry.surname} ` || null,
        firstname: `${entry.firstname} ` || null,
        gender: `${entry.gender} ` || null,
        email: `${entry.email} ` || null,
        phone: `${entry.phone} ` || null,
        student_status: `${entry.student_status} ` || null,
        nationality: `${entry.nationality} ` || null,
        country_birth: `${entry.country_birth} ` || null,
        country_residence: `${entry.country_residence} ` || null,
        mother_tongue: `${entry.mother_tongue} ` || null,
        address_address: `${entry.address_address} ` || null,
        address_zipcode: `${entry.address_zipcode} ` || null,
        address_city: `${entry.address_city} ` || null,
        address_state: `${entry.address_state} ` || null,
        address_country: `${entry.address_country} ` || null,
        no_of_weeks: `${entry.no_of_weeks} ` || null,
        course: `${entry.course} ` || null,
        category: `${entry.category} ` || null,
       







        start_date: entry.start_date
          ? moment(entry.start_date).format("DD-MM-YYYY")
          : null,
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
        collectionName: "provisionalbookings",
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
      "provisionalbookings",
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
          <Link to="">Bookings</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Provisional booking</Breadcrumb.Item>
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
            <FileImportBtn
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
            alignItems: "center",
          }}
        ></div>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>

            {/* <Select
              style={{ width: 220 }}
              placeholder="SELECT COURSE WEEK"
              onChange={handleFilter3Change}
              value={filterValue3}
            >
              <Option value="Week 53, 28.12.2020 - 03.01.2021">
                Week 53, 28.12.2020 - 03.01.2021
              </Option>
              <Option value="Week 01, 04.01.2021 - 10.01.2021">
                Week 01, 04.01.2021 - 10.01.2021
              </Option>
            </Select> */}
          </Space>
        </div>

       
        <Modal
          title="Add New Provisional"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          <BookingForm
          form={form}
            formValues={formValues}
            setNewModalVisible={setNewModalVisible}
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
            fetchData={fetchData}
            setSelectedRecordId={setSelectedRecordId}

          />
        </Modal>

        <Modal
          title="Edit Provisional"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          <BookingForm
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

export default Provisional_booking;
