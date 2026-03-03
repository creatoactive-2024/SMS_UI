
// import React, { useState,useRef, useEffect  } from "react";
// import { Tabs, Button, notification ,Form} from "antd";
// import baseURL from "../../../../config";
// import CourseData from "./CourseData";
// import CourseDocument from "./CourseDocument";
// import CourseFontend from "./CourseFontend";
// import { SaveData } from "../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const CourseForm = ({ selectedRecordId, recordData, updateCategoryOptions, setNewModalVisible, setEditModalVisible,fetchData,CancelBothModel }) => {
//   const [activeTab, setActiveTab] = useState("1");

//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataCourseData, setFormDataCourseData] = useState(null);
//   const [formDataCourseDocument, setFormDataCourseDocument] = useState(null);
//   const [formDataCourseFrontend, setFormDataCourseFrontend] = useState(null);
//   const [form] = Form.useForm();
//   const formRefs = useRef({});




//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinishAllData = (values) => {
//     setFormDataCourseData(values);
//     setActiveTab("2"); // Move to the next tab
//     nextStep(); // Move to the next step (tab)

//   };

//   const handleFinishCourseDocument = (values) => {
//     setFormDataCourseDocument(values);
//     setActiveTab("3"); // Move to the next tab
//   };

//   const handleFinishCourseFrontend = (values) => {
//     setFormDataCourseFrontend(values);
    
//       };



//       const stateResetFunctions = [formDataCourseData, formDataCourseDocument, formDataCourseFrontend];

//       // Use the useEffect hook to trigger the saveData function when form data changes
//       useEffect(() => {
//         // Check if both form data pieces are available
//         if (formDataCourseData && formDataCourseDocument && formDataCourseFrontend) {
//           // Combine the form data pieces
//           const combinedFormData = {
//             ...formDataCourseData,
//             ...formDataCourseDocument,
//             ...formDataCourseFrontend,
//           };
//           // Call the saveData function with the combined form data and state reset functions
//           SaveData(
//             "courses", // Replace with your collection name
//             combinedFormData,
//             selectedRecordId, // Pass the selected record ID (can be null for new records)
//             setEditModalVisible,
//             setNewModalVisible,
//             resetAllFields,
//             fetchData,
//             setCurrentStep,
//             setActiveTab,
//             stateResetFunctions // Pass the array of state reset functions
//           );
//         }
//       }, [formDataCourseData, formDataCourseDocument, formDataCourseFrontend]); 



//   const resetAllFields = () => {
//     Object.values(formRefs.current).forEach((form) => {
//         form.resetFields();
//     });
// };
//   const CancelBothModel1= () =>{
//     CancelBothModel();
//     resetAllFields();
//       // console.log("its running");
//   }

//   const onChange = (key) => {
//     setActiveTab(key);

//     console.log(key);
//   };

  

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Data" key="1">
//           <CourseData
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             updateCategoryOptions={updateCategoryOptions}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}

//           />
//         </TabPane>
//         <TabPane tab="Document" key="2">
//           <CourseDocument
//             onFinish={handleFinishCourseDocument}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Document"] = form)}

//           />
//         </TabPane>
//         <TabPane tab="Frontend" key="3">
//           <CourseFontend
//             onFinish={handleFinishCourseFrontend}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Frontend"] = form)}

//           />
//         </TabPane>
//       </Tabs>

    
//     </>
//   );
// };

// export default CourseForm;



// import React, { useState, useRef, useEffect } from "react";
// import { Tabs } from "antd";
// import CourseData from "./CourseData";
// import CourseDocument from "./CourseDocument";
// import CourseFontend from "./CourseFontend";
// import { SaveData } from "../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const CourseForm = ({
//   selectedRecordId,
//   recordData,
//   updateCategoryOptions,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataCourseData, setFormDataCourseData] = useState(null);
//   const [formDataCourseDocument, setFormDataCourseDocument] = useState(null);
//   const [formDataCourseFrontend, setFormDataCourseFrontend] = useState(null);
//   const [courseDataFormKey, setCourseDataFormKey] = useState(0);
//   const [courseDocumentFormKey, setCourseDocumentFormKey] = useState(0);
//   const [courseFrontendFormKey, setCourseFrontendFormKey] = useState(0);

