// import React, { useState, useEffect } from "react";
// import {
//   Tabs,
//   Table,
//   Button,
//   Select,
//   Typography,
//   Breadcrumb,
//   Spin,
//   Space,
//   Pagination,
//   Modal,
//   Checkbox,
//   message,
// } from "antd";
// import baseURL from "../../commonComponents/baseURL";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   PlusOutlined,
// } from "@ant-design/icons";

// import {
//   AiOutlinePlusCircle,
//   AiOutlineSortAscending,
//   AiOutlineFileExcel,
//   AiOutlineEdit,
//   AiOutlineDelete,
//   AiOutlineTag,
// } from "react-icons/ai";
// import { fetchDataCommon } from "../../commonComponents/GetDataApi";
// import axios from "axios";
// import { format } from "date-fns";

// import { Link } from "react-router-dom";
// import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";
// import AddClassModalreplica from "./AddClassModalreplica";

// const { TabPane } = Tabs;
// const { Option } = Select;
// const { Text } = Typography;

// const ClassCard = ({ item, onDropStudent, onSelectClass }) => {
//   const {
//     level,
//     className,
//     courses,
//     teacher,
//     week,
//     totalWeeks,
//     students,
//     roomCapacity,
//   } = item || {};

//   const studentCount = Array.isArray(students)
//     ? students.length
//     : students || 0;

