
// import React, {useEffect, useState} from "react";
// import { Form, Input, Button,Select } from "antd";
// import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";
// import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";


// const { Option } = Select;


// const Qualification = ({ onFinish, recordData , CancelBothModel}) => {
//   const [form] = Form.useForm();
//   const [courseCategory, setCourseCategory] = useState([]);
//   const [courseLanguage, setCourseLanguage] = useState([]);
//   const [courseLevel, setCourseLevel] = useState([]);


//   const handleChange = (value) => {
//     console.log(`Selected value: ${value}`);
//   };


//   const fetchCourseCategory = async () => {
//     try {
//       const responseData = await FieldListDropdown("coursecategories", "name_english");
//       if (responseData) {
//         // Extract category names from response data
//         const names = responseData.map((category) => ({
//           value: category._id, // Use the appropriate property for the value
//           label: category.name_english // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         // const names = responseData.map((category) => category.name_english);
//         setCourseCategory(names);
//       }
//     } catch (error) {
//       console.error("Error fetching coursecategories:", error);
//     }
//   };

//   const fetchCourseLanguage = async () => {
//     try {
//       const responseData = await FieldListDropdown("courselanguages", "name_english");
//       if (responseData) {
//         // Extract category names from response data
//         const names = responseData.map((category) => ({
//           value: category._id, // Use the appropriate property for the value
//           label: category.name_english // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         // const names = responseData.map((category) => category.title_english);
//         setCourseLanguage(names);
//       }
//     } catch (error) {
//       console.error("Error fetching courses", error);
//     }
//   };

//   const fetchCourseLevel = async () => {
//     try {
//       const responseData = await FieldListDropdown("courselevels", "name_english");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const levels = responseData.map((level) => ({
//           value: level._id, // Use the appropriate property for the value
//           label: level.name_english // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setCourseLevel(levels);
//       }
//     } catch (error) {
//       console.error("Error fetching course levels:", error);
//     }
//   };



//   useEffect(() => {
//     fetchCourseCategory();
//     fetchCourseLanguage();
//     fetchCourseLevel();
//   }, []); 





//   useEffect(() => {
//     // Set initial form values when recordData changes
//     if (recordData) {
//       form.setFieldsValue({
//         course_category_name: recordData.course_category_name,
//         course_level_name: recordData.course_level_name,
//         course_language_name: recordData.course_language_name,
        
//       });
//       console.log("in enquiry",recordData);

//     }
//   }, [recordData, form]);

//   // const handleFinish = async (values) => {
//   //   // Perform any specific logic if needed
//   //   console.log("EnquiryData form values:", values);

//   //   // Trigger the callback to inform the parent component about the form submission
//   //   onFinish(values);
//   // };


//   const handleFinish = async (values) => {
//     // Transform selected IDs to labels before saving
//     const transformedValues = {
//       ...values,
//       course_category_name: values.course_category_name.map((id) => {
//         const selectedCategory = courseCategory.find((cat) => cat.value === id);
//         return selectedCategory ? selectedCategory.label : id;
//       }),
//       course_level_name: values.course_level_name.map((id) => {
//         const selectedLevel = courseLevel.find((level) => level.value === id);
//         return selectedLevel ? selectedLevel.label : id;
//       }),
//       course_language_name: values.course_language_name.map((id) => {
//         const selectedLanguage = courseLanguage.find((lang) => lang.value === id);
//         return selectedLanguage ? selectedLanguage.label : id;
//       }),
//     };

//     console.log("Transformed Values:", transformedValues);
//     onFinish(transformedValues);
//   };

//   return (
//     <Form
//       form={form}
//       onFinish={handleFinish}
//       labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
//       wrapperCol={{ span: 16 }}
//     >
//       <br />
//       <h5 style={{textAlign:"center"}}>Please select the course categories and levels that the teacher is allowed to teach</h5>

//       <br />

//       <Form.Item
//         name="course_category_name"
//         label="Course categories"
//         rules={[
//           {
//             message: "Please select Course categories",
//             type: "array",
//           },
//         ]}
//       >
//         <Select mode="multiple" placeholder="Please select" showSearch optionFilterProp="children" onChange={handleChange}  filterOption={(input, option) =>
//     option.children.toLowerCase().includes(input.toLowerCase())
//   }>
//         {courseCategory.map((group) => (
//             <Option key={group.value} value={group.value}>
//               {group.label}
//             </Option>
//           ))}     
//         </Select>
//       </Form.Item>

//       <Form.Item
//         name="course_level_name"
//         label="level"
//         rules={[
//           {
//             message: "Please select Level",
//             type: "array",
//           },
//         ]}
//       >
//         <Select mode="multiple" placeholder="Please select" showSearch optionFilterProp="children" onChange={handleChange} 
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//         {courseLevel.map((item) => (
//       <Select.Option key={item.value} value={item.value}>
//         {item.label}
//       </Select.Option>
//     ))}
//         </Select>
//       </Form.Item>

//       <Form.Item
//         name="course_language_name"
//         label="Course languages"
//         rules={[
//           {
//             message: "Please select Course languages",
//             type: "array",
//           },
//         ]}
//       >
//         <Select mode="multiple" placeholder="Please select" showSearch optionFilterProp="children" onChange={handleChange} 
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//         {courseLanguage.map((group) => (
//              <Option key={group.value} value={group.value}>
//               {group.label}
//             </Option>
//           ))}    
//         </Select>
//       </Form.Item>


//       <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />

//     </Form>
//   );
// };

// export default Qualification;



import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { SubmitCancelButtonGroup } from "../../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../../commonComponents/FieldListDropdown";

const { Option } = Select;

const Qualification = ({ onFinish, recordData, CancelBothModel,form }) => {
  // const [form] = Form.useForm();
  const [courseCategory, setCourseCategory] = useState([]);
  const [courseLanguage, setCourseLanguage] = useState([]);
  const [courseLevel, setCourseLevel] = useState([]);

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const fetchCourseCategory = async () => {
    try {
      const responseData = await FieldListDropdown("coursecategories", "name_english");
      if (responseData) {
        const names = responseData
          .map((category) => ({
            value: category._id,
            label: category.name_english,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCourseCategory(names);
      }
    } catch (error) {
      console.error("Error fetching coursecategories:", error);
    }
  };

  const fetchCourseLanguage = async () => {
    try {
      const responseData = await FieldListDropdown("courselanguages", "name_english");
      if (responseData) {
        const names = responseData
          .map((category) => ({
            value: category._id,
            label: category.name_english,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCourseLanguage(names);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const fetchCourseLevel = async () => {
    try {
      const responseData = await FieldListDropdown("courselevels", "name_english");
      if (responseData) {
        const levels = responseData
          .map((level) => ({
            value: level._id,
            label: level.name_english,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCourseLevel(levels);
      }
    } catch (error) {
      console.error("Error fetching course levels:", error);
    }
  };

  useEffect(() => {
    fetchCourseCategory();
    fetchCourseLanguage();
    fetchCourseLevel();
  }, []);

  useEffect(() => {
    if (recordData) {
      form.setFieldsValue({
        course_category_name: recordData.course_category_name || [],
        course_level_name: recordData.course_level_name || [],
        course_language_name: recordData.course_language_name || [],
      });
      console.log("in enquiry", recordData);
    }
  }, [recordData, form]);

  const handleFinish = async (values) => {
    const transformedValues = {
      ...values,
      course_category_name: (values.course_category_name || []).map((id) => {
        const selectedCategory = courseCategory.find((cat) => cat.value === id);
        return selectedCategory ? selectedCategory.label : id;
      }),
      course_level_name: (values.course_level_name || []).map((id) => {
        const selectedLevel = courseLevel.find((level) => level.value === id);
        return selectedLevel ? selectedLevel.label : id;
      }),
      course_language_name: (values.course_language_name || []).map((id) => {
        const selectedLanguage = courseLanguage.find((lang) => lang.value === id);
        return selectedLanguage ? selectedLanguage.label : id;
      }),
    };

    console.log("Transformed Values:", transformedValues);
    onFinish(transformedValues);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 16 }}
    >
      <br />
      <h5 style={{ textAlign: "center" }}>
        Please select the course categories and levels that the teacher is allowed to teach
      </h5>
      <br />

      <Form.Item
        name="course_category_name"
        label="Course categories"
        rules={[
          {
            message: "Please select Course categories",
            type: "array",
          },
        ]}
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
          {courseCategory.map((group) => (
            <Option key={group.value} value={group.value}>
              {group.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="course_level_name"
        label="Level"
        rules={[
          {
            message: "Please select Level",
            type: "array",
          },
        ]}
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
          {courseLevel.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="course_language_name"
        label="Course languages"
        rules={[
          {
            message: "Please select Course languages",
            type: "array",
          },
        ]}
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

      <SubmitCancelButtonGroup CancelBothModel={CancelBothModel} />
    </Form>
  );
};

export default Qualification;
