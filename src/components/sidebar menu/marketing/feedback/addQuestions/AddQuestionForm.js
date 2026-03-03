// import React, { useState, useRef, useEffect } from "react";
// import { Tabs } from "antd";
// import Setting from "./Setting";
// import Question from "./Question";
// import { SaveData } from "../../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const AddQuestionForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataSetting, setFormDataSetting] = useState(null);
//   const [formDataQuestion, setFormDataQuestion] = useState(null);
//   const [settingFormKey, setSettingFormKey] = useState(0);
//   const [questionFormKey, setQuestionFormKey] = useState(0);
//   const settingFormRef = useRef(null);
//   const questionFormRef = useRef(null);

//   const handleFinishSetting = (values) => {
//     setFormDataSetting(values);
//     setActiveTab("2");
//     setCurrentStep(currentStep + 1);
//     setSettingFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishQuestion = (values) => {
//     setFormDataQuestion(values);
//     setQuestionFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   useEffect(() => {
//     if (formDataSetting && formDataQuestion) {
//       const combinedFormData = {
//         ...formDataSetting,
//         ...formDataQuestion,
//       };

//       SaveData(
//         "addquestions",
//         combinedFormData,
//         selectedRecordId,
//         setEditModalVisible,
//         setNewModalVisible,
//         () => {
//           resetAllFields();
//           setActiveTab("1"); // Switch back to first tab after submission
//           fetchData(); // Fetch updated data after save (if needed)
//         },
//         fetchData,
//         setCurrentStep,
//         setActiveTab
//       );
//     }
//   }, [formDataSetting, formDataQuestion]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     setFormDataSetting(null);
//     setFormDataQuestion(null);
//     if (settingFormRef.current) settingFormRef.current.resetFields();
//     if (questionFormRef.current) questionFormRef.current.resetFields();
//     setCurrentStep(1); // Reset step to 1
//   };

//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllFields();
//     setActiveTab("1");
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Setting" key="1">
//           <Setting
//             key={`Setting-${settingFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishSetting}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (settingFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Question" key="2">
//           <Question
//             key={`Question-${questionFormKey}`}
//             recordData={recordData}
//             onFinish={handleFinishQuestion}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (questionFormRef.current = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default AddQuestionForm;




import React, { useEffect, useState } from "react";
import { Tabs, notification, Form } from "antd";
import Setting from "./Setting";
import Question from "./Question";
import baseURL from "../../../commonComponents/baseURL";

const { TabPane } = Tabs;

const AddQuestionForm = ({
  selectedRecordId,
  setNewModalVisible,
  setEditModalVisible,
  CancelBothModel,
  fetchData,
  recordData,
  setSelectedRecordId,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [allDataForm] = Form.useForm(); // Initialize form
  const [enquiryDataForm] = Form.useForm(); // Initialize form
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
    allDataForm.resetFields(); // Reset all fields in the form
    enquiryDataForm.resetFields(); // Reset all fields in the form
    setActiveTab("1");
    console.log("Resetting all fields");
  };

  const handleFinishAllData = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "addquestions",
        data: selectedRecordId ? { _id: selectedRecordId, ...values } : values,
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

      const collectionName = "addquestions";
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

        const createdId = data[0].data?._id;
        if (!selectedRecordId) {
          setCreatedRecordId(createdId);
          setSelectedRecordId(createdId);
        }
        setActiveTab("2");
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

  const handleFinishEnquiryData = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "addquestions",
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

      const collectionName = "addquestions";
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
  };

  const onChange = (activeKey) => {
    setActiveTab(activeKey);
  };

  return (
    <>
      <Tabs centered onChange={onChange} activeKey={activeTab}>
        <TabPane tab="Setting" key="1">
          <Setting
            form={allDataForm} // Pass the form instance
            onFinish={handleFinishAllData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Question" key="2">
          <Question
            form={enquiryDataForm} // Pass the form instance
            onFinish={handleFinishEnquiryData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default AddQuestionForm;
