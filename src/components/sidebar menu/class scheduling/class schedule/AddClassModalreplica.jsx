// import React, { useEffect, useState } from "react";
// import { Modal, Form, Row, Col, Input, Select, message, Button } from "antd";
// import moment from "moment";
// import axios from "axios";
// import baseURL from "../../../../config";
// import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";
// import { SaveBtn, UpdateBtn } from "../../commonComponents/ButtonsDropdown";
// import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";
// import { fetchDataCommon } from "../../commonComponents/GetDataApi";

// const { Option } = Select;


// const WeekdaySelector = ({ field, form }) => {
//   const allDays = [
//     "Monday", "Tuesday", "Wednesday",
//     "Thursday", "Friday", "Saturday", "Sunday"
//   ];

//   const weekdaysOnly = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//   const weekend = ["Saturday", "Sunday"];

//   const path = ["blocks", field.name, "weekdays"];

//   const selected = Form.useWatch(path, form) || [];

//   const toggle = (day) => {
//     let cur = [...selected];
//     if (cur.includes(day)) {
//       cur = cur.filter((d) => d !== day);
//     } else {
//       cur.push(day);
//     }
//     form.setFieldValue(path, cur);
//   };

//   return (
//     <Form.Item
//       name={[field.name, "weekdays"]}
//       label="Weekdays"
//       rules={[{ required: true, message: "Please select weekdays" }]}
//     >
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        
//         <Button onClick={() => form.setFieldValue(path, weekdaysOnly)}>
//           Weekdays
//         </Button>

//         <Button onClick={() => form.setFieldValue(path, weekend)}>
//           Weekend
//         </Button>

//         <Button onClick={() => form.setFieldValue(path, allDays)}>
//           All
//         </Button>

//         <Button onClick={() => form.setFieldValue(path, [])}>
//           Clear
//         </Button>

//         <div style={{
//           width: "100%",
//           marginTop: 8,
//           display: "flex",
//           gap: 8,
//           flexWrap: "wrap"
//         }}>
//           {allDays.map((day) => (
//             <Button
//               key={day}
//               type={selected.includes(day) ? "primary" : "default"}
//               onClick={() => toggle(day)}
//             >
//               {day}
//             </Button>
//           ))}
//         </div>
//       </div>
//     </Form.Item>
//   );
// };


// const AddClassModalreplica = ({
//   open, onClose, onSuccess, onFinish,
//   editingData = null,
// }) => {
//     const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // const [newModalVisible, setNewModalVisible] = useState(false);
//   const [data, setData] = useState([]); // State to store fetched data
//   const [selectedRecordId, setSelectedRecordId] = useState(null);
//   const [editingRecordData, setEditingRecordData] = useState(null);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [activeKey, setActiveKey] = useState("1");
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);

//   const [classroomOptions, setClassroomOptions] = useState([]); // State to store building names for dropdown
//   const [coursesOptions, setCoursesOptions] = useState([]); // State to store building names for dropdown
//   const [colorOptions, setColorOptions] = useState([]); // State to store building names for dropdown
//   const [levelOptions, setLevelOptions] = useState([]); // State to store building names for dropdown
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [availableRooms, setAvailableRooms] = useState([]);
//   const [initialValuesLoaded, setInitialValuesLoaded] = useState(false); // Track if initial values are loaded
//   const [initialValues, setInitialValues] = useState(null);
//   const [formValues, setFormValues] = useState({});

//   const [filterValue3, setFilterValue3] = useState(null);

//   const [teacherList, setTeacherList] = useState([]);
//   const [apiData, setApiData] = useState(null);

//   const [form] = Form.useForm();


//   const TIME_LIST = [
//   "08:30","08:35","08:40","08:45","08:50","08:55",
//   "09:00","09:05","09:10","09:15","09:20","09:25",
//   "09:30","09:35","09:40","09:45","09:50","09:55",
//   "10:00","10:05","10:10","10:15","10:20","10:25",
//   "10:30","10:35","10:40","10:45","10:50","10:55",
//   "11:00","11:05","11:10","11:15","11:20","11:25",
//   "11:30","11:35","11:40","11:45","11:50","11:55",
//   "12:00","12:05","12:10","12:15","12:20","12:25",
//   "12:30","12:35","12:40","12:45","12:50","12:55",
//   "13:00","13:05","13:10","13:15","13:20","13:25",
//   "13:30","13:35","13:40","13:45","13:50","13:55",
//   "14:00","14:05","14:10","14:15","14:20","14:25",
//   "14:30","14:35","14:40","14:45","14:50","14:55",
//   "15:00","15:05","15:10","15:15","15:20","15:25",
//   "15:30","15:35","15:40","15:45","15:50","15:55",
//   "16:00","16:05","16:10","16:15","16:20","16:25",
//   "16:30","16:35","16:40","16:45","16:50","16:55",
//   "17:00","17:05","17:10","17:15","17:20","17:25",
//   "17:30","17:35","17:40","17:45","17:50","17:55",
//   "18:00","18:05","18:10","18:15","18:20","18:25",
//   "18:30","18:35","18:40","18:45","18:50","18:55",
//   "19:00","19:05","19:10","19:15","19:20","19:25",
//   "19:30","19:35","19:40","19:45","19:50","19:55",
//   "20:00","20:05","20:10","20:15","20:20","20:25",
//   "20:30","20:35","20:40","20:45","20:50","20:55",
//   "21:00","21:05","21:10","21:15","21:20","21:25",
//   "21:30"
// ];

//   // Reset form fields and initialValuesLoaded flag on component mount
//   useEffect(() => {
//     form.resetFields();
//     setInitialValuesLoaded(false);
//   }, [form]);

// //   const onFinish = async (values) => {
// //     const { teacher } = values;
// //     const selectedTeacher = teacherList.find((t) => t.value === teacher);
// //     const teacherName = selectedTeacher ? selectedTeacher.label : teacher;