//   const courseDataFormRef = useRef(null);
//   const courseDocumentFormRef = useRef(null);
//   const courseFrontendFormRef = useRef(null);

//   const handleFinishCourseData = (values) => {
//     setFormDataCourseData(values);
//     setActiveTab("2");
//     setCurrentStep(currentStep + 1);
//     setCourseDataFormKey((prevKey) => prevKey + 1);
//   };

//   const handleFinishCourseDocument = (values) => {
//     setFormDataCourseDocument(values);
//     setActiveTab("3");
//     setCourseDocumentFormKey((prevKey) => prevKey + 1);
//   };

//   const handleFinishCourseFrontend = (values) => {
//     setFormDataCourseFrontend(values);
//     setCourseFrontendFormKey((prevKey) => prevKey + 1);
//   };

//   useEffect(() => {
//     if (formDataCourseData && formDataCourseDocument && formDataCourseFrontend) {
//       const combinedFormData = {
//         ...formDataCourseData,
//         ...formDataCourseDocument,
//         ...formDataCourseFrontend
//       };

//       SaveData(
//         "courses",
//         combinedFormData,
//         selectedRecordId,
//         setEditModalVisible,
//         setNewModalVisible,
//         () => {
//           resetAllFields();
//           setActiveTab("1");
//           fetchData();
//         },
//         fetchData,
//         setCurrentStep,
//         setActiveTab
//       );
//     }
//   }, [formDataCourseData, formDataCourseDocument, formDataCourseFrontend]);

//   const resetAllFields = () => {
//     setFormDataCourseData(null);
//     setFormDataCourseDocument(null);
//     setFormDataCourseFrontend(null);

//     if (courseDataFormRef.current) courseDataFormRef.current.resetFields();
//     if (courseDocumentFormRef.current) courseDocumentFormRef.current.resetFields();
//     if (courseFrontendFormRef.current) courseFrontendFormRef.current.resetFields();

//     setCurrentStep(1);
//   };

//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllFields();
//     setActiveTab("1");
//   };

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Course details" key="1">
//           <CourseData
//             key={`CourseData-${courseDataFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             updateCategoryOptions={updateCategoryOptions}
//             onFinish={handleFinishCourseData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (courseDataFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Document" key="2">
//           <CourseDocument
//             key={`CourseDocument-${courseDocumentFormKey}`}
//             onFinish={handleFinishCourseDocument}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (courseDocumentFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Frontend" key="3">
//           <CourseFontend
//             key={`CourseFrontend-${courseFrontendFormKey}`}
//             onFinish={handleFinishCourseFrontend}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (courseFrontendFormRef.current = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default CourseForm;







import React, { useEffect, useState } from "react";
import { Tabs, notification, Form } from "antd";
import CourseData from "./CourseData";
import CourseDocument from "./CourseDocument";
import CourseFrontend from "./CourseFontend";
import baseURL from "../../commonComponents/baseURL";

const { TabPane } = Tabs;

