// src/hooks/useColumnSearch.js
import { useState } from 'react';
import { Input } from 'antd';

const useColumnSearch = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      </div>
    ),
    // ... rest of the getColumnSearchProps function
    setSelectedKeys,
  });

  return { getColumnSearchProps };
};

export default useColumnSearch;



// import React, { useEffect, useState } from "react";
// import "../admin-styles/viewAccount.css";
// import { Button, Modal } from "antd";

// import moment from "moment";
// import {
//   ExclamationCircleOutlined,
//   EditOutlined,
//   SearchOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import { Table, Input, Space, Popconfirm, Pagination ,  Select} from "antd";
// import { Form, Radio, DatePicker, Upload} from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// const { TextArea } = Input;
// const { useForm } = Form;


// const { Search } = Input;



// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//   },
// };

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

// const { Option } = Select;


// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e && e.fileList;
// };

// const validateAadhar = (rule, value, callback) => {
//   // Your validation logic for Aadhar card
//   // You can use callback(new Error('Error message')) to show validation error
//   callback();
// };

// // Add other validation functions as needed


// const ViewAccount = () => {
//   const [customerData, setCustomerData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [sortedInfo, setSortedInfo] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed

//   // Additional state variables for modal
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editRecord, setEditRecord] = useState(null);

//   const [form] = useForm();


//   // Function to open the modal and set the record being edited
//   const handleEdit = (record) => {
//     setEditRecord(record);
//     setIsModalVisible(true);
//   };

//   // Function to close the modal
//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };




  

//   useEffect(() => {
//     // Make a GET request to your API endpoint to fetch the data
//     fetch("http://localhost:5005/getAllCustAccData")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Data received from API:", data);
//         setCustomerData(data);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);
  

//   const columns = [
//     {
//       title: "Customer ID",
//       dataIndex: "customerID",
//       key: "customerID",
//       sorter: (a, b) => a.customerID.localeCompare(b.customerID),
//       sortOrder: sortedInfo.columnKey === "customerID" && sortedInfo.order,
//       // ...getColumnSearchProps('customerID'),
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       sorter: (a, b) => a.name.localeCompare(b.name),
//       sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
//     },

//     {
//       title: "Mobile",
//       dataIndex: "mobile",
//       key: "mobile",
//       sorter: (a, b) => a.mobile.localeCompare(b.mobile),
//       sortOrder: sortedInfo.columnKey === "mobile" && sortedInfo.order,
//     },
//     {
//       title: "Account Number",
//       dataIndex: "accountNumber",
//       key: "accountNumber",
//       sorter: (a, b) => a.accountNumber - b.accountNumber,
//       sortOrder: sortedInfo.columnKey === "accountNumber" && sortedInfo.order,
//     },
//     {
//       title: "Account Type",
//       dataIndex: "accountType",
//       key: "accountType",
//       sorter: (a, b) => a.accountType.localeCompare(b.accountType),
//       sortOrder: sortedInfo.columnKey === "accountType" && sortedInfo.order,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       sorter: (a, b) => a.status.localeCompare(b.status),
//       sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
//       render: (text) => {
//         let statusColor = "";
//         if (text === "Active") {
//           statusColor = "green";
//         } else if (text === "closed") {
//           statusColor = "red";
//         }else if (text === "mature") {
//           statusColor = "orange";
//         }

//         return <span style={{ color: statusColor }}>{text}</span>;
//       },
//     },
//     {
//       title: "Date Created",
//       dataIndex: "dateCreated",
//       key: "dateCreated",
//       sorter: (a, b) =>
//         moment(a.dateCreated).valueOf() - moment(b.dateCreated).valueOf(),
//       sortOrder: sortedInfo.columnKey === "dateCreated" && sortedInfo.order,
//       render: (text) => {
//         const formattedDate = moment(text).format("YYYY-MM-DD"); // Customize the format
//         return <span>{formattedDate}</span>;
//       },
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <Space>
//           <a onClick={() => handleEdit(record)}>
//             <EditOutlined style={{ color: "blue" }} />
//           </a>
//           <span style={{ marginRight: "8px" }} /> {/* Add some margin */}
//           <Popconfirm
//             title="Are you sure to delete this entry?"
//             onConfirm={() => handleDelete(record.key)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <DeleteOutlined style={{ color: "red" }} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   const handleTableChange = (pagination, filters, sorter) => {
//     setSortedInfo(sorter);
//   };