// //     const collectionName = "classes";
// //     const data = {
// //       _id: selectedRecordId ? selectedRecordId : null,
// //       ...values,
// //       teacher: teacherName,
// //     };

// //     try {
// //       await CommonFormSubmit(
// //   "classes",
// //   setSelectedRecordId,
// //   data,
// //   () => {},                  // setNewModalVisible (dummy)
// //   () => {},                  // setEditModalVisible (dummy)
// //   form,
// //   () => {},                  // fetchData (dummy, you are using onSuccess instead)
// //   setErrorMessage,
// //   setSuccessMessage
// // );

// // if (onSuccess) onSuccess();

// // if (onSuccess) onSuccess();

// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //       setErrorMessage("Failed to submit form. Please try again later.");
// //     }
// //   };



  
//   const handleFormChange = async (changedValues, allValues = null) => {
//     const { start_date, weeks, from, end, weekdays } =
//       allValues || form.getFieldsValue();

//     try {
//       // Always fetch available rooms when form changes
//       const response = await fetchAvailableRooms(
//         start_date,
//         weeks,
//         from,
//         end,
//         weekdays
//       );
//       if (response.availableRooms.length === 0) {
//         setErrorMessage(
//           "No available rooms. Please change start date, weeks, time, or weekdays."
//         );
//       } else {
//         setErrorMessage(null);
//       }
//       setAvailableRooms(response.availableRooms);
//     } catch (error) {
//       console.error("Error fetching available rooms:", error);
//       setErrorMessage(
//         "Please enter date, weeks, weekdays and time to get available rooms."
//       );
//     }
//   };



  
//   // Fetch available rooms from API
//   const fetchAvailableRooms = async (
//     start_date,
//     weeks,
//     from,
//     end,
//     weekdays
//   ) => {
//     const apiUrl = `${baseURL}/validate-classes`; // Replace with your actual API endpoint

//     // Prepare the request body
//     const requestBody = {
//       start_date,
//       weeks,
//       from,
//       end,
//       weekdays,
//     };

//     // If editing an existing class, include the class_id in the request body
//     if (selectedRecordId) {
//       requestBody.class_id = selectedRecordId;
//     }

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch available rooms");
//       }

//       return response.json();
//     } catch (error) {
//       console.error("Error fetching available rooms:", error);
//       throw new Error("Failed to fetch available rooms");
//     }
//   };

//   // Populate form fields and call API on editingRecordData change
//   useEffect(() => {
//     if (editingRecordData) {
//       const formattedDate = editingRecordData.start_date
//         ? moment(editingRecordData.start_date).format("YYYY-MM-DD")
//         : null;

//       form.setFieldsValue({
//         ...editingRecordData,
//         start_date: formattedDate,
//       });

//       document.getElementById("date-picker-class").value = formattedDate;

//       // Call handleFormChange with the existing record data
//       handleFormChange(null, {
//         ...editingRecordData,
//         start_date: formattedDate,
//       });
//     }
//   }, [editingRecordData, form]);

//   // Wrapper for handleFormChange to reset classrooms field
//   const handleFormChangeWrapper = async (changedValues, allValues) => {
//     const relevantFields = ["start_date", "weeks", "from", "end", "weekdays"];
//     const hasRelevantChange = Object.keys(changedValues).some((field) =>
//       relevantFields.includes(field)
//     );

//     if (hasRelevantChange) {
//       // Reset classrooms field
//       form.setFieldsValue({
//         classrooms: undefined,
//       });
//     }

//     // Call the original handleFormChange function
//     await handleFormChange(changedValues, allValues);
//   };

//   const handleFilter3Change = (value) => {
//     setFilterValue3(value);
//   };

//   const fetchTeacherList = async () => {
//     try {
//       const responseData = await FieldListDropdown("teachers", "first_name");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Name = responseData
//           .map((name) => ({
//             value: name._id, // Use the appropriate property for the value
//             label: name.first_name, // Use the appropriate property for the label
//           }))
//           .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setTeacherList(Name);
//       }
//     } catch (error) {
//       console.error("Error fetching teacher:", error);
//     }
//   };

//   //----------------------populate for dropdown list-----------------------

//   const fetchDropdownOptions = async () => {
//     try {
//       // Fetch and sort classroom options
//       const classroomsResponse = await axios.post(`${baseURL}/getdata`, {
//         collectionName: "classrooms",
//       });
//       const sortedClassrooms = classroomsResponse.data
//         .map((classroom) => classroom.title)
//         .sort((a, b) => a.localeCompare(b));
//       setClassroomOptions(sortedClassrooms);

//       // Fetch and sort color options
//       const colorCodesResponse = await axios.post(`${baseURL}/getdata`, {
//         collectionName: "colorcodes",
//       });
//       const sortedColors = colorCodesResponse.data
//         .map((colorCode) => colorCode.title)
//         .sort((a, b) => a.localeCompare(b));
//       setColorOptions(sortedColors);

//       // Fetch and sort course options
//       const coursesResponse = await axios.post(`${baseURL}/getdata`, {
//         collectionName: "courses",
//       });
//       const sortedCourses = coursesResponse.data
//         .map((course) => course.title_english)
//         .sort((a, b) => a.localeCompare(b));
//       setCoursesOptions(sortedCourses);

//       // Fetch and sort level options
//       const courseLevelsResponse = await axios.post(`${baseURL}/getdata`, {
//         collectionName: "courselevels",
//       });
//       const sortedLevels = courseLevelsResponse.data
//         .map((courseLevel) => courseLevel.nickname)
//         .sort((a, b) => a.localeCompare(b));
//       setLevelOptions(sortedLevels);
//     } catch (error) {
//       console.error("Error fetching dropdown options:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch dropdown options when the component mounts
//     fetchDropdownOptions();
//     fetchTeacherList();
//   }, []); // Empty deps ensures the effect runs only once on mount

//   //----------------table functions-----------------------

//   const fetchData = async () => {
//     // Call the common delete API with the selected record IDs
//     await fetchDataCommon("classes", setData, setSelectedRowKeys, setLoading);
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

//   //-----------------new button functions-------------------------------
//   const handleNewModalOpen = () => {
//     setSelectedRecordId(null);
//     // setNewModalVisible(true);
//     setEditingRecordData(null);

//     setSelectedRowKeys([]);
//     form.resetFields();
//   };

//   const handleNewModalOk = async () => {
//     try {
//       // Use formValues in your API call
//       console.log("Form Values:", formValues);

//       // Your API call logic here

//       // Close the modal
//       onClose();

//       setEditModalVisible(false);

//       // Optionally, reset the form values
//       setFormValues({});
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error (show message or other error handling)
//     }
//   };

//   const handleNewModalCancel = () => {
//     // Close the modal without performing any action
//     onClose();


//     // Optionally, reset the form values
//     setFormValues({});
//   };

//   // Form layout settings
//   const formLayout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   };

 

//   console.log("check data", data);
//   // Check if data is undefined before mapping
//   const transformedData = data
//     ? data.map((entry) => ({
//         _id: entry._id || null,
//         class_name: `${entry.class_name} ` || null,
//         teacher: `${entry.teacher} ` || null,
//         colour: `${entry.colour} ` || null,
//         classrooms: `${entry.classrooms} ` || null,
//         level: `${entry.level} ` || null,
//         start_date: entry.start_date
//           ? moment(entry.start_date).format("DD-MM-YYYY")
//           : null,
//         weekdays: `${entry.weekdays} ` || null,
//       }))
//     : [];


//   //-------------------------edit button functions-------------------
//   const handleEditModalOpen = () => {
//     setEditModalVisible(true);
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
//         collectionName: "classes",
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

//   //-----------------------delete button functions-------------------------------
 

 

//   const handleChange = (value) => {
//     console.log(`Selected value: ${value}`);
//   };

//   const CancelBothModel = () => {
//     onClose();

//     setEditModalVisible(false);
//   };


//   return (
//   <>
//         <Modal
//           title="Add New Class"
//  open={open}
//    onOk={handleNewModalOk}
//   onCancel={onClose}
//   width={1000}
//   style={{ top: 20 }}
//   footer={null}
//         >
//           <br />
//           <hr />
//            <Form
//                       {...formLayout}
//                       form={form}
//                       onFinish={onFinish}
//                       // onValuesChange={handleFormChange}
//                       onValuesChange={handleFormChangeWrapper}
//                       initialValues={null}
//                       layout="horizontal"
//                     >
//                       <Row gutter={16}>
//                         <Col span={12}>
//                           <Form.Item
//                             label="Name"
//                             name="class_name"
//                             rules={[{ required: true, message: "Please enter name" }]}
//                           >
//                             <Input placeholder="Enter class name" />
//                           </Form.Item>
//                         </Col>
                       
//                         <Col span={12}>
//                           <Form.Item label="Courses" name="courses">
//                             <Select
//                               mode="multiple"
//                               placeholder="Select Courses"
//                               showSearch
//                               optionFilterProp="children"
//                               filterOption={(input, option) =>
//                                 option.children
//                                   .toLowerCase()
//                                   .includes(input.toLowerCase())
//                               }
//                             >
//                               {coursesOptions.map((course) => (
//                                 <Option key={course} value={course}>
//                                   {course}
//                                 </Option>
//                               ))}
//                             </Select>
//                           </Form.Item>
//                         </Col>
//                         <Col span={12}>
//                           <Form.Item
//                             label="No. of Weeks"
//                             name="weeks"
//                             rules={[{ required: true, message: "Please enter weeks" }]}
//                           >
//                             <Input placeholder="Enter weeks" />
//                           </Form.Item>
//                         </Col>
//                       </Row>
          
//                       <Row gutter={16}>
                      
//                       </Row>
          
//                       <hr />
//                       <h5>Weekly settings</h5>
          
//                       <Form.Item
//                         label="Level"
//                         name="level"
//                         rules={[{ required: true, message: "Please select Level" }]}
//                       >
//                         <Select
//                           placeholder="Select Level"
//                           showSearch
//                           optionFilterProp="children"
//                           filterOption={(input, option) =>
//                             option.children.toLowerCase().includes(input.toLowerCase())
//                           }
//                         >
//                           {levelOptions.map((level) => (
//                             <Option key={level} value={level}>
//                               {level}
//                             </Option>
//                           ))}
//                         </Select>
//                       </Form.Item>
          
