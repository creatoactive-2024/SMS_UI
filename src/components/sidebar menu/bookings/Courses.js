import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Select,
  Input,
  DatePicker,
  TimePicker,
  Checkbox,
  Button,
  Divider,
  message,
} from "antd";
import baseURL from "../../../config";
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../../sidebar menu/commonComponents/FieldListDropdown";
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
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const datePicker1 = document.getElementById('date-picker-course1');
  const datePicker2 = document.getElementById('date-picker-course2');

  // Set the min attribute conditionally
  if (datePicker1) datePicker1.setAttribute('min', isEditing ? '' : today);
  if (datePicker2) datePicker2.setAttribute('min', isEditing ? '' : today);

  if (recordData && recordData.courses && recordData.courses.length > 0) {
    const courseData = recordData.courses[0] || {};

    const formattedFrom = courseData.course_from_date ? moment(courseData.course_from_date).format("YYYY-MM-DD") : today;
    const formattedTo = courseData.course_to_date ? moment(courseData.course_to_date).format("YYYY-MM-DD") : '';

    // Initialize state with fetched dates and weeks
    setCourseFromDate(formattedFrom);
    setCourseToDate(formattedTo);
    setNoOfWeeks(courseData.no_of_weeks || 0);
    setIsEditing(true);

    // Set form fields value
    form.setFieldsValue({
      category: courseData.category || '',
      course: courseData.course || '',
      level: courseData.level || '',
      availability: courseData.availability || '',
      no_of_weeks: courseData.no_of_weeks || '',
      course_from_date: formattedFrom,
      course_to_date: formattedTo,
      flexible_assignment: courseData.flexible_assignment || false,
      flexible_assignment_note: courseData.flexible_assignment_note || '',
      additional_services: courseData.additional_services || '',
      preferred_course_start_weekday: courseData.preferred_course_start_weekday || '',
      promotion_code: courseData.promotion_code || '',
      name_of_classmate: courseData.name_of_classmate || '',
      course_advisor: courseData.course_advisor || '',
      trial_lesson: courseData.trial_lesson || '',
    });

    // Trigger fetching of weekdays based on the fetched course value
    if (courseData.course) {
      fetchWeekdays(courseData.course);
    }
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
    toDateObj.setDate(fromDateObj.getDate() + weeks * 7);
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
 
 
  const handleSubmit = async (values) => {
    // Handle form submission
    console.log("Courses submitted with values:", values);
  
    try {
      // 1. Create booking data
      const createBookingResponse = await fetch(`${baseURL}/bookingdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: values.level,
          courses: values.course,
          weeks: values.no_of_weeks,
          course_from_date: values.course_from_date,
          course_to_date: values.course_to_date,
          preferred_course_start_weekday: values.preferred_course_start_weekday,
          candidate_id: selectedRecordId || candidateId, // Ensure this variable is defined
        }),
      });
  
      // Check response status
      if (!createBookingResponse.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Parse response JSON
      const createBookingData = await createBookingResponse.json();
      console.log("Booking API Response:", createBookingData);
  
      // Variable to track whether updateDocument or createdata API was called
      let isUpdateApiCalled = false;
  
      if (selectedRecordId) {
        // 2. Update candidate data if selectedRecordId is available
        const updateCandidateResponse = await fetch(`${baseURL}/updateDocument`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionName: "candidatecourses",
            candidate_id: selectedRecordId,
            updatedData: {
              category: values.category,
              course: values.course,
              level: values.level,
              availability: values.availability,
              no_of_weeks: values.no_of_weeks,
              course_from_date: values.course_from_date,
              course_to_date: values.course_to_date,
              flexible_assignment: values.flexible_assignment,
              flexible_assignment_note: values.flexible_assignment_note,
              additional_services: values.additional_services,

              preferred_course_start_weekday: values.preferred_course_start_weekday,
              promotion_code: values.promotion_code,
              name_of_classmate: values.name_of_classmate,
              course_advisor: values.course_advisor,
              trial_lesson: values.trial_lesson,

            },
          }),
        });

        // Check response status
        if (!updateCandidateResponse.ok) {
          throw new Error("Network response was not ok");
        }
  
        // Parse response JSON
        const updateCandidateData = await updateCandidateResponse.json();
        console.log("API Response for update:", updateCandidateData);
  
        // Update flag indicating updateDocument API was called
        isUpdateApiCalled = true;
      } else {
        // 3. Call the new API for creating candidate data if selectedRecordId is not available
        const createCandidateResponse = await fetch(`${baseURL}/createdata`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              collectionName: "candidatecourses",
              data: {
                candidate_id: candidateId, // Ensure candidateId is defined
                category: values.category,
                course: values.course,
                level: values.level,
                availability: values.availability,
                no_of_weeks: values.no_of_weeks,
                course_from_date: values.course_from_date,
                course_to_date: values.course_to_date,
                flexible_assignment: values.flexible_assignment,
                flexible_assignment_note: values.flexible_assignment_note,
                additional_services: values.additional_services,

                preferred_course_start_weekday: values.preferred_course_start_weekday,
              promotion_code: values.promotion_code,
              name_of_classmate: values.name_of_classmate,
              course_advisor: values.course_advisor,
              trial_lesson: values.trial_lesson,
              },
            },
          ]),
        });
  
        // Check response status
        if (!createCandidateResponse.ok) {
          throw new Error("Network response was not ok");
        }
  
        // Parse response JSON
        const createCandidateData = await createCandidateResponse.json();
        console.log("API Response for create:", createCandidateData);
      }
  
      // 4. Call the new API for fetching dummy class data
      const getScheduleResponse = await fetch(`${baseURL}/createDummyClass`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Check response status
      if (!getScheduleResponse.ok) {
        throw new Error("Failed to fetch schedule data");
      }
  
      // Parse response JSON
      const scheduleData = await getScheduleResponse.json();
      console.log("Schedule Data:", scheduleData); // Handle or process the fetched data as needed
  
      // 5. Complete the process
      message.success("Data saved successfully!");
  
      // Check if updateDocument API was called and set modal visibility accordingly
      if (isUpdateApiCalled) {
        setEditModalVisible(false);
      } else {
        setNewModalVisible(false);
      }
      resetAllFields();
      fetchData(); // Fetch or refresh data in your component
    } catch (error) {
      console.error("Error:", error);
  
      setEditModalVisible(false);
      setNewModalVisible(false);
      fetchData();
      resetAllFields();
      message.error("Error occurred while saving data!");
    }
  
    // Call the parent component's onFinish function
    onFinish(values);
  };
  

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Category" name="category">
        <Select placeholder="Select a category">
        {courseCategory.map((group) => (
            <Option key={group._id} value={group.label}>
              {group.label}
            </Option>
          ))}       
           </Select>
      </Form.Item>
      <Form.Item label="Course" name="course">
        <Select placeholder="Select a course" onChange={handleCourseChange}>
        {courses.map((name) => (
            <Option key={name._id} value={name.label}>
              {name.label}
            </Option>
          ))}  
        </Select>
      </Form.Item>

      <Form.Item label="Level" name="level">
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



      {/* <Form.Item label="Availability" name="availability">
        <DatePicker />
      </Form.Item> */}
      
      
      {/* <Form.Item label="Number of weeks" name="no_of_weeks">
        <Input type="number" />
      </Form.Item>

  

           
 <Form.Item label="Time frame" name="course_from_date">
                <div className="date-picker-container">
                    <input type="date" id="date-picker-course1" className="date-picker" name="course_from_date" />
                </div>
            </Form.Item>

            <Form.Item label="To" name="course_to_date">
                <div className="date-picker-container">
                    <input type="date" id="date-picker-course2" className="date-picker" name="course_to_date" />
                </div>
            </Form.Item> */}


{/* <Form.Item label="Number of weeks" name="no_of_weeks">
                <Input type="number" value={noOfWeeks} onChange={handleWeeksChange} />
            </Form.Item>
            <Form.Item label="Time frame" name="course_from_date">
                <div className="date-picker-container">
                    <input
                        type="date"
                        id="date-picker-course1"
                        className="date-picker"
                        name="course_from_date"
                        value={courseFromDate}
                        onChange={(e) => handleFromDateChange(e)}
                    />
                </div>
            </Form.Item>
            <Form.Item label="To" name="course_to_date">
                <div className="date-picker-container">
                    <input
                        type="date"
                        id="date-picker-course2"
                        className="date-picker"
                        name="course_to_date"
                        value={courseToDate}
                        onChange={(e) => form.setFieldsValue({ course_to_date: e.target.value })}
                    />
                </div>
            </Form.Item> */}
    <Form.Item label="Number of weeks" name="no_of_weeks">
                <Input type="number" value={noOfWeeks} onChange={handleWeeksChange} />
            </Form.Item>
            <Form.Item label="Time frame" name="course_from_date">
                <div className="date-picker-container">
                    <input
                        type="date"
                        id="date-picker-course1"
                        className="date-picker"
                        name="course_from_date"
                        value={courseFromDate}
                        onChange={handleFromDateChange}
                        min={!isEditing ? new Date().toISOString().split('T')[0] : undefined} // Disable min attribute in editing mode

                    />
                </div>
            </Form.Item>
            <Form.Item label="To" name="course_to_date">
                <div className="date-picker-container">
                    <input
                        type="date"
                        id="date-picker-course2"
                        className="date-picker"
                        name="course_to_date"
                        value={courseToDate}
                        onChange={handleToDateChange}
                        min={!isEditing ? new Date().toISOString().split('T')[0] : undefined} // Disable min attribute in editing mode

                    />
                </div>
            </Form.Item>

      <Form.Item
        label={
          <span>
            Flexible assignment&nbsp;
            <Tooltip title="Flexible assignment">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="flexible_assignment"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>
      {/* ... (Other form items) */}

      <Form.Item label="Note" name="flexible_assignment_note">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="additional_services" label="Additional services">
        {/* <Select mode="multiple" placeholder="Please select additional services">
          <Option value="option1">option1</Option>
          <Option value="option2">option2</Option>
          <Option value="option3">option3</Option>
        </Select> */}
                <Input placeholder="Enter Additional services" />

      </Form.Item>

      {/* <Divider /> */}

      <Form.List name="formGroups">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <Divider />

                <Form.Item
                  {...restField}
                  label="Category"
                  name={[name, "category"]}
                  fieldKey={[fieldKey, "category"]}
                >
                  <Select placeholder="Select a category">
                    <Option value="course">Course</Option>
                    {/* Add more options if needed */}
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  label="Course"
                  name={[name, "course"]}
                  fieldKey={[fieldKey, "course"]}
                >
                  <Select placeholder="Select a Course">
                    <Option value="course">Course</Option>
                    {/* Add more options if needed */}
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  label="Level"
                  name={[name, "level"]}
                  fieldKey={[fieldKey, "level"]}
                >
                  <Select placeholder="Select a course level">
                    {/* Add course level options */}
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  label="Availability"
                  name={[name, "availability"]}
                  fieldKey={[fieldKey, "availability"]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Number of weeks" name="numberOfWeeks">
                  <Input type="number" />
                </Form.Item>

                <Form.Item label="Time frame" name="timeFrame">
                  <TimePicker />
                </Form.Item>
                <Form.Item label="To" name="to">
                  <TimePicker />
                </Form.Item>

                <Form.Item
                  label={
                    <span>
                      Flexible assignment&nbsp;
                      <Tooltip title="Flexible assignment">
                        <AiOutlineQuestionCircle />
                      </Tooltip>
                    </span>
                  }
                  name="flexibleAssignment"
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                {/* ... (Other form items) */}

                <Form.Item
                  {...restField}
                  label="Note"
                  name={[name, "note"]}
                  fieldKey={[fieldKey, "note"]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "additionalServices"]}
                  label="Additional services"
                >
                  <Select
                    mode="multiple"
                    placeholder="Please select additional services"
                  >
                    <Option value="red">Red</Option>
                    <Option value="green">Green</Option>
                    <Option value="blue">Blue</Option>
                  </Select>
                </Form.Item>

                <Button
                  type="link"
                  style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                  onClick={() => remove(name)}
                >
                  Delete
                </Button>
              </div>
            ))}
            {/* <Divider /> */}

            {/* <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Courses
              </Button>
            </Form.Item> */}
          </>
        )}
      </Form.List>

      <hr />
      {/* <Form.Item
        label="Preferred course start weekday"
        rules={[
          {
            required: true,
            message: "Please select Preferred course start weekday!",
          },
        ]}
        name="preferred_course_start_weekday"
      >
        <Select placeholder="select..."  onChange={handleChange}>
          <Option value="Monday">Monday</Option>
          <Option value="Tuesday">Tuesday</Option>
          <Option value="Wednesday">Wednesday</Option>
          <Option value="Thursday">Thursday</Option>
          <Option value="Friday">Friday</Option>
          <Option value="Saturday">Saturday</Option>
          <Option value="Sunday">Sunday</Option>

        </Select>
      </Form.Item> */}

<Form.Item
        label="Preferred course start weekday"
        name="preferred_course_start_weekday"
        rules={[
          {
            required: true,
            message: 'Please select Preferred course start weekday!',
          },
        ]}
      >
       <Select placeholder="Select..." onChange={handlePreferredWeekdayChange}>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <Option key={day} value={day} disabled={!weekdays.includes(day)}>
              {day}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Promotion Code" name="promotion_code">
        <Input />
      </Form.Item>

      <Form.Item label="Full name of classmate" name="name_of_classmate">
        <Input />
      </Form.Item>

      <Form.Item label="Who was your Course Advisor?" name="course_advisor">
        <Select placeholder="select..." onChange={handleChange}>
          <Option value="Musa">Musa</Option>
          <Option value="Isky">Isky</Option>
          <Option value="Dogan">Dogan</Option>
          <Option value="Anxhela">Anxhela</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Preferred course start weekday - Trial lesson" name="trial_lesson">
        <Select placeholder="select..." onChange={handleChange}>
          <Option value="Monday">Monday</Option>
          <Option value="Tuesday">Tuesday</Option>
          <Option value="Wednesday">Wednesday</Option>
          <Option value="Thursday">Thursday</Option>
        </Select>
      </Form.Item>

      {/* <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
       */}
      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel1}
      />
    </Form>
  );
};

export default Courses;
