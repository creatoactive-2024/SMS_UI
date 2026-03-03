// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import AgentData from "./AgentData";
// import AgentInfo from "./AgentInfo";
// import BankFormData from "./BankFormData";
// import FeesAtSchool from "./FeesAtSchool";
// import Commission from "./Commission"; // Import Commission component
// import TermsOfPayment from "./TermsOfPayment"; // Import TermsOfPayment component
// import Cancellation from "./Cancellation"; // Import Cancellation component
// import { SaveData } from "../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const AgencyForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
//   formValues,
//   setFormValues,
//   setSelectedRecordId
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataAgentData, setFormDataAgentData] = useState(null);
//   const [formDataAgentInfo, setFormDataAgentInfo] = useState(null);
//   const [formDataBankData, setFormDataBankData] = useState(null);
//   const [formDataFeesAtSchool, setFormDataFeesAtSchool] = useState(null);

//   const [agentDataFormKey, setAgentDataFormKey] = useState(0);
//   const [agentInfoFormKey, setAgentInfoFormKey] = useState(0);
//   const [bankDataFormKey, setBankDataFormKey] = useState(0);
//   const [feesAtSchoolFormKey, setFeesAtSchoolFormKey] = useState(0);
//   const [commissionFormKey, setCommissionFormKey] = useState(0); // Define commission form key
//   const [termsOfPaymentFormKey, setTermsOfPaymentFormKey] = useState(0); // Define terms of payment form key
//   const [cancellationFormKey, setCancellationFormKey] = useState(0); // Define cancellation form key

//   const agentDataFormRef = useRef(null);
//   const agentInfoFormRef = useRef(null);
//   const bankDataFormRef = useRef(null);
//   const feesAtSchoolFormRef = useRef(null);
//   const commissionFormRef = useRef(null); // Define commission form ref
//   const termsOfPaymentFormRef = useRef(null); // Define terms of payment form ref
//   const cancellationFormRef = useRef(null); // Define cancellation form ref

//   const handleFinishAgentData = (values) => {
//     setFormDataAgentData(values);
//     setActiveTab("2");
//     setCurrentStep(currentStep + 1);
//     setAgentDataFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishAgentInfo = (values) => {
//     setFormDataAgentInfo(values);
//     setActiveTab("3");
//     setCurrentStep(currentStep + 1);
//     setAgentInfoFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishBankData = (values) => {
//     setFormDataBankData(values);
//     setActiveTab("4");
//     setCurrentStep(currentStep + 1);
//     setBankDataFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const handleFinishFeesAtSchool = (values) => {
//     setFormDataFeesAtSchool(values);
//     setFeesAtSchoolFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   useEffect(() => {
//     if (formDataAgentData && formDataAgentInfo && formDataBankData && formDataFeesAtSchool) {
//       const combinedFormData = {
//         ...formDataAgentData,
//         ...formDataAgentInfo,
//         ...formDataBankData,
//         ...formDataFeesAtSchool
//       };

//       SaveData(
//         "agents",
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
//   }, [formDataAgentData, formDataAgentInfo, formDataBankData, formDataFeesAtSchool]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     setFormDataAgentData(null);
//     setFormDataAgentInfo(null);
//     setFormDataBankData(null);
//     setFormDataFeesAtSchool(null);

//     if (agentDataFormRef.current) agentDataFormRef.current.resetFields();
//     if (agentInfoFormRef.current) agentInfoFormRef.current.resetFields();
//     if (bankDataFormRef.current) bankDataFormRef.current.resetFields();
//     if (feesAtSchoolFormRef.current) feesAtSchoolFormRef.current.resetFields();
//     if (commissionFormRef.current) commissionFormRef.current.resetFields();
//     if (termsOfPaymentFormRef.current) termsOfPaymentFormRef.current.resetFields();
//     if (cancellationFormRef.current) cancellationFormRef.current.resetFields();

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
//         <TabPane tab="Agent details" key="1">
//           <AgentData
//             key={`AgentData-${agentDataFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAgentData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (agentDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Info" key="2">
//           <AgentInfo
//             key={`AgentInfo-${agentInfoFormKey}`}
//             recordData={recordData}
//             onFinish={handleFinishAgentInfo}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (agentInfoFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Bank" key="3">
//           <BankFormData
//             key={`BankFormData-${bankDataFormKey}`}
//             recordData={recordData}
//             onFinish={handleFinishBankData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (bankDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Fees At School" key="4">
//           <FeesAtSchool
//             key={`FeesAtSchool-${feesAtSchoolFormKey}`}
//             recordData={recordData}
//             onFinish={handleFinishFeesAtSchool}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (feesAtSchoolFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Commission" key="5" disabled>
//           <Commission
//             key={`Commission-${commissionFormKey}`}
//             recordData={recordData}
//             onFinish={() => {}}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (commissionFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Terms Of Payment" key="6" disabled>
//           <TermsOfPayment
//             key={`TermsOfPayment-${termsOfPaymentFormKey}`}
//             recordData={recordData}
//             onFinish={() => {}}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (termsOfPaymentFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Cancellation" key="7" disabled>
//           <Cancellation
//             key={`Cancellation-${cancellationFormKey}`}
//             recordData={recordData}
//             onFinish={() => {}}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (cancellationFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default AgencyForm;




import React, { useState, useEffect } from "react";
import { Tabs, notification, Form } from "antd";
import AgentData from "./AgentData";
import AgentInfo from "./AgentInfo";
import BankFormData from "./BankFormData";
import FeesAtSchool from "./FeesAtSchool";
import Commission from "./Commission"; // Import Commission component
import TermsOfPayment from "./TermsOfPayment"; // Import TermsOfPayment component
import Cancellation from "./Cancellation"; // Import Cancellation component
import baseURL from "../../commonComponents/baseURL";

const { TabPane } = Tabs;

const AgencyForm = ({
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
        collectionName: "agents",
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

      const collectionName = "agents";
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
        collectionName: "agents",
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

      const collectionName = "agents";
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
        collectionName: "agents",
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

      const collectionName = "agents";
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
        collectionName: "agents",
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

      const collectionName = "agents";
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
        <TabPane tab="Agent details" key="1">
          <AgentData
            form={detailsForm}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishDetails}
            updateCategoryOptions={updateCategoryOptions}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Info" key="2">
          <AgentInfo
            form={priceCostForm}
            onFinish={handleFinishPriceCost}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Bank" key="3">
          <BankFormData
            form={settingsForm}
            onFinish={handleFinishSettings}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Fees At School" key="4">
          <FeesAtSchool
            form={documentsForm}
            onFinish={handleFinishDocuments}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Commission" key="5" disabled>
          <Commission
            form={documentsForm}
            onFinish={handleFinishDocuments}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Terms Of Payment" key="6" disabled>
          <TermsOfPayment
            form={documentsForm}
            onFinish={handleFinishDocuments}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Cancellation" key="7" disabled>
          <Cancellation
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

export default AgencyForm;
