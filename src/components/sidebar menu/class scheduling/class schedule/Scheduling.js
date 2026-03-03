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
} from "antd";
import baseURL from "../../commonComponents/baseURL";
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

import { Link } from "react-router-dom";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";
import AddClassModal from "./AddClassModal";

const { TabPane } = Tabs;
const { Option } = Select;
const { Text } = Typography;

//--------------------main component-----------------------------

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
  const [bookedCount, setBookedCount] = useState(0); // State to hold booked count
  const [selectedClassId, setSelectedClassId] = useState(null); // State to hold selected class ID
  const [bookedCounts, setBookedCounts] = useState({});

  const [waitingData, setWaitingData] = useState([]);
  const [waitingCount, setWaitingCount] = useState(0);
  const [selectedDummyClassId, setSelectedDummyClassId] = useState(null); // State to hold selected class ID
  const [visibleColumns11, setVisibleColumns11] = useState(true); // Initial state for column set 1
  const [expandedClasses, setExpandedClasses] = useState({});
  const [filterValue1, setFilterValue1] = useState(null);

 const [showAddClassModal, setShowAddClassModal] = useState(false);

  const handleAddNewClass = () => {
    setShowAddClassModal(true);
  };

  const handleModalClose = () => {
    setShowAddClassModal(false);
  };

  // const refreshClassData = () => {
  //   fetchClassData();
  //   // Call API or reload classes after saving
  //   console.log("Refresh schedule or classes list");
  // };