const CourseForm = ({
  selectedRecordId,
  setNewModalVisible,
  setEditModalVisible,
  CancelBothModel,
  fetchData,
  recordData,
  setSelectedRecordId,
  updateCategoryOptions,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [courseDataForm] = Form.useForm(); // Initialize form
  const [courseDocumentForm] = Form.useForm(); // Initialize form
  const [courseFrontendForm] = Form.useForm(); // Initialize form
  const [createdRecordId, setCreatedRecordId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (recordData && recordData._id) {
      setSelectedRecordId(recordData._id);
    }
  }, [recordData, setSelectedRecordId]);

  useEffect(() => {
    if (!selectedRecordId) {
      resetAllFields();
    }
  }, [selectedRecordId]);

  const resetAllFields = () => {
    courseDataForm.resetFields(); // Reset all fields in the form
    courseDocumentForm.resetFields(); // Reset all fields in the form
    courseFrontendForm.resetFields(); // Reset all fields in the form
    setActiveTab("1");
    console.log("Resetting all fields");
  };

  // const handleFinishCourseData = async (values) => {
  //   setIsSubmitting(true);
  //   setSubmitError(null);
  //   try {
  //     const requestData = {
  //       collectionName: "courses",
  //       data: selectedRecordId ? { _id: selectedRecordId, ...values } : values,
  //     };

  //     const response = await fetch(`${baseURL}/createdata`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify([requestData]),
  //     });

  //     const data = await response.json();
  //     console.log("API Response:", data);

  //     const collectionName = "courses";
  //     if (
  //       data[0]?.message.includes(
  //         `Document created successfully for collection: ${collectionName}.`
  //       ) ||
  //       data[0]?.message.includes(
  //         `Document updated successfully for collection: ${collectionName}.`
  //       )
  //     ) {
  //       notification.success({
  //         message: "Success",
  //         description: "Data saved successfully!",
  //       });

  //       const createdId = data[0].data?._id;
  //       if (!selectedRecordId) {
  //         setCreatedRecordId(createdId);
  //         setSelectedRecordId(createdId);
  //       }
  //       setActiveTab("2");
  //     } else {
  //       notification.error({
  //         message: "Error",
  //         description: "Failed to save data. Please try again.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //     setSubmitError(`Error saving data: ${error.message}`);
  //     notification.error({
  //       message: "Error",
  //       description: `Error saving data: ${error.message}`,
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleFinishCourseDocument = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "courses",
        data: { _id: createdRecordId || selectedRecordId, ...values },
      };

      const response = await fetch(`${baseURL}/createdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([requestData]),
      });

      const data = await response.json();
      console.log("API Response:", data);

      const collectionName = "courses";
      if (
        data[0]?.message.includes(
          `Document created successfully for collection: ${collectionName}.`
        ) ||
        data[0]?.message.includes(
          `Document updated successfully for collection: ${collectionName}.`
        )
      ) {
        notification.success({
          message: "Success",
          description: "Data saved successfully!",
        });

        setActiveTab("3");
      } else {
        notification.error({
          message: "Error",
          description: "Failed to save data. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setSubmitError(`Error saving data: ${error.message}`);
      notification.error({
        message: "Error",
        description: `Error saving data: ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishCourseData = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "courses",
        data: { _id: createdRecordId || selectedRecordId, ...values },
      };

      const response = await fetch(`${baseURL}/createdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([requestData]),
      });

      const data = await response.json();
      console.log("API Response:", data);

      const collectionName = "courses";
      if (
        data[0]?.message.includes(
          `Document created successfully for collection: ${collectionName}.`
        ) ||
        data[0]?.message.includes(
          `Document updated successfully for collection: ${collectionName}.`
        )
      ) {
        notification.success({
          message: "Success",
          description: "Data saved successfully!",
        });

        if (selectedRecordId) {
          setEditModalVisible(false);
        } else {
          setNewModalVisible(false);
        }

        fetchData();
        resetAllFields(); // Reset fields after successful submission
        setSelectedRecordId(null);
        setActiveTab("1");
      } else {
        notification.error({
          message: "Error",
          description: "Failed to save data. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setSubmitError(`Error saving data: ${error.message}`);
      notification.error({
        message: "Error",
        description: `Error saving data: ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBothModel = () => {
    CancelBothModel();
    resetAllFields();
    fetchData();
    setSubmitError(null);
    setActiveTab("1");
  };

  const onChange = (activeKey) => {
    setActiveTab(activeKey);
  };

  return (
    <>
      {/* {submitError && (
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <p style={{ color: "red" }}>{submitError}</p>
        </div>
      )} */}
      <Tabs centered onChange={onChange} activeKey={activeTab}>
        <TabPane tab="Course details" key="1">
          <CourseData
            form={courseDataForm} // Pass the form instance
            onFinish={handleFinishCourseData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            updateCategoryOptions={updateCategoryOptions}
            submitting={isSubmitting}
          />
        </TabPane>
        {/* <TabPane tab="Document" key="2">
          <CourseDocument
            form={courseDocumentForm} // Pass the form instance
            onFinish={handleFinishCourseDocument}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Frontend" key="3">
          <CourseFrontend
            form={courseFrontendForm} // Pass the form instance
            onFinish={handleFinishCourseFrontend}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane> */}
      </Tabs>
    </>
  );
};

export default CourseForm;
