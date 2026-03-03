// // ProviderForm.js
// import React, { useState,useRef,useEffect } from "react";
// import { Form, Tabs, notification } from "antd";
// import ProviderInfoForm from "./ProviderInfoForm";
// import ProviderBankDetailsForm from "./ProviderBankDetailsForm";
// import baseURL from "../../../config";
// import { SaveData } from "../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const ProviderForm = ({ selectedRecordId, recordData, setNewModalVisible,setEditModalVisible,fetchData, CancelBothModel,formValues,
//   setFormValues, setSelectedRecordId }) => {

//   const [activeTab, setActiveTab] = useState("1");

//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataAllData, setFormDataAllData] = useState(null);
//   const [formDataEnquiryData, setFormDataEnquiryData] = useState(null);
//   const [allDataFormKey, setAllDataFormKey] = useState(0);
//   const [enquiryDataFormKey, setEnquiryDataFormKey] = useState(0);
//   const allDataFormRef = useRef(null);
//   const enquiryDataFormRef = useRef(null);

//   const handleFinishAllData = (values) => {
//     setFormDataAllData(values);
//     setActiveTab("2");
//     setCurrentStep(currentStep + 1);
//     setAllDataFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishEnquiryData = (values) => {
//     setFormDataEnquiryData(values);
//     setEnquiryDataFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   useEffect(() => {
//     if (formDataAllData && formDataEnquiryData) {
//       const combinedFormData = {
//         ...formDataAllData,
//         ...formDataEnquiryData,
//       };

//       SaveData(
//         "transferproviders",
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
//       setSelectedRecordId(null); // Reset selected record ID after save
//     }
//   }, [formDataAllData, formDataEnquiryData]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     setFormDataAllData(null);
//     setFormDataEnquiryData(null);
//     if (allDataFormRef.current) allDataFormRef.current.resetFields();
//     if (enquiryDataFormRef.current) enquiryDataFormRef.current.resetFields();
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
//         <TabPane tab="Information" key="1">
//           <ProviderInfoForm
//            key={`AllData-${allDataFormKey}`}
//            selectedRecordId={selectedRecordId}
//            recordData={recordData}
//            onFinish={handleFinishAllData}
//            CancelBothModel={CancelBothModel1}
//            formRef={(form) => (allDataFormRef.current = form)}
//            formValues={formValues}
//            setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Bank Details" key="2">
//           <ProviderBankDetailsForm
//           key={`EnquiryData-${enquiryDataFormKey}`}
//           recordData={recordData}
//           onFinish={handleFinishEnquiryData}
//           CancelBothModel={CancelBothModel1}
//           formRef={(form) => (enquiryDataFormRef.current = form)}
//           formValues={formValues}
//           setFormValues={setFormValues}
//             />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default ProviderForm;

import React, { useState, useEffect } from "react";
import { Form, Tabs, notification } from "antd";
import ProviderInfoForm from "./ProviderInfoForm";
import ProviderBankDetailsForm from "./ProviderBankDetailsForm";
import baseURL from "../../../config";

const { TabPane } = Tabs;

const ProviderForm = ({
  selectedRecordId,
  recordData,
  setNewModalVisible,
  setEditModalVisible,
  fetchData,
  CancelBothModel,
  setSelectedRecordId,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [infoForm] = Form.useForm();
  const [bankDetailsForm] = Form.useForm();
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
    infoForm.resetFields();
    bankDetailsForm.resetFields();
    setActiveTab("1");
    console.log("Resetting all fields");
  };

  const handleFinishInfo = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "transferproviders",
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

      const collectionName = "transferproviders";
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

  const handleFinishBankDetails = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "transferproviders",
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

      const collectionName = "transferproviders";
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

  const onChange = (activeKey) => {
    setActiveTab(activeKey);
  };

  return (
    <>
      <Tabs centered onChange={onChange} activeKey={activeTab}>
        <TabPane tab="Information" key="1">
          <ProviderInfoForm
            form={infoForm}
            onFinish={handleFinishInfo}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Bank Details" key="2">
          <ProviderBankDetailsForm
            form={bankDetailsForm}
            onFinish={handleFinishBankDetails}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default ProviderForm;