//   return (
//     <div
//       className="class-card"
//       onClick={() => item?.scheduleId && onSelectClass(item.scheduleId)}
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={(e) => {
//         const student = JSON.parse(e.dataTransfer.getData("student"));
//         onDropStudent(student, item);
//       }}
//       style={{
//         border: "2px dashed transparent",
//         position: "relative",
//       }}
//     >
//       {/* Top-right action icons */}
//       <div
//         style={{
//           position: "absolute",
//           top: 8,
//           right: 8,
//           display: "flex",
//           gap: 8,
//           zIndex: 1,
//         }}
//         onClick={(e) => e.stopPropagation()} // prevent card click
//       >
//         <PlusOutlined
//           style={{ cursor: "pointer" }}
//           title="Add"
//         />
//         <EditOutlined
//           style={{ cursor: "pointer" }}
//           title="Edit"
//         />
//         <DeleteOutlined
//           style={{ cursor: "pointer", color: "#ff4d4f" }}
//           title="Delete"
//         />
//       </div>

//       <div>
//         <strong>Level :</strong> {level || "N/A"}
//       </div>
//       <hr />
//       <div>
//         <strong>Class :</strong> {className || "N/A"}
//       </div>
//       <div>
//         <strong>Courses :</strong>{" "}
//         {Array.isArray(courses) ? courses.join(", ") : courses}
//       </div>
//       <hr />
//       <div>
//         <strong>Teacher :</strong> {teacher || "N/A"}
//       </div>
//       <hr />
//       <div>
//         <strong>Week :</strong> {week || "N/A"} / {totalWeeks || "N/A"}
//       </div>
//       <div>
//         <strong>Students :</strong> {studentCount} / {roomCapacity}
//       </div>
//     </div>
//   );
// };


// const Scheduling = () => {
//   const [loading, setLoading] = useState(false);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [selectedRecordId, setSelectedRecordId] = useState(null);
//   const [data, setData] = useState([]); // State to store fetched data
//   const [scheduleData, setScheduleData] = useState([]);
//   const [classData, setClassData] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [dummyScheduleData, setDummyScheduleData] = useState([]);
//   const [watingData, setWatingData] = useState([]);
//   const [currentWeekDates, setCurrentWeekDates] = useState([]);
//   const [classrooms, setClassrooms] = useState([]);
//   const [selectedRoom, setSelectedRoom] = useState(null); // State to hold the selected room
//   const [classStudents, setClassStudents] = useState([]);

//   const weekDays = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];
//   const todayIndex = new Date().getDay(); // 0-6
//   const fixedIndex = todayIndex === 0 ? 6 : todayIndex - 1;
//   const [activeDay, setActiveDay] = useState(weekDays[fixedIndex]);
//   const [schedule, setSchedule] = useState([]);

//   const [filterValue1, setFilterValue1] = useState(null);
//   const [weekOptions, setWeekOptions] = useState([]);

//   const [showAddClassModal, setShowAddClassModal] = useState(false);

//   const [rooms, setRooms] = useState([]); // List of rooms from DB

//   // Pagination states
//   const [page1, setPage1] = useState(1);
//   const [pageSize1, setPageSize1] = useState(10);

//   const [page2, setPage2] = useState(1);
//   const [pageSize2, setPageSize2] = useState(10);
//   const [bookingPage, setBookingPage] = useState(1);
//   const [bookingPageSize, setBookingPageSize] = useState(10);
//   const [bookingTotal, setBookingTotal] = useState(212); // replace with actual total count

//   const [studentPage, setStudentPage] = useState(1);
//   const [studentPageSize, setStudentPageSize] = useState(10);
//   const [studentTotal, setStudentTotal] = useState(212); // replace with actual total count

//   const [selectedDroppedData, setSelectedDroppedData] = useState(null);
//   const [showDropModal, setShowDropModal] = useState(false);
//   const [confirmAdd, setConfirmAdd] = useState(false);

//   const onSelectClass = async (classInstanceId) => {
//     try {
//       const res = await axios.post(`${baseURL}/classed_students`, {
//         classInstanceId: classInstanceId,
//       });

//       if (res.data.success) {
//         const students = res.data.students || []; // FIXED

//         // Format data for table
//         const mapped = students.map((item) => ({
//           _id: item._id,
//           name: `${item.firstname} ${item.surname}`,
//           level: item.level || "-",
//           bl: item.booking_stage || "-",
//           rl: item.payment_scheme || "-",
//           al: item.days_per_week || "-",
//           bs: item.student_status || "-",
//           week: filterValue1,
//         }));

//         setClassStudents(mapped);
//       }
//     } catch (err) {
//       console.error("Error fetching class student list:", err);
//       message.error("Failed to load student list.");
//     }
//   };

//   const handleDropStudent = async (student, classItem) => {
//     const selectedWeek = filterValue1;
//     const [weekLabel, weekRange] = selectedWeek.split(",");
//     const weekStart = weekRange.split(" - ")[0].trim();
//     const weekEnd = weekRange.split(" - ")[1].trim();

//     setSelectedDroppedData({
//       studentId: student._id,
//       studentName: student.name,
//       paymentScheme: student.PaymentScheme,

//       classId: classItem.classId,
//       className: classItem.className,
//       level: student.level,
//       weekday: activeDay, // which weekday user is viewing
//       room: classItem.room,
//       time: classItem.time,
//       course: student.course,
//       classWeekNumber: classItem.week,
//       totalWeeks: classItem.totalWeeks,

//       classStartDate: weekStart,
//       classEndDate: weekEnd,

//       selectedWeekFullText: selectedWeek, // "Week 3, 08.12.2025 - 14.12.2025"
//     });

//     setShowDropModal(true);
//   };

//   const fetchBookings = async () => {
//     if (!filterValue1) return;

//     try {
//       setLoading(true);

//       const parts = filterValue1.split(",");
//       const range = parts[1].trim();
//       const [startStr, endStr] = range.split(" - ");

//       const startDate = convertDate(startStr);
//       const endDate = convertDate(endStr);

//       const body = { startDate, endDate };

//       const response = await axios.post(
//         `${baseURL}/get-bookings-by-week`,
//         body
//       );

//       const { data, total } = response.data;
//       setBookingTotal(total);

//       // Map API fields to table usable format
//       const mapped = data.map((item) => ({
//         _id: item._id,
//         name: `${item.firstname} ${item.surname}`,
//         ext_level: item.level || "-",
//         PaymentScheme: item.payment_scheme || "-",
//         course: item.course || "-",
//         status: item.student_status || "-",
//         bl: item.booking_stage1 || "-", // BL field
//         rl: item.payment_scheme1 || "-", // RL field
//         al: item.days_per_week1 || "-", // AL
//         bs: item.student_status1 || "-", // BS field
//         week: filterValue1, // Selected Week option
//       }));

//       // Manual pagination
//       const paginated = mapped.slice(
//         (bookingPage - 1) * bookingPageSize,
//         bookingPage * bookingPageSize
//       );

//       setTableData(paginated);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setLoading(false);
//     }
//   };

//   const convertDate = (dateStr) => {
//     const [dd, mm, yyyy] = dateStr.split(".");
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [bookingPage, bookingPageSize, filterValue1]);

//   const fetchRooms = async () => {
//     try {
//       const responseData = await FieldListDropdown("classrooms", "title");

//       if (responseData) {
//         const roomList = responseData.map((room) => ({
//           value: room._id,
//           label: room.title, // key used everywhere
//           displayLabel: `${room.title} (max - ${room.class_max_students})`,
//           class_max_students: room.class_max_students, // ✅ ADD THIS LINE
//         }));

//         setRooms(roomList);
//       }
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//     }
//   };

//   const roomCapacityMap = React.useMemo(() => {
//     const map = {};
//     rooms.forEach((r) => {
//       map[r.label] = r.class_max_students;
//     });
//     return map;
//   }, [rooms]);

//   const generateTimeSlots = () => {
//     const tempData = [];

//     // const slots = [];
//     // for (let hour = 0; hour < 24; hour++) {
//     //   for (let minute = 0; minute < 60; minute += 15) {
//     //     slots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
//     //   }
//     // }

//     const slots = [];

//     const startMinutes = 8 * 60 + 30; // 08:30
//     const endMinutes = 22 * 60; // 22:00

//     for (let m = startMinutes; m <= endMinutes; m += 15) {
//       const hour = Math.floor(m / 60);
//       const minute = m % 60;

//       slots.push(
//         `${hour.toString().padStart(2, "0")}:${minute
//           .toString()
//           .padStart(2, "0")}`
//       );
//     }

//     slots.forEach((time) => {
//       const rowData = { time };

//       rooms.forEach((room) => {
//         rowData[room.label] = null;
//       });

//       tempData.push(rowData);
//     });

//     // Fill class blocks
//     schedule
//       .filter((c) => c.weekday?.toLowerCase() === activeDay?.toLowerCase())

//       .forEach((cls) => {
//         const room = cls?.room;
//         const startIdx = slots.indexOf(cls.startTime);
//         const endIdx = slots.indexOf(cls.endTime);

//         if (startIdx !== -1 && endIdx !== -1) {
//           if (!tempData[startIdx][room]) {
//             tempData[startIdx][room] = [];
//           }

//           tempData[startIdx][room].push({
//             classId: cls.packageId?._id, // <-- ADD THIS
//             scheduleId: cls._id, // optional but recommended
//             level: cls.packageId?.level,
//             className: cls.packageId?.class_name,
//             courses: cls.packageId?.course_list,
//             lessons: cls.packageId?.blocks?.[0]?.lessons,
//             teacher: `${cls.teacher?.first_name} ${cls.teacher?.last_name}`,
//             time: `${cls.startTime} - ${cls.endTime}`,
//             room: cls.room,
//             week: cls.weekNumber,
//             totalWeeks: cls.packageId?.totalWeeks, // FIXED
//             rowSpan: endIdx - startIdx,
//             students: cls.students,
//             roomCapacity: roomCapacityMap[room] || 0,
//           });

//           for (let i = startIdx + 1; i < endIdx; i++) {
//             tempData[i][room] = "merged";
//           }
//         }
//       });

//     setData(tempData);
//   };

//   useEffect(() => {
//     if (filterValue1) {
//       fetchRooms();
//     }
//   }, [filterValue1]);

//   useEffect(() => {
//     if (rooms.length > 0) {
//       generateTimeSlots();
//     }
//   }, [rooms]);

//   // ================== TABLE COLUMNS ================= //
//   const columns0 = [
//     {
//       title: "Time",
//       dataIndex: "time",
//       key: "time",
//       fixed: "left",
//       width: 100,
//       render: (text) => <strong>{text}</strong>,
//     },
//     ...rooms
//       .map((room) => ({
//         title: room.displayLabel,
//         dataIndex: room.label,
//         key: room.label,
//         width: 260,
//         render: (value) => {
//           if (!value) return null;

//           if (value === "merged")
//             return { children: null, props: { style: { display: "none" } } };

//           return {
//             children: (
//               <div
//                 style={{ display: "flex", flexDirection: "column", gap: "6px" }}
//               >
//                 {value.map((item, index) => (
//                   <ClassCard
//                     key={index}
//                     item={item}
//                     onDropStudent={handleDropStudent}
//                     onSelectClass={onSelectClass}
//                   />
//                 ))}
//               </div>
//             ),
//             props: { rowSpan: value[0]?.rowSpan },
//           };

//           const combinedData = {
//             level: value?.level,
//             className: value?.className,
//             courses: value?.courses,
//             lessons: value?.lessons,
//             teacher: value?.teacher,
//             week: value?.week,
//             totalWeeks: value?.totalWeeks, // FIXED
//             time: value?.time,
//             room: value?.room,
//           };

//           return {
//             children: <ClassCard item={combinedData} />,
//             props: { rowSpan: value.rowSpan },
//           };
//         },
//       }))
//       .reverse(),
//   ];

//   //week list
//   useEffect(() => {
//     const fetchWeeks = async () => {
//       try {
//         const res = await axios.get(`${baseURL}/weeklist`);
//         if (res.data?.data) {
//           setWeekOptions(res.data.data); // array like ["Week 1, 24.11.2025 - 30.11.2025", ...]
//         }
//       } catch (err) {
//         console.error("Error fetching weeks", err);
//       }
//     };

//     fetchWeeks();
//   }, []);

//   useEffect(() => {
//     if (weekOptions.length === 0) return;

//     const today = new Date();

//     // Find week where today's date falls between start & end
//     const currentWeek = weekOptions.find((weekText) => {
//       // weekText = "Week 1, 24.11.2025 - 30.11.2025"

//       const parts = weekText.split(",")[1].trim(); // "24.11.2025 - 30.11.2025"
//       const [start, end] = parts.split(" - ");

//       const startDate = parseDate(start); // convert to JS date
//       const endDate = parseDate(end);

//       return today >= startDate && today <= endDate;
//     });

//     if (currentWeek) {
//       setFilterValue1(currentWeek); // auto select in UI
//     }
//   }, [weekOptions]);

//   function parseDate(dateStr) {
//     // "24.11.2025" → JS date
//     const [dd, mm, yyyy] = dateStr.split(".");
//     return new Date(`${yyyy}-${mm}-${dd}`);
//   }
//   //weeklist end

//   const fetchSchedule = async (weekText) => {
//     if (!weekText) return;

//     const parts = weekText.split(",")[1].trim();
//     const [start, end] = parts.split(" - ");

//     const weekNum = weekText.split(",")[0].replace("Week", "").trim();

//     const startDate = parseDate(start).toISOString().split("T")[0];
//     const endDate = parseDate(end).toISOString().split("T")[0];

//     try {
//       const res = await axios.get(
//         `${baseURL}/schedule/week/${weekNum}?start=${startDate}&end=${endDate}`
//       );
//       setSchedule(res.data);
//     } catch (err) {
//       console.error("Error fetching schedule:", err);
//     }
//   };

//   useEffect(() => {
//     if (filterValue1) {
//       fetchRooms();
//       fetchSchedule(filterValue1);
//     }
//   }, [filterValue1]);

//   useEffect(() => {
//     if (rooms.length > 0 && schedule.length > 0 && activeDay) {
//       generateTimeSlots();
//     }
//   }, [rooms, schedule, activeDay]);

//   const handleAddNewClass = () => {
//     setShowAddClassModal(true);
//   };

//   const handleModalClose = () => {
//     setShowAddClassModal(false);
//   };

//   const handleOpenConfirm = () => {
//     setConfirmAdd(true);
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

//   const columns = [
//     { title: "Name", dataIndex: "name", key: "name" },

//     {
//       title: "Payment Scheme",
//       dataIndex: "PaymentScheme",
//       key: "PaymentScheme",
//     },
//     { title: "Ext. level", dataIndex: "ext_level", key: "ext_level" },
//     // { title: "Status", dataIndex: "status", key: "status" },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (text) => (text === "Enrolled" ? "Trial" : text),
//     },

//     { title: "Course", dataIndex: "course", key: "course" },

//     { title: "BL", dataIndex: "bl", key: "bl" },
//     { title: "RL", dataIndex: "rl", key: "rl" },
//     { title: "AL", dataIndex: "al", key: "al" },
//     { title: "BS", dataIndex: "bs", key: "bs" },
//     { title: "Week", dataIndex: "week", key: "week" },
//   ];

//   const columns2 = [
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
//       title: "level",
//       dataIndex: "level",
//       key: "level",
//     },
//     {
//       title: "BL",
//       dataIndex: "bl",
//       key: "bl",
//     },
//     {
//       title: "RL",
//       dataIndex: "rl",
//       key: "rl",
//     },
//     {
//       title: "AL",
//       dataIndex: "al",
//       key: "al",
//     },
//     {
//       title: "BS",
//       dataIndex: "bs",
//       key: "bs",
//     },
//     {
//       title: "Week",
//       dataIndex: "week",
//       key: "week",
//     },
//   ];

//   const columns3 = [
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
//       title: "Level",
//       dataIndex: "level",
//       key: "level",
//     },
//     {
//       title: "BL",
//       dataIndex: "bl",
//       key: "bl",
//     },
//     {
//       title: "RL",
//       dataIndex: "rl",
//       key: "rl",
//     },
//     {
//       title: "AL",
//       dataIndex: "al",
//       key: "al",
//     },
//     {
//       title: "BS",
//       dataIndex: "bs",
//       key: "bs",
//     },
//     {
//       title: "Week",
//       dataIndex: "week",
//       key: "week",
//     },
//   ];

//   console.log("classData", classData);

//   const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");
//   const visibleColumns1 = columns2.filter(
//     (column2) => column2.dataIndex !== "_id"
//   );
//   const visibleColumns2 = columns3.filter(
//     (column) => column.dataIndex !== "_id"
//   );

//   const positions = Object.keys(dummyScheduleData)
//     .map((position) => parseInt(position.split(" ")[1]))
//     .sort((a, b) => a - b);

//   const handleFilterChange = (value) => {
//     setSelectedRoom(value === "all classroom" ? null : value); // Update selected room or set to null for all classrooms
//   };

//   const handleFilter1Change = (value) => {
//     setFilterValue1(value);
//   };

//   // const handleConfirmClassAssign = async () => {
//   //   try {
//   //     const body = {
//   //       studentId: selectedDroppedData.studentId,
//   //       classId: selectedDroppedData.classId,
//   //       weekday: selectedDroppedData.weekday,
//   //       room: selectedDroppedData.room,
//   //       time: selectedDroppedData.time,
//   //       classStartDate: selectedDroppedData.classStartDate,
//   //       classEndDate: selectedDroppedData.classEndDate,
//   //       selectedWeekText: selectedDroppedData.selectedWeekFullText,
//   //       applyFullWeek: confirmAdd
//   //     };

//   //     const res = await axios.post(`${baseURL}/assign-student`, body);

//   //     if (res?.data?.success) {
//   //       message.success(res.data.message || "Student added successfully.");
//   //     } else {
//   //       message.error(res.data.message || "Something went wrong.");
//   //     }

//   //     setShowDropModal(false);
//   //     setConfirmAdd(false);

//   //   } catch (error) {
//   //     message.error(error?.response?.data?.message || "Error assigning student.");
//   //   }
//   // };

//   const handleConfirmClassAssign = async () => {
//     try {
//       const body = {
//         studentId: selectedDroppedData.studentId,
//         classId: selectedDroppedData.classId,
//         weekday: selectedDroppedData.weekday,
//         room: selectedDroppedData.room,
//         time: selectedDroppedData.time,
//         classStartDate: selectedDroppedData.classStartDate,
//         classEndDate: selectedDroppedData.classEndDate,
//         selectedWeekText: selectedDroppedData.selectedWeekFullText,
//         applyFullWeek: confirmAdd,
//       };

//       const res = await axios.post(`${baseURL}/assign-student`, body);

//       if (res?.data?.success) {
//         // ✅ 1. SHOW SUCCESS MESSAGE FIRST
//         message.success(res.data.message || "Student added successfully.");

//         fetchRooms();
//         fetchSchedule(filterValue1);

//         // ✅ 3. CLOSE MODAL AFTER SHORT DELAY
//         setTimeout(() => {
//           setShowDropModal(false);
//           setConfirmAdd(false);
//         }, 200);
//       } else {
//         message.error(res.data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       console.error("Assign student error:", error);
//       message.error(
//         error?.response?.data?.message || "Error assigning student."
//       );
//     }
//   };

//   const draggableRowProps = (record) => ({
//     draggable: true,
//     onDragStart: (e) => {
//       e.dataTransfer.setData("student", JSON.stringify(record));
//     },
//   });

// const extractWeekNumber = (weekString) => {
//   if (!weekString) return 1;

//   // "Week 12, 24.11.2025 - 30.11.2025"
//   const weekPart = weekString.split(",")[0]; // "Week 12"
//   const number = weekPart.replace("Week", "").trim();

//   return Number(number) || 1;
// };


// const handleAddClassSubmit  = async (values) => {
//  const startWeekNumber = filterValue1
//     ? extractWeekNumber(filterValue1)
//     : 1;

//   const updatePayload = {
//     packageId: selectedRecordId,
//     weekNumber: startWeekNumber,
//     blocks: values.blocks,
//   };

//   const createPayload = {
//     class_name: values.class_name,
//     course_list: values.courses,
//     totalWeeks: values.weeks,
//     startWeek: startWeekNumber,
//     level: values.level,
//     blocks: values.blocks,
//     createdBy: "admin",
//   };

//   try {
//     if (selectedRecordId) {
//       await axios.post(`${baseURL}/class-package`, updatePayload);
//       message.success("Class week updated successfully");
//       // setEditModalVisible(false);
//     } else {
//       await axios.post(`${baseURL}/class-package`, createPayload);
//       message.success("Class created successfully");
//       setShowAddClassModal(false);
//     }

//      fetchRooms();
//       fetchSchedule(filterValue1);
//     // form.resetFields();
//   } catch (err) {
//     message.error(err.response?.data?.msg || "Error");
//   }
// };

//   return (
//     <>
//       <Breadcrumb>
//         <Breadcrumb.Item>
//           <Link to="">Time Table & Classes</Link>
//         </Breadcrumb.Item>
//         <Breadcrumb.Item>Time Table & Classes</Breadcrumb.Item>
//         <Breadcrumb.Item>Time Table</Breadcrumb.Item>
//       </Breadcrumb>
//       <hr />
//       <Space>
//         <label style={{ marginRight: "10px" }}>Course Week :</label>

//         <Select
//           style={{ width: 300 }}
//           placeholder="Select"
//           onChange={handleFilter1Change}
//           value={filterValue1}
//           allowClear
//         >
//           {/* Dynamic Week Options */}
//           {weekOptions.map((week, index) => (
//             <Option key={index} value={week}>
//               {week}
//             </Option>
//           ))}
//         </Select>
//       </Space>

//       <hr />
//       <Spin spinning={loading}>
//         <div style={{ display: "flex", flexWrap: "wrap" }}>
//           {/* First Table */}
//           <div style={{ flex: 1, marginRight: "16px", minWidth: "300px" }}>
//             <h5>Booking list</h5>

//             {/* Pagination + Page Size Controls */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: 8,
//               }}
//             >
//               <Pagination
//                 current={bookingPage}
//                 total={bookingTotal}
//                 pageSize={bookingPageSize}
//                 onChange={(page) => setBookingPage(page)}
//                 showSizeChanger={false}
//               />
//               <Select
//                 value={bookingPageSize}
//                 style={{ width: 120 }}
//                 onChange={(value) => {
//                   setBookingPageSize(value);
//                   setBookingPage(1);
//                 }}
//                 options={[
//                   { value: 10, label: "10 / page" },
//                   { value: 20, label: "20 / page" },
//                   { value: 30, label: "30 / page" },
//                   { value: 50, label: "50 / page" },
//                 ]}
//               />
//             </div>

//             <div
//               style={{
//                 minHeight: "200px",
//                 maxHeight: "200px",
//                 overflowY: "auto",
//                 overflowX: "auto",
//               }}
//             >
//               {/* <Table
//           rowSelection={{
//             selectedRowKeys,
//             onChange: onSelectChange,
//             fixed: true,
//           }}
//           columns={visibleColumns}
//           dataSource={tableData}
//           bordered
//           rowKey={(record) => record._id}
//           scroll={{ x: "max-content" }}
//           pagination={false} // Disable built-in pagination
//         /> */}
//               <Table
//                 rowSelection={{
//                   selectedRowKeys,
//                   onChange: onSelectChange,
//                   fixed: true,
//                 }}
//                 columns={columns}
//                 dataSource={tableData}
//                 bordered
//                 rowKey="_id"
//                 scroll={{ x: "max-content" }}
//                 pagination={false}
//                 onRow={(record) => draggableRowProps(record)}
//                 rowClassName={(record) =>
//                   record.status === "Enrolled" ? "trial-row" : ""
//                 }
//               />
//             </div>
//           </div>

//           {/* Second Table */}
//           <div style={{ flex: 1, minWidth: "300px" }}>
//             <h5>Class Students</h5>

//             {/* Pagination + Page Size Controls */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: 8,
//               }}
//             >
//               <Pagination
//                 current={studentPage}
//                 total={studentTotal}
//                 pageSize={studentPageSize}
//                 onChange={(page) => setStudentPage(page)}
//                 showSizeChanger={false}
//               />
//               <Select
//                 value={studentPageSize}
//                 style={{ width: 120 }}
//                 onChange={(value) => {
//                   setStudentPageSize(value);
//                   setStudentPage(1);
//                 }}
//                 options={[
//                   { value: 10, label: "10 / page" },
//                   { value: 20, label: "20 / page" },
//                   { value: 30, label: "30 / page" },
//                   { value: 50, label: "50 / page" },
//                 ]}
//               />
//             </div>

//             <div
//               style={{
//                 minHeight: "200px",
//                 maxHeight: "200px",
//                 overflowY: "auto",
//                 overflowX: "auto",
//               }}
//             >
//               <Table
//                 rowSelection={{
//                   selectedRowKeys,
//                   onChange: onSelectChange,
//                   fixed: true,
//                 }}
//                 columns={visibleColumns1}
//                 dataSource={classStudents}
//                 bordered
//                 rowKey={(record) => record._id}
//                 scroll={{ x: "max-content" }}
//                 pagination={false}
//               />
//             </div>
//           </div>
//         </div>
//       </Spin>

//       <hr />
//       <div
//         style={{
//           marginBottom: 16,
//           display: "flex",
//           alignItems: "center",
//           marginTop: 15,
//         }}
//       >
//         {/* <label style={{ marginRight: 8 }}>Filter:</label>
//         <Select
//           defaultValue="all classroom"
//           style={{ width: 220, marginRight: 8 }}
//           onChange={handleFilterChange}
//         >
//           <Option value="all classroom">All Classroom</Option>
//           {classrooms.map((name) => (
//             <Option key={name._id} value={name.label}>
//               {name.label}
//             </Option>
//           ))}
//         </Select> */}
//         <div style={{ marginLeft: "auto" }}>
          
//           <Button type="primary" onClick={handleAddNewClass}>
//             + Add New Class
//           </Button>

//           <AddClassModalreplica
//             open={showAddClassModal}
//             onClose={handleModalClose}
//              onFinish={handleAddClassSubmit}
//             onSuccess={() => {
//               setShowAddClassModal(false);
//             }}
//           />
//         </div>
//       </div>
//       <Tabs
//         activeKey={activeDay}
//         onChange={(key) => setActiveDay(key)}
//         style={{ marginBottom: 10 }}
//       >
//         {weekDays.map((day) => (
//           <TabPane tab={day} key={day} />
//         ))}
//       </Tabs>

//       <Table
//         loading={loading}
//         columns={columns0}
//         dataSource={data}
//         bordered
//         pagination={false}
//         size="small"
//         scroll={{ x: "max-content", y: "50vh" }}
//         rowClassName={() => "compact-row"}
//       />
//       <style>
//         {`
//   /* keep table compact */
//   .compact-row .ant-table-cell {
//     padding: 1px 4px !important;
//     vertical-align: top !important;
//   }

//   .trial-row td {
//   color: blue !important;
//   font-weight: 600;
// }

//   /* Make the actual TD with rowspan behave like a flex container.
//      Ant's markup: <td rowspan="N"><div class="ant-table-cell">CONTENT</div></td>
//   */
//   td[rowspan] {
//     padding: 0 !important;            /* let inner .ant-table-cell control padding */
//     vertical-align: top !important;
//   }

//   /* The inner ant wrapper should fill the td and act as flex column */
//   td[rowspan] > .ant-table-cell {
//     display: flex !important;
//     flex-direction: column !important;
//     height: 100% !important;
//     padding: 6px !important;          /* restore nice padding inside merged cell */
//     box-sizing: border-box !important;
//   }

//   /* Let the class card expand to fill the wrapper */
//   .class-card {
//     background: #e6f7ff;
//     border-radius: 6px;
//     text-align: center;
//     font-size: 12px;
//     font-weight: 500;
//     cursor: pointer;
//     line-height: 2.3;
//     display: flex;
//     flex-direction: column;
//     flex: 1 1 auto;                   /* crucial — fill available vertical space */
//     min-height: 0;                    /* allow flex child to shrink when needed */
//     overflow: hidden;
//     padding: 8px;
//   }

//   /* hide merged placeholder rows content */
//   td > .ant-table-cell:empty {
//     display: none;
//   }

//   /* small rule to ensure table rows grow with content */
//   .ant-table-tbody > tr > td {
//     height: auto !important;
//   }

//   /* Hover: expand card by making it absolute and larger */
//   .class-card:hover {
//     position: relative;
//     z-index: 9999;
//     box-shadow: 0 6px 18px rgba(0,0,0,0.18);
//     transform: translateY(-4px);
//   }

//   .class-card hr {
//     margin: 6px 0;
//     border: 0.5px solid #91d5ff;
//   }

//   /* Optional: keep merged placeholder cells visually removed */
//   .merged-cell-placeholder {
//     display: none;
//   }

//   .class-card:hover {
//   position: absolute;
//   z-index: 999;
//   background: white;
//   width: 230px;
//   min-height: auto;
//   height: auto !important;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.2);
// }

// `}
//       </style>

//       <Modal
//         title="Confirm Add to Class"
//         visible={showDropModal}
//         okText="Confirm"
//         onOk={handleConfirmClassAssign}
//         onCancel={() => {
//           setShowDropModal(false);
//           setConfirmAdd(false);
//         }}
//       >
//         {selectedDroppedData && (
//           <div style={{ lineHeight: "26px" }}>
//             <p>
//               <strong>Student:</strong> {selectedDroppedData.studentName}
//             </p>
//             {/* <p><strong>Level:</strong> {selectedDroppedData.level}</p> */}
//             <p>
//               <strong>Course:</strong> {selectedDroppedData.course}
//             </p>
//             <p>
//               <strong>Payment Scheme:</strong>{" "}
//               {selectedDroppedData.paymentScheme}
//             </p>
//             {/* <p><strong>Student Course:</strong> {format(selectedDroppedData.start)} - {format(selectedDroppedData.end)}</p> */}
//             <p>
//               <strong>Selected Week:</strong>{" "}
//               {selectedDroppedData.selectedWeekFullText}
//             </p>

//             {selectedDroppedData.warning && (
//               <p style={{ color: "red" }}>{selectedDroppedData.warning}</p>
//             )}

//             <Checkbox
//               checked={confirmAdd}
//               onChange={(e) => setConfirmAdd(e.target.checked)}
//             >
//               Should the student be assigned to this class for all following
//               weeks?
//             </Checkbox>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default Scheduling;













import React, { useState, useEffect } from "react";
import {
  Tabs,
  Table,
  Button,
  Select,
  Typography,
  Breadcrumb,
  Spin,
  Space,
  Pagination,
  Modal,
  Checkbox,
  message,
  Form,
} from "antd";
import baseURL from "../../commonComponents/baseURL";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  AiOutlinePlusCircle,
  AiOutlineSortAscending,
  AiOutlineFileExcel,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineTag,
} from "react-icons/ai";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import axios from "axios";
import { format } from "date-fns";

