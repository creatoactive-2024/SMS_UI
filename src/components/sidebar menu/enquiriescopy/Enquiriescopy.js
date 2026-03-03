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


// const { Option } = Select;

// const Enquiries = () => {
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newModalVisible, setNewModalVisible] = useState(false);
//   const [data, setData] = useState([]); // State to store fetched data
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
//       render: () => null, // Render an empty cell to hide the content
//       fixed: "left", // Fix this column to the left to keep it visible
//       width: 0, // Set the width to 0 to make it effectively hidden
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
//       title: "Free Trial Course	",
//       dataIndex: "free_trial",
//       key: "free_trial",
//     },
//     {
//       title: "Date of last message",
//       dataIndex: "created_date",
//       key: "created_date",
//       render: (text, record) => (
//         <span>{moment(record.created_date).format("DD-MM-YYYY")}</span>
//       ),
//     },
//     {
//       title: "E-mail",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "User of last message",
//       dataIndex: "Useroflastmessage",
//       key: "Useroflastmessage",
//     },
//     {
//       title: "Follow up",
//       dataIndex: "follow_up_date",
//       key: "follow_up_date",
//       render: (text, record) => (
//         <span>{moment(record.follow_up_date).format("DD-MM-YYYY") || "na"}</span>
//       ),
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
//       title: "Student status	",
//       dataIndex: "student_status",
//       key: "student_status",
//     },

//     {
//       title: "Created by	",
//       dataIndex: "CreatedBy	",
//       key: "CreatedBy	",
//     },
//     {
//       title: "Created",
//       dataIndex: "created_date",
//       key: "created_date",
//       render: (text, record) => (
//         <span>{moment(record.created_date).format("DD-MM-YYYY HH:mm:ss")}</span>
//       ),
//     },

//     {
//       title: "Updated by	",
//       dataIndex: "UpdatedBy	",
//       key: "UpdatedBy	",
//     },

//     {
//       title: "Updated on	",
//       dataIndex: "UpdatedOn	",
//       key: "UpdatedOn	",
//     },
//     {
//       title: "Date of  Free Trial",
//       dataIndex: "date_of_free_trial",
//       key: "date_of_free_trial",
//       render: (text, record) => (
//         <span>{moment(record.date_of_free_trial).format("DD-MM-YYYY")}</span>
//       ),
      
//     },

//     // ... Add more columns as needed
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
//           <SearchInput />
//           </Space>

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

//         <Spin spinning={loading}>
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
//         </Spin>
//       </div>
//     </>
//   );
// };

// export default Enquiries;




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
  Pagination,
  Button,
} from "antd";

import axios from "axios";
import baseURL from "../../../config";
import EnquiryForm from "./EnquiryForm";
import { Link } from "react-router-dom";
import moment from "moment";
 import { fetchDataCommon } from "../commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../commonComponents/DeleteApi";
import {
  AddEditDeleteDeactivate,
  CsvExcelImport,
  FiltersDropdown,
  SearchInput
} from "../commonComponents/ButtonsDropdown";


const { Option } = Select;

