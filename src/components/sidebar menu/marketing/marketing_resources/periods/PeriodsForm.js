// import React, { useState, useEffect, useRef } from "react";
// import { Tabs } from "antd";
// import InfoPeriods from "./InfoPeriods";
// import PeriodsPriceCost from "./PeriodsPriceCost";
// import { SaveData } from "../../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const PeriodsForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataInfoPeriods, setFormDataInfoPeriods] = useState(null);
//   const [formDataPeriodsPriceCost, setFormDataPeriodsPriceCost] = useState(null);
//   const [infoPeriodsFormKey, setInfoPeriodsFormKey] = useState(0);
//   const [periodsPriceCostFormKey, setPeriodsPriceCostFormKey] = useState(0);
//   const infoPeriodsFormRef = useRef(null);
//   const periodsPriceCostFormRef = useRef(null);

//   const handleFinishInfoPeriods = (values) => {
//     setFormDataInfoPeriods(values);
//     setActiveTab("2");
//     setCurrentStep(currentStep + 1);
//     setInfoPeriodsFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishPeriodsPriceCost = (values) => {
//     setFormDataPeriodsPriceCost(values);
//     setPeriodsPriceCostFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   useEffect(() => {
//     if (formDataInfoPeriods && formDataPeriodsPriceCost) {
//       const combinedFormData = {
//         ...formDataInfoPeriods,
//         ...formDataPeriodsPriceCost,
//       };

//       SaveData(
//         "periods",
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
//   }, [formDataInfoPeriods, formDataPeriodsPriceCost]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     setFormDataInfoPeriods(null);
//     setFormDataPeriodsPriceCost(null);
//     if (infoPeriodsFormRef.current) infoPeriodsFormRef.current.resetFields();
//     if (periodsPriceCostFormRef.current) periodsPriceCostFormRef.current.resetFields();
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
//         <TabPane tab="INFORMATION" key="1">
//           <InfoPeriods
//             key={`InfoPeriods-${infoPeriodsFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishInfoPeriods}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (infoPeriodsFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="COPY PRICES AND COSTS" key="2">
//           <PeriodsPriceCost
//             key={`PeriodsPriceCost-${periodsPriceCostFormKey}`}
//             recordData={recordData}
//             onFinish={handleFinishPeriodsPriceCost}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (periodsPriceCostFormRef.current = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default PeriodsForm;

import React, { useEffect, useState } from "react";
import { Tabs, notification, Form } from "antd";
import InfoPeriods from "./InfoPeriods";
import PeriodsPriceCost from "./PeriodsPriceCost";
import baseURL from "../../../commonComponents/baseURL";
const { TabPane } = Tabs;

const PeriodsForm = ({
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
        collectionName: "periods",
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

      const collectionName = "periods";
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
        collectionName: "periods",
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

      const collectionName = "periods";
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
        <TabPane tab="INFORMATION" key="1">
          <InfoPeriods
            form={allDataForm} // Pass the form instance
            onFinish={handleFinishAllData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="COPY PRICES AND COSTS" key="2">
          <PeriodsPriceCost
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

export default PeriodsForm;
