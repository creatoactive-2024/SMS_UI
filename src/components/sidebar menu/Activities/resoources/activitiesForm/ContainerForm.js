// import React, { useState, useEffect, useRef } from "react";
// import { Tabs, notification, Form } from "antd";
// import SettingActivity from "./SettingActivity";
// import FrontendActivity from "./FrontendActivity";
// import { SaveData } from "../../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const ContainerForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,formValues,
//   setFormValues,
//   setSelectedRecordId
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataSetting, setFormDataSetting] = useState(null);
//   const [formDataFrontend, setFormDataFrontend] = useState(null);
//   const formRefs = useRef({});

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinishSetting = (values) => {
//     setFormDataSetting(values);
//     setActiveTab("2"); // Move to the next tab
//     nextStep(); // Move to the next step (tab)
//   };

//   const handleFinishFrontend = (values) => {
//     setFormDataFrontend(values);
//   };

//   const stateResetFunctions = [setFormDataSetting, setFormDataFrontend];

//   useEffect(() => {
//     // Check if both form data pieces are available
//     if (formDataSetting && formDataFrontend) {
//       // Combine the form data pieces
//       const combinedFormData = {
//         ...formDataSetting,
//         ...formDataFrontend,
//       };
//       // Call the saveData function with the combined form data and state reset functions
//       SaveData(
//         "activities", // Replace with your collection name
//         combinedFormData,
//         selectedRecordId, // Pass the selected record ID (can be null for new records)
//         setEditModalVisible,
//         setNewModalVisible,
//         resetAllFields,
//         fetchData,
//         setCurrentStep,
//         setActiveTab,
//         stateResetFunctions // Pass the array of state reset functions
//       );
//     }
//   }, [formDataSetting, formDataFrontend]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     Object.values(formRefs.current).forEach((formRef) => {
//       if (formRef && formRef.current) {
//         formRef.current.resetFields();
//       }
//     });
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
//           <SettingActivity
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishSetting}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Setting"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Frontend" key="2">
//           <FrontendActivity
//             onFinish={handleFinishFrontend}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Frontend"] = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default ContainerForm;




import React, { useEffect, useState } from "react";
import { Tabs, notification, Form } from "antd";
import SettingActivity from "./SettingActivity";
import FrontendActivity from "./FrontendActivity";
import baseURL from "../../../commonComponents/baseURL";

const { TabPane } = Tabs;

const ContainerForm = ({
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
        collectionName: "activities",
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

      const collectionName = "activities";
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
        collectionName: "activities",
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

      const collectionName = "activities";
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
          <SettingActivity
            form={allDataForm} // Pass the form instance
            onFinish={handleFinishAllData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Frontend" key="2">
          <FrontendActivity
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

export default ContainerForm;