const Enquiries = () => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  // const [data, setData] = useState([]); // State to store fetched data
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
const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedEnquiry, setSelectedEnquiry] = useState(null); // store the row clicked

  //hubspot table start
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };







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
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/enquiries-hubspot`, {
      page,
      limit,
    });

    // Transform the response data (since your backend returns nested properties)
    const transformResponse = (response) => {
      const { data = [], total = 0 } = response;

   const transformedData = data.map((entry) => {
  const props = entry.properties || {};

  // Safe first and last name
  const firstName = props.firstname || props.ad_soyad || props.ad || "";
  const lastName = props.lastname || "";

  // Combine and fallback to "-"
  const name = [firstName, lastName].filter(Boolean).join(" ") || "-";

  return {
    _id: entry._id,
    name,
        main_status: props.main_status || "-",

    email: props.email || "-",
    contact: props.phone || props.mobilephone || "-",
    country: props.country || props.country_2 || "-",
    age: props.age || "-",
    salesperson: props.salesperson || props.aircall_contact_owner_email || "-",
    free_trial: props.free_trial || "-",
    date_of_trial: props.date_of_trial
      ? new Date(props.date_of_trial).toLocaleDateString()
      : "-",
    created_date: props.createdate
      ? new Date(props.createdate).toLocaleDateString()
      : entry.createdAt
      ? new Date(entry.createdAt).toLocaleDateString()
      : "-",
  };
});

      return { transformedData, total };
    };

    const { transformedData, total } = transformResponse(res.data);
    setData(transformedData);
    setTotal(total);
  } catch (err) {
    console.error("Error loading data:", err);
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  fetchData();
}, [page, limit]);



// Example transformation
// const transformResponse = (response) => {
//   const { data, total, limit, page } = response;

//   const transformedData = data.map((entry) => {
//     const props = entry.properties || {};
//     return {
//       _id: entry._id,
//       name: `${props.firstname || ""} ${props.lastname || props.surname || ""}`.trim() || "N/A",
//       email: props.email || "N/A",
//       contact: props.hs_calculated_phone_number || props.hs_calculated_mobile_number || "N/A",
//       country: props.country || props.country_2 || "N/A",
//       age: props.age || "-",
//       free_trial: props.free_trial_email_reminder_switch || "No",
//       date_of_trial:
//         props.date_of_trial_lesson || props.date_of_trial
//           ? moment(props.date_of_trial_lesson || props.date_of_trial).format("DD-MM-YYYY")
//           : "-",
//       salesperson: props.aircall_contact_owner_email || "-",
//       created_date: props.createdate
//         ? moment(props.createdate).format("DD-MM-YYYY HH:mm:ss")
//         : "-",
//     };
//   });

//   return { transformedData, total, limit, page };
// };




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

  // const onSelectChange = (newSelectedRowKeys, selectedRows) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);

  //   // Assuming the first selected row contains the desired record ID
  //   if (selectedRows.length > 0) {
  //     setSelectedRecordId(selectedRows[0]._id);
  //   } else {
  //     setSelectedRecordId(null);
  //   }
  // };

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
    render: () => null,
    width: 0,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
    {
    title: "Status",
    dataIndex: "main_status",
    key: "main_status",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  // {
  //   title: "Age",
  //   dataIndex: "age",
  //   key: "age",
  // },
  {
    title: "Salesperson",
    dataIndex: "salesperson",
    key: "salesperson",
  },
  // {
  //   title: "Free Trial",
  //   dataIndex: "free_trial",
  //   key: "free_trial",
  // },
  // {
  //   title: "Date of Trial",
  //   dataIndex: "date_of_trial",
  //   key: "date_of_trial",
  // },
  {
    title: "Created Date",
    dataIndex: "created_date",
    key: "created_date",
  },
];


  console.log("check data", data);
  // Check if data is undefined before mapping
  // const transformedData = data
  //   ? data.map((entry) => ({
  //       _id: entry._id || null,
  //       name: `${entry.firstname} ${entry.surname}` || null,
  //       email: entry.email || null,
  //       contact: entry.phone || null,
  //       salesperson: entry.sales_person_name || null,
  //       correspondenceLanguage: entry.correspondence_language || null,

  //       free_trial: entry.free_trial || null,
  //       date_of_free_trial: entry.date_of_free_trial || null,
  //       follow_up_date: entry.follow_up_date || "N/A",
  //       postal_code: entry.postal_code || null,
  //       country: entry.country || null,
  //       nationality_name: entry.nationality_name || null,
  //       student_status: entry.student_status || null,
  //       date_of_free_trial: entry.date_of_free_trial || null,
  //     }))
  //   : [];

  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

// const visibleColumns = [
//   ...columns.filter((col) => col.dataIndex !== "_id"),
//   {
//     title: "Action",
//     key: "action",
//     fixed: "right",
//     render: (_, record) => (
//       <Button
//         type="primary"
//         onClick={() => {
//           setSelectedEnquiry(record);
//           setIsModalVisible(true);
//         }}
//       >
//         Convert to Booking
//       </Button>
//     ),
//   },
// ];


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
           {/* <Button
  type="primary"
  onClick={() => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select a record to convert.");
      return;
    }
    if (selectedRowKeys.length > 1) {
      message.warning("Please select only one record.");
      return;
    }

    const record = data.find((d) => d._id === selectedRowKeys[0]);
    setSelectedEnquiry(record);
    setIsModalVisible(true);
  }}
>
  Convert to Booking
</Button> */}


<Button
  type="primary"
  disabled={
    selectedRowKeys.length === 1 &&
    data.find((d) => d._id === selectedRowKeys[0])?.main_status === "Converted"
  }
  onClick={() => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select a record to convert.");
      return;
    }
    if (selectedRowKeys.length > 1) {
      message.warning("Please select only one record.");
      return;
    }

    const record = data.find((d) => d._id === selectedRowKeys[0]);
    setSelectedEnquiry(record);
    setIsModalVisible(true);
  }}
>
  Convert
</Button>


            {/* <AddEditDeleteDeactivate
              onClickNew={handleNewModalOpen}
              onClickEdit={handleEditButtonClick}
              onClickDelete={handleDeleteButtonClick}
            /> */}
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
            {/* <FiltersDropdown
              handleFilter1Change={handleFilter1Change}
              handleFilter2Change={handleFilter2Change}
              handleFilter3Change={handleFilter3Change}
              filterValue1={filterValue1}
              filterValue2={filterValue2}
              filterValue3={filterValue3}
            /> */}
          </Space>
          <Space>
            {/* <CsvExcelImport
              handleCsvExport={handleCsvExport}
              handleExcelExport={handleExcelExport}
            /> */}
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


     {/* <Modal
  title="Confirm Conversion"
  visible={isModalVisible}
  onOk={async () => {
    if (!selectedEnquiry) return;

    try {
      const res = await axios.post(`${baseURL}/${selectedEnquiry._id}/convert`);

      if (res.data.success) {
        message.success("Enquiry converted to booking successfully!");
        fetchData(); // refresh the table
      } else {
        // Already converted or other backend message
        message.warning(res.data.message || "Failed to convert enquiry.");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        message.error(err.response.data.message);
      } else {
        message.error("Failed to convert enquiry.");
      }
    } finally {
      setIsModalVisible(false);
      setSelectedEnquiry(null);
    }
  }}
  onCancel={() => {
    setIsModalVisible(false);
    setSelectedEnquiry(null);
  }}
>
  <p>Are you sure you want to convert this enquiry to booking?</p>
  <p>
    <strong>{selectedEnquiry?.name}</strong>
  </p>
</Modal> */}

      <Modal
  title="Confirm Conversion"
  visible={isModalVisible}
  footer={[
    <Button
      key="cancel"
      onClick={() => {
        setIsModalVisible(false);
        setSelectedEnquiry(null);
      }}
    >
      Cancel
    </Button>,

    <Button
      key="provisional"
      type="default"
      onClick={async () => {
        if (!selectedEnquiry) return;

        try {
          const res = await axios.post(
            `${baseURL}/${selectedEnquiry._id}/convertprovisional`
          );

          if (res.data.success) {
            message.success(
              "Enquiry converted to provisional booking successfully!"
            );
            fetchData(); // refresh table
          } else {
            message.warning(res.data.message || "Failed to convert enquiry.");
          }
        } catch (err) {
          console.error(err);
          message.error(
            err.response?.data?.message || "Failed to convert enquiry."
          );
        } finally {
          setIsModalVisible(false);
          setSelectedEnquiry(null);
        }
      }}
    >
      Convert to Provisional
    </Button>,

    <Button
      key="booking"
      type="primary"
      onClick={async () => {
        if (!selectedEnquiry) return;

        try {
          const res = await axios.post(
            `${baseURL}/${selectedEnquiry._id}/convert`
          );

          if (res.data.success) {
            message.success("Enquiry converted to booking successfully!");
            fetchData(); // refresh table
          } else {
            message.warning(res.data.message || "Failed to convert enquiry.");
          }
        } catch (err) {
          console.error(err);
          message.error(
            err.response?.data?.message || "Failed to convert enquiry."
          );
        } finally {
          setIsModalVisible(false);
          setSelectedEnquiry(null);
        }
      }}
    >
      Convert to Booking
    </Button>,
  ]}
  onCancel={() => {
    setIsModalVisible(false);
    setSelectedEnquiry(null);
  }}
>
  <p>Are you sure you want to convert this enquiry?</p>
  <p>
    <strong>{selectedEnquiry?.name}</strong>
  </p>
</Modal>


    <Spin spinning={loading}>
  <div style={{ display: "flex", flexDirection: "column", height: "500px" }}>
    {/* <Table
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
        fixed: true,
      }}
      columns={visibleColumns}
  dataSource={data}  // <-- use the state here
      rowKey={(record) => record._id}
      pagination={false}
      scroll={{
        y: 400,
        x: "max-content",
      }}
      style={{ minWidth: "100%" }}
      size="middle"
      bordered
      sticky
      locale={{ emptyText: "No contacts found" }}
    /> */}

<Table
  rowSelection={{
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
  }}
  columns={visibleColumns}
  dataSource={data}
  rowKey={(record) => record._id}
  pagination={false}
  scroll={{
    y: 400,
    x: "max-content",
  }}
  style={{ minWidth: "100%" }}
  size="middle"
  bordered
  sticky
  locale={{ emptyText: "No contacts found" }}
  // ✅ ADD THIS
  rowClassName={(record) =>
    record.main_status === "Converted" ? "converted-row" : ""
  }
/>


    {/* External Pagination */}
    <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
      <Pagination
        current={page}
        pageSize={limit}
        total={total}
        showSizeChanger
        pageSizeOptions={["10", "50", "100", "500"]}
        onChange={(p, pageSize) => {
          setPage(p);
          setLimit(pageSize);
        }}
      />
    </div>
  </div>

  {/* Optional CSS for header alignment */}
  <style>
    {`
      .ant-table-thead > tr > th {
        white-space: nowrap;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}
  </style>
  <style>
  {`
    .ant-table-thead > tr > th {
      white-space: nowrap;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

   .converted-row td {
  background-color: #e6f7e6 !important; /* faint green for full row */
}

.converted-row:hover td {
  background-color: #d8f3d8 !important; /* slightly darker green on hover */
}

.ant-table-tbody > tr.converted-row > td {
  transition: background-color 0.2s ease;
}

  `}
</style>

</Spin>






      </div>
    </>
  );
};

export default Enquiries;
