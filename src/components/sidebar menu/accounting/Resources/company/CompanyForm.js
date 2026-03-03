// import React, { useState, useEffect, useRef } from "react";
// import { Tabs } from "antd";
// import AccountAllocation from "./AccountAllocation";
// import Allocation from "./Allocation";
// import AccountSetting from "./AccountSetting";
// import { SaveData } from "../../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const CompanyForm = ({
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
//   const [formDataAccountAllocation, setFormDataAccountAllocation] = useState(null);
//   const [formDataAllocation, setFormDataAllocation] = useState(null);
//   const [settingFormKey, setSettingFormKey] = useState(0);
//   const [accountAllocationFormKey, setAccountAllocationFormKey] = useState(0);
//   const [allocationFormKey, setAllocationFormKey] = useState(0);
//   const settingFormRef = useRef(null);
//   const accountAllocationFormRef = useRef(null);
//   const allocationFormRef = useRef(null);

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinishSetting = (values) => {
//     setFormDataSetting(values);
//     setActiveTab("2"); // Move to the next tab
//     nextStep();
//     setSettingFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishAccountAllocation = (values) => {
//     setFormDataAccountAllocation(values);
//     setActiveTab("3"); // Move to the next tab
//     nextStep();
//     setAccountAllocationFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishAllocation = (values) => {
//     setFormDataAllocation(values);
//     setAllocationFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const stateResetFunctions = [setFormDataSetting, setFormDataAccountAllocation, setFormDataAllocation];

//   useEffect(() => {
//     // Check if all form data pieces are available
//     if (formDataSetting && formDataAccountAllocation && formDataAllocation) {
//       // Combine the form data pieces
//       const combinedFormData = {
//         ...formDataSetting,
//         ...formDataAccountAllocation,
//         ...formDataAllocation,
//       };
//       // Call the saveData function with the combined form data and state reset functions
//       SaveData(
//         "companies", // Replace with your collection name
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
//   }, [formDataSetting, formDataAccountAllocation, formDataAllocation]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     setFormDataSetting(null);
//     setFormDataAccountAllocation(null);
//     setFormDataAllocation(null);
//     if (settingFormRef.current) settingFormRef.current.resetFields();
//     if (accountAllocationFormRef.current) accountAllocationFormRef.current.resetFields();
//     if (allocationFormRef.current) allocationFormRef.current.resetFields();
//     setCurrentStep(1); // Reset step to 1
//   };

//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllFields();
//     setActiveTab("1"); // Switch back to the first tab
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Setting" key="1">
//           <AccountSetting
//             key={`AccountSetting-${settingFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishSetting}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (settingFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Account Allocation" key="2">
//           <AccountAllocation
//             key={`AccountAllocation-${accountAllocationFormKey}`}
//             onFinish={handleFinishAccountAllocation}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (accountAllocationFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Allocation" key="3">
//           <Allocation
//             key={`Allocation-${allocationFormKey}`}
//             onFinish={handleFinishAllocation}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (allocationFormRef.current = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default CompanyForm;




import React, { useState, useRef, useEffect } from "react";
import { Tabs, Form, notification } from "antd";
import AccountAllocation from "./AccountAllocation";
import Allocation from "./Allocation";
import AccountSetting from "./AccountSetting";
import { SaveData } from "../../../commonComponents/CreateUpdateApi";
import baseURL from "../../../commonComponents/baseURL";

const { TabPane } = Tabs;

const CompanyForm = ({
  selectedRecordId,
  recordData,
  updateCategoryOptions,
  setNewModalVisible,
  setEditModalVisible,
  fetchData,
  CancelBothModel,
  setSelectedRecordId,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [insuranceData] = Form.useForm(); // Form instance for all data tab
  const [frontendData] = Form.useForm(); // Form instance for enquiry data tab
  const [documentData] = Form.useForm(); // Form instance for enquiry data tab

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
    insuranceData.resetFields();
    frontendData.resetFields();
    documentData.resetFields();

    setActiveTab("1");
    console.log("Resetting all fields");
  };

  const handleFinishInsuranceData = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "companies",
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

      const collectionName = "companies";
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

  const handleFinishFrontend = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "companies",
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

      const collectionName = "companies";
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

  const handleFinishDocument = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "companies",
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

      const collectionName = "companies";
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
        resetAllFields();
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

  const onChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <Tabs centered onChange={onChange} activeKey={activeTab}>
        <TabPane tab="Setting" key="1">
          <AccountSetting
            form={insuranceData}
            onFinish={handleFinishInsuranceData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
            updateCategoryOptions={updateCategoryOptions}
          />
        </TabPane>
        <TabPane tab="Account Allocation" key="2">
          <AccountAllocation
            form={frontendData}
            onFinish={handleFinishFrontend}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Allocation" key="3">
          <Allocation
            form={documentData}
            onFinish={handleFinishDocument}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default CompanyForm;
