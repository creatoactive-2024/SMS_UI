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
  Button,
} from "antd";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css"; // Import default CSS

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


const AddClassesnew = () => {
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

  const [filterValue1, setFilterValue1] = useState(null);
const [weekOptions, setWeekOptions] = useState([]);


const [searchValue, setSearchValue] = useState("");

  const [form] = Form.useForm();


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


// ----------------------
// Helper function
// ----------------------
function parseDate(dateStr) {
  // "24.11.2025" → JS date
  const [dd, mm, yyyy] = dateStr.split(".");
  return new Date(`${yyyy}-${mm}-${dd}`);
}


  // Reset form fields and initialValuesLoaded flag on component mount
  useEffect(() => {
    form.resetFields();
    setInitialValuesLoaded(false);
  }, [form]);

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



const extractWeekNumber = (weekString) => {
  return parseInt(weekString.split(" ")[1].replace(",", "")); 
};


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


const onFinish = async (values) => {

  if (!filterValue1) {
    message.error("Please select a course week");
    return;
  }

  // ✅ Extract global week + dates
  const {
    globalWeek,
    weekStartDate,
    weekEndDate
  } = extractWeekMeta(filterValue1);

  // -------------------------
  // UPDATE EXISTING CLASS
  // -------------------------
  const updatePayload = {
    packageId: selectedRecordId,
    weekNumber : globalWeek,
    weekStartDate,
    weekEndDate,
    blocks: values.blocks
  };

  // -------------------------
  // CREATE NEW CLASS
  // -------------------------
  const createPayload = {
    class_name: values.class_name,
    course_list: values.courses,
    totalWeeks: values.weeks,
    startWeek: globalWeek,      // global start week
    weekStartDate,              // 🔥 NEW
    weekEndDate,                // 🔥 NEW
    level: values.level,
    blocks: values.blocks,
    createdBy: "admin"
  };

  try {
    if (selectedRecordId) {
      await axios.post(`${baseURL}/class-package`, updatePayload);
      message.success("Class week updated successfully");
      setEditModalVisible(false);
    } else {
      await axios.post(`${baseURL}/class-package`, createPayload);
      message.success("Class created successfully");
      setNewModalVisible(false);
    }

    fetchData();
    form.resetFields();

  } catch (err) {
    message.error(err.response?.data?.msg || "Error");
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

    // Convert schedule to from / to values
    const formattedBlocks = editingRecordData.blocks?.map((block) => {
      let from = undefined;
      let end = undefined;

      if (block.schedule && block.schedule !== "Individual") {
        const [start, finish] = block.schedule.split(" - ");
        from = start;
        end = finish;
      }

      return {
        ...block,
        schedule: block.schedule,
        from,
        end,
        isIndividual: block.schedule === "Individual",
      };
    });

    form.setFieldsValue({
      class_name: editingRecordData.class_name,
      courses: editingRecordData.course_list, // <-- matches Select
      weeks: editingRecordData.totalWeeks,
      startWeek: editingRecordData.startWeek,
      level: editingRecordData.level,
      blocks: formattedBlocks
    });
  }
}, [editingRecordData]);


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



const fetchData = async (searchText = "") => {
  if (!filterValue1) return;

  const weekText = filterValue1;

  const parts = weekText.split(",");
  const weekNum = Number(parts[0].replace("Week ", "").trim());
  const range = parts[1].trim();

  const [startStr, endStr] = range.split(" - ");

  try {
    setLoading(true);

    const res = await axios.get(
      `${baseURL}/weeklyclass?week=Week ${weekNum}, ${startStr} - ${endStr}&search=${searchText}`
    );

    setData(res.data || []);
    setSelectedRowKeys([]);
  } catch (err) {
    console.error("Week schedule error", err);
  } finally {
    setLoading(false);
  }
};


function parseDateToYMD(dateStr) {
  const [day, month, year] = dateStr.split(".");
  return `${year}-${month}-${day}`;
}

