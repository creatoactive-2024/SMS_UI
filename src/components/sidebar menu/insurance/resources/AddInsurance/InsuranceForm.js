// import React, { useState, useRef, useEffect } from "react";
// import { Tabs } from "antd";
// import InsuranceFrontend from "./InsuranceFrontend";
// import InsuranceDocument from "./InsuranceDocument";
// import InsuranceData from "./IsuranceData";
// import { SaveData } from "../../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const InsuranceForm = ({
//   selectedRecordId,
//   recordData,
//   updateCategoryOptions,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,formValues,
//   setFormValues,
//   setSelectedRecordId
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataInsuranceData, setFormDataInsuranceData] = useState(null);
//   const [formDataDocument, setFormDataDocument] = useState(null);
//   const [formDataFrontend, setFormDataFrontend] = useState(null);
//   const [insuranceDataFormKey, setInsuranceDataFormKey] = useState(0);
//   const [frontendFormKey, setFrontendFormKey] = useState(0);
//   const [documentFormKey, setDocumentFormKey] = useState(0);
//   const formRefs = useRef({});

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const handleFinishInsuranceData = (values) => {
//     setFormDataInsuranceData(values);
//     setActiveTab("2"); // Move to the next tab
//     nextStep(); // Move to the next step (tab)
//     setInsuranceDataFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishFrontend = (values) => {
//     setFormDataFrontend(values);
//     setActiveTab("3"); // Move to the next tab
//     setFrontendFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishDocument = (values) => {
//     setFormDataDocument(values);
//     setDocumentFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const stateResetFunctions = [
//     setFormDataInsuranceData,
//     setFormDataDocument,
//     setFormDataFrontend,
//   ];

//   useEffect(() => {
//     // Check if all form data pieces are available
//     if (formDataInsuranceData && formDataDocument && formDataFrontend) {
//       // Combine the form data pieces
//       const combinedFormData = {
//         ...formDataInsuranceData,
//         ...formDataDocument,
//         ...formDataFrontend,
//       };
//       // Call the saveData function with the combined form data and state reset functions
//       SaveData(
//         "insurances", // Replace with your collection name
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
//   }, [formDataInsuranceData, formDataDocument, formDataFrontend]);

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
//         <TabPane tab="Insurance details" key="1">
//           <InsuranceData
//             key={`InsuranceData-${insuranceDataFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishInsuranceData}
//             updateCategoryOptions={updateCategoryOptions}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Frontend" key="2">
//           <InsuranceFrontend
//             key={`InsuranceFrontend-${frontendFormKey}`}
//             onFinish={handleFinishFrontend}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Frontend"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Document" key="3">
//           <InsuranceDocument
//             key={`InsuranceDocument-${documentFormKey}`}
//             onFinish={handleFinishDocument}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Document"] = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default InsuranceForm;



import React, { useState, useRef, useEffect } from "react";
import { Tabs, Form, notification } from "antd";
import InsuranceData from "./IsuranceData";
import InsuranceFrontend from "./InsuranceFrontend";
import InsuranceDocument from "./InsuranceDocument";
import { SaveData } from "../../../commonComponents/CreateUpdateApi";
import baseURL from "../../../commonComponents/baseURL";

const { TabPane } = Tabs;

const InsuranceForm = ({
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
        collectionName: "insurances",
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

      const collectionName = "insurances";
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
        collectionName: "insurances",
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

      const collectionName = "insurances";
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
        collectionName: "insurances",
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

      const collectionName = "insurances";
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
        <TabPane tab="Insurance details" key="1">
          <InsuranceData
            form={insuranceData}
            onFinish={handleFinishInsuranceData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
            updateCategoryOptions={updateCategoryOptions}
          />
        </TabPane>
        <TabPane tab="Frontend" key="2">
          <InsuranceFrontend
            form={frontendData}
            onFinish={handleFinishFrontend}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Document" key="3">
          <InsuranceDocument
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

export default InsuranceForm;
