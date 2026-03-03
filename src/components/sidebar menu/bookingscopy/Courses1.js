import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Select,
 
  Checkbox,
  
  InputNumber,
  Row,
  Col,
  notification,
} from "antd";
import baseURL from "../../../config";
import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../commonComponents/FieldListDropdown";
import moment from 'moment';
import axios from "axios";

const { Option } = Select;

const Courses = ({
  fetchData,
  onFinish,
  setEditModalVisible,
  recordData,
  handleNewModalCancel,
  setNewModalVisible,
  selectedRecordId,
  candidateId,
  CancelBothModel,
  status
}) => {
  
  const [form] = Form.useForm();

  const [courseCategory, setCourseCategory] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseLevel, setCourseLevel] = useState([]);

  const [noOfWeeks, setNoOfWeeks] = useState(0);
  const [courseFromDate, setCourseFromDate] = useState('');
  const [courseToDate, setCourseToDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [weekdays, setWeekdays] = useState([]);


// console.log("fetchdata", fetchData);
const formRefs = useRef({});
const [values, setValues] = useState([]);


// useEffect(() => {
//   // Reset preferred_course_start_weekday field when course changes
//   form.setFieldsValue({
//     preferred_course_start_weekday: undefined,
//   });

//   // Fetch weekdays based on course
//   if (course) {
//     fetchWeekdays(course);
//   } else {
//     // Clear weekdays if course is not selected
//     setWeekdays([]);
//   }
// }, [course, form]);

// const handleCourseChange = async (value) => {
//   setCourse(value);
// };

// const fetchWeekdays = async (courseName) => {
//   try {
//     const response = await axios.post('http://localhost:5005/get-weekdays', {
//       courseName,
//     });

//     if (response.data.error) {
//       // Handle case where no matching classes found
//       setWeekdays([]);
//     } else {
//       // Set weekdays from response data
//       setWeekdays(response.data);
//     }
//   } catch (error) {
//     console.error('Error fetching weekdays:', error);
//     // Handle error case
//     setWeekdays([]);
//   }
// };

// const handlePreferredWeekdayChange = (value) => {
//   form.setFieldsValue({
//     preferred_course_start_weekday: value,
//   });
// };

// console.log("statuss",recordData.status);

  const fetchCourseCategory = async () => {
    try {
      const responseData = await FieldListDropdown("coursecategories", "name_english");
      if (responseData) {
        // Extract category names from response data
        const names = responseData.map((category) => ({
          value: category._id, // Use the appropriate property for the value
          label: category.name_english // Use the appropriate property for the label
        }));
        // const names = responseData.map((category) => category.name_english);
        setCourseCategory(names);
      }
    } catch (error) {
      console.error("Error fetching coursecategories:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const responseData = await FieldListDropdown("courses", "title_english");
      if (responseData) {
        // Extract category names from response data
        const names = responseData.map((category) => ({
          value: category._id, // Use the appropriate property for the value
          label: category.title_english // Use the appropriate property for the label
        }));
        // const names = responseData.map((category) => category.title_english);
        setCourses(names);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const fetchCourseLevel = async () => {
    try {
      const responseData = await FieldListDropdown("courselevels", "name_english");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const levels = responseData.map((level) => ({
          value: level._id, // Use the appropriate property for the value
          label: level.name_english // Use the appropriate property for the label
        }));
        setCourseLevel(levels);
      }
    } catch (error) {
      console.error("Error fetching course levels:", error);
    }
  };


// useEffect(() => {
//   form.setFieldsValue({
//     trial: recordData?.trial_lesson || false,
//   });
// }, [recordData?.status, recordData?.trial_lesson, form]);


  useEffect(() => {
    fetchCourseCategory();
    fetchCourses();
    fetchCourseLevel();
  }, []); 

//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
//     document.getElementById('date-picker-course1').setAttribute('min', today);
//     document.getElementById('date-picker-course2').setAttribute('min', today);
// }, []);


// useEffect(() => {
//   if (courseFromDate && noOfWeeks > 0) {
//       const fromDate = new Date(courseFromDate);
//       const toDate = new Date(fromDate);
//       toDate.setDate(fromDate.getDate() + noOfWeeks * 7); // Add weeks to from date
//       setCourseToDate(toDate.toISOString().split('T')[0]);
//   } else {
//       setCourseToDate('');
//   }
// }, [courseFromDate, noOfWeeks]);

// const handleWeeksChange = (e) => {
//   setNoOfWeeks(parseInt(e.target.value, 10));
// };

// const handleFromDateChange = (e) => {
//   setCourseFromDate(e.target.value);
// };


// console.log("in this data", recordData);


//   useEffect(() => {
//     if (recordData && recordData.courses && recordData.courses.length > 0) {
//       const course = recordData.courses[0] || {};
//       // const formattedDate = course.course_from_date ? moment(course.course_from_date) : null;
//       // const formattedDate1 = course.course_to_date ? moment(course.course_to_date) : null;
//       const formattedFrom= recordData.courses[0].course_from_date
//       ? moment(recordData.courses[0].course_from_date).format("YYYY-MM-DD")
//       : null;

//       const formattedTo= recordData.courses[0].course_to_date
//       ? moment(recordData.courses[0].course_to_date).format("YYYY-MM-DD")
//       : null;

  
//       form.setFieldsValue({
//         category: course.category || '',
//         course: course.course || '',
//         level: course.level || '',
//         availability: course.availability || '',
//         no_of_weeks: course.no_of_weeks || '',
//         // course_from_date: formattedDate,
//         // course_to_date: formattedDate1,
//         course_from_date: formattedFrom || null, 
//         course_to_date: formattedTo || null,
//         flexible_assignment: course.flexible_assignment || false,
//         flexible_assignment_note: course.flexible_assignment_note || '',
//         additional_services: course.additional_services || '',

//         preferred_course_start_weekday: course.preferred_course_start_weekday || '',
//         promotion_code: course.promotion_code || '',
//         name_of_classmate: course.name_of_classmate || '',
//         course_advisor: course.course_advisor || '',
//         trial_lesson: course.trial_lesson || '',
       

//         // preferred_course_start_weekday  promotion_code name_of_classmate course_advisor trial_lesson

//       });

//       document.getElementById("date-picker-course1").value = formattedFrom;
//       document.getElementById("date-picker-course2").value = formattedTo;
//       console.log("in courses", recordData);
//     }
//   }, [recordData, form]);
  
// useEffect(() => {
//   const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
//   document.getElementById('date-picker-course1').setAttribute('min', today);
//   document.getElementById('date-picker-course2').setAttribute('min', today);

//   if (recordData && recordData.courses && recordData.courses.length > 0) {
//       const course = recordData.courses[0] || {};

//       // Format dates using moment.js if they exist in recordData
//       const formattedFrom = course.course_from_date ? moment(course.course_from_date).format("YYYY-MM-DD") : null;
//       const formattedTo = course.course_to_date ? moment(course.course_to_date).format("YYYY-MM-DD") : null;

//       // Initialize state with fetched dates
//       setCourseFromDate(formattedFrom);
//       setCourseToDate(formattedTo);

//       // Set form fields value
//       form.setFieldsValue({
//           category: course.category || '',
//           course: course.course || '',
//           level: course.level || '',
//           availability: course.availability || '',
//           no_of_weeks: course.no_of_weeks || '',
//           course_from_date: formattedFrom,
//           course_to_date: formattedTo,
//           flexible_assignment: course.flexible_assignment || false,
//           flexible_assignment_note: course.flexible_assignment_note || '',
//           additional_services: course.additional_services || '',
//           preferred_course_start_weekday: course.preferred_course_start_weekday || '',
//           promotion_code: course.promotion_code || '',
//           name_of_classmate: course.name_of_classmate || '',
//           course_advisor: course.course_advisor || '',
//           trial_lesson: course.trial_lesson || '',
//       });
//   }
// }, [recordData, form]);

// const handleWeeksChange = (e) => {
//   const weeks = parseInt(e.target.value, 10);
//   setNoOfWeeks(weeks);
//   updateToDate(courseFromDate, weeks);
// };

// const handleFromDateChange = (e) => {
//   const fromDate = e.target.value;
//   setCourseFromDate(fromDate);
//   updateToDate(fromDate, noOfWeeks);
// };

// const updateToDate = (fromDate, weeks) => {
//   if (fromDate && weeks > 0) {
//       const fromDateObj = new Date(fromDate);
//       const toDateObj = new Date(fromDateObj);
//       toDateObj.setDate(fromDateObj.getDate() + weeks * 7);
//       const toDate = toDateObj.toISOString().split('T')[0];
//       setCourseToDate(toDate);
//       form.setFieldsValue({ course_to_date: toDate }); // Update form field
//   } else {
//       setCourseToDate('');
//       form.setFieldsValue({ course_to_date: '' }); // Clear form field if no valid dates
//   }
// };

// Fetch weekdays when course is set
const fetchWeekdays = async (courseName) => {
  try {
    const response = await axios.post(`${baseURL}/get-weekdays`, {
      courseName,
    });

    if (response.data.error) {
      // Handle case where no matching classes found
      setWeekdays([]);
    } else {
      // Set weekdays from response data
      setWeekdays(response.data);
    }
  } catch (error) {
    console.error('Error fetching weekdays:', error);
    // Handle error case
    setWeekdays([]);
  }
};

// Initialize form fields and fetch weekdays based on the initial course
// useEffect(() => {
//   const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
//   const datePicker1 = document.getElementById('date-picker-course1');
//   const datePicker2 = document.getElementById('date-picker-course2');
//   if (datePicker1) datePicker1.setAttribute('min', today);
//   if (datePicker2) datePicker2.setAttribute('min', today);

//   if (recordData && recordData.courses && recordData.courses.length > 0) {
//     const courseData = recordData.courses[0] || {};

//     const formattedFrom = courseData.course_from_date ? moment(courseData.course_from_date).format("YYYY-MM-DD") : today;
//     const formattedTo = courseData.course_to_date ? moment(courseData.course_to_date).format("YYYY-MM-DD") : '';

//     // Initialize state with fetched dates and weeks
//     setCourseFromDate(formattedFrom);
//     setCourseToDate(formattedTo);
//     setNoOfWeeks(courseData.no_of_weeks || 0);
//     setIsEditing(true);

//     // Set form fields value
//     form.setFieldsValue({
//       category: courseData.category || '',
//       course: courseData.course || '',
//       level: courseData.level || '',
//       availability: courseData.availability || '',
//       no_of_weeks: courseData.no_of_weeks || '',
//       course_from_date: formattedFrom,
//       course_to_date: formattedTo,
//       flexible_assignment: courseData.flexible_assignment || false,
//       flexible_assignment_note: courseData.flexible_assignment_note || '',
//       additional_services: courseData.additional_services || '',
//       preferred_course_start_weekday: courseData.preferred_course_start_weekday || '',
//       promotion_code: courseData.promotion_code || '',
//       name_of_classmate: courseData.name_of_classmate || '',
//       course_advisor: courseData.course_advisor || '',
//       trial_lesson: courseData.trial_lesson || '',
//     });

//     // Trigger fetching of weekdays based on the fetched course value
//     if (courseData.course) {
//       fetchWeekdays(courseData.course);
//     }
//   }
// }, [recordData, form]);

useEffect(() => {
  if (!recordData) return;

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const datePicker1 = document.getElementById("date-picker-course1");
  const datePicker2 = document.getElementById("date-picker-course2");

  // ✅ allow past dates when editing
  if (datePicker1) datePicker1.setAttribute("min", isEditing ? "" : today);
  if (datePicker2) datePicker2.setAttribute("min", isEditing ? "" : today);

  // ✅ Dates
  const formattedFrom = recordData.course_from_date
    ? moment(recordData.course_from_date).format("YYYY-MM-DD")
    : today;

  const formattedTo = recordData.course_to_date
    ? moment(recordData.course_to_date).format("YYYY-MM-DD")
    : "";

  // ✅ Update state
  setCourseFromDate(formattedFrom);
  setCourseToDate(formattedTo);
  setNoOfWeeks(recordData.no_of_weeks || 0);
  setIsEditing(true);

  // ✅ Populate form fields directly from recordData
  form.setFieldsValue({
    category: recordData.category || "",
    course: recordData.course || "",
    level: recordData.level || "",
    availability: recordData.availability || "",
    no_of_weeks: recordData.no_of_weeks || "",
    course_from_date: formattedFrom,
    course_to_date: formattedTo,
    flexible_assignment: recordData.flexible_assignment || false,
    flexible_assignment_note: recordData.flexible_assignment_note || "",
    additional_services: recordData.additional_services || "",
    preferred_course_start_weekday:
      recordData.preferred_course_start_weekday || "",
    promotion_code: recordData.promotion_code || "",
    name_of_classmate: recordData.name_of_classmate || "",
    course_advisor: recordData.course_advisor || "",
    trial: recordData.trial || "",
    days_per_week: recordData.days_per_week || "",
    hours_per_week: recordData.hours_per_week || "",
  });

  // ✅ fetch weekdays if course exists
  if (recordData.course) {
    fetchWeekdays(recordData.course);
  }
}, [recordData, form, isEditing]);

const handleCourseChange = async (value) => {
  setCourse(value);

  // Reset preferred_course_start_weekday field when course changes
  form.setFieldsValue({
    preferred_course_start_weekday: undefined,
  });

  // Fetch weekdays based on course
  fetchWeekdays(value);
};

const handlePreferredWeekdayChange = (value) => {
  form.setFieldsValue({
    preferred_course_start_weekday: value,
  });
};

const handleWeeksChange = (e) => {
  const weeks = parseInt(e.target.value, 10);
  setNoOfWeeks(weeks);
  if (courseFromDate) {
    updateToDate(courseFromDate, weeks);
  }
};

const handleFromDateChange = (e) => {
  const fromDate = e.target.value;
  setCourseFromDate(fromDate);
  if (noOfWeeks > 0) {
    updateToDate(fromDate, noOfWeeks);
  }
};

const handleToDateChange = (e) => {
  const toDate = e.target.value;
  setCourseToDate(toDate);
  form.setFieldsValue({ course_to_date: toDate });
};

const updateToDate = (fromDate, weeks) => {
  if (fromDate && weeks > 0) {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(fromDateObj);
    toDateObj.setDate(fromDateObj.getDate() + weeks * 7 - 1);
    const toDate = toDateObj.toISOString().split('T')[0];
    setCourseToDate(toDate);
    form.setFieldsValue({ course_to_date: toDate }); // Update form field
  } else {
    setCourseToDate('');
    form.setFieldsValue({ course_to_date: '' }); // Clear form field if no valid dates
  }
};
  const resetAllFields = () => {
      form.resetFields();
   
  };
  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
    // console.log("its running");
  };
 
const handleFinish = async (formValues) => {

 try {

  const selectedCategory =
   courseCategory.find(
    item => item.value === formValues.category
   )?.label;

  const selectedCourse =
   courses.find(
    item => item.value === formValues.course
   )?.label;

  const selectedLevel =
   courseLevel.find(
    item => item.value === formValues.level
   )?.label;


  const allValues = {

   category: selectedCategory,

   course: selectedCourse,  // ✅ NAME

   level: selectedLevel,

   days_per_week:
    Number(formValues.days_per_week),

   hours_per_week:
    Number(formValues.hours_per_week),

   no_of_weeks:
    Number(formValues.no_of_weeks),

   flexible_assignment:
    !!formValues.flexible_assignment,

   course_from_date:
    new Date(formValues.course_from_date),

   course_to_date:
    new Date(formValues.course_to_date),

  };


  console.log(allValues);

  onFinish(allValues);

 }
 catch(err){}

};

  

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };
const formatDMY = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};


  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Category" name="category"
      rules={[{ required: true, message: "Please select category!" }]}
      >
        <Select placeholder="Select a category">
        {courseCategory.map((group) => (
            <Option key={group._id} value={group.label}>
              {group.label}
            </Option>
          ))}       
           </Select>
      </Form.Item>
     <Form.Item
  label="Course (Products)"
  name="course"
  rules={[{ required: true, message: "Please select course!" }]}
>
  <Select placeholder="Select a course" onChange={handleCourseChange}>
    {courses.map((name) => (
      <Option key={name.value} value={name.value}>
  {name.label}
</Option>

    ))}
  </Select>
</Form.Item>

{/* Show subfields only if a course is selected */}
{form.getFieldValue("course") && (
  <Form.Item label="Days per week" required>
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
          name="days_per_week"
          noStyle
          rules={[{ required: true, message: "Please select days per week!" }]}
        >
          <Select placeholder="Days per week">
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={12}>
  <Form.Item
    label="Hours per week"
    name="hours_per_week"
    rules={[
      { required: true, message: "Please enter hours per week!" },
      {
        type: "number",
        min: 1,
        max: 50,
        message: "Value must be between 1 and 50!",
      },
    ]}
  >
    <InputNumber
      min={1}
      max={50}
      placeholder="Hours per week"
      style={{ width: "100%" }}
      // ✅ Block non-digits, limit 2 digits, and restrict >50
      onKeyPress={(e) => {
        if (!/[0-9]/.test(e.key)) {
          e.preventDefault();
          return;
        }

        const value = e.currentTarget.value + e.key;

        // 🚫 Limit length to 2 digits
        if (value.length > 2) {
          e.preventDefault();
          return;
        }

        // 🚫 Prevent numbers > 50
        if (parseInt(value, 10) > 50) {
          e.preventDefault();
        }
      }}
    />
  </Form.Item>
</Col>


    </Row>
  </Form.Item>
)}



      <Form.Item label="Level" name="level"
      rules={[{ required: true, message: "Please select level!" }]}
      >
  <Select placeholder="Select a course level"
  //  onChange={handleLevelChange}
   >
    {courseLevel.map((item) => (
      <Select.Option key={item._id} value={item.label}>
        {item.label}
      </Select.Option>
    ))}
  </Select>
</Form.Item>


    <Form.Item
  label="Number of weeks"
  name="no_of_weeks"
  rules={[
    { required: true, message: "Please enter number of weeks!" },
    {
      type: "number",
      min: 1,
      max: 44,
      message: "Value must be between 1 and 44!",
    },
  ]}
>
  <InputNumber
    value={noOfWeeks}
    onChange={(value) => {
      // ❌ Ignore null, undefined or out of range
      if (value === null || value === undefined) {
        setNoOfWeeks(null);
        return;
      }
      if (value < 1 || value > 44) return;

      setNoOfWeeks(value);

      // Call your existing updateToDate if courseFromDate exists
      if (courseFromDate) {
        updateToDate(courseFromDate, value);
      }
    }}
    min={1}
    max={44}
    placeholder="Number of weeks"
    style={{ width: "100%" }}
    // ✅ Block typing letters, symbols, numbers >44, more than 2 digits
    onKeyPress={(e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        return;
      }
      const value = `${noOfWeeks || ""}${e.key}`;
      if (value.length > 2 || parseInt(value, 10) > 44) {
        e.preventDefault();
      }
    }}
    onPaste={(e) => {
      const paste = e.clipboardData.getData("text");
      if (!/^\d{1,2}$/.test(paste) || parseInt(paste, 10) > 44) {
        e.preventDefault();
      }
    }}
  />
