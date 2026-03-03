import React, { useState, useEffect } from "react";
import { Form, Select, Input, Checkbox } from "antd";
import englishFlag from "../../../img/englishFlag.png";
import portugeseFlag from "../../../img/Portugal-flag.png";
import spanishFlag from "../../../img/Spain-flag.png";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";
import "../../commonComponents/common.css";
const { Option } = Select;

const CourseData = ({
  onFinish,
  recordData,
  updateCategoryOptions,
  CancelBothModel,
  form,
}) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [courseLanguage, setCourseLanguage] = useState([]);
  const [courseLevel, setCourseLevel] = useState([]);
  const [weeklist, setWeekList] = useState([]);

  // const [form] = Form.useForm();

  const FlaggedInput = ({ flagSrc, ...props }) => (
    <div style={{ position: "relative" }}>
      <img
        src={flagSrc}
        alt="flag"
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "27px", // Adjust the width as needed
          height: "22px", // Adjust the height as needed
        }}
      />
      <Input
        {...props}
        style={{
          paddingLeft: "42px", // Adjust the padding to accommodate the flag
          ...props.style,
        }}
      />
    </div>
  );

  const fetchCourseLevel = async () => {
    try {
      const responseData = await FieldListDropdown(
        "courselevels",
        "name_english"
      );
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const levels = responseData
          .map((level) => ({
            value: level._id, // Use the appropriate property for the value
            label: level.name_english, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCourseLevel(levels);
      }
    } catch (error) {
      console.error("Error fetching course levels:", error);
    }
  };
  const fetchCourseLanguage = async () => {
    try {
      const responseData = await FieldListDropdown(
        "courselanguages",
        "name_english"
      );
      if (responseData) {
        // Extract category names from response data
        const names = responseData
          .map((category) => ({
            value: category._id, // Use the appropriate property for the value
            label: category.name_english, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        // const names = responseData.map((category) => category.title_english);
        setCourseLanguage(names);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const fetchWeeks = async () => {
    try {
      const responseData = await FieldListDropdown("weekprices", "title");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Name = responseData
          .map((name) => ({
            value: name._id, // Use the appropriate property for the value
            label: name.title, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setWeekList(Name);
      }
    } catch (error) {
      console.error("Error fetching weeks:", error);
    }
  };

  useEffect(() => {
    fetchCourseLanguage();
    fetchCourseLevel();
    fetchWeeks();
  }, []);

  useEffect(() => {
    // Set initial form values based on recordData when available
    console.log("recordData:", recordData);

    if (recordData) {
      form.setFieldsValue({
        title_english: recordData.title_english,
        // title_portuguese: recordData.title_portuguese,
        // title_spanish: recordData.title_spanish,
        nickname: recordData.nickname,
        category_name: recordData.category_name,
        course_language: recordData.course_language,
        course: recordData.course,
        not_available_separately: recordData.not_available_separately,
        lessons_per_week: recordData.lessons_per_week,
        lesson_duration: recordData.lesson_duration,
        lesson_price_calculation: recordData.lesson_price_calculation,
        weeks: recordData.weeks,
        online: recordData.online,
        course_level_name: recordData.course_level_name,
        course_avaibility: recordData.course_avaibility,
        minimum_duration: recordData.minimum_duration,
        maximum_duration: recordData.maximum_duration,
        fix_duration: recordData.fix_duration,
        publicholiday: recordData.publicholiday,
        schoolholiday: recordData.schoolholiday,
        uk_quarterly_course_type: recordData.uk_quarterly_course_type,
        maximum_students: recordData.maximum_students,
        average_students: recordData.average_students,
        minimum_students: recordData.minimum_students,
        minimum_age: recordData.minimum_age,
        average_age: recordData.average_age,
        maximum_age: recordData.maximum_age,
        week_name: recordData.week_name,
      });
      console.log("in all data", recordData);
    }
    // Fetch category names when the component mounts
    updateCategoryOptions().then((options) => {
      // Ensure that options is an array before updating the state
      if (Array.isArray(options)) {
        setCategoryOptions(options);
      }
    });
  }, [recordData, form]);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const handleFinish = async (values) => {
    // Perform any specific logic if needed
    console.log("courseData form values:", values);

    const courseLang = Array.isArray(values.course_language)
      ? values.course_language.map((id) => {
          const lang = courseLanguage.find((l) => l.value === id);
          return lang ? lang.label : id;
        })
      : courseLanguage.find((l) => l.value === values.course_language)?.label ||
        values.course_language;

        const weekNames = values.week_name.map((id) => {
  const week = weeklist.find((w) => w.value === id);
  return week ? week.label : id;
});

    const allValues = {
      ...values,
      course_language: courseLang, // Replace agent IDs with their names
      week_name: weekNames,
    };

    // Trigger the callback to inform the parent component about the form submission
    onFinish(allValues);
    // Update the "Category" dropdown options
    const options = await updateCategoryOptions();
    // Ensure that options is an array before updating the state
    if (Array.isArray(options)) {
      setCategoryOptions(options);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Title"
        name="title_english"
        rules={[{ required: true, message: "Please enter the Title!" }]}
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "27px",
              height: "22px",
              background: `url(${englishFlag}) no-repeat center center`,
              backgroundSize: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Form.Item name="title_english" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item>

      {/* <Form.Item
        label=" "
        name="title_spanish"
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "27px",
              height: "22px",
              background: `url(${spanishFlag}) no-repeat center center`,
              backgroundSize: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Form.Item name="title_spanish" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item
        label=" "
        name="title_portuguese"
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "35px",
              background: `url(${portugeseFlag}) no-repeat center center`,
              backgroundSize: "cover",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Form.Item name="title_portuguese" noStyle>
            <Input
              style={{
                paddingLeft: "42px",
              }}
            />
          </Form.Item>
        </div>
      </Form.Item> */}

      <Form.Item label="Nickname" name="nickname">
        <Input placeholder="Enter nickname" />
      </Form.Item>

      <Form.Item label="Category" name="category_name">
        <Select
          placeholder="SELECT CATEGORY"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {/* Populate options using the fetched category names */}
          {categoryOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="course_language"
        label="Course Language"
        rules={[{ required: true, message: "Please enter Course Language!" }]}
      >
        <Select
          mode="multiple"
          placeholder="Please select"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {courseLanguage.map((group) => (
            <Option key={group.value} value={group.value}>
              {group.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Course"
        name="course"
        rules={[{ required: true, message: "Please enter Course!" }]}
      >
        <Select placeholder="SELECT COURSE" onChange={handleChange}>
          <Option value="Course With Fixed Weekly/Monthly Lessons">
            Course With Fixed Weekly/Monthly Lessons
          </Option>
          <Option value="Course With Flexible Lessons">
            Course With Flexible Lessons
          </Option>
          <Option value="Exam / Trial Lesson"> Exam / Trial Lesson</Option>
          <Option value="Combination Course"> Combination Course</Option>
          <Option value="Job Placement / Employment">
            {" "}
            Job Placement / Employment
          </Option>
          <Option value="Programs"> Programs</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Not available separately&nbsp;
            <Tooltip title="Not available separately">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="not_available_separately"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label="Lessons"
        name="lessons_per_week"
        rules={[{ required: true, message: "Please enter Lessons!" }]}
      >
        <Input placeholder="Enter Lessons" />
      </Form.Item>

      <Form.Item
        label="Duration of a lesson (Minutes)"
        name="lesson_duration"
        rules={[
          {
            required: true,
            message: "Please enter Duration of a lesson (Minutes)!",
          },
        ]}
      >
        <Input placeholder="Enter Duration of a lesson (Minutes)" />
      </Form.Item>

      <Form.Item label="Price calculation" name="lesson_price_calculation">
        <Select placeholder="SELECT Price calculation" onChange={handleChange}>
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
          <Option value="one time fee">One Time Fee</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="week_name"
        label="Weeks"
        rules={[{ required: true, message: "Please enter Course Language!" }]}
      >
        <Select
          mode="multiple"
          placeholder="Please select"
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {weeklist.map((name) => (
            <Option key={name.value} value={name.value}>
              {name.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* <Form.Item
        name="week_name"
        label="Weeks"
      
      >
        <Select mode="multiple" placeholder="Please select">
          <Option value="4-8 weeks">4-8 Weeks</Option>
        </Select>
      </Form.Item> */}

      <Form.Item
        label={
          <span>
            Online&nbsp;
            <Tooltip title="Online">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="online"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>Availability</h5>

      <Form.Item
        label={
          <span>
            Initial level&nbsp;
            <Tooltip title="Initial level">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="course_level_name"
      >
        <Select placeholder="SELECT COURSE LEVEL" onChange={handleChange}>
          {courseLevel.map((item) => (
            <Select.Option key={item._id} value={item.label}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Availability&nbsp;
            <Tooltip title="Availability">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="course_avaibility"
        rules={[{ required: true, message: "Please select Availability!" }]}
      >
        <Select
          placeholder="SELECT COURSE AVAILABILITY"
          onChange={handleChange}
        >
          <Option value="Always Available (According To School's Starting Weekday)">
            Always Available (According To School's Starting Weekday)
          </Option>
          <Option value="Always Available (Every Day)">
            Always Available (Every Day)
          </Option>
          <Option value="Limited Availability">Limited Availability</Option>
          <Option value="Not Available">Not Available</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Minimum duration in weeks" name="minimum_duration">
        <Input placeholder="Enter Minimum duration in weeks" />
      </Form.Item>

      <Form.Item label="Maximum duration in weeks" name="maximum_duration">
        <Input placeholder="Enter Maximum duration in weeks" />
      </Form.Item>

      <Form.Item label="Set number of weeks" name="fix_duration">
        <Input placeholder="Enter Set number of weeks" />
      </Form.Item>

      <Form.Item
        label="Can be held on public holidays"
        name="publicholiday"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item
        label={
          <span>
            Can be held during school holidays&nbsp;
            <Tooltip title="Can be held during school holidays">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="schoolholiday"
        valuePropName="checked"
      >
        <Checkbox></Checkbox>
      </Form.Item>

      <hr />
      <h5>English UK Report / QUIC</h5>

      <Form.Item label="Course type" name="uk_quarterly_course_type">
        <Select placeholder="SELECT COURSE TYPE" onChange={handleChange}>
          <Option value="General English">General English</Option>
          <Option vue="Business & Professional English">
            Business & Professional English
          </Option>
          <Option value="English Plus">English Plus</Option>
          <Option value="English For Academic Purposes">
            English For Academic Purposes
          </Option>
          <Option value="English For Specific Purposes">
            English For Specific Purposes
          </Option>
          <Option value="One-To-One">One-To-One</Option>
          <Option value="Teacher Development (QUIC)">
            Teacher Development (QUIC)
          </Option>
          <Option value="Summer/Winter Camps (QUIC)">
            Summer/Winter Camps (QUIC)
          </Option>
        </Select>
      </Form.Item>

      <hr />
      <h5>Other</h5>

      <Form.Item label="Max. students per class" name="maximum_students">
        <Input placeholder="Enter Max. students per class" />
      </Form.Item>
      <Form.Item label="Average number of students" name="average_students">
        <Input placeholder="Enter Average number of students" />
      </Form.Item>
      <Form.Item label="Min. students per class" name="minimum_students">
        <Input placeholder="Enter Min. students per class" />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Minimum age&nbsp;
            <Tooltip title="Minimum age">
              <AiOutlineQuestionCircle />
            </Tooltip>
          </span>
        }
        name="minimum_age"
      >
        <Input placeholder="Enter Minimum age" />
      </Form.Item>
      <Form.Item label="Average age" name="average_age">
        <Input placeholder="Enter Average age" />
      </Form.Item>
      <Form.Item label="Maximum age" name="maximum_age">
        <Input placeholder="Enter Maximum age" />
      </Form.Item>

      <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />
    </Form>
  );
};

export default CourseData;