//                       <hr />
//                      <Form.List name="blocks" initialValue={[{}]}>
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map((field, index) => (
//                   <div
//                     key={field.key}
//                     style={{
//                       border: "1px solid #ddd",
//                       padding: "15px",
//                       marginBottom: "20px",
//                       borderRadius: "6px",
//                       position: "relative"
//                     }}
//                   >
          
//                     {/* ------------------- ADD / REMOVE ICONS ------------------- */}
//                     <div style={{ position: "absolute", top: -10, right: -10, display: "flex", gap: 10 }}>
//                       {/* ADD BUTTON ALWAYS SHOWS */}
//                       <button
//                         type="button"
//                         onClick={() => add()}
//                         style={{
//                           background: "green",
//                           color: "#fff",
//                           border: "none",
//                           width: 28,
//                           height: 28,
//                           borderRadius: "50%",
//                           cursor: "pointer",
//                           fontSize: 18
//                         }}
//                       >
//                         +
//                       </button>
          
//                       {/* REMOVE BUTTON ONLY IF NOT FIRST BLOCK */}
//                       {index > 0 && (
//                         <button
//                           type="button"
//                           onClick={() => remove(field.name)}
//                           style={{
//                             background: "red",
//                             color: "#fff",
//                             border: "none",
//                             width: 28,
//                             height: 28,
//                             borderRadius: "50%",
//                             cursor: "pointer",
//                             fontSize: 18
//                           }}
//                         >
//                           –
//                         </button>
//                       )}
//                     </div>
          
//                     <h5>New Block</h5>
          
//                     {/* ------------------- WEEKDAY SELECTOR ------------------- */}
//                     <WeekdaySelector field={field} form={form} />
          
//                     {/* ------------------- SCHEDULING SECTION ------------------- */}
//                     <Form.Item
//                       {...field}
//                       name={[field.name, "schedule"]}
//                       label="Scheduling"
//                       style={{ marginBottom: 8 }}
//                     >
//                       <Select
//                         placeholder="Select Schedule"
//                         onChange={(value) => {
//                           const isIndividual = value === "Individual";
          
//                           const path = [ "blocks", field.name ];
          
//                           if (!isIndividual) {
//                             form.setFieldValue([...path, "from"], undefined);
//                             form.setFieldValue([...path, "end"], undefined);
//                           }
          
//                           form.setFieldValue([...path, "isIndividual"], isIndividual);
//                         }}
//                       >
//                         <Option value="Individual">Individual</Option>
//                         <Option value="09:00 - 12:00">09:00 - 12:00</Option>
//                         <Option value="12:30 - 13:30">12:30 - 13:30</Option>
//                         <Option value="12:00 - 14:00">12:00 - 14:00</Option>
//                         <Option value="12:30 - 15:30">12:30 - 15:30</Option>
//                         <Option value="13:00 - 16:00">13:00 - 16:00</Option>
//                         <Option value="14:30 - 16:30">14:30 - 16:30</Option>
//                         <Option value="14:40 - 15:40">14:40 - 15:40</Option>
//                         <Option value="15:45 - 16:45">15:45 - 16:45</Option>
//                         <Option value="16:00 - 19:00">16:00 - 19:00</Option>
//                         <Option value="19:10 - 21:10">19:10 - 21:10</Option>
//                         <Option value="18:30-20:30">18:30-20:30</Option>
//                         <Option value="08:30 - 09:30 test">08:30 - 09:30 test</Option>
//                       </Select>
//                     </Form.Item>
          
//                     {/* Hidden Flag */}
//                     <Form.Item
//                       name={[field.name, "isIndividual"]}
//                       initialValue={true}
//                       style={{ display: "none" }}
//                     >
//                       <Input />
//                     </Form.Item>
          
//                     {/* ------------------- TIME FROM / TO ------------------- */}
//                     <Form.Item label="Time" style={{ marginBottom: 0 }}>
//                       <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          
//                         {/* FROM */}
//                         <Form.Item name={[field.name, "from"]} style={{ marginBottom: 0 }}>
//                           <Select
//                             placeholder="From"
//                             style={{ width: 120 }}
//                             disabled={
//                               form.getFieldValue(["blocks", field.name, "isIndividual"]) === false
//                             }
//                           >
//                             {TIME_LIST.map((t) => (
//                               <Option value={t} key={t}>
//                                 {t}
//                               </Option>
//                             ))}
//                           </Select>
//                         </Form.Item>
          
//                         <span style={{ fontWeight: 600 }}>to</span>
          
//                         {/* TO */}
//                         <Form.Item name={[field.name, "end"]} style={{ marginBottom: 0 }}>
//                           <Select
//                             placeholder="To"
//                             style={{ width: 120 }}
//                             disabled={
//                               form.getFieldValue(["blocks", field.name, "isIndividual"]) === false
//                             }
//                           >
//                             {TIME_LIST.map((t) => (
//                               <Option value={t} key={t}>
//                                 {t}
//                               </Option>
//                             ))}
//                           </Select>
//                         </Form.Item>
//                       </div>
//                     </Form.Item>
          
//                     <br />
          
//                     {/* ------------------- LESSON FIELD ------------------- */}
//                     <Form.Item
//                       label="Lesson"
//                       name={[field.name, "lessons"]}
//                     >
//                       <Input placeholder="Enter lesson" />
//                     </Form.Item>
          
//                     {/* ------------------- CLASSROOM SELECT ------------------- */}
//                     <Form.Item
//                       label="Classrooms"
//                       name={[field.name, "classrooms"]}
//                       rules={[{ required: true, message: "Please select classrooms" }]}
//                     >
//                       <Select
//                         placeholder="Select Classroom"
//                         showSearch
//                         optionFilterProp="children"
//                       >
//                         {classroomOptions.map((room) => (
//                           <Option
//                             key={room}
//                             value={room}
//                           >
//                             {room}
//                           </Option>
//                         ))}
//                       </Select>
//                     </Form.Item>
          
                  
          
//                     {/* ------------------- TEACHER ------------------- */}
//                     <Form.Item label="Teacher" name={[field.name, "teacher"]}>
//                       <Select showSearch placeholder="Select Teacher">
//                         {teacherList.map((t) => (
//                           <Option key={t.value} value={t.value}>
//                             {t.label}
//                           </Option>
//                         ))}
//                       </Select>
//                     </Form.Item>
          
//                     {/* ------------------- CONTENT ------------------- */}
//                     <Form.Item label="Content" name={[field.name, "content"]}>
//                       <Input.TextArea />
//                     </Form.Item>
//                   </div>
//                 ))}
//               </>
//             )}
//           </Form.List>
          
//                       <SaveBtn CancelBothModel={CancelBothModel} />
//                     </Form>
//         </Modal>

//         <Modal
//           title="Edit Class"
//           visible={editModalVisible}
//           onOk={handleEditModalOk}
//           onCancel={handleEditModalCancel}
//           width={1000}
//           style={{
//             top: 20,
//           }}
//           footer={null} // Set footer to null to remove buttons
//         >
//           <Form
//             {...formLayout}
//             onFinish={onFinish}
//             // initialValues={editingRecordData}
//             // onValuesChange={handleFormChange}
//             onValuesChange={handleFormChangeWrapper}
//             form={form}
//             layout="horizontal"
//           >
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   label="Name"
//                   name="class_name"
//                   rules={[{ required: true, message: "Please enter name" }]}
//                 >
//                   <Input placeholder="Enter class name" />
//                 </Form.Item>
//               </Col>
//               {/* <Col span={12}>
//                 <Form.Item
//                   label="Automatic level change every weeks"
//                   name="automaticLevelChange1"
//                 >
//                   <Input placeholder="Enter weeks" />
//                 </Form.Item>
//               </Col> */}
//               {/* <Col span={12}>
//                 <Form.Item label="Colour" name="colour">
//                   <Select
//                     placeholder="Select a colour"
//                     showSearch
//                     optionFilterProp="children"
//                     filterOption={(input, option) =>
//                       option.children
//                         .toLowerCase()
//                         .includes(input.toLowerCase())
//                     }
//                   >
//                     {colorOptions.map((color) => (
//                       <Option key={color} value={color}>
//                         {color}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col> */}
//               <Col span={12}>
//                 <Form.Item label="Courses" name="courses">
//                   <Select
//                     mode="multiple"
//                     placeholder="Select Courses"
//                     showSearch
//                     optionFilterProp="children"
//                     filterOption={(input, option) =>
//                       option.children
//                         .toLowerCase()
//                         .includes(input.toLowerCase())
//                     }
//                   >
//                     {coursesOptions.map((course) => (
//                       <Option key={course} value={course}>
//                         {course}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item
//                   label="No. of Weeks"
//                   name="weeks"
//                   rules={[{ required: true, message: "Please enter weeks" }]}
//                 >
//                   <Input placeholder="Enter weeks" />
//                 </Form.Item>
//               </Col>
//               {/* <Col span={12}>
//                 <Form.Item
//                   label="Internal Comment"
//                   name="internalComment"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please enter Internal Comment",
//                     },
//                   ]}
//                 >
//                   <Input.TextArea />
//                 </Form.Item>
//               </Col> */}
//             </Row>

//             <hr />
//             <h5>Weekly settings</h5>

//             <Form.Item
//               label="Level"
//               name="level"
//               rules={[{ required: true, message: "Please select Level" }]}
//             >
//               <Select
//                 placeholder="Select Level"
//                 showSearch
//                 optionFilterProp="children"
//                 filterOption={(input, option) =>
//                   option.children.toLowerCase().includes(input.toLowerCase())
//                 }
//               >
//                 {levelOptions.map((level) => (
//                   <Option key={level} value={level}>
//                     {level}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <hr />
//             <h5>New Block</h5>

//             <Form.Item
//               name="weekdays"
//               label="weekdays"
//               rules={[
//                 {
//                   message: "Please select weekdays",
//                   type: "array",
//                 },
//               ]}
//             >
//               <Select mode="multiple" placeholder="Please select">
//                 <Option value="Monday">Monday</Option>
//                 <Option value="Tuesday">Tuesday</Option>
//                 <Option value="Wednesday">Wednesday</Option>
//                 <Option value="Thursday">Thursday</Option>
//                 <Option value="Friday">Friday</Option>
//                 <Option value="Saturday">Saturday</Option>
//                 <Option value="Sunday">Sunday</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="Automatic level change every weeks"
//               name="automaticLevelChange2"
//             >
//               <Input placeholder="Enter Automatic level change every weeks" />
//             </Form.Item>

//             {/* <Form.Item label="From" name="from">
//               <Input placeholder="09:00" />
//             </Form.Item>

//             <Form.Item label="end" name="end">
//               <Input placeholder="11:00" />
//             </Form.Item> */}

//             <Form.Item label="From" name="from">
//   <input type="time" placeholder="09:00" className="form-control" />
// </Form.Item>

// <Form.Item label="End" name="end">
//   <input type="time" placeholder="11:00" className="form-control" />
// </Form.Item>

//             <Form.Item label="Lessons" name="lessons">
//               <Input placeholder=" Enter lessons" />
//             </Form.Item>
//             {/* <Form.Item label="Start date" name="start_date">
//               <DatePicker placeholder=" Enter start date" />
//             </Form.Item> */}

//             <Form.Item label="Start date" name="start_date">
//               <div className="date-picker-container">
//                 <input
//                   type="date"
//                   id="date-picker-class"
//                   className="date-picker"
//                   name="start_date"
//                 />
//               </div>
//             </Form.Item>

//             <Form.Item
//               label="Classrooms"
//               name="classrooms"
//               rules={[{ required: true, message: "Please select classrooms" }]}
//             >
//               <Select
//                 placeholder="Select Classrooms"
//                 showSearch
//                 optionFilterProp="children"
//                 filterOption={(input, option) =>
//                   option.children.toLowerCase().includes(input.toLowerCase())
//                 }
//               >
//                 {classroomOptions.map((classroom) => (
//                   <Option
//                     key={classroom}
//                     value={classroom}
//                     disabled={!availableRooms.includes(classroom)}
//                   >
//                     {classroom}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {errorMessage && (
//               <Form.Item>
//                 <div
//                   style={{
//                     color: "red",
//                     textAlign: "center",
//                     marginLeft: 211,
//                     width: "100%",
//                   }}
//                 >
//                   {errorMessage}
//                 </div>
//               </Form.Item>
//             )}

//             <Form.Item label="Teacher" name="teacher">
//               <Select
//                 placeholder="Select Teacher"
//                 showSearch
//                 optionFilterProp="children"
//                 onChange={handleChange}
//                 filterOption={(input, option) =>
//                   option.children.toLowerCase().includes(input.toLowerCase())
//                 }
//               >
//                 {/* <Option value="Joshi">Joshi</Option>
//                 <Option value="john">john</Option>
//                 <Option value="kate">kate</Option>
//                 <Option value="Ally">Ally</Option>    */}
//                 {teacherList.map((name) => (
//                   <Option key={name.value} value={name.value}>
//                     {name.label}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item label="Content" name="content">
//               <Input.TextArea />
//             </Form.Item>

//             <UpdateBtn CancelBothModel={CancelBothModel} />
//           </Form>
//         </Modal>
//         </>
//   );
// };

// export default AddClassModalreplica;




import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col, Input, Select, message, Button } from "antd";
import moment from "moment";
import axios from "axios";
import baseURL from "../../../../config";
import { CommonFormSubmit } from "../../commonComponents/CreateUpdateApi";
import { SaveBtn, UpdateBtn } from "../../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";

const { Option } = Select;


const WeekdaySelector = ({ field, form }) => {
  const allDays = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const weekdaysOnly = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const weekend = ["Saturday", "Sunday"];

  const path = ["blocks", field.name, "weekdays"];

  const selected = Form.useWatch(path, form) || [];

  const toggle = (day) => {
    let cur = [...selected];
    if (cur.includes(day)) {
      cur = cur.filter((d) => d !== day);
    } else {
      cur.push(day);
    }
    form.setFieldValue(path, cur);
  };

  return (
    <Form.Item
      name={[field.name, "weekdays"]}
      label="Weekdays"
      rules={[{ required: true, message: "Please select weekdays" }]}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        
        <Button onClick={() => form.setFieldValue(path, weekdaysOnly)}>
          Weekdays
        </Button>

        <Button onClick={() => form.setFieldValue(path, weekend)}>
          Weekend
        </Button>

        <Button onClick={() => form.setFieldValue(path, allDays)}>
          All
        </Button>

        <Button onClick={() => form.setFieldValue(path, [])}>
          Clear
        </Button>

        <div style={{
          width: "100%",
          marginTop: 8,
          display: "flex",
          gap: 8,
          flexWrap: "wrap"
        }}>
          {allDays.map((day) => (
            <Button
              key={day}
              type={selected.includes(day) ? "primary" : "default"}
              onClick={() => toggle(day)}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>
    </Form.Item>
  );
};


const AddClassModalreplica = ({
  open, onClose, onSuccess, onFinish,
  editingData = null,
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [newModalVisible, setNewModalVisible] = useState(false);
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


  const TIME_LIST = [
  "08:30","08:35","08:40","08:45","08:50","08:55",
  "09:00","09:05","09:10","09:15","09:20","09:25",
  "09:30","09:35","09:40","09:45","09:50","09:55",
  "10:00","10:05","10:10","10:15","10:20","10:25",
  "10:30","10:35","10:40","10:45","10:50","10:55",
  "11:00","11:05","11:10","11:15","11:20","11:25",
  "11:30","11:35","11:40","11:45","11:50","11:55",
  "12:00","12:05","12:10","12:15","12:20","12:25",
  "12:30","12:35","12:40","12:45","12:50","12:55",
  "13:00","13:05","13:10","13:15","13:20","13:25",
  "13:30","13:35","13:40","13:45","13:50","13:55",
  "14:00","14:05","14:10","14:15","14:20","14:25",
  "14:30","14:35","14:40","14:45","14:50","14:55",
  "15:00","15:05","15:10","15:15","15:20","15:25",
  "15:30","15:35","15:40","15:45","15:50","15:55",
  "16:00","16:05","16:10","16:15","16:20","16:25",
  "16:30","16:35","16:40","16:45","16:50","16:55",
  "17:00","17:05","17:10","17:15","17:20","17:25",
  "17:30","17:35","17:40","17:45","17:50","17:55",
  "18:00","18:05","18:10","18:15","18:20","18:25",
  "18:30","18:35","18:40","18:45","18:50","18:55",
  "19:00","19:05","19:10","19:15","19:20","19:25",
  "19:30","19:35","19:40","19:45","19:50","19:55",
  "20:00","20:05","20:10","20:15","20:20","20:25",
  "20:30","20:35","20:40","20:45","20:50","20:55",
  "21:00","21:05","21:10","21:15","21:20","21:25",
  "21:30"
];

  // Reset form fields and initialValuesLoaded flag on component mount
  useEffect(() => {
    form.resetFields();
    setInitialValuesLoaded(false);
  }, [form]);

//   useEffect(() => {
//   if (initialValues) {
//     form.setFieldsValue(initialValues);
//   } else {
//     form.resetFields();
//   }
// }, [initialValues]);


//   const onFinish = async (values) => {
//     const { teacher } = values;
//     const selectedTeacher = teacherList.find((t) => t.value === teacher);
//     const teacherName = selectedTeacher ? selectedTeacher.label : teacher;

//     const collectionName = "classes";
//     const data = {
//       _id: selectedRecordId ? selectedRecordId : null,
//       ...values,
//       teacher: teacherName,
//     };

//     try {
//       await CommonFormSubmit(
//   "classes",
//   setSelectedRecordId,
//   data,
//   () => {},                  // setNewModalVisible (dummy)
//   () => {},                  // setEditModalVisible (dummy)
//   form,
//   () => {},                  // fetchData (dummy, you are using onSuccess instead)
//   setErrorMessage,
//   setSuccessMessage
// );

// if (onSuccess) onSuccess();

// if (onSuccess) onSuccess();

//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setErrorMessage("Failed to submit form. Please try again later.");
//     }
//   };



  
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
  if (editingData) {
    form.setFieldsValue(editingData);
  } else {
    form.resetFields();
  }
}, [editingData, form]);


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
    await fetchDataCommon("classes", setData, setSelectedRowKeys, setLoading);
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
    // setNewModalVisible(true);
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
      onClose();

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
    onClose();


    // Optionally, reset the form values
    setFormValues({});
  };

  // Form layout settings
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

 

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        class_name: `${entry.class_name} ` || null,
        teacher: `${entry.teacher} ` || null,
        colour: `${entry.colour} ` || null,
        classrooms: `${entry.classrooms} ` || null,
        level: `${entry.level} ` || null,
        start_date: entry.start_date
          ? moment(entry.start_date).format("DD-MM-YYYY")
          : null,
        weekdays: `${entry.weekdays} ` || null,
      }))
    : [];


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
        collectionName: "classes",
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
 

 

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const CancelBothModel = () => {
    onClose();

    setEditModalVisible(false);
  };


  return (
  <>
        <Modal
          title="Add New Class"
 open={open}
   onOk={handleNewModalOk}
  onCancel={onClose}
  width={1000}
  style={{ top: 20 }}
  footer={null}
        >
          <br />
          <hr />
           <Form
                      {...formLayout}
                      form={form}
                      onFinish={onFinish}
                      // onValuesChange={handleFormChange}
                      onValuesChange={handleFormChangeWrapper}
                      initialValues={null}
                      layout="horizontal"
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="Name"
                            name="class_name"
                            rules={[{ required: true, message: "Please enter name" }]}
                          >
                            <Input placeholder="Enter class name" />
                          </Form.Item>
                        </Col>
                       
                        <Col span={12}>
                          <Form.Item label="Courses" name="courses">
                            <Select
                              mode="multiple"
                              placeholder="Select Courses"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {coursesOptions.map((course) => (
                                <Option key={course} value={course}>
                                  {course}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="No. of Weeks"
                            name="weeks"
                            rules={[{ required: true, message: "Please enter weeks" }]}
                          >
                            <Input placeholder="Enter weeks" />
                          </Form.Item>
                        </Col>
                      </Row>
          
                      <Row gutter={16}>
                      
                      </Row>
          
                      <hr />
                      <h5>Weekly settings</h5>
          
                      <Form.Item
                        label="Level"
                        name="level"
                        rules={[{ required: true, message: "Please select Level" }]}
                      >
                        <Select
                          placeholder="Select Level"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.toLowerCase().includes(input.toLowerCase())
                          }
                        >
                          {levelOptions.map((level) => (
                            <Option key={level} value={level}>
                              {level}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
          
                      <hr />
                     <Form.List name="blocks" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{
                      border: "1px solid #ddd",
                      padding: "15px",
                      marginBottom: "20px",
                      borderRadius: "6px",
                      position: "relative"
                    }}
                  >
          
                    {/* ------------------- ADD / REMOVE ICONS ------------------- */}
                    <div style={{ position: "absolute", top: -10, right: -10, display: "flex", gap: 10 }}>
                      {/* ADD BUTTON ALWAYS SHOWS */}
                      <button
                        type="button"
                        onClick={() => add()}
                        style={{
                          background: "green",
                          color: "#fff",
                          border: "none",
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          cursor: "pointer",
                          fontSize: 18
                        }}
                      >
                        +
                      </button>
          
                      {/* REMOVE BUTTON ONLY IF NOT FIRST BLOCK */}
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(field.name)}
                          style={{
                            background: "red",
                            color: "#fff",
                            border: "none",
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            cursor: "pointer",
                            fontSize: 18
                          }}
                        >
                          –
                        </button>
                      )}
                    </div>
          
                    <h5>New Block</h5>
          
                    {/* ------------------- WEEKDAY SELECTOR ------------------- */}
                    <WeekdaySelector field={field} form={form} />
          
                    {/* ------------------- SCHEDULING SECTION ------------------- */}
                    <Form.Item
                      {...field}
                      name={[field.name, "schedule"]}
                      label="Scheduling"
                      style={{ marginBottom: 8 }}
                    >
                      <Select
                        placeholder="Select Schedule"
                        onChange={(value) => {
                          const isIndividual = value === "Individual";
          
                          const path = [ "blocks", field.name ];
          
                          if (!isIndividual) {
                            form.setFieldValue([...path, "from"], undefined);
                            form.setFieldValue([...path, "end"], undefined);
                          }
          
                          form.setFieldValue([...path, "isIndividual"], isIndividual);
                        }}
                      >
                        <Option value="Individual">Individual</Option>
                        <Option value="09:00 - 12:00">09:00 - 12:00</Option>
                        <Option value="12:30 - 13:30">12:30 - 13:30</Option>
                        <Option value="12:00 - 14:00">12:00 - 14:00</Option>
                        <Option value="12:30 - 15:30">12:30 - 15:30</Option>
                        <Option value="13:00 - 16:00">13:00 - 16:00</Option>
                        <Option value="14:30 - 16:30">14:30 - 16:30</Option>
                        <Option value="14:40 - 15:40">14:40 - 15:40</Option>
                        <Option value="15:45 - 16:45">15:45 - 16:45</Option>
                        <Option value="16:00 - 19:00">16:00 - 19:00</Option>
                        <Option value="19:10 - 21:10">19:10 - 21:10</Option>
                        <Option value="18:30-20:30">18:30-20:30</Option>
                        <Option value="08:30 - 09:30 test">08:30 - 09:30 test</Option>
                      </Select>
                    </Form.Item>
          
                    {/* Hidden Flag */}
                    <Form.Item
                      name={[field.name, "isIndividual"]}
                      initialValue={true}
                      style={{ display: "none" }}
                    >
                      <Input />
                    </Form.Item>
          
                    {/* ------------------- TIME FROM / TO ------------------- */}
                    <Form.Item label="Time" style={{ marginBottom: 0 }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          
                        {/* FROM */}
                        <Form.Item name={[field.name, "from"]} style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="From"
                            style={{ width: 120 }}
                            disabled={
                              form.getFieldValue(["blocks", field.name, "isIndividual"]) === false
                            }
                          >
                            {TIME_LIST.map((t) => (
                              <Option value={t} key={t}>
                                {t}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
          
                        <span style={{ fontWeight: 600 }}>to</span>
          
                        {/* TO */}
                        <Form.Item name={[field.name, "end"]} style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="To"
                            style={{ width: 120 }}
                            disabled={
                              form.getFieldValue(["blocks", field.name, "isIndividual"]) === false
                            }
                          >
                            {TIME_LIST.map((t) => (
                              <Option value={t} key={t}>
                                {t}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Form.Item>
          
                    <br />
          
                    {/* ------------------- LESSON FIELD ------------------- */}
                    <Form.Item
                      label="Lesson"
                      name={[field.name, "lessons"]}
                    >
                      <Input placeholder="Enter lesson" />
                    </Form.Item>
          
                    {/* ------------------- CLASSROOM SELECT ------------------- */}
                    <Form.Item
                      label="Classrooms"
                      name={[field.name, "classrooms"]}
                      rules={[{ required: true, message: "Please select classrooms" }]}
                    >
                      <Select
                        placeholder="Select Classroom"
                        showSearch
                        optionFilterProp="children"
                      >
                        {classroomOptions.map((room) => (
                          <Option
                            key={room}
                            value={room}
                          >
                            {room}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
          
                  
          
                    {/* ------------------- TEACHER ------------------- */}
                    <Form.Item label="Teacher" name={[field.name, "teacher"]}>
                      <Select showSearch placeholder="Select Teacher">
                        {teacherList.map((t) => (
                          <Option key={t.value} value={t.value}>
                            {t.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
          
                    {/* ------------------- CONTENT ------------------- */}
                    <Form.Item label="Content" name={[field.name, "content"]}>
                      <Input.TextArea />
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
          
                      <SaveBtn CancelBothModel={CancelBothModel} />
                    </Form>
        </Modal>

        <Modal
          title="Edit Class"
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
            // initialValues={editingRecordData}
            // onValuesChange={handleFormChange}
            onValuesChange={handleFormChangeWrapper}
            form={form}
            layout="horizontal"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="class_name"
                  rules={[{ required: true, message: "Please enter name" }]}
                >
                  <Input placeholder="Enter class name" />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  label="Automatic level change every weeks"
                  name="automaticLevelChange1"
                >
                  <Input placeholder="Enter weeks" />
                </Form.Item>
              </Col> */}
              {/* <Col span={12}>
                <Form.Item label="Colour" name="colour">
                  <Select
                    placeholder="Select a colour"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {colorOptions.map((color) => (
                      <Option key={color} value={color}>
                        {color}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col> */}
              <Col span={12}>
                <Form.Item label="Courses" name="courses">
                  <Select
                    mode="multiple"
                    placeholder="Select Courses"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {coursesOptions.map((course) => (
                      <Option key={course} value={course}>
                        {course}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="No. of Weeks"
                  name="weeks"
                  rules={[{ required: true, message: "Please enter weeks" }]}
                >
                  <Input placeholder="Enter weeks" />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  label="Internal Comment"
                  name="internalComment"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Internal Comment",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col> */}
            </Row>

            <hr />
            <h5>Weekly settings</h5>

            <Form.Item
              label="Level"
              name="level"
              rules={[{ required: true, message: "Please select Level" }]}
            >
              <Select
                placeholder="Select Level"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {levelOptions.map((level) => (
                  <Option key={level} value={level}>
                    {level}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <hr />
            <h5>New Block</h5>

            <Form.Item
              name="weekdays"
              label="weekdays"
              rules={[
                {
                  message: "Please select weekdays",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select">
                <Option value="Monday">Monday</Option>
                <Option value="Tuesday">Tuesday</Option>
                <Option value="Wednesday">Wednesday</Option>
                <Option value="Thursday">Thursday</Option>
                <Option value="Friday">Friday</Option>
                <Option value="Saturday">Saturday</Option>
                <Option value="Sunday">Sunday</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Automatic level change every weeks"
              name="automaticLevelChange2"
            >
              <Input placeholder="Enter Automatic level change every weeks" />
            </Form.Item>

            {/* <Form.Item label="From" name="from">
              <Input placeholder="09:00" />
            </Form.Item>

            <Form.Item label="end" name="end">
              <Input placeholder="11:00" />
            </Form.Item> */}

            <Form.Item label="From" name="from">
  <input type="time" placeholder="09:00" className="form-control" />
</Form.Item>

<Form.Item label="End" name="end">
  <input type="time" placeholder="11:00" className="form-control" />
</Form.Item>

            <Form.Item label="Lessons" name="lessons">
              <Input placeholder=" Enter lessons" />
            </Form.Item>
            {/* <Form.Item label="Start date" name="start_date">
              <DatePicker placeholder=" Enter start date" />
            </Form.Item> */}

            <Form.Item label="Start date" name="start_date">
              <div className="date-picker-container">
                <input
                  type="date"
                  id="date-picker-class"
                  className="date-picker"
                  name="start_date"
                />
              </div>
            </Form.Item>

            <Form.Item
              label="Classrooms"
              name="classrooms"
              rules={[{ required: true, message: "Please select classrooms" }]}
            >
              <Select
                placeholder="Select Classrooms"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {classroomOptions.map((classroom) => (
                  <Option
                    key={classroom}
                    value={classroom}
                    disabled={!availableRooms.includes(classroom)}
                  >
                    {classroom}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {errorMessage && (
              <Form.Item>
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginLeft: 211,
                    width: "100%",
                  }}
                >
                  {errorMessage}
                </div>
              </Form.Item>
            )}

            <Form.Item label="Teacher" name="teacher">
              <Select
                placeholder="Select Teacher"
                showSearch
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {/* <Option value="Joshi">Joshi</Option>
                <Option value="john">john</Option>
                <Option value="kate">kate</Option>
                <Option value="Ally">Ally</Option>    */}
                {teacherList.map((name) => (
                  <Option key={name.value} value={name.value}>
                    {name.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Content" name="content">
              <Input.TextArea />
            </Form.Item>

            <UpdateBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>
        </>
  );
};

export default AddClassModalreplica;




































