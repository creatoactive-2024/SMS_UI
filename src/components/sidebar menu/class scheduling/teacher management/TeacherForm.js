



// import React, { useState, useRef, useEffect } from "react";
// import { Tabs } from "antd";
// import Personaldetails from "./Personal_Details";
// import BankData from "./BankData";
// import Contracts from "./Contracts";
// import CostCategory from "./CostCategory";
// import Qualification from "./Qualification";
// import AccessRights from "./AccessRights";
// import { SaveData } from "../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const TeacherForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
//   setSelectedRecordId,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);

//   const [formDataPersonal, setFormDataPersonal] = useState(null);
//   const [formDataBankData, setFormDataBankData] = useState(null);
//   const [formDataQualification, setFormDataQualification] = useState(null);
//   const [formDataAccessData, setFormDataAccessData] = useState(null);

//   const [personalFormKey, setPersonalFormKey] = useState(0);
//   const [bankDataFormKey, setBankDataFormKey] = useState(0);
//   const [qualificationFormKey, setQualificationFormKey] = useState(0);
//   const [accessRightsFormKey, setAccessRightsFormKey] = useState(0);

//   const formRefs = useRef({
//     "Personal Details": useRef(null),
//     Bank: useRef(null),
//     Qualification: useRef(null),
//     "Access Rights": useRef(null),
//   });

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const handleFinishPersonal = (values) => {
//     setFormDataPersonal(values);
//     setActiveTab("2");
//     nextStep();
//     setPersonalFormKey((prevKey) => prevKey + 1);
//   };

//   const handleFinishQualification = (values) => {
//     setFormDataQualification(values);
//     setActiveTab("6");
//     nextStep();
//     setQualificationFormKey((prevKey) => prevKey + 1);
//   };

//   const handleFinishBankData = (values) => {
//     setFormDataBankData(values);
//     setActiveTab("3");
//     nextStep();
//     setBankDataFormKey((prevKey) => prevKey + 1);
//   };

//   const handleFinishAccessData = (values) => {
    
//     setFormDataAccessData(values);
//     // setActiveTab("5");
//     console.log("access",formDataAccessData )
//     onSaveData();
//     setAccessRightsFormKey((prevKey) => prevKey + 1);
//   };

//   const onSaveData = () => {
//     const combinedFormData = {
//       ...formDataPersonal,
//       ...formDataBankData,
//       ...formDataQualification,
//       ...formDataAccessData,
//     };

//     SaveData(
//       "teachers",
//       combinedFormData,
//       selectedRecordId,
//       setEditModalVisible,
//       setNewModalVisible,
//       () => {
//         resetAllFields();
//         setActiveTab("1"); // Switch back to first tab after submission
//         fetchData(); // Fetch updated data after save (if needed)
//       },
//       fetchData,
//       setCurrentStep,
//       setActiveTab
//     );

//     setSelectedRecordId(null); // Reset selected record ID after save
//   };

//   const resetAllFields = () => {
//     setFormDataPersonal(null);
//     setFormDataBankData(null);
//     setFormDataQualification(null);
//     setFormDataAccessData(null);

//     Object.values(formRefs.current).forEach((formRef) => {
//       if (formRef.current) {
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

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Personal Details" key="1">
//           <Personaldetails
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishPersonal}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Personal Details"].current = form)}
//             key={`PersonalDetails-${personalFormKey}`}
//           />
//         </TabPane>

//         <TabPane tab="Bank" key="2">
//           <BankData
//             recordData={recordData}
//             onFinish={handleFinishBankData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Bank"].current = form)}
//             key={`BankData-${bankDataFormKey}`}
//           />
//         </TabPane>

//         <TabPane tab="Qualification" key="3">
//           <Qualification
//             onFinish={handleFinishQualification}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Qualification"].current = form)}
//             key={`Qualification-${qualificationFormKey}`}
//           />
//         </TabPane>

//         <TabPane tab="Cost Category" key="4" disabled>
//           <CostCategory
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Cost Category"].current = form)}
//           />
//         </TabPane>

//         <TabPane tab="Contracts" key="5" disabled>
//           <Contracts
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Contracts"].current = form)}
//           />
//         </TabPane>

//         <TabPane tab="Access Rights" key="6">
//           <AccessRights
//             recordData={recordData}
//             onFinish={handleFinishAccessData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Access Rights"].current = form)}
//             key={`AccessRights-${accessRightsFormKey}`}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default TeacherForm;

// import React, { useState, useRef, useEffect } from "react";
// import { Tabs } from "antd";
// import Personaldetails from "./Personal_Details";
// import BankData from "./BankData";
// import Contracts from "./Contracts";
// import CostCategory from "./CostCategory";
// import Qualification from "./Qualification";
// import AccessRights from "./AccessRights";
// import { SaveData } from "../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const TeacherForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
//   setSelectedRecordId,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);

//   const [formDataPersonal, setFormDataPersonal] = useState(null);
//   const [formDataBankData, setFormDataBankData] = useState(null);
//   const [formDataQualification, setFormDataQualification] = useState(null);
//   const [formDataAccessData, setFormDataAccessData] = useState(null);

//   const formRefs = useRef({
//     "Personal Details": useRef(null),
//     Bank: useRef(null),
//     Qualification: useRef(null),
//     "Access Rights": useRef(null),
//   });

