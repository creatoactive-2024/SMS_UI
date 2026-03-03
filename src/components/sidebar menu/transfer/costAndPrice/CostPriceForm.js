// import React, { useState, useRef, useEffect } from "react";
// import { Tabs } from "antd";
// import Details from "./Details";
// import PriceCostData from "./PriceCostData";
// import Settings from "./Settings";
// import DocumentsCostPrice from "./DocumentsCostPrice";
// import { SaveData } from "../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const CostPriceForm = ({
//   selectedRecordId,
//   recordData,
//   updateCategoryOptions,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataDetails, setFormDataDetails] = useState(null);
//   const [formDataPriceCost, setFormDataPriceCost] = useState(null);
//   const [formDataSettings, setFormDataSettings] = useState(null);
//   const [formDataDocuments, setFormDataDocuments] = useState(null);
//   const [detailsFormKey, setDetailsFormKey] = useState(0);
//   const [priceCostFormKey, setPriceCostFormKey] = useState(0);
//   const [settingsFormKey, setSettingsFormKey] = useState(0);
//   const [documentsFormKey, setDocumentsFormKey] = useState(0);
//   const formRefs = useRef({});

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinishDetails = (values) => {
//     setFormDataDetails(values);
//     setActiveTab("2"); // Move to the next tab
//     nextStep(); // Move to the next step (tab)
//     setDetailsFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishPriceCost = (values) => {
//     setFormDataPriceCost(values);
//     setActiveTab("3"); // Move to the next tab
//     setPriceCostFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishSetting = (values) => {
//     setFormDataSettings(values);
//     setActiveTab("4"); // Move to the next tab
//     setSettingsFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishDocuments = (values) => {
//     setFormDataDocuments(values);
//     setDocumentsFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const stateResetFunctions = [
//     setFormDataDetails,
//     setFormDataPriceCost,
//     setFormDataSettings,
//     setFormDataDocuments,
//   ];

//   useEffect(() => {
//     // Check if all form data pieces are available
//     if (
//       formDataDetails &&
//       formDataPriceCost &&
//       formDataSettings &&
//       formDataDocuments
//     ) {
//       // Combine the form data pieces
//       const combinedFormData = {
//         ...formDataDetails,
//         ...formDataPriceCost,
//         ...formDataSettings,
//         ...formDataDocuments,
//       };
//       // Call the saveData function with the combined form data and state reset functions
//       SaveData(
//         "transferpricecosts", // Replace with your collection name
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
//   }, [formDataDetails, formDataPriceCost, formDataSettings, formDataDocuments]);

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
//         <TabPane tab="Details" key="1">
//           <Details
//             key={`Details-${detailsFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishDetails}
//             updateCategoryOptions={updateCategoryOptions}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Details"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Price/Cost" key="2">
//           <PriceCostData
//             key={`PriceCost-${priceCostFormKey}`}
//             onFinish={handleFinishPriceCost}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["PriceCost"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Settings" key="3">
//           <Settings
//             key={`Settings-${settingsFormKey}`}
//             onFinish={handleFinishSetting}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Settings"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Documents" key="4">
//           <DocumentsCostPrice
//             key={`Documents-${documentsFormKey}`}
//             onFinish={handleFinishDocuments}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Documents"] = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default CostPriceForm;



import React, { useState, useEffect } from "react";
import { Tabs, notification, Form } from "antd";
import Details from "./Details";
import PriceCostData from "./PriceCostData";
import Settings from "./Settings";
import DocumentsCostPrice from "./DocumentsCostPrice";
import baseURL from "../../commonComponents/baseURL";

const { TabPane } = Tabs;

const CostPriceForm = ({
  selectedRecordId,
  recordData,
  updateCategoryOptions,
  setNewModalVisible,
  setEditModalVisible,
  fetchData,
  CancelBothModel,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [detailsForm] = Form.useForm();
  const [priceCostForm] = Form.useForm();
  const [settingsForm] = Form.useForm();
  const [documentsForm] = Form.useForm();

  const [createdRecordId, setCreatedRecordId] = useState(null);

  useEffect(() => {
    if (recordData && recordData._id) {
      setCreatedRecordId(recordData._id);
    }
  }, [recordData]);

  useEffect(() => {
    if (!selectedRecordId) {
      resetAllFields();
    }
  }, [selectedRecordId]);

  const resetAllFields = () => {
    detailsForm.resetFields();
    priceCostForm.resetFields();
    settingsForm.resetFields();
    documentsForm.resetFields();
    setActiveTab("1");
    setSubmitError(null);
  };

  const handleFinishDetails = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "transferpricecosts",
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

      const collectionName = "transferpricecosts";
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

  const handleFinishPriceCost = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "transferpricecosts",
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

      const collectionName = "transferpricecosts";
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

  const handleFinishSettings = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "transferpricecosts",
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

      const collectionName = "transferpricecosts";
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

        setActiveTab("4");
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

  const handleFinishDocuments = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "transferpricecosts",
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

      const collectionName = "transferpricecosts";
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
  };

  const onChange = (activeKey) => {
    setActiveTab(activeKey);
  };

  return (
    <>
      <Tabs centered onChange={onChange} activeKey={activeTab}>
        <TabPane tab="Details" key="1">
          <Details
            form={detailsForm}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishDetails}
            updateCategoryOptions={updateCategoryOptions}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Price/Cost" key="2">
          <PriceCostData
            form={priceCostForm}
            onFinish={handleFinishPriceCost}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Settings" key="3">
          <Settings
            form={settingsForm}
            onFinish={handleFinishSettings}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Documents" key="4">
          <DocumentsCostPrice
            form={documentsForm}
            onFinish={handleFinishDocuments}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default CostPriceForm;