//   const handleDelete = (key) => {
//     // Implement the delete logic here, e.g., make a DELETE request to your API
//     console.log(`Deleting entry with key ${key}`);
//   };

//   const totalEntries = customerData.reduce((total, customer) => total + customer.accounts.length, 0);
//   const totalPages = Math.ceil(totalEntries / itemsPerPage);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = customerData
//     .flatMap((customerDataItem) =>
//       customerDataItem.accounts.map((account) => ({
//         key: account._id,
//         customerID: customerDataItem.customer.customerID || "null",
//         name:
//           `${customerDataItem.customer.firstname} ${customerDataItem.customer.lastname}` ||
//           "null",
//         email: customerDataItem.customer.email || "null",
//         mobile: customerDataItem.customer.mobile || "null",
//         accountNumber: account.accountNumber,
//         accountType: account.accountType,
//         status: account.status,
//         dateCreated: account.dateupdated, // Assuming "dateCreated" is directly under "account"
//         // Add more fields for other account data
//       }))
//     )
//     .filter(
//       (record) =>
//         record.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         record.customerID.toLowerCase().includes(searchText.toLowerCase())
//     )
//     .slice(indexOfFirstItem, indexOfLastItem);

//     console.log("Number of entries:", customerData.length);
//     console.log("Number of items on the current page:", currentItems.length);
  

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);


//   const handleSave = () => {
//     form.validateFields().then((values) => {
//       // Perform the editing logic here using the values from the form
//       console.log('Edited values:', values);
//       setIsModalVisible(false);
//       form.resetFields(); // Reset form fields after successful edit
//     });
//   };

//   const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//       <Select style={{ width: 70 }} defaultValue="+91">
//         <Option value="+91">+91</Option>
//         {/* <Option value="87">+87</Option> */}
//       </Select>
//     </Form.Item>
//   );
  

//   return (
//     <div>
//       <h1>Customer and Account Data Table</h1>
//       <br />
//       <Space style={{ marginBottom: 16 }}>
//         <Search
//           placeholder="Search by name, email, etc."
//           onChange={(e) => setSearchText(e.target.value)}
//           style={{ width: 500 }}
//         />
//       </Space>
//       <Table
//         columns={columns}
//         dataSource={currentItems}
//         pagination={false}
//         onChange={handleTableChange}
//       />

//       {/* Modal for editing */}
//       <Modal
//         title="Edit Record"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           // Add a Save button to handle form submission
//           <Button key="submit" type="primary"  onClick={handleSave}>
//             Save
//           </Button>,
//         ]}
//         width={800} // Set the desired width (in pixels or as a percentage)

//       >

// {/* Render your form for editing */}
// <Form
//           {...formItemLayout}
//           form={form}
//           name="editRecord"
//           // onFinish={onFinish}
//           style={{ maxWidth: 600 }}
//           scrollToFirstError
//         >
// <hr></hr>
//       <h1 className="heading">Basic Details</h1>

//       {/* Add First Name, Middle Name, and Last Name fields */}
//       <Form.Item
//         name="firstName"
//         label="First Name"
//         rules={[
//           {
//             required: true,
//             message: "Please input your first name!",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item name="middleName" label="Middle Name">
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name="lastName"
//         label="Last Name"
//         rules={[
//           {
//             required: true,
//             message: "Please input your last name!",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="email"
//         label="E-mail"
//         // rules={[
//         //   {
//         //     type: "email",
//         //     message: "The input is not a valid E-mail!",
//         //   },
//         //   {
//         //     required: true,
//         //     message: "Please input your E-mail!",
//         //   },
//         // ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name="gender"
//         label="Gender"
//         rules={[
//           {
//             required: true,
//             message: "Please select gender",
//           },
//         ]}
//       >
//         <Radio.Group>
//           <Radio value="female"> Female </Radio>
//           <Radio value="male"> Male </Radio>
//           <Radio value="other"> Other </Radio>
//         </Radio.Group>
//       </Form.Item>

//       <Form.Item
//         name="aadhar"
//         label="Aadhar Card Number"
//         rules={[
//           {
//             required: true,
//             message: "Please enter your Aadhar card number",
//           },
//           {
//             validator: validateAadhar,
//           },
//         ]}
//       >
//         <Input placeholder="Enter Aadhar card number" />
//       </Form.Item>