//   const nextStep = () => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

//   const handleFinishPersonal = (values) => {
//     setFormDataPersonal(values);
//     setActiveTab("2");
//     nextStep();
//   };

//   const handleFinishQualification = (values) => {
//     setFormDataQualification(values);
//     setActiveTab("6");
//     nextStep();
//   };

//   const handleFinishBankData = (values) => {
//     setFormDataBankData(values);
//     setActiveTab("3");
//     nextStep();
//   };

//   const handleFinishAccessData = (values) => {
//     console.log("Access Rights Form Values:", values);
//     setFormDataAccessData(values);
//     console.log("Updated formDataAccessData:", values);
//     // Proceed to save after setting form data
//     onSaveData(values);
//   };

//   const onSaveData = (accessData) => {
//     const combinedFormData = {
//       ...formDataPersonal,
//       ...formDataBankData,
//       ...formDataQualification,
//       ...accessData, // Include access data directly from the function argument
//     };

//     console.log("Combined Form Data to Save:", combinedFormData);

//     SaveData(
//       "teachers",
//       combinedFormData,
//       selectedRecordId,
//       setEditModalVisible,
//       setNewModalVisible,
//       () => {
//         resetAllFields();
//         setActiveTab("1");
//         fetchData();
//       },
//       fetchData,
//       setCurrentStep,
//       setActiveTab
//     );

//     setSelectedRecordId(null);
//   };

//   const resetAllFields = () => {
//     setFormDataPersonal(null);
//     setFormDataBankData(null);
//     setFormDataQualification(null);
//     setFormDataAccessData(null);

//     Object.values(formRefs.current).forEach((formRef) => {
//       if (formRef.current) {
//         formRef.current.resetFields();
//       }
//     });

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
//         <TabPane tab="Personal Details" key="1">
//           <Personaldetails
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishPersonal}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Personal Details"].current = form)}
//           />
//         </TabPane>

//         <TabPane tab="Bank" key="2">
//           <BankData
//             recordData={recordData}
//             onFinish={handleFinishBankData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Bank"].current = form)}
//           />
//         </TabPane>

//         <TabPane tab="Qualification" key="3">
//           <Qualification
//             onFinish={handleFinishQualification}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Qualification"].current = form)}
//           />
//         </TabPane>

//         <TabPane tab="Cost Category" key="4" disabled>
//           <CostCategory
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Cost Category"].current = form)}
//           />
//         </TabPane>

//         <TabPane tab="Contracts" key="5" disabled>
//           <Contracts
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Contracts"].current = form)}
//           />
//         </TabPane>

//         <TabPane tab="Access Rights" key="6">
//           <AccessRights
//             recordData={recordData}
//             onFinish={handleFinishAccessData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Access Rights"].current = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default TeacherForm;




import React, { useState, useEffect } from "react";
import { Tabs, notification, Form } from "antd";
import Personaldetails from "./Personal_Details";
import BankData from "./BankData";
import Qualification from "./Qualification";
import AccessRights from "./AccessRights";
import CostCategory from "./CostCategory";
import Contracts from "./Contracts";
import baseURL from "../../commonComponents/baseURL";

const { TabPane } = Tabs;

const TeacherForm = ({
  selectedRecordId,
  recordData,
  setNewModalVisible,
  setEditModalVisible,
  fetchData,
  CancelBothModel,
  setSelectedRecordId,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [personalForm] = Form.useForm();
  const [bankForm] = Form.useForm();
  const [qualificationForm] = Form.useForm();
  const [accessRightsForm] = Form.useForm();
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
    personalForm.resetFields();
    bankForm.resetFields();
    qualificationForm.resetFields();
    accessRightsForm.resetFields();
    setActiveTab("1");
    console.log("Resetting all fields");
  };

  const handleFinishPersonal = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "teachers",
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

      const collectionName = "teachers";
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

  const handleFinishBankData = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "teachers",
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

      const collectionName = "teachers";
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

  const handleFinishQualification = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "teachers",
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

      const collectionName = "teachers";
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

        setActiveTab("6");
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

  const handleFinishAccessData = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "teachers",
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

      const collectionName = "teachers";
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
        <TabPane tab="Personal Details" key="1">
          <Personaldetails
            form={personalForm}
            onFinish={handleFinishPersonal}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>

        <TabPane tab="Bank" key="2">
          <BankData
            form={bankForm}
            onFinish={handleFinishBankData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>

        <TabPane tab="Qualification" key="3">
          <Qualification
            form={qualificationForm}
            onFinish={handleFinishQualification}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>

        <TabPane tab="Cost Category" key="4" disabled>
           <CostCategory
           form={qualificationForm}
           onFinish={handleFinishQualification}
           CancelBothModel={handleCancelBothModel}
           recordData={recordData}
           submitting={isSubmitting}
          />
        </TabPane>

        <TabPane tab="Contracts" key="5" disabled>
          <Contracts
           form={qualificationForm}
           onFinish={handleFinishQualification}
           CancelBothModel={handleCancelBothModel}
           recordData={recordData}
           submitting={isSubmitting}
          />
        </TabPane>

        <TabPane tab="Access Rights" key="6">
          <AccessRights
            form={accessRightsForm}
            onFinish={handleFinishAccessData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default TeacherForm;