import { Link } from "react-router-dom";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";
import AddClassModalreplica from "./AddClassModalreplica";

const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;

const ClassCard = ({ item, onDropStudent, onSelectClass, onEdit  }) => {
  const {
    level,
    className,
    courses,
    teacher,
    week,
    totalWeeks,
    students,
    roomCapacity,
  } = item || {};

  const studentCount = Array.isArray(students)
    ? students.length
    : students || 0;

  return (
    <div
      className="class-card"
      onClick={() => item?.scheduleId && onSelectClass(item.scheduleId)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const student = JSON.parse(e.dataTransfer.getData("student"));
        onDropStudent(student, item);
      }}
      style={{
        border: "2px dashed transparent",
        position: "relative",
      }}
    >
      {/* Top-right action icons */}
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          gap: 8,
          zIndex: 1,
        }}
        onClick={(e) => e.stopPropagation()} // prevent card click
      >
        <PlusOutlined
          style={{ cursor: "pointer" }}
          title="Add"
        />
        <EditOutlined
          style={{ cursor: "pointer" }}
          title="Edit"
          onClick={() => onEdit(item.classId)} 
        />
        <DeleteOutlined
          style={{ cursor: "pointer", color: "#ff4d4f" }}
          title="Delete"
        />
      </div>

      <div>
        <strong>Level :</strong> {level || "N/A"}
      </div>
      <hr />
      <div>
        <strong>Class :</strong> {className || "N/A"}
      </div>
      <div>
        <strong>Courses :</strong>{" "}
        {Array.isArray(courses) ? courses.join(", ") : courses}
      </div>
      <hr />
      <div>
        <strong>Teacher :</strong> {teacher || "N/A"}
      </div>
      <hr />
      <div>
        <strong>Week :</strong> {week || "N/A"} / {totalWeeks || "N/A"}
      </div>
      <div>
        <strong>Students :</strong> {studentCount} / {roomCapacity}
      </div>
    </div>
  );
};