//       <Form.Item
//         name="dob"
//         label="Date Of Birth"
//         rules={[
//           {
//             required: true,
//             message: "Please select Date Of Birth",
//           },
//         ]}
//       >
//         <DatePicker />
//       </Form.Item>

//       <Form.Item
//         name="phone"
//         label="Phone Number"
//         rules={[{ required: true, message: "Please input your phone number!" }]}
//       >
//         <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
//       </Form.Item>
     
      

//       {/* Add more fields here for District, Taluka, Village, Country, State, Pincode, and Address */}
//       {/* ... */}

//       <Form.Item
//         name="country"
//         label="Country"
//         rules={[
//           {
//             required: true,
//             message: "please enter Country name",
//           },
//         ]}
//       >
//         <Input defaultValue="India" />
//       </Form.Item>
//       <Form.Item
//         name="district"
//         label="District"
//         rules={[
//           {
//             required: true,
//             message: "please enter District name",
//           },
//         ]}
//       >
//         <Input defaultValue="Parbhani" />
//       </Form.Item>
//       <Form.Item
//         name="taluka"
//         label="Taluka"
//         rules={[
//           {
//             required: true,
//             message: "please enter Taluka name",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="village"
//         label="Village"
//         rules={[
//           {
//             required: true,
//             message: "please enter Village name",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name="address"
//         label="Address"
//         rules={[
//           {
//             required: true,
//             message: "please enter your address.",
//           },
//         ]}
//       >
//         {/* <Input  /> */}
//         <TextArea rows={4} />
//       </Form.Item>

//       <Form.Item
//         name="pincode"
//         label="Pincode"
//         rules={[
//           { required: true, message: "Please input your pincode!" },
//           { pattern: /^\d{6}$/, message: "Pincode must be 6 digits long." },
//         ]}
//       >
//         <Input />
//       </Form.Item>
// <hr></hr>
// <h3 style={{marginLeft:"100px"}}>Upload Doccuments</h3><br></br>

//       <Form.Item
//         name="passportImg"
//         label="Passport Photo"
//         valuePropName="fileList"
//         getValueFromEvent={normFile}
//         rules={[
//           {
//             required: true,
//             message: "Please upload passport photo.",
//           },
//         ]}
//       >
//         <Upload action="/uploads" listType="picture-card">
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         </Upload>
//       </Form.Item>

//       <Form.Item
//         name="pancardImg"
//         label="Pan Card Photo"
//         valuePropName="fileList"
//         getValueFromEvent={normFile}
//         // rules={[
//         //   {
//         //     required: true,
//         //     message: "Please upload pan card photo.",
//         //   },
//         // ]}
//       >
//         <Upload action="/uploads" listType="picture-card">
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         </Upload>
//       </Form.Item>

//       <Form.Item
//         name="adharImg"
//         label="Adhar Card Photo"
//         valuePropName="fileList"
//         getValueFromEvent={normFile}
//         rules={[
//           {
//             required: true,
//             message: "Please upload adhar card photo.",
//           },
//         ]}
//       >
//         <Upload action="/uploads" listType="picture-card">
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         </Upload>
//       </Form.Item>

//       <Form.Item
//         name="signImg"
//         label="Signature Photo"
//         valuePropName="fileList"
//         getValueFromEvent={normFile}
//         rules={[
//           {
//             required: true,
//             message: "Please upload signature photo.",
//           },
//         ]}
//       >
//         <Upload action="/uploads" listType="picture-card">
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         </Upload>
//       </Form.Item>





//          <Form.Item {...tailFormItemLayout}>
//         <Button type="primary" htmlType="submit" className="form-btn">
//           Next
//         </Button>
//       </Form.Item>
//         {/* Render your form or fields for editing */}
//         {/* You can use the `editRecord` state to pre-fill the form with existing data */}
//         {/* For example, <Input value={editRecord.name} /> */}
//         </Form>
//       </Modal>

//       {/* <Pagination
//         style={{ marginTop: 16 }}
//         current={currentPage}
//         total={customerData.length}
//         pageSize={itemsPerPage}
//         onChange={paginate}
//       /> */}
//       <Pagination
//         style={{ marginTop: 16 }}
//         current={currentPage}
//         total={totalEntries}
//         pageSize={itemsPerPage}
//         onChange={paginate}
//       />

//     </div>
//   );
// };

// export default ViewAccount;