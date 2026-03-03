import React, { useState, useEffect } from "react";
import { Button, Table, Input, Space, Modal, Breadcrumb, message, Form } from "antd";

import BookingForm from "./BookingForm";
import axios from "axios";
import baseURL from "../../../config";
import { Link } from "react-router-dom";
// import { fetchDataCommon } from "../commonComponents/GetDataApi";
import { Spin } from "antd";
import {
  AddEditDeleteDeactivate,
  CsvExcelImport,
  FiltersDropdown,
  SearchInput,
} from "../../sidebar menu/commonComponents/ButtonsDropdown";
import moment from "moment";

const Bookings = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecordIdToDelete, setSelectedRecordIdToDelete] =
    useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

// Fetch data when the component mounts
const fetchData = async () => {
  try {
    setLoading(true);

    const response = await axios.get(`${baseURL}/getbookings`);
    
    // Reverse the data to display the last entry first
    const reversedData = response.data.reverse();
    
    setData(reversedData); // Update the state with fetched data
    setLoading(false);

    setSelectedRowKeys([]); // Reset selectedRowKeys

    console.log("response", response);
  } catch (error) {
    setError(error);
    setLoading(false);
    console.error("Error fetching data:", error);
  }
};


  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

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
      setSelectedRecordId(selectedRows[0].candidateId);
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
    form.resetFields();
    setSelectedRecordId(null); 
    setNewModalVisible(true);
    handleNewButtonClick();
    setSelectedRowKeys([]);
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
      title: "Candidate ID",
      dataIndex: "candidateId",
      key: "candidateId",
      render: () => null, // Render an empty cell to hide the content
      fixed: "left", // Fix this column to the left to keep it visible
      width: 0, // Set the width to 0 to make it effectively hidden
    },
    {
      title: "Inv. no.",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Salesperson",
      dataIndex: "salesperson",
      key: "salesperson",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Student ID",
      dataIndex: "studentID",
      key: "studentID",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Birthdate",
      dataIndex: "dob",
      key: "dob",
      render: (text, record) => (
        <span>{moment(record.dob).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "ZIP / Postal code",
      dataIndex: "zipCode",
      key: "zipCode",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Address addon",
      dataIndex: "addressAddon",
      key: "addressAddon",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "Mother tongue",
      dataIndex: "motherTongue",
      key: "motherTongue",
    },
    {
      title: "Student card PDF",
      dataIndex: "studentCardPDF",
      key: "studentCardPDF",
    },
    {
      title: "Correspondence language",
      dataIndex: "correspondenceLanguage",
      key: "correspondenceLanguage",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Student status",
      dataIndex: "studentStatus",
      key: "studentStatus",
    },
    {
      title: "Cellphone",
      dataIndex: "cellphone",
      key: "cellphone",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Invoice numbers",
      dataIndex: "invoiceNumbers",
      key: "invoiceNumbers",
    },
    {
      title: "Contact person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Contact person E-mail",
      dataIndex: "contactPersonEmail",
      key: "contactPersonEmail",
    },
    {
      title: "Contact person Phone",
      dataIndex: "contactPersonPhone",
      key: "contactPersonPhone",
    },
    {
      title: "Visa",
      dataIndex: "visa",
      key: "visa",
    },
    {
      title: "Passport valid from",
      dataIndex: "passportValidFrom",
      key: "passportValidFrom",
    },
    {
      title: "Passport valid until",
      dataIndex: "passportValidUntil",
      key: "passportValidUntil",
    },
    {
      title: "Visa valid from",
      dataIndex: "visaValidFrom",
      key: "visaValidFrom",
    },
    {
      title: "Visa valid until",
      dataIndex: "visaValidUntil",
      key: "visaValidUntil",
    },
    {
      title: "Course - Booked courses",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Lessons",
      dataIndex: "lessons",
      key: "lessons",
    },
    {
      title: "Start date (Course)",
      dataIndex: "course_from_date",
      key: "course_from_date",
    },
    {
      title: "End date (Course)",
      dataIndex: "courseEndDate",
      key: "courseEndDate",
    },
    {
      title: "Course - External level",
      dataIndex: "courseExternalLevel",
      key: "courseExternalLevel",
    },
    {
      title: "Course - First course",
      dataIndex: "courseFirstCourse",
      key: "courseFirstCourse",
    },
    {
      title: "Course - Absolute weeks",
      dataIndex: "courseAbsoluteWeeks",
      key: "courseAbsoluteWeeks",
    },
    {
      title: "Course - Relative weeks",
      dataIndex: "courseRelativeWeeks",
      key: "courseRelativeWeeks",
    },
    {
      title: "Course - Last level (internal)",
      dataIndex: "courseLastLevelInternal",
      key: "courseLastLevelInternal",
    },
    {
      title: "Accommodation",
      dataIndex: "accommodation",
      key: "accommodation",
    },
    {
      title: "Accommodation - Start date",
      dataIndex: "accommodationStartDate",
      key: "accommodationStartDate",
    },
    {
      title: "Accommodation - End date",
      dataIndex: "accommodationEndDate",
      key: "accommodationEndDate",
    },
    {
      title: "Accommodation - Note",
      dataIndex: "accommodationNote",
      key: "accommodationNote",
    },
    {
      title: "Accommodation - Additional note",
      dataIndex: "accommodationAdditionalNote",
      key: "accommodationAdditionalNote",
    },
    {
      title: "Arrival - Airline",
      dataIndex: "arrivalAirline",
      key: "arrivalAirline",
    },
    {
      title: "Departure - Airline",
      dataIndex: "departureAirline",
      key: "departureAirline",
    },
    {
      title: "Arrival - Flight number",
      dataIndex: "arrivalFlightNumber",
      key: "arrivalFlightNumber",
    },
    {
      title: "Departure - Flight number",
      dataIndex: "departureFlightNumber",
      key: "departureFlightNumber",
    },
    {
      title: "Transfer - Note",
      dataIndex: "transferNote",
      key: "transferNote",
    },
    {
      title: "Arrival - Comment",
      dataIndex: "arrivalComment",
      key: "arrivalComment",
    },
    {
      title: "Departure - Note",
      dataIndex: "departureNote",
      key: "departureNote",
    },
    {
      title: "Departure - Locations (Day)",
      dataIndex: "departureLocationsDay",
      key: "departureLocationsDay",
    },
    {
      title: "Arrival - Locations (Day)",
      dataIndex: "arrivalLocationsDay",
      key: "arrivalLocationsDay",
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
      key: "insurance",
    },
    {
      title: "Allergies",
      dataIndex: "allergies",
      key: "allergies",
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Payment reminder ZIP / Postal code",
      dataIndex: "paymentReminderZipCode",
      key: "paymentReminderZipCode",
    },
    {
      title: "Total expected prior to arrival City",
      dataIndex: "totalExpectedPriorToArrivalCity",
      key: "totalExpectedPriorToArrivalCity",
    },
    {
      title: "Total expected at school Phone",
      dataIndex: "totalExpectedAtSchoolPhone",
      key: "totalExpectedAtSchoolPhone",
    },
    {
      title: "Pending amount prior to arrival Pend. amount at school",
      dataIndex: "pendingAmountPriorToArrival",
      key: "pendingAmountPriorToArrival",
    },
    {
      title: "Phone 2",
      dataIndex: "phone2",
      key: "phone2",
    },
    {
      title: "Cellphone",
      dataIndex: "cellphone",
      key: "cellphone",
    },
    {
      title: "Paid prior to arrival E-mail",
      dataIndex: "paidPriorToArrivalEmail",
      key: "paidPriorToArrivalEmail",
    },
    {
      title: "Paid at school Contact",
      dataIndex: "paidAtSchoolContact",
      key: "paidAtSchoolContact",
    },
    {
      title: "Preferred course start weekday",
      dataIndex: "preferredCourseStartWeekday",
      key: "preferredCourseStartWeekday",
    },
    {
      title: "Net inv PDF",
      dataIndex: "netInvPDF",
      key: "netInvPDF",
    },
    {
      title: "Gross inv",
      dataIndex: "grossInv",
      key: "grossInv",
    },
    {
      title: "Preferred accommodation start weekday",
      dataIndex: "preferredAccommodationStartWeekday",
      key: "preferredAccommodationStartWeekday",
    },
    {
      title: "LoA PDF",
      dataIndex: "loaPDF",
      key: "loaPDF",
    },
    {
      title: "Created by",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Date of last message",
      dataIndex: "dateOfLastMessage",
      key: "dateOfLastMessage",
    },
    {
      title: "User of last message",
      dataIndex: "userOfLastMessage",
      key: "userOfLastMessage",
    },
    {
      title: "Updated by",
      dataIndex: "updatedBy",
      key: "updatedBy",
    },
    {
      title: "Updated on",
      dataIndex: "updatedOn",
      key: "updatedOn",
    },
    {
      title: "Balance due total",
      dataIndex: "balanceDueTotal",
      key: "balanceDueTotal",
    },
    {
      title: "Confirmed on",
      dataIndex: "confirmedOn",
      key: "confirmedOn",
    },
    // ... Add more columns as needed
  ];

  const transformedData = data.map((entry) => ({
    invoiceNumber: entry.booking ? entry.booking.invoiceNumber : null,
    salesperson: entry.booking ? entry.booking.salesperson : null,
    name: entry.candidate.name,
    surname: entry.candidate.surname,
    firstName: entry.candidate.firstname,
    gender: entry.candidate.gender,
    studentID: entry.candidate.studentID,
    dob: entry.candidate ? entry.candidate.dob : null,
    city: entry.address ? entry.address.city : null,
    email: entry.address ? entry.address.email : null,
    zipCode: entry.address ? entry.address.zipcode : null,
    address: entry.address ? entry.address.address : null,
    addressAddon: entry.address ? entry.address.address_addon : null,
    state: entry.address ? entry.address.state : null,
    country: entry.address ? entry.address.country : null,
    nationality: entry.candidate ? entry.candidate.nationality : null,
    motherTongue: entry.candidate ? entry.candidate.mother_tongue : null,
    correspondenceLanguage: entry.candidate
      ? entry.candidate.correspondence_language
      : null,
    note: entry.candidate ? entry.candidate.note : null,
    studentStatus: entry.booking ? entry.booking.student_status : null,
    cellphone: entry.address ? entry.address.cellphone : null,
    phone: entry.address ? entry.address.phone : null,
    source: entry.address ? entry.address.source : null,
    candidateId: entry.candidate ? entry.candidate._id : null,


    course_from_date: entry.courses ? entry.course_from_date : null,
    course: entry.courses ? entry.course : null,
    // Add more properties as needed
  }));
  const visibleColumns = columns.filter(
    (column) => column.dataIndex !== "candidateId"
  );

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
      const response = await axios.post(`${baseURL}/getOnebookings`, {
        candidate_id: selectedRecordId,
      });

      // The response.data should contain the data for the selected record
      const selectedRecordData = response.data;

      // Set the editing record data
      setEditingRecordData(selectedRecordData);

      // Open the edit modal
      handleEditModalOpen();

      // Set the form data in the BookingForm component
      // You might need to have a function in BookingForm to handle this
      // Example: setFormData(selectedRecordData);
    } catch (error) {
      console.error("Error fetching data for edit:", error);
      // Handle the error (show a message or return)
    }
  };

  const handleDeleteButtonClick = () => {
    if (selectedRowKeys.length === 0) {
      // No records selected, show a message
      Modal.warning({
        title: "Please Select Records",
        content: "Please select records to delete.",
      });
      return;
    } else {
      // Records are selected, show the delete confirmation modal
      setDeleteModalVisible(true);
    }
  };

  const handleDeleteModalOk = async () => {
    try {
      // First delete API request body
      const firstRequestBody = [
        {
          collectionName: "candidates",
          ids: selectedRowKeys,
        },
      ];

      console.log("First Request Body:", firstRequestBody);

      // Call the first delete API with the selected record IDs
      const response1 = await axios.post(
        `${baseURL}/deleteRecord`,
        firstRequestBody
      );

      console.log("First API Response:", response1.data);

      // Handle success for the first API call (show message, refresh data, etc.)

      // Second delete API request body
      const secondRequestBody = [
        {
          collectionName: "CandidateAddresses",
          candidateIds: selectedRowKeys,
        },
        {
          collectionName: "candidatemedicals",
          candidateIds: selectedRowKeys,
        },
        {
          collectionName: "CandidateBookings",
          candidateIds: selectedRowKeys,
        },
        {
          collectionName: "candidatecourses",
          candidateIds: selectedRowKeys,
        },
        {
          collectionName: "bookings",
          candidateIds: selectedRowKeys,
        },
        {
          collectionName: "furthercontacts",
          candidateIds: selectedRowKeys,
        },
      ];

      console.log("Second Request Body:", secondRequestBody);

      // Call the second delete API with the selected record IDs
      const response2 = await axios.post(
        `${baseURL}/deleteRecordByCandidateId`,
        secondRequestBody
      );

      console.log("Second API Response:", response2.data);

      // Handle success for the second API call (show message, refresh data, etc.)

      // Handle success (show message, refresh data, etc.)
      message.success("Records deleted successfully");

      // Refresh data after deletion
      fetchData();

      // Close the delete confirmation modal
      setDeleteModalVisible(false);
    } catch (error) {
      console.error("Error deleting records:", error);
      // Handle error (show message or other error handling)
    }
  };

  const handleDeleteModalCancel = () => {
    // Close the delete confirmation modal without performing the deletion
    form.resetFields()
    setDeleteModalVisible(false);
  };

  const CancelBothModel= () =>{
    setNewModalVisible(false);
    setEditModalVisible(false);
  }
  const handleNewButtonClick = () => {
    form.resetFields(); // Reset form fields when clicking "New"
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Bookings</Link>
        </Breadcrumb.Item>
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
            />{" "}
          </Space>
        </div>

        <Modal
          title="Add New Booking"
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
            setNewModalVisible={setNewModalVisible}
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
            fetchData={fetchData}

          />
        </Modal>

        <Modal
          title="Edit Booking"
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
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
            fetchData={fetchData}

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

        <h5>Personal Details</h5>

        <Spin spinning={loading}>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
              fixed: true,
            }}
            columns={visibleColumns}
            dataSource={transformedData}
            rowKey={(record) => record.candidateId} // Use a unique key for each row
            
            scroll={{ x: "max-content" }}
          />
        </Spin>
      </div>
    </>
  );
};

export default Bookings;