const Scheduling = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [data, setData] = useState([]); // State to store fetched data
  const [scheduleData, setScheduleData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [dummyScheduleData, setDummyScheduleData] = useState([]);
  const [watingData, setWatingData] = useState([]);
  const [currentWeekDates, setCurrentWeekDates] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // State to hold the selected room
  const [classStudents, setClassStudents] = useState([]);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const todayIndex = new Date().getDay(); // 0-6
  const fixedIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  const [activeDay, setActiveDay] = useState(weekDays[fixedIndex]);
  const [schedule, setSchedule] = useState([]);

  const [filterValue1, setFilterValue1] = useState(null);
  const [weekOptions, setWeekOptions] = useState([]);

  const [showAddClassModal, setShowAddClassModal] = useState(false);
const [editClassId, setEditClassId] = useState(null);
const [editInitialValues, setEditInitialValues] = useState(null);


  const [rooms, setRooms] = useState([]); // List of rooms from DB

  // Pagination states
  const [page1, setPage1] = useState(1);
  const [pageSize1, setPageSize1] = useState(10);

  const [page2, setPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(10);
  const [bookingPage, setBookingPage] = useState(1);
  const [bookingPageSize, setBookingPageSize] = useState(10);
  const [bookingTotal, setBookingTotal] = useState(212); // replace with actual total count

  const [studentPage, setStudentPage] = useState(1);
  const [studentPageSize, setStudentPageSize] = useState(10);
  const [studentTotal, setStudentTotal] = useState(212); // replace with actual total count

  const [selectedDroppedData, setSelectedDroppedData] = useState(null);
  const [showDropModal, setShowDropModal] = useState(false);
  const [confirmAdd, setConfirmAdd] = useState(false);



  const fetchClassById = async (classId) => {
  try {
    const res = await axios.get(`${baseURL}/class-package/${classId}`);
    return res.data;
  } catch (err) {
    message.error("Failed to load class data");
    return null;
  }
};


const formatDate1 = (dateStr) => {
  const [day, month, year] = dateStr.split(".");
  return `${year}-${month}-${day}`; // converts 01.12.2025 → 2025-12-01
};
const handleEditClass = async (classId) => {
  try {
    if (!classId) {
      message.warning("Invalid class selected");
      return;
    }

    // 🔹 Extract week info
    const parts = filterValue1.split(",");
    const weekNum = Number(parts[0].replace("Week", "").trim());

    const range = parts[1].trim();
    const [startStr, endStr] = range.split(" - ");

    const formattedStart = formatDate1(startStr);
    const formattedEnd = formatDate1(endStr);

    const url = `${baseURL}/class/week/${classId}?weekNumber=${weekNum}&start=${formattedStart}&end=${formattedEnd}`;
    console.log("Edit API:", url);

    const response = await axios.get(url);

    const { classPackage, instances } = response.data;

    // 🔹 Merge blocks + instances (your logic preserved)
    const formattedBlocks = classPackage.blocks.map((b) => {
      const instanceMatch = instances.find(
        (inst) => inst.weekday === b.weekdays[0]
      );

      return {
        weekdays: b.weekdays,
        schedule: instanceMatch
          ? `${instanceMatch.startTime} - ${instanceMatch.endTime}`
          : b.schedule,
        lessons: b.lessons,
        classrooms: instanceMatch ? instanceMatch.room : b.classrooms,
        teacher:
          instanceMatch?.teacher?._id || b.teacher?._id || "",
        isIndividual: false,
        from: instanceMatch?.startTime || "",
        end: instanceMatch?.endTime || "",
      };
    });

    // 🔹 Set modal state
    setEditClassId(classId);
    setEditInitialValues({
      class_name: classPackage.class_name,
      courses: classPackage.course_list,
      weeks: classPackage.totalWeeks,
      level: classPackage.level,
      blocks: formattedBlocks,
    });

    setShowAddClassModal(true);

  } catch (error) {
    console.error("Error fetching data for edit:", error);
    message.error("Failed to load class data");
  }
};





  const onSelectClass = async (classInstanceId) => {
    try {
      const res = await axios.post(`${baseURL}/classed_students`, {
        classInstanceId: classInstanceId,
      });

      if (res.data.success) {
        const students = res.data.students || []; // FIXED

        // Format data for table
        const mapped = students.map((item) => ({
          _id: item._id,
          name: `${item.firstname} ${item.surname}`,
          level: item.level || "-",
          bl: item.booking_stage || "-",
          rl: item.payment_scheme || "-",
          al: item.days_per_week || "-",
          bs: item.student_status || "-",
          week: filterValue1,
        }));

        setClassStudents(mapped);
      }
    } catch (err) {
      console.error("Error fetching class student list:", err);
      message.error("Failed to load student list.");
    }
  };

  const handleDropStudent = async (student, classItem) => {
    const selectedWeek = filterValue1;
    const [weekLabel, weekRange] = selectedWeek.split(",");
    const weekStart = weekRange.split(" - ")[0].trim();
    const weekEnd = weekRange.split(" - ")[1].trim();

    setSelectedDroppedData({
      studentId: student._id,
      studentName: student.name,
      paymentScheme: student.PaymentScheme,

      classId: classItem.classId,
      className: classItem.className,
      level: student.level,
      weekday: activeDay, // which weekday user is viewing
      room: classItem.room,
      time: classItem.time,
      course: student.course,
      classWeekNumber: classItem.week,
      totalWeeks: classItem.totalWeeks,

      classStartDate: weekStart,
      classEndDate: weekEnd,

      selectedWeekFullText: selectedWeek, // "Week 3, 08.12.2025 - 14.12.2025"
    });

    setShowDropModal(true);
  };

  const fetchBookings = async () => {
    if (!filterValue1) return;

    try {
      setLoading(true);

      const parts = filterValue1.split(",");
      const range = parts[1].trim();
      const [startStr, endStr] = range.split(" - ");

      const startDate = convertDate(startStr);
      const endDate = convertDate(endStr);

      const body = { startDate, endDate };

      const response = await axios.post(
        `${baseURL}/get-bookings-by-week`,
        body
      );

      const { data, total } = response.data;
      setBookingTotal(total);

      // Map API fields to table usable format
    const mapped = data.map((item) => ({
  _id: item._id,
  name: `${item.firstname} ${item.surname}`,
  ext_level: item.level || "-",
  PaymentScheme: item.payment_scheme || "-",
  course: item.course || "-",
  status: item.student_status || "-",
  bl: item.booking_stage1 || "-",
  rl: item.payment_scheme1 || "-",
  al: item.days_per_week1 || "-",
  bs: item.student_status1 || "-",
  week: filterValue1,
}));

// ✅ important
const filtered = mapped.filter(
  (item) =>
    item.status?.toLowerCase() === "active" ||
    item.status?.toLowerCase() === "trial"
);

const paginated = filtered.slice(
  (bookingPage - 1) * bookingPageSize,
  bookingPage * bookingPageSize
);

setTableData(paginated);

setBookingTotal(filtered.length);

      setTableData(paginated);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setLoading(false);
    }
  };

  const convertDate = (dateStr) => {
    const [dd, mm, yyyy] = dateStr.split(".");
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    fetchBookings();
  }, [bookingPage, bookingPageSize, filterValue1]);

  const fetchRooms = async () => {
    try {
      const responseData = await FieldListDropdown("classrooms", "title");

      if (responseData) {
        // const roomList = responseData.map((room) => ({
        //   value: room._id,
        //   label: room.title, // key used everywhere
        //   displayLabel: `${room.title} (max - ${room.class_max_students})`,
        //   class_max_students: room.class_max_students, // ✅ ADD THIS LINE
        // }));
        const roomList = responseData
  .map((room) => ({
    value: room._id,
    label: room.title,
    displayLabel: `${room.title} (max - ${room.class_max_students})`,
    class_max_students: room.class_max_students,
  }))
  .sort((a, b) => {
    const numA = parseInt(a.label.replace(/\D/g, ""), 10);
    const numB = parseInt(b.label.replace(/\D/g, ""), 10);
    return numA - numB;
  });

setRooms(roomList);


        setRooms(roomList);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const roomCapacityMap = React.useMemo(() => {
    const map = {};
    rooms.forEach((r) => {
      map[r.label] = r.class_max_students;
    });
    return map;
  }, [rooms]);

  const generateTimeSlots = () => {
    const tempData = [];

    // const slots = [];
    // for (let hour = 0; hour < 24; hour++) {
    //   for (let minute = 0; minute < 60; minute += 15) {
    //     slots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
    //   }
    // }

    const slots = [];

    const startMinutes = 8 * 60 + 30; // 08:30
    const endMinutes = 22 * 60; // 22:00

    for (let m = startMinutes; m <= endMinutes; m += 15) {
      const hour = Math.floor(m / 60);
      const minute = m % 60;

      slots.push(
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`
      );
    }

    slots.forEach((time) => {
      const rowData = { time };

      rooms.forEach((room) => {
        rowData[room.label] = null;
      });

      tempData.push(rowData);
    });

    // Fill class blocks
    schedule
      .filter((c) => c.weekday?.toLowerCase() === activeDay?.toLowerCase())

      .forEach((cls) => {
        const room = cls?.room;
        const startIdx = slots.indexOf(cls.startTime);
        const endIdx = slots.indexOf(cls.endTime);

        if (startIdx !== -1 && endIdx !== -1) {
          if (!tempData[startIdx][room]) {
            tempData[startIdx][room] = [];
          }

          tempData[startIdx][room].push({
            classId: cls.packageId?._id, // <-- ADD THIS
            scheduleId: cls._id, // optional but recommended
            level: cls.packageId?.level,
            className: cls.packageId?.class_name,
            courses: cls.packageId?.course_list,
            lessons: cls.packageId?.blocks?.[0]?.lessons,
            teacher: `${cls.teacher?.first_name} ${cls.teacher?.last_name}`,
            time: `${cls.startTime} - ${cls.endTime}`,
            room: cls.room,
            week: cls.weekNumber,
            totalWeeks: cls.packageId?.totalWeeks, // FIXED
            rowSpan: endIdx - startIdx,
            students: cls.students,
            roomCapacity: roomCapacityMap[room] || 0,
          });

          for (let i = startIdx + 1; i < endIdx; i++) {
            tempData[i][room] = "merged";
          }
        }
      });

    setData(tempData);
  };

  useEffect(() => {
    if (filterValue1) {
      fetchRooms();
    }
  }, [filterValue1]);

  useEffect(() => {
    if (rooms.length > 0) {
      generateTimeSlots();
    }
  }, [rooms]);

  // ================== TABLE COLUMNS ================= //
  const columns0 = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      fixed: "left",
      width: 100,
      render: (text) => <strong>{text}</strong>,
    },
    ...rooms
      .map((room) => ({
        title: room.displayLabel,
        dataIndex: room.label,
        key: room.label,
        width: 260,
        render: (value) => {
          if (!value) return null;

          if (value === "merged")
            return { children: null, props: { style: { display: "none" } } };

          return {
            children: (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {value.map((item, index) => (
                  <ClassCard
                    key={index}
                    item={item}
                    onDropStudent={handleDropStudent}
                    onSelectClass={onSelectClass}
                    onEdit={handleEditClass}
                  />
                ))}
              </div>
            ),
            props: { rowSpan: value[0]?.rowSpan },
          };

          const combinedData = {
            level: value?.level,
            className: value?.className,
            courses: value?.courses,
            lessons: value?.lessons,
            teacher: value?.teacher,
            week: value?.week,
            totalWeeks: value?.totalWeeks, // FIXED
            time: value?.time,
            room: value?.room,
          };

          return {
            children: <ClassCard item={combinedData} />,
            props: { rowSpan: value.rowSpan },
          };
        },
      }))
      // .reverse(),
  ];

  //week list
  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const res = await axios.get(`${baseURL}/weeklist`);
        if (res.data?.data) {
          setWeekOptions(res.data.data); // array like ["Week 1, 24.11.2025 - 30.11.2025", ...]
        }
      } catch (err) {
        console.error("Error fetching weeks", err);
      }
    };

    fetchWeeks();
  }, []);

  useEffect(() => {
    if (weekOptions.length === 0) return;

    const today = new Date();

    // Find week where today's date falls between start & end
    const currentWeek = weekOptions.find((weekText) => {
      // weekText = "Week 1, 24.11.2025 - 30.11.2025"

      const parts = weekText.split(",")[1].trim(); // "24.11.2025 - 30.11.2025"
      const [start, end] = parts.split(" - ");

      const startDate = parseDate(start); // convert to JS date
      const endDate = parseDate(end);

      return today >= startDate && today <= endDate;
    });

    if (currentWeek) {
      setFilterValue1(currentWeek); // auto select in UI
    }
  }, [weekOptions]);

  function parseDate(dateStr) {
    // "24.11.2025" → JS date
    const [dd, mm, yyyy] = dateStr.split(".");
    return new Date(`${yyyy}-${mm}-${dd}`);
  }
  //weeklist end

  const fetchSchedule = async (weekText) => {
    if (!weekText) return;

    const parts = weekText.split(",")[1].trim();
    const [start, end] = parts.split(" - ");

    const weekNum = weekText.split(",")[0].replace("Week", "").trim();

    const startDate = parseDate(start).toISOString().split("T")[0];
    const endDate = parseDate(end).toISOString().split("T")[0];

    try {
      const res = await axios.get(
        `${baseURL}/schedule/week/${weekNum}?start=${startDate}&end=${endDate}`
      );
      setSchedule(res.data);
    } catch (err) {
      console.error("Error fetching schedule:", err);
    }
  };

  useEffect(() => {
    if (filterValue1) {
      fetchRooms();
      fetchSchedule(filterValue1);
    }
  }, [filterValue1]);

  useEffect(() => {
    if (rooms.length > 0 && schedule.length > 0 && activeDay) {
      generateTimeSlots();
    }
  }, [rooms, schedule, activeDay]);

  // const handleAddNewClass = () => {
  //   setShowAddClassModal(true);
  // };

const handleAddNewClass = () => {
  setEditClassId(null);
  setEditInitialValues(null);
  setShowAddClassModal(true);
};



  const handleModalClose = () => {
    setShowAddClassModal(false);
  };

  const handleOpenConfirm = () => {
    setConfirmAdd(true);
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

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },

    {
      title: "Payment Scheme",
      dataIndex: "PaymentScheme",
      key: "PaymentScheme",
    },
    { title: "Ext. level", dataIndex: "ext_level", key: "ext_level" },
    // { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (text) => (text === "Enrolled" ? "Trial" : text),
    },

    { title: "Course", dataIndex: "course", key: "course" },

    { title: "BL", dataIndex: "bl", key: "bl" },
    { title: "RL", dataIndex: "rl", key: "rl" },
    { title: "AL", dataIndex: "al", key: "al" },
    { title: "BS", dataIndex: "bs", key: "bs" },
    { title: "Week", dataIndex: "week", key: "week" },
  ];

  const columns2 = [
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
      title: "level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "BL",
      dataIndex: "bl",
      key: "bl",
    },
    {
      title: "RL",
      dataIndex: "rl",
      key: "rl",
    },
    {
      title: "AL",
      dataIndex: "al",
      key: "al",
    },
    {
      title: "BS",
      dataIndex: "bs",
      key: "bs",
    },
    {
      title: "Week",
      dataIndex: "week",
      key: "week",
    },
  ];

  const columns3 = [
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
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "BL",
      dataIndex: "bl",
      key: "bl",
    },
    {
      title: "RL",
      dataIndex: "rl",
      key: "rl",
    },
    {
      title: "AL",
      dataIndex: "al",
      key: "al",
    },
    {
      title: "BS",
      dataIndex: "bs",
      key: "bs",
    },
    {
      title: "Week",
      dataIndex: "week",
      key: "week",
    },
  ];

  console.log("classData", classData);

  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");
  const visibleColumns1 = columns2.filter(
    (column2) => column2.dataIndex !== "_id"
  );
  const visibleColumns2 = columns3.filter(
    (column) => column.dataIndex !== "_id"
  );

  const positions = Object.keys(dummyScheduleData)
    .map((position) => parseInt(position.split(" ")[1]))
    .sort((a, b) => a - b);

  const handleFilterChange = (value) => {
    setSelectedRoom(value === "all classroom" ? null : value); // Update selected room or set to null for all classrooms
  };

  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  // const handleConfirmClassAssign = async () => {
  //   try {
  //     const body = {
  //       studentId: selectedDroppedData.studentId,
  //       classId: selectedDroppedData.classId,
  //       weekday: selectedDroppedData.weekday,
  //       room: selectedDroppedData.room,
  //       time: selectedDroppedData.time,
  //       classStartDate: selectedDroppedData.classStartDate,
  //       classEndDate: selectedDroppedData.classEndDate,
  //       selectedWeekText: selectedDroppedData.selectedWeekFullText,
  //       applyFullWeek: confirmAdd
  //     };

  //     const res = await axios.post(`${baseURL}/assign-student`, body);

  //     if (res?.data?.success) {
  //       message.success(res.data.message || "Student added successfully.");
  //     } else {
  //       message.error(res.data.message || "Something went wrong.");
  //     }

  //     setShowDropModal(false);
  //     setConfirmAdd(false);

  //   } catch (error) {
  //     message.error(error?.response?.data?.message || "Error assigning student.");
  //   }
  // };

  const handleConfirmClassAssign = async () => {
    try {
      const body = {
        studentId: selectedDroppedData.studentId,
        classId: selectedDroppedData.classId,
        weekday: selectedDroppedData.weekday,
        room: selectedDroppedData.room,
        time: selectedDroppedData.time,
        classStartDate: selectedDroppedData.classStartDate,
        classEndDate: selectedDroppedData.classEndDate,
        selectedWeekText: selectedDroppedData.selectedWeekFullText,
        applyFullWeek: confirmAdd,
      };

      const res = await axios.post(`${baseURL}/assign-student`, body);

      if (res?.data?.success) {
        // ✅ 1. SHOW SUCCESS MESSAGE FIRST
        message.success(res.data.message || "Student added successfully.");

        fetchRooms();
        fetchSchedule(filterValue1);

        // ✅ 3. CLOSE MODAL AFTER SHORT DELAY
        setTimeout(() => {
          setShowDropModal(false);
          setConfirmAdd(false);
        }, 200);
      } else {
        message.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Assign student error:", error);
      message.error(
        error?.response?.data?.message || "Error assigning student."
      );
    }
  };

  const draggableRowProps = (record) => ({
    draggable: true,
    onDragStart: (e) => {
      e.dataTransfer.setData("student", JSON.stringify(record));
    },
  });

const extractWeekNumber = (weekString) => {
  if (!weekString) return 1;

  // "Week 12, 24.11.2025 - 30.11.2025"
  const weekPart = weekString.split(",")[0]; // "Week 12"
  const number = weekPart.replace("Week", "").trim();

  return Number(number) || 1;
};


// const handleAddClassSubmit  = async (values) => {
//  const startWeekNumber = filterValue1
//     ? extractWeekNumber(filterValue1)
//     : 1;

//   const updatePayload = {
//     packageId: selectedRecordId,
//     weekNumber: startWeekNumber,
//     blocks: values.blocks,
//   };

//   const createPayload = {
//     class_name: values.class_name,
//     course_list: values.courses,
//     totalWeeks: values.weeks,
//     startWeek: startWeekNumber,
//     level: values.level,
//     blocks: values.blocks,
//     createdBy: "admin",
//   };

//   try {
//     if (selectedRecordId) {
//       await axios.post(`${baseURL}/class-package`, updatePayload);
//       message.success("Class week updated successfully");
//       // setEditModalVisible(false);
//     } else {
//       await axios.post(`${baseURL}/class-package`, createPayload);
//       message.success("Class created successfully");
//       setShowAddClassModal(false);
//     }

//      fetchRooms();
//       fetchSchedule(filterValue1);
//     // form.resetFields();
//   } catch (err) {
//     message.error(err.response?.data?.msg || "Error");
//   }
// };



const extractWeekMeta = (weekText) => {
  // "Week 2, 06.01.2026 - 12.01.2026"
  const [weekPart, rangePart] = weekText.split(",");

  const globalWeek = Number(
    weekPart.replace("Week", "").trim()
  );

  const [startStr, endStr] = rangePart.trim().split(" - ");

  const toYMD = (d) => {
    const [dd, mm, yyyy] = d.split(".");
    return `${yyyy}-${mm}-${dd}`;
  };

  return {
    globalWeek,
    weekStartDate: toYMD(startStr),
    weekEndDate: toYMD(endStr)
  };
};


const handleAddClassSubmit = async (values) => {

  if (!filterValue1) {
    message.error("Please select a course week");
    return;
  }

  const {
    globalWeek,
    weekStartDate,
    weekEndDate
  } = extractWeekMeta(filterValue1);

  try {

    // ==========================
    // ✅ EDIT EXISTING CLASS
    // ==========================
    if (editClassId) {

      const updatePayload = {
        packageId: editClassId,   // ✅ CORRECT ID
        weekNumber: globalWeek,
        weekStartDate,
        weekEndDate,
        blocks: values.blocks
      };

      await axios.post(`${baseURL}/class-package`, updatePayload);

      message.success("Class week updated successfully");

    } 
    // ==========================
    // ✅ CREATE NEW CLASS
    // ==========================
    else {

      const createPayload = {
        class_name: values.class_name,
        course_list: values.courses,
        totalWeeks: values.weeks,
        startWeek: globalWeek,
        weekStartDate,
        weekEndDate,
        level: values.level,
        blocks: values.blocks,
        createdBy: "admin"
      };

      await axios.post(`${baseURL}/class-package`, createPayload);

      message.success("Class created successfully");
    }

    // 🔄 REFRESH UI
    fetchRooms();
    fetchSchedule(filterValue1);

    setShowAddClassModal(false);
    setEditClassId(null);
    setEditInitialValues(null);

  } catch (err) {
    message.error(err.response?.data?.msg || "Error");
  }
};



  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Time Table & Classes</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Time Table & Classes</Breadcrumb.Item>
        <Breadcrumb.Item>Time Table</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Space>
        <label style={{ marginRight: "10px" }}>Course Week :</label>

        <Select
          style={{ width: 300 }}
          placeholder="Select"
          onChange={handleFilter1Change}
          value={filterValue1}
          allowClear
        >
          {/* Dynamic Week Options */}
          {weekOptions.map((week, index) => (
            <Option key={index} value={week}>
              {week}
            </Option>
          ))}
        </Select>
      </Space>

      <hr />
      <Spin spinning={loading}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* First Table */}
          <div style={{ flex: 1, marginRight: "16px", minWidth: "300px" }}>
            <h5>Booking list</h5>

            {/* Pagination + Page Size Controls */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Pagination
                current={bookingPage}
                total={bookingTotal}
                pageSize={bookingPageSize}
                onChange={(page) => setBookingPage(page)}
                showSizeChanger={false}
              />
              <Select
                value={bookingPageSize}
                style={{ width: 120 }}
                onChange={(value) => {
                  setBookingPageSize(value);
                  setBookingPage(1);
                }}
                options={[
                  { value: 10, label: "10 / page" },
                  { value: 20, label: "20 / page" },
                  { value: 30, label: "30 / page" },
                  { value: 50, label: "50 / page" },
                ]}
              />
            </div>

            <div
              style={{
                minHeight: "200px",
                maxHeight: "200px",
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              {/* <Table
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
            fixed: true,
          }}
          columns={visibleColumns}
          dataSource={tableData}
          bordered
          rowKey={(record) => record._id}
          scroll={{ x: "max-content" }}
          pagination={false} // Disable built-in pagination
        /> */}
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: onSelectChange,
                  fixed: true,
                }}
                columns={columns}
                dataSource={tableData}
                bordered
                rowKey="_id"
                scroll={{ x: "max-content" }}
                pagination={false}
                onRow={(record) => draggableRowProps(record)}
                rowClassName={(record) =>
                  record.status === "Enrolled" ? "trial-row" : ""
                }
              />
            </div>
          </div>

          {/* Second Table */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h5>Class Students</h5>

            {/* Pagination + Page Size Controls */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Pagination
                current={studentPage}
                total={studentTotal}
                pageSize={studentPageSize}
                onChange={(page) => setStudentPage(page)}
                showSizeChanger={false}
              />
              <Select
                value={studentPageSize}
                style={{ width: 120 }}
                onChange={(value) => {
                  setStudentPageSize(value);
                  setStudentPage(1);
                }}
                options={[
                  { value: 10, label: "10 / page" },
                  { value: 20, label: "20 / page" },
                  { value: 30, label: "30 / page" },
                  { value: 50, label: "50 / page" },
                ]}
              />
            </div>

            <div
              style={{
                minHeight: "200px",
                maxHeight: "200px",
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: onSelectChange,
                  fixed: true,
                }}
                columns={visibleColumns1}
                dataSource={classStudents}
                bordered
                rowKey={(record) => record._id}
                scroll={{ x: "max-content" }}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </Spin>

      <hr />
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        {/* <label style={{ marginRight: 8 }}>Filter:</label>
        <Select
          defaultValue="all classroom"
          style={{ width: 220, marginRight: 8 }}
          onChange={handleFilterChange}
        >
          <Option value="all classroom">All Classroom</Option>
          {classrooms.map((name) => (
            <Option key={name._id} value={name.label}>
              {name.label}
            </Option>
          ))}
        </Select> */}
        <div style={{ marginLeft: "auto" }}>
          
          <Button type="primary" onClick={handleAddNewClass}>
            + Add New Class
          </Button>

          {/* <AddClassModalreplica
            open={showAddClassModal}
            onClose={handleModalClose}
             onFinish={handleAddClassSubmit}
            onSuccess={() => {
              setShowAddClassModal(false);
            }}
          /> */}

          <AddClassModalreplica
  open={showAddClassModal}
  editingData={editInitialValues} 
  mode={editClassId ? "edit" : "add"}
  initialValues={editInitialValues}
  onClose={handleModalClose}
  onFinish={handleAddClassSubmit}
  onSuccess={() => {
    setShowAddClassModal(false);
    setEditClassId(null);
    setEditInitialValues(null);
  }}
/>

        </div>
      </div>
      <Tabs
        activeKey={activeDay}
        onChange={(key) => setActiveDay(key)}
        style={{ marginBottom: 10 }}
      >
        {weekDays.map((day) => (
          <TabPane tab={day} key={day} />
        ))}
      </Tabs>

      <Table
        loading={loading}
        columns={columns0}
        dataSource={data}
        bordered
        pagination={false}
        size="small"
        scroll={{ x: "max-content", y: "50vh" }}
        rowClassName={() => "compact-row"}
      />
      <style>
        {`
  /* keep table compact */
  .compact-row .ant-table-cell {
    padding: 1px 4px !important;
    vertical-align: top !important;
  }

  .trial-row td {
  color: blue !important;
  font-weight: 600;
}

  /* Make the actual TD with rowspan behave like a flex container.
     Ant's markup: <td rowspan="N"><div class="ant-table-cell">CONTENT</div></td>
  */
  td[rowspan] {
    padding: 0 !important;            /* let inner .ant-table-cell control padding */
    vertical-align: top !important;
  }

  /* The inner ant wrapper should fill the td and act as flex column */
  td[rowspan] > .ant-table-cell {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    padding: 6px !important;          /* restore nice padding inside merged cell */
    box-sizing: border-box !important;
  }

  /* Let the class card expand to fill the wrapper */
  .class-card {
    background: #e6f7ff;
    border-radius: 6px;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    line-height: 2.3;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;                   /* crucial — fill available vertical space */
    min-height: 0;                    /* allow flex child to shrink when needed */
    overflow: hidden;
    padding: 8px;
  }

  /* hide merged placeholder rows content */
  td > .ant-table-cell:empty {
    display: none;
  }

  /* small rule to ensure table rows grow with content */
  .ant-table-tbody > tr > td {
    height: auto !important;
  }

  /* Hover: expand card by making it absolute and larger */
  .class-card:hover {
    position: relative;
    z-index: 9999;
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    transform: translateY(-4px);
  }

  .class-card hr {
    margin: 6px 0;
    border: 0.5px solid #91d5ff;
  }

  /* Optional: keep merged placeholder cells visually removed */
  .merged-cell-placeholder {
    display: none;
  }

  .class-card:hover {
  position: absolute;
  z-index: 999;
  background: white;
  width: 230px;
  min-height: auto;
  height: auto !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

`}
      </style>

      <Modal
        title="Confirm Add to Class"
        visible={showDropModal}
        okText="Confirm"
        onOk={handleConfirmClassAssign}
        onCancel={() => {
          setShowDropModal(false);
          setConfirmAdd(false);
        }}
      >
        {selectedDroppedData && (
          <div style={{ lineHeight: "26px" }}>
            <p>
              <strong>Student:</strong> {selectedDroppedData.studentName}
            </p>
            {/* <p><strong>Level:</strong> {selectedDroppedData.level}</p> */}
            <p>
              <strong>Course:</strong> {selectedDroppedData.course}
            </p>
            <p>
              <strong>Payment Scheme:</strong>{" "}
              {selectedDroppedData.paymentScheme}
            </p>
            {/* <p><strong>Student Course:</strong> {format(selectedDroppedData.start)} - {format(selectedDroppedData.end)}</p> */}
            <p>
              <strong>Selected Week:</strong>{" "}
              {selectedDroppedData.selectedWeekFullText}
            </p>

            {selectedDroppedData.warning && (
              <p style={{ color: "red" }}>{selectedDroppedData.warning}</p>
            )}

            <Checkbox
              checked={confirmAdd}
              onChange={(e) => setConfirmAdd(e.target.checked)}
            >
              Should the student be assigned to this class for all following
              weeks?
            </Checkbox>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Scheduling;
