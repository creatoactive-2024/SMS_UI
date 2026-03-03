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
import baseURL from "../../../config";
import EnquiryForm from "./EnquiryForm";
import { Link } from "react-router-dom";
import moment from "moment";
 import { fetchDataCommon } from "../../../components/sidebar menu/commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../../../components/sidebar menu/commonComponents/DeleteApi";
import {
  AddEditDeleteDeactivate,
  CsvExcelImport,
  FiltersDropdown,
  SearchInput
} from "../../../components/sidebar menu/commonComponents/ButtonsDropdown";


const { Option } = Select;

const Enquiries = () => {
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
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [filterValue1, setFilterValue1] = useState(null);
  const [filterValue2, setFilterValue2] = useState(null);
  const [filterValue3, setFilterValue3] = useState(null);

  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  const handleFilter2Change = (value) => {
    setFilterValue2(value);
  };

  const handleFilter3Change = (value) => {
    setFilterValue3(value);
  };

  //----------------table fetch data--------------------
   
  const fetchData = async () => {
    // Call the common delete API with the selected record IDs
    await fetchDataCommon("enquiries", setData, setSelectedRowKeys, setLoading);
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
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: () => null, // Render an empty cell to hide the content
      fixed: "left", // Fix this column to the left to keep it visible
      width: 0, // Set the width to 0 to make it effectively hidden
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Salesperson",
      dataIndex: "salesperson",
      key: "salesperson",
    },
    {
      title: "Correspondence language",
      dataIndex: "correspondenceLanguage",
      key: "correspondenceLanguage",
    },
    {
      title: "Free Trial Course	",
      dataIndex: "free_trial",
      key: "free_trial",
    },
    {
      title: "Date of last message",
      dataIndex: "created_date",
      key: "created_date",
      render: (text, record) => (
        <span>{moment(record.created_date).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User of last message",
      dataIndex: "Useroflastmessage",
      key: "Useroflastmessage",
    },
    {
      title: "Follow up",
      dataIndex: "follow_up_date",
      key: "follow_up_date",
      render: (text, record) => (
        <span>{moment(record.follow_up_date).format("DD-MM-YYYY") || "na"}</span>
      ),
    },
    {
      title: "ZIP / Postal code",
      dataIndex: "postal_code",
      key: "postal_code",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Nationality",
      dataIndex: "nationality_name",
      key: "nationality_name",
    },
    {
      title: "Student status	",
      dataIndex: "student_status",
      key: "student_status",
    },

    {
      title: "Created by	",
      dataIndex: "CreatedBy	",
      key: "CreatedBy	",
    },
    {
      title: "Created",
      dataIndex: "created_date",
      key: "created_date",
      render: (text, record) => (
        <span>{moment(record.created_date).format("DD-MM-YYYY HH:mm:ss")}</span>
      ),
    },

    {
      title: "Updated by	",
      dataIndex: "UpdatedBy	",
      key: "UpdatedBy	",
    },

    {
      title: "Updated on	",
      dataIndex: "UpdatedOn	",
      key: "UpdatedOn	",
    },
    {
      title: "Date of  Free Trial",
      dataIndex: "date_of_free_trial",
      key: "date_of_free_trial",
      render: (text, record) => (
        <span>{moment(record.date_of_free_trial).format("DD-MM-YYYY")}</span>
      ),
      
    },

    // ... Add more columns as needed
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        name: `${entry.firstname} ${entry.surname}` || null,
        email: entry.email || null,
        contact: entry.phone || null,
        salesperson: entry.sales_person_name || null,
        correspondenceLanguage: entry.correspondence_language || null,

        free_trial: entry.free_trial || null,
        date_of_free_trial: entry.date_of_free_trial || null,
        follow_up_date: entry.follow_up_date || "N/A",
        postal_code: entry.postal_code || null,
        country: entry.country || null,
        nationality_name: entry.nationality_name || null,
        student_status: entry.student_status || null,
        date_of_free_trial: entry.date_of_free_trial || null,
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
        collectionName: "enquiries",
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

  
  
  const handleDeleteModalOk = async () => {
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "enquiries",
      selectedRowKeys,
      fetchData,
      setDeleteModalVisible
    );
  };

  const handleDeleteModalCancel = () => {
    // Close the delete confirmation modal without performing the deletion
    setDeleteModalVisible(false);
  };

  const handleNewButtonClick = () => {
    setFormValues({});
    console.log("then values" , formValues);
    form.resetFields();
  };


  const CancelBothModel= () =>{
    setNewModalVisible(false);
    setEditModalVisible(false);
    
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Enquiries</Link>
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
            <FiltersDropdown
              handleFilter1Change={handleFilter1Change}
              handleFilter2Change={handleFilter2Change}
              handleFilter3Change={handleFilter3Change}
              filterValue1={filterValue1}
              filterValue2={filterValue2}
              filterValue3={filterValue3}
            />
          </Space>
          <Space>
            <CsvExcelImport
              handleCsvExport={handleCsvExport}
              handleExcelExport={handleExcelExport}
            />
          </Space>
        </div>

        <Modal
          title="Add New Enquiry"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          <EnquiryForm
            form={form}
            formValues={formValues}
            setSelectedRecordId={setSelectedRecordId}

            setFormValues={setFormValues}
            setNewModalVisible={setNewModalVisible}
            fetchData={fetchData}
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
          />
        </Modal>

        <Modal
          title="Edit Enquiry"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          {/* Pass the editing record data to the BookingForm component */}
          <EnquiryForm
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

export default Enquiries;




// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Input,
//   Space,
//   Modal,
//   message,
//   Select,
//   Breadcrumb,
//   Form,
//   Pagination,
//   Button,
// } from "antd";

// import axios from "axios";
// import baseURL from "../../../config";
// import EnquiryForm from "./EnquiryForm";
// import { Link } from "react-router-dom";
// import moment from "moment";
//  import { fetchDataCommon } from "../../../components/sidebar menu/commonComponents/GetDataApi";
// import { Spin } from "antd";
// import { handleDelete } from "../../../components/sidebar menu/commonComponents/DeleteApi";
// import {
//   AddEditDeleteDeactivate,
//   CsvExcelImport,
//   FiltersDropdown,
//   SearchInput
// } from "../../../components/sidebar menu/commonComponents/ButtonsDropdown";
// import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";


// const { Option } = Select;

// const Enquiries = () => {
//   // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   // const [loading, setLoading] = useState(false);
//   const [newModalVisible, setNewModalVisible] = useState(false);
//   // const [data, setData] = useState([]); // State to store fetched data
//   const [selectedRecordId, setSelectedRecordId] = useState(null);
//   const [editingRecordData, setEditingRecordData] = useState(null);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [activeKey, setActiveKey] = useState("1");
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [error, setError] = useState(null);
//   const [form] = Form.useForm();
//   const [formValues, setFormValues] = useState({});
//   const [filterValue1, setFilterValue1] = useState(null);
//   const [filterValue2, setFilterValue2] = useState(null);
//   const [filterValue3, setFilterValue3] = useState(null);

//   //hubspot table start
//   // const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(100);
//   const [total, setTotal] = useState(0);
//   const [search, setSearch] = useState(""); // search input
//   const [filteredData, setFilteredData] = useState([]);
// const [data, setData] = useState([]);
//   const [allData, setAllData] = useState([]); // store full fetched data
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);

//   // const onSelectChange = (newSelectedRowKeys) => {
//   //   setSelectedRowKeys(newSelectedRowKeys);
//   // };

//   //hubspot table end

// //hubspot functions start
// const fetchContacts = async (pageNumber = 1, pageSize = 50, startDate, endDate) => {
//     try {
//       setLoading(true);

//       const params = new URLSearchParams({ limit: pageSize, page: pageNumber });
//       if (startDate) params.append("startDate", startDate);
//       if (endDate) params.append("endDate", endDate);

//       const res = await fetch(`https://globaltourmanager.com/backend/contacts?${params.toString()}`);
//       const result = await res.json();

//       const contacts = (result.contacts || []).map((contact) => {
//         const props = contact.properties || {};
//         return {
//           _id: contact.id,
//           name: `${props.firstname || ""} ${props.lastname || ""}`.trim(),
//           email: props.email || "-",
//           contact: props.phone || "-",
//           salesperson: props.sales_person_name || "-",
//           created_date: props.createdate || null,
//           last_modified: props.lastmodifieddate || null,
//         };
//       });

//       setAllData(contacts); // store full data
//       setData(contacts);    // initially show all
//       setTotal(result.total || contacts.length);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//       setLoading(false);
//     }
//   };

//   // Search input handler: filter frontend data
//   const onSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearch(term);
//     setPage(1); // reset pagination

//     const filtered = allData.filter(
//       (item) =>
//         item.name.toLowerCase().includes(term) ||
//         item.email.toLowerCase().includes(term)
//     );
//     setData(filtered);
//   };

//   // Table row selection
//   const onSelectChange1 = (selectedKeys) => setSelectedRowKeys(selectedKeys);

//   // Fetch data on mount or page/limit change
//   useEffect(() => {
//     const startDate = new Date("2025-08-11T00:00:00Z").toISOString();
//     const endDate = new Date("2025-08-11T23:59:59Z").toISOString();
//     fetchContacts(page, limit, startDate, endDate);
//   }, [page, limit]);


// //hubspot functions end





//   const handleFilter1Change = (value) => {
//     setFilterValue1(value);
//   };

//   const handleFilter2Change = (value) => {
//     setFilterValue2(value);
//   };

//   const handleFilter3Change = (value) => {
//     setFilterValue3(value);
//   };

//   //----------------table fetch data--------------------
   
//   const fetchData = async () => {
//     // Call the common delete API with the selected record IDs
//     await fetchDataCommon("enquiries", setData, setSelectedRowKeys, setLoading);
//   };

//   useEffect(() => {
//     // Fetch data when the component mounts
//     fetchData();
//   }, []); // Empty depsures the effect runs only once on mount

//   // Log the data after it has been set in the state
//   useEffect(() => {
//     console.log("check data", data);
//   }, [data]);

//   const start = () => {
//     setLoading(true);
//     // ajax request after empty completing
//     setTimeout(() => {
//       setSelectedRowKeys([]);
//       setLoading(false);
//     }, 1000);
//   };

//   const onSelectChange = (newSelectedRowKeys, selectedRows) => {
//     console.log("selectedRowKeys changed: ", newSelectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);

//     // Assuming the first selected row contains the desired record ID
//     if (selectedRows.length > 0) {
//       setSelectedRecordId(selectedRows[0]._id);
//     } else {
//       setSelectedRecordId(null);
//     }
//   };

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//     fixed: true,
//   };

//   const hasSelected = selectedRowKeys.length > 0;

//   const handleNewModalOpen = () => {
//     form.resetFields();
//     setSelectedRecordId(null); 
   
//     setNewModalVisible(true);
//     handleNewButtonClick();
//     setSelectedRowKeys([]);
//   };

//   const handleNewModalCancel = () => {
//     setNewModalVisible(false);
//   };

//   const handleNewModalOk = () => {
//     // Handle logic when submitting the new form
//     setNewModalVisible(false);
    
//   };

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "_id",
//       key: "_id",
//       render: () => null,
//       fixed: "left",
//       width: 0,
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Contact",
//       dataIndex: "contact",
//       key: "contact",
//     },
//     {
//       title: "Salesperson",
//       dataIndex: "salesperson",
//       key: "salesperson",
//     },
//     {
//       title: "Correspondence language",
//       dataIndex: "correspondenceLanguage",
//       key: "correspondenceLanguage",
//     },
//     {
//       title: "Free Trial Course",
//       dataIndex: "free_trial",
//       key: "free_trial",
//     },
//     {
//       title: "Date of last message",
//       dataIndex: "created_date",
//       key: "created_date",
//       render: (text, record) =>
//         record.created_date ? (
//           <span>{moment(record.created_date).format("DD-MM-YYYY")}</span>
//         ) : (
//           "-"
//         ),
//     },
//     {
//       title: "Follow up",
//       dataIndex: "follow_up_date",
//       key: "follow_up_date",
//       render: (text, record) =>
//         record.follow_up_date ? (
//           <span>{moment(record.follow_up_date).format("DD-MM-YYYY")}</span>
//         ) : (
//           "N/A"
//         ),
//     },
//     {
//       title: "ZIP / Postal code",
//       dataIndex: "postal_code",
//       key: "postal_code",
//     },
//     {
//       title: "Country",
//       dataIndex: "country",
//       key: "country",
//     },
//     {
//       title: "Nationality",
//       dataIndex: "nationality_name",
//       key: "nationality_name",
//     },
//     {
//       title: "Student status",
//       dataIndex: "student_status",
//       key: "student_status",
//     },
//     {
//       title: "Created",
//       dataIndex: "created_date",
//       key: "created_date",
//       render: (text, record) =>
//         record.created_date ? (
//           <span>{moment(record.created_date).format("DD-MM-YYYY HH:mm:ss")}</span>
//         ) : (
//           "-"
//         ),
//     },
//     {
//       title: "Date of Free Trial",
//       dataIndex: "date_of_free_trial",
//       key: "date_of_free_trial",
//       render: (text, record) =>
//         record.date_of_free_trial ? (
//           <span>{moment(record.date_of_free_trial).format("DD-MM-YYYY")}</span>
//         ) : (
//           "-"
//         ),
//     },
//   ];

//   console.log("check data", data);
//   // Check if data is undefined before mapping
//   const transformedData = data
//     ? data.map((entry) => ({
//         _id: entry._id || null,
//         name: `${entry.firstname} ${entry.surname}` || null,
//         email: entry.email || null,
//         contact: entry.phone || null,
//         salesperson: entry.sales_person_name || null,
//         correspondenceLanguage: entry.correspondence_language || null,

//         free_trial: entry.free_trial || null,
//         date_of_free_trial: entry.date_of_free_trial || null,
//         follow_up_date: entry.follow_up_date || "N/A",
//         postal_code: entry.postal_code || null,
//         country: entry.country || null,
//         nationality_name: entry.nationality_name || null,
//         student_status: entry.student_status || null,
//         date_of_free_trial: entry.date_of_free_trial || null,
//       }))
//     : [];

//   const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

//   const handleEditModalOpen = () => {
//     setEditModalVisible(true);

//     // Set the active tab based on whether a record is being edited
//     const activeKey = editingRecordData ? "1" : "2";
//     setActiveKey(activeKey);
//   };

//   const handleEditModalCancel = () => {
//     setEditModalVisible(false);
//   };

//   const handleEditModalOk = () => {
//     // Handle logic when submitting the edit form
//     setEditModalVisible(false);
//   };

//   const handleEditButtonClick = async () => {
//     try {
//       console.log("Selected Row Keys:", selectedRowKeys);
//       console.log("Selected Record ID Before Fetch:", selectedRecordId);

//       if (!selectedRecordId) {
//         // No record selected, show a message
//         Modal.warning({
//           title: "Please Select a Record",
//           content: "Please select a record to edit.",
//         });
//         return;
//       }

//       if (selectedRowKeys.length > 1) {
//         // More than one record selected, show a message
//         Modal.warning({
//           title: "Select Only One Record",
//           content: "Please select only one record at a time for editing.",
//         });
//         return;
//       }

//       // Send the selected record ID in the request body
//       const response = await axios.post(`${baseURL}/getdata`, {
//         collectionName: "enquiries",
//         id: selectedRecordId,
//       });

//       // The response.data should contain the data for the selected record
//       console.log("API Response for Edit:", response.data);

//       // Set the editing record data
//       setEditingRecordData(response.data);

//       // Open the edit modal
//       handleEditModalOpen();
//     } catch (error) {
//       console.error("Error fetching data for edit:", error);
//       // Handle the error (show a message or return)
//     }
//   };

//   const handleCsvExport = () => {
//     // Logic to export data as CSV
//     message.success("CSV export logic goes here");
//   };

//   const handleExcelExport = () => {
//     // Logic to export data as Excel
//     message.success("Excel export logic goes here");
//   };

//   const handleImport = (file) => {
//     // Logic to handle file import
//     message.success(`File ${file.name} uploaded successfully`);
//   };

//   const importProps = {
//     beforeUpload: (file) => {
//       // Disable default upload behavior
//       return false;
//     },
//     onChange: (info) => {
//       if (info.file.status === "done") {
//         handleImport(info.file.originFileObj);
//       } else if (info.file.status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };

//   const handleDeleteButtonClick = () => {
//     if (selectedRowKeys.length === 0) {
//       // No record selected, show a warning message
//       message.warning("Please select records to delete.");
//     } else {
//       // Records are selected, show the delete confirmation modal
//       setDeleteModalVisible(true);
//     }
//   };

  
  
//   const handleDeleteModalOk = async () => {
//     // Call the common delete API with the selected record IDs
//     await handleDelete(
//       "enquiries",
//       selectedRowKeys,
//       fetchData,
//       setDeleteModalVisible
//     );
//   };

//   const handleDeleteModalCancel = () => {
//     // Close the delete confirmation modal without performing the deletion
//     setDeleteModalVisible(false);
//   };

//   const handleNewButtonClick = () => {
//     setFormValues({});
//     console.log("then values" , formValues);
//     form.resetFields();
//   };


//   const CancelBothModel= () =>{
//     setNewModalVisible(false);
//     setEditModalVisible(false);
    
//   }

//   return (
//     <>
//       <Breadcrumb>
//         <Breadcrumb.Item>
//           <Link to="">Enquiries</Link>
//         </Breadcrumb.Item>
//       </Breadcrumb>
//       <hr />
//       <div>
//       <div
//           style={{
//             marginBottom: 16,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
        

//           <Space>
//             <AddEditDeleteDeactivate
//               onClickNew={handleNewModalOpen}
//               onClickEdit={handleEditButtonClick}
//               onClickDelete={handleDeleteButtonClick}
//             />
//           </Space>
//         </div>
//         <div
//           style={{
//             marginBottom: 16,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Space>
//             <FiltersDropdown
//               handleFilter1Change={handleFilter1Change}
//               handleFilter2Change={handleFilter2Change}
//               handleFilter3Change={handleFilter3Change}
//               filterValue1={filterValue1}
//               filterValue2={filterValue2}
//               filterValue3={filterValue3}
//             />
//           </Space>
//           <Space>
//             <CsvExcelImport
//               handleCsvExport={handleCsvExport}
//               handleExcelExport={handleExcelExport}
//             />
//           </Space>
//         </div>

//         <Modal
//           title="Add New Enquiry"
//           visible={newModalVisible}
//           onOk={handleNewModalOk}
//           onCancel={handleNewModalCancel}
//           width={1000} // Set your preferred width value
//           style={{
//             top: 20,
//           }}
//           footer={null} // Set footer to null to remove buttons
//         >
//           <EnquiryForm
//             form={form}
//             formValues={formValues}
//             setSelectedRecordId={setSelectedRecordId}

//             setFormValues={setFormValues}
//             setNewModalVisible={setNewModalVisible}
//             fetchData={fetchData}
//             handleNewModalCancel={handleNewModalCancel}
//             CancelBothModel={CancelBothModel}
//           />
//         </Modal>

//         <Modal
//           title="Edit Enquiry"
//           visible={editModalVisible}
//           onOk={handleEditModalOk}
//           onCancel={handleEditModalCancel}
//           width={1000}
//           style={{
//             top: 20,
//           }}
//           footer={null} // Set footer to null to remove buttons
//         >
//           {/* Pass the editing record data to the BookingForm component */}
//           <EnquiryForm
//             selectedRecordId={selectedRecordId}
//             recordData={editingRecordData}
//             setEditModalVisible={setEditModalVisible}
//             fetchData={fetchData}
//             handleNewModalCancel={handleNewModalCancel}
//             CancelBothModel={CancelBothModel}
//             setSelectedRecordId={setSelectedRecordId}
            
//           />
//         </Modal>

//         {/* Delete Confirmation Modal */}
//         <Modal
//           title="Delete Confirmation"
//           visible={deleteModalVisible}
//           onOk={handleDeleteModalOk}
//           onCancel={handleDeleteModalCancel}
//           okText="Delete"
//           cancelText="Cancel"
//         >
//           <p>Are you sure you want to delete the selected records?</p>
//         </Modal>

//         {/* <Spin spinning={loading}>
//           <Table
//             rowSelection={{
//               selectedRowKeys,
//               onChange: onSelectChange,
//               fixed: true,
//             }}
//             columns={visibleColumns}
//             dataSource={transformedData}
//             rowKey={(record) => record._id} // Use a unique key for each row
           
//             scroll={{ x: "max-content" }}
//           />
//         </Spin> */}

//    <Spin spinning={loading}>
//       <Space style={{ marginBottom: 8 }}>
//         <Input
//           placeholder="Search by name or email"
//           prefix={<AiOutlineSearch style={{ marginRight: 8 }} />}
//           value={search}
//           onChange={onSearch}
//           allowClear
//         />
//         <Button type="primary" icon={<AiOutlineFilter />} style={{ marginLeft: 8 }}>
//           Filter
//         </Button>
//       </Space>

//       <div style={{ display: "flex", flexDirection: "column", height: "500px" }}>
//         <Table
//           rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
//           columns={visibleColumns}
//           dataSource={data}
//           rowKey={(record) => record._id}
//           pagination={false}
//           scroll={{ y: 400, x: "max-content" }}
//           style={{ minWidth: "100%" }}
//           size="middle"
//           bordered
//           locale={{ emptyText: "No data available" }}
//         />

//         <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
//           <Pagination
//             current={page}
//             pageSize={limit}
//             total={total}
//             showSizeChanger
//             pageSizeOptions={["10", "50", "100", "500"]}
//             onChange={(p, pageSize) => {
//               setPage(p);
//               setLimit(pageSize);
//             }}
//           />
//         </div>
//       </div>

//       <style>{`
//         .ant-table-thead > tr > th {
//           white-space: nowrap;
//           height: 40px;
//           line-height: 40px;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//       `}</style>
//     </Spin>




//       </div>
//     </>
//   );
// };

// export default Enquiries;