const handleFilter1Change1 = (value) => {
  setFilterValue1(value);
  fetchData();
};


  useEffect(() => {
  if (filterValue1) {
    fetchData();
  }
}, [filterValue1]);

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
      render: () => null, // Render an empty cell to hide the content
      fixed: "left", // Fix this column to the left to keep it visible
      width: 0, // Set the width to 0 to make it effectively hidden
    },
    {
      title: "Class name",
      dataIndex: "class_name",
      key: "class_name",
    },
    {
      title: "Days",
      dataIndex: "weekdays",
      key: "weekdays",
    },
    // {
    //   title: "Student",
    //   dataIndex: "student",
    //   key: "student",
    // },
    {
      title: "No. of weeks",
      dataIndex: "weeks",
      key: "weeks",
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Final Calender Week",
      dataIndex: "final_calender_week",
      key: "final_calender_week",
    },
    // {
    //   title: "Initial level",
    //   dataIndex: "level",
    //   key: "level",
    // },
    // {
    //   title: "Current Level",
    //   dataIndex: "current_level",
    //   key: "current_level",
    // },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Rooms",
      dataIndex: "classrooms",
      key: "classrooms",
    },
    {
      title: "Color",
      dataIndex: "colour",
      key: "colour",
    },
    {
      title: "Course Language",
      dataIndex: "course_language",
      key: "course_language",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data?.map((entry) => ({
  _id: entry._id,
  class_name: entry.class_name || "-",
  weekdays: entry.weekdays || "-",
  // student: "-", // Not provided by API yet
  weeks: entry.weeks || "-",
  students: "-", // not provided
  start_date: moment(entry.start_date).format("DD-MM-YYYY"),
  final_calender_week: `${moment(entry.last_week_start).format("DD-MM-YYYY")} - ${moment(entry.last_week_end).format("DD-MM-YYYY")}`,
  level: "-",
  current_level: "-",
  teacher: entry.teacher || "-",
  classrooms: entry.classrooms || "-",
  // colour: entry.colour || "-",
  // course_language: entry.course_language || "-",
})) || [];


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

const formatDate1 = (dateStr) => {
  const [day, month, year] = dateStr.split(".");
  return `${year}-${month}-${day}`; // converts 01.12.2025 → 2025-12-01
};
const handleEditButtonClick = async () => {
  try {
    if (!selectedRecordId) {
      Modal.warning({
        title: "Please Select a Record",
        content: "Please select a record to edit.",
      });
      return;
    }

    if (selectedRowKeys.length > 1) {
      Modal.warning({
        title: "Select Only One Record",
        content: "Please select only one record for editing.",
      });
      return;
    }

    // Extract weekNumber & range from filter value
    const parts = filterValue1.split(",");
    const weekNum = Number(parts[0].replace("Week ", "").trim());
    const range = parts[1].trim();
    const [startStr, endStr] = range.split(" - ");

    // Convert DD.MM.YYYY -> YYYY-MM-DD
    const formattedStart = formatDate1(startStr);
    const formattedEnd = formatDate1(endStr);

    const url = `${baseURL}/class/week/${selectedRecordId}?weekNumber=${weekNum}&start=${formattedStart}&end=${formattedEnd}`;
    console.log("Final Edit API:", url);

    const response = await axios.get(url);
    console.log("API Response for Edit:", response.data);

    const { classPackage, instances } = response.data;

   // Merge classPackage blocks with instance updates
const formattedBlocks = classPackage.blocks.map((b) => {
  // find instance for this weekday
  const instanceMatch = instances.find(inst => inst.weekday === b.weekdays[0]);

  return {
    weekdays: b.weekdays,
    schedule: instanceMatch
      ? `${instanceMatch.startTime} - ${instanceMatch.endTime}`
      : b.schedule,
    lessons: b.lessons,
    classrooms: instanceMatch ? instanceMatch.room : b.classrooms,
    teacher: instanceMatch ? instanceMatch.teacher?._id || "" : b.teacher?._id || "",
    isIndividual: false,
    from: instanceMatch ? instanceMatch.startTime : b.schedule?.split("-")[0]?.trim() || "",
    end: instanceMatch ? instanceMatch.endTime : b.schedule?.split("-")[1]?.trim() || "",
  };
});


    form.setFieldsValue({
      class_name: classPackage.class_name,
      courses: classPackage.course_list,
      weeks: classPackage.totalWeeks,
      level: classPackage.level,
      blocks: formattedBlocks,
    });

    handleEditModalOpen();

  } catch (error) {
    console.error("Error fetching data for edit:", error);
  }
};

// helper fn
const formatDate = (dateStr) => {
  const [day, month, year] = dateStr.split(".");
  return `${year}-${month}-${day}`;
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
      "classes",
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

  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Time Table & Classes</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Time Table & Classes</Breadcrumb.Item>
        <Breadcrumb.Item>Class List</Breadcrumb.Item>
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
<SearchInput onSearch={(v) => fetchData(v)} />
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
          {/* <Space>
            <label style={{ marginRight: "10px" }}>Course Week :</label>

            <Select
              style={{ width: 300 }}
              placeholder="Select"
              onChange={handleFilter1Change}
              value={filterValue1}
              allowClear
            >
              <Option value="Week 46, 10.11.2025 - 16.11.2025">
                Week 46, 10.11.2025 - 16.11.2025
              </Option>
              <Option value="Week 47, 17.11.2025 - 23.11.2025">
                Week 47, 17.11.2025 - 23.11.2025
              </Option>
            </Select>
          </Space> */}
      
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

      
        </div>

        <Modal
          title="Add New Class"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
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

export default AddClassesnew;