</Form.Item>

{status?.includes("Trial Scheduled") && (
  <Form.Item
    label="Trial"
    name="trial"
    valuePropName="checked"
  >
    <Checkbox />
  </Form.Item>
)}




           {/* // FROM date */}
<Form.Item label="Time frame" name="course_from_date"
rules={[{ required: true, message: "Please select from date!" }]}
>
  <div className="date-picker-container" style={{ position: "relative" }}>
    {/* Visible text field */}
    <input
      type="text"
      id="date-picker-course1"              // keep your original id/styles
      className="date-picker"
      placeholder="dd/mm/yyyy"
      value={courseFromDate ? formatDMY(courseFromDate) : ""}
      readOnly
      onClick={() => {
        const el = document.getElementById("date-picker-course1-hidden");
        if (!el) return;
        el.focus({ preventScroll: true });
        if (typeof el.showPicker === "function") el.showPicker();
        else el.click(); // fallback
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const el = document.getElementById("date-picker-course1-hidden");
          if (!el) return;
          el.focus({ preventScroll: true });
          if (typeof el.showPicker === "function") el.showPicker();
          else el.click();
        }
      }}
    />

    {/* Hidden native date input (drives your existing state/logic) */}
    <input
      type="date"
      id="date-picker-course1-hidden"
      name="course_from_date"
      value={courseFromDate || ""}
      onChange={handleFromDateChange}
      min={!isEditing ? new Date().toISOString().split("T")[0] : undefined}
      aria-hidden="true"
      style={{
        position: "absolute",
        opacity: 0,
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
      tabIndex={-1}
    />
  </div>
</Form.Item>

{/* TO date */}
<Form.Item label="To" name="course_to_date"
rules={[{ required: true, message: "Please select to date!" }]}
>
  <div className="date-picker-container" style={{ position: "relative" }}>
    {/* Visible text field */}
    <input
      type="text"
      id="date-picker-course2"
      className="date-picker"
      placeholder="dd/mm/yyyy"
      value={courseToDate ? formatDMY(courseToDate) : ""}
      readOnly
      onClick={() => {
        const el = document.getElementById("date-picker-course2-hidden");
        if (!el) return;
        el.focus({ preventScroll: true });
        if (typeof el.showPicker === "function") el.showPicker();
        else el.click();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const el = document.getElementById("date-picker-course2-hidden");
          if (!el) return;
          el.focus({ preventScroll: true });
          if (typeof el.showPicker === "function") el.showPicker();
          else el.click();
        }
      }}
    />

    {/* Hidden native date input */}
    <input
      type="date"
      id="date-picker-course2-hidden"
      name="course_to_date"
      value={courseToDate || ""}
      onChange={handleToDateChange}
      min={!isEditing ? new Date().toISOString().split("T")[0] : undefined}
      aria-hidden="true"
      style={{
        position: "absolute",
        opacity: 0,
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
      tabIndex={-1}
    />
  </div>
</Form.Item>


     

     
      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel1}
      />
    </Form>
  );
};

export default Courses;