const refreshClassData = () => {
  loadAllSchedulingData();
  console.log("Scheduling data refreshed after adding class");
};


  // Function to handle click on a dummy class
  const handleDummyClassClick = async (classId) => {
    setLoading(true);
    try {
      // Make API call to fetch waiting bookings for the clicked classId
      const response = await axios.post(`${baseURL}/dummy-waiting`, {
        classid: classId,
      });

      // Assuming response structure is { bookings: [], count: 0 }
      const { bookings, count } = response.data;

      // Update the waitingData state with a key-value pair of classId to bookings and count
      setWaitingData((prevData) => ({
        ...Object.keys(prevData).reduce((acc, key) => {
          if (key === classId) {
            return acc;
          }
          return {
            ...acc,
            [key]: prevData[key],
          };
        }, {}),
        [classId]: {
          bookings: bookings,
          count: count,
        },
      }));

      // Update the selectedDummyClassId to reflect the clicked class
      setSelectedDummyClassId(classId);

      // Update the waiting list table data (watingData) to display bookings
      const transformedData = bookings.map((booking) => ({
        _id: booking._id, // Assuming booking._id is a unique identifier
        name: `${booking.candidate.firstname} ${booking.candidate.surname}`,
        level: booking.level,
        bl: "N/A", // Add your logic to fetch other fields if needed
        rl: "N/A",
        al: "N/A",
        bs: "N/A",
        week: booking.weeks,
      }));

      setWatingData(transformedData);
    } catch (error) {
      console.error("Error fetching waiting bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const responseData = await FieldListDropdown("classrooms", "title");
      if (responseData) {
        // Extract category names from response data
        const names = responseData.map((room) => ({
          value: room._id, // Use the appropriate property for the value
          label: room.title, // Use the appropriate property for the label
        }));
        // const names = responseData.map((category) => category.title_english);
        setClassrooms(names);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  // useEffect(() => {
  //   fetchRooms();
  // }, []);

 
    const fetchDataClass = async () => {
      try {
        const response = await axios.get(`${baseURL}/fetchClassData`);
        setScheduleData(response.data.schedules);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

  //    useEffect(() => {
  //     fetchDataClass();
  //     fetchDataClass();
  // }, []);

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust for Sunday as 0
    const startDate = new Date(today.setDate(diff));
    const endDate = new Date(today.setDate(startDate.getDate() + 6)); // Get Sunday of the current week

    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const day = date.toLocaleDateString("en-US", { weekday: "long" });
      const formattedDate = date.toISOString().split("T")[0];
      weekdays.push({ date: formattedDate, weekday: day }); // Include weekday in the array
    }

    setCurrentWeekDates(weekdays);
  }, []);

 
    const createDummyClass = async () => {
      try {
        const response = await axios.get(`${baseURL}/dummy-class-schedule`);
        setDummyScheduleData(response.data.schedules);
        console.log("dummy", dummyScheduleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
//      useEffect(() => {
//       createDummyClass();
// createDummyClass();
//   }, []);

  const fetchClassData = async (class_id, weekday, date) => {
    try {
      setLoading(true);

      // Convert the date to a Date object if it's not already
      const formattedDate = new Date(date);

      // Format the date to "yyyy-mm-ddT00:00:00.000Z"
      const isoFormattedDate = formattedDate.toISOString();

      const response = await axios.post(`${baseURL}/fetchBookingWaitingList`, {
        class_id,
        weekday,
        date: isoFormattedDate,
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch class details");
      }

      const fetchedData = response.data;
      console.log("Fetched data:", fetchedData); // For debugging

      const bookedCount = fetchedData.bookingsWithCandidates.filter(
        (entry) => entry.booking.status === "booked"
      ).length;

      setClassData(fetchedData);
      setBookedCounts((prev) => ({
        ...prev,
        [`${class_id}_${weekday}_${date}`]: bookedCount,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching class data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (classData && Array.isArray(classData.bookingsWithCandidates)) {
      console.log("Updated class data:", classData); // For debugging
      const newData = classData.bookingsWithCandidates
        .filter((entry) => entry.booking.status === "booked")
        .map((entry) => ({
          _id: entry.booking.candidate_id || null,
          name: entry.candidate
            ? `${entry.candidate.firstname} ${entry.candidate.surname}`
            : "N/A",
          ext_level: entry.booking.level || "N/A",
          week: entry.booking.weeks || "N/A",
          // Add other fields as needed
        }));
      console.log("Booked data:", newData); // For debugging
      setTableData(newData);
    }
  }, [classData]);

  useEffect(() => {
    if (classData && Array.isArray(classData.bookingsWithCandidates)) {
      console.log("Updated class data:", classData); // For debugging
      const newData = classData.bookingsWithCandidates
        .filter((entry) => entry.booking.status === "waiting")
        .map((entry) => ({
          _id: entry.booking.candidate_id || null,
          name: entry.candidate
            ? `${entry.candidate.firstname} ${entry.candidate.surname}`
            : "N/A",
          ext_level: entry.booking.level || "N/A",
          week: entry.booking.weeks || "N/A",
          // Add other fields as needed
        }));
      console.log("Waiting data:", newData); // For debugging
      setWatingData(newData);
    }
  }, [classData]);

  const onClassClick1 = (class_id) => {
    if (selectedClassId === class_id) {
      setSelectedClassId(null);
    } else {
      setSelectedClassId(class_id);
      fetchClassData(class_id);
    }
  };

  const onClassClick = (class_id, weekday, date) => {
    const key = `${class_id}_${weekday}_${date}`;
    setExpandedClasses((prev) => {
      const newExpandedClasses = { ...prev };
      if (newExpandedClasses[key]) {
        delete newExpandedClasses[key];
      } else {
        newExpandedClasses[key] = { weekday, date };
        fetchClassData(class_id, weekday, date);
      }
      return newExpandedClasses;
    });
  };

  const displayBookedCount = (bookedCount) => {
    // Example: Log booked count or use it for display
    console.log("Booked count:", bookedCount);
    // Or set it to state if needed
    // setBookedCount(bookedCount);
  };

  const tabClickHandler = (key) => {
    console.log("Clicked tab with date:", key);

    // Assuming each tab corresponds to a unique class ID
    const class_id = key; // Modify as per your logic to get the correct class ID

    // Fetch class details using the class ID
    fetchClassData(class_id);
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
      title: "Ext. level",
      dataIndex: "ext_level",
      key: "ext_level",
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

  const renderTableColumns = (rooms, maxCapacities) => {
    const columns = [
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        fixed: "left",
        width: 100,
      },
    ];

    rooms.forEach((room) => {
      const maxCapacity = maxCapacities[room] || 0;
      // const titleWithCapacity = `${room} (Max: ${maxCapacity})`;
      const titleWithCapacity = `${room} `;

      columns.push({
        title: titleWithCapacity,
        dataIndex: room,
        key: room,
        minWidth: 250,
        render: (classes, record, index) => {
          const rowSpan = record[`${room}_rowspan`] || 1;
          const tdStyle = {
            backgroundColor: classes ? "skyblue" : "white",
          };
          return {
            children: classes ? (
              <Text style={{ textAlign: "center" }}>
                {classes.map((cls, idx) => {
                  const uniqueKey = `${cls.class_id}_${record.weekday}_${record.date}`;
                  return (
                    <div
                      key={uniqueKey}
                      onClick={() =>
                        onClassClick(cls.class_id, record.weekday, record.date)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <br />
                      <b>Level:</b> {cls.class_level}
                      <br />
                      <hr
                        style={{
                          borderTop: "1px dashed black",
                          width: "110px",
                          margin: "0 auto",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <b>Class:</b> {cls.subject}
                      <br />
                      <b>Courses:</b> {cls.courses.join(", ")}
                      <br />
                      <hr
                        style={{
                          borderTop: "1px dashed black",
                          width: "110px",
                          margin: "0 auto",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <b>Teacher:</b> {cls.teacher}
                      <br />
                      <hr
                        style={{
                          borderTop: "1px dashed black",
                          width: "110px",
                          margin: "0 auto",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <b>Students:</b> {cls.students} / {cls.max_students}
                      {/* {expandedClasses[uniqueKey] ? (
                                                <span id={`book${cls.class_id}`}>{bookedCounts[uniqueKey]}</span>
                                            ) : (
                                                <Button type="primary" onClick={(e) => { e.stopPropagation(); onClassClick(cls.class_id, record.weekday, record.date); }}>View</Button>
                                            )} */}
                      <br />
                    </div>
                  );
                })}
              </Text>
            ) : (
              " "
            ),
            props: {
              rowSpan: rowSpan,
              style: tdStyle,
            },
          };
        },
      });
    });

    return columns;
  };

  const renderTableData = (date, rooms) => {
    const data = [];
    const schedule = scheduleData[date] || {};

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const rowData = {
          time,
          date,
          weekday: new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
          }),
        };

        rooms.forEach((room) => {
          const roomData = schedule[room] || {};
          const classSlots = Object.keys(roomData.schedule || {});
          let classDetails = null;

          classSlots.forEach((slot) => {
            const [startTime, endTime] = slot.split("-");
            if (time >= startTime && time < endTime) {
              classDetails = roomData.schedule[slot] || [];
            }
          });

          rowData[room] = classDetails;
        });

        data.push(rowData);
      }
    }

    rooms.forEach((room) => {
      let prevRow = null;
      let rowspan = 0;
      for (let i = 0; i < data.length; i++) {
        const currentRow = data[i][room];
        if (JSON.stringify(currentRow) === JSON.stringify(prevRow)) {
          rowspan++;
          data[i][room] = null;
        } else {
          if (prevRow !== null) {
            data[i - rowspan][`${room}_rowspan`] = rowspan;
          }
          prevRow = currentRow;
          rowspan = 1;
        }
      }

      if (prevRow !== null) {
        data[data.length - rowspan][`${room}_rowspan`] = rowspan + 1;
      }
    });

    return data;
  };

  const positions = Object.keys(dummyScheduleData)
    .map((position) => parseInt(position.split(" ")[1]))
    .sort((a, b) => a - b);

  const renderTableData2 = (positions, dummyScheduleData) => {
    const data = [];
    const timeSlots = [];

    // Generate time slots from 00:00 to 24:00 with a 15-minute interval
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        timeSlots.push(time);
      }
    }

    // Populate data for each time slot and position
    timeSlots.forEach((time) => {
      const rowData = { time };

      positions.forEach((position) => {
        const positionData = dummyScheduleData[`position ${position}`];
        if (!positionData) return;

        const classSlots = Object.keys(positionData.schedule);
        let classDetails = null;

        // Find the class details for the current time slot
        classSlots.forEach((slot) => {
          const [startTime, endTime] = slot.split("-");
          if (time >= startTime && time <= endTime) {
            // Adjusted condition to include the end time
            classDetails = positionData.schedule[slot] || [];
          }
        });

        // Assign the class details to the rowData for this position
        rowData[`position ${position}`] = classDetails;
      });

      data.push(rowData);
    });

    // Merge rowspan for each position column based on class duration
    positions.forEach((position) => {
      let prevRow = null;
      let rowspan = 0;
      for (let i = 0; i < data.length; i++) {
        const currentRow = data[i][`position ${position}`];
        if (JSON.stringify(currentRow) === JSON.stringify(prevRow)) {
          rowspan++;
          data[i][`position ${position}`] = null;
        } else {
          if (prevRow !== null) {
            // Calculate rowspan based on class duration
            data[i - rowspan][`position ${position}_rowspan`] = rowspan - 1;
          }
          prevRow = currentRow;
          rowspan = 1; // Reset rowspan for the new row
        }
      }

      if (prevRow !== null) {
        // Calculate rowspan based on class duration for the last row
        data[data.length - rowspan][`position ${position}_rowspan`] =
          rowspan + 1;
      }
    });

    return data;
  };

  const data1 = renderTableData2(positions, dummyScheduleData);

  const columns1 = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      fixed: "left",
      width: 100,
      render: (text) => <strong>{text}</strong>,
    },
    ...positions.map((position) => ({
      title: `Classes without room `,
      dataIndex: `position ${position}`,
      key: `position ${position}`,
      render: (classes, record, index) => {
        const rowSpan = record[`position ${position}_rowspan`] || 1;
        const tdStyle = {
          backgroundColor: classes ? "skyblue" : "white",
        };

        return {
          children: (
            <div style={{ textAlign: "center" }}>
              {classes &&
                classes.map((cls, idx) => (
                  <div key={idx}>
                    <div
                      onClick={() =>
                        handleDummyClassClick(cls.original_class_id)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <br />
                      <b>Level:</b> {cls.class_level}
                      <br />
                      <hr
                        style={{
                          borderTop: "1px dashed black",
                          width: "110px",
                          margin: "0 auto",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <b>Class:</b> {cls.subject}
                      <br />
                      <b>Courses:</b> {cls.courses.join(", ")}
                      <br />
                      <hr
                        style={{
                          borderTop: "1px dashed black",
                          width: "110px",
                          margin: "0 auto",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <b>Teacher:</b> {cls.teacher}
                      <br />
                      <hr
                        style={{
                          borderTop: "1px dashed black",
                          width: "110px",
                          margin: "0 auto",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <b>Weeks:</b> {cls.weeks}
                      <br />
                      <b>Students:</b>{" "}
                      <span id={`book${cls.original_class_id}`}>
                        {waitingData[cls.original_class_id] &&
                        waitingData[cls.original_class_id].count !== undefined
                          ? selectedDummyClassId === cls.original_class_id
                            ? waitingData[cls.original_class_id].count
                            : 0
                          : "0"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ),
          props: {
            rowSpan: rowSpan,
            style: tdStyle,
          },
        };
      },
    })),
  ];

  const [maxCapacities1, setMaxCapacities1] = useState({});

  useEffect(() => {
    const capacities = {};
    Object.keys(dummyScheduleData).forEach((position) => {
      const positionData = dummyScheduleData[position];
      const maxCapacity = positionData.max_capacity;
      capacities[position] = maxCapacity;
    });
    setMaxCapacities1(capacities);
  }, [dummyScheduleData]);

  const [maxCapacities, setMaxCapacities] = useState({});

  useEffect(() => {
    const capacities = {};
    Object.keys(scheduleData).forEach((date) => {
      const rooms = scheduleData[date];
      Object.keys(rooms).forEach((roomName) => {
        const roomData = rooms[roomName];
        const maxCapacity = roomData.max_capacity;
        capacities[roomName] = maxCapacity;
      });
    });
    setMaxCapacities(capacities);
  }, [scheduleData]);

  const handleFilterChange = (value) => {
    setSelectedRoom(value === "all classroom" ? null : value); // Update selected room or set to null for all classrooms
  };

  // Function to toggle between visible columns and their respective data
  const toggleColumns = () => {
    setVisibleColumns11((prevState) => !prevState); // Toggle between column set 1 and column set 2
    if (visibleColumns1) {
      // If currently showing column set 1, switch to column set 2
      setTableData([...watingData]); // Store the current watingData before switching to columns2
      setWatingData([]); // Clear watingData to show columns2
    } else {
      // If currently showing column set 2, switch back to column set 1
      setWatingData([...tableData]); // Restore the original watingData
    }
  };

 const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

const loadAllSchedulingData = async () => {
  // setLoading(true);

  await fetchRooms();          // Load classroom list
  await fetchDataClass();      // Load scheduleData
  await createDummyClass();    // Load dummy schedule data

  // If you have other functions, add here
  // await fetchSomethingElse();

  setLoading(false);
};

useEffect(() => {
  loadAllSchedulingData();
}, []);



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
    <Option value="Week 46, 10.11.2025 - 16.11.2025">Week 46, 10.11.2025 - 16.11.2025</Option>
    <Option value="Week 47, 17.11.2025 - 23.11.2025">Week 47, 17.11.2025 - 23.11.2025</Option>
  </Select>
</Space>

    <hr/>
      <Spin spinning={loading}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* First Table */}
          <div style={{ flex: 1, marginRight: "16px", minWidth: "300px" }}>
            <h5>Booking list</h5>
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
                columns={visibleColumns}
                dataSource={tableData}
                bordered
                rowKey={(record) => record._id} // Use a unique key for each row
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>

          {/* Second Table */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h5>Class Students</h5>
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
                dataSource={watingData}
                bordered
                rowKey={(record) => record._id} // Use a unique key for each row
                scroll={{ x: "max-content" }}
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
        <label style={{ marginRight: 8 }}>Filter:</label>
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
        </Select>
        <div style={{ marginLeft: "auto" }}>
          {/* <Button type="default" icon={<AiOutlineSortAscending />}>
            Sort
          </Button>
          <Button type="default" icon={<AiOutlineFileExcel />}>
            Export
          </Button> */}
           <Button type="primary" onClick={handleAddNewClass}>
        + Add New Class
      </Button>

     <AddClassModal
  open={showAddClassModal}
  onClose={handleModalClose}
  onSuccess={() => {
    refreshClassData();
    setShowAddClassModal(false);
  }}
/>

        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", overflowX: "auto" }}>
          <Tabs
            onChange={tabClickHandler}
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            {currentWeekDates.map(({ date, weekday }) => (
              <TabPane
                tab={
                  <div>
                    {weekday}
                    <br />
                    <small>{date}</small>
                  </div>
                }
                key={date}
              >
                <div
                  style={{
                    overflowX: "auto",
                    height: "calc(100vh - 48px - 48px)",
                  }}
                >
                  <Table
                    columns={renderTableColumns(
                      selectedRoom
                        ? [selectedRoom]
                        : Object.keys(scheduleData[date] || {}),
                      maxCapacities
                    )}
                    dataSource={renderTableData(
                      date,
                      selectedRoom
                        ? [selectedRoom]
                        : Object.keys(scheduleData[date] || {})
                    )}
                    bordered
                    pagination={false}
                    size="small"
                    scroll={{ x: "max-content", y: "calc(50vh - 48px)" }}
                    sticky={true}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>

        <div style={{ width: "50%", overflowX: "auto", marginTop: "84px" }}>
          <Table
          loading={loading}
            columns={columns1}
            dataSource={data1}
            bordered
            pagination={false}
            size="small"
            scroll={{
              x: "max-content",
              y: "calc(50vh - 48px)",
              overflowX: "auto",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Scheduling;
