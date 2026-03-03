// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, } from "antd";
// import EmailSetting from "./EmailSetting";
// import EmailImages from "./EmailImages";
// import { SaveData } from "../../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const EmailLayoutHtmlForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");

//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataAllData, setFormDataAllData] = useState(null);
//   const [formDataEnquiryData, setFormDataEnquiryData] = useState(null);
//   const formRefs = useRef({});

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinishAllData = (values) => {
//     setFormDataAllData(values);
//     setActiveTab("2"); // Move to the next tab
//     nextStep();
//   };

//   const handleFinishEnquiryData = (values) => {
//     setFormDataEnquiryData(values);
//   };

//   const stateResetFunctions = [formDataAllData, formDataEnquiryData];

// // Use the useEffect hook to trigger the saveData function when form data changes
// useEffect(() => {
//   // Check if both form data pieces are available
//   if (formDataAllData ) {
//     // Combine the form data pieces
//     const combinedFormData = {
//       ...formDataAllData,
//       ...formDataEnquiryData,
//     };
//     // Call the saveData function with the combined form data and state reset functions
//     SaveData(
//       "emailhtmllayouts", // Replace with your collection name
//       combinedFormData,
//       selectedRecordId, // Pass the selected record ID (can be null for new records)
//       setEditModalVisible,
//       setNewModalVisible,
//       resetAllFields,
//       fetchData,
//       setCurrentStep,
//       setActiveTab,
//       stateResetFunctions // Pass the array of state reset functions
//     );
//   }
// }, [formDataAllData]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     Object.values(formRefs.current).forEach((form) => {
//       form.resetFields();
//     });
//   };
//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllFields();
//     // console.log("its running");
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Setting" key="1">
//           <EmailSetting
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Images" key="2">
//           <EmailImages
//             onFinish={handleFinishEnquiryData}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Enquiry"] = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default EmailLayoutHtmlForm;

import React, { useState, useEffect, useRef } from "react";
import { Tabs } from "antd";
import EmailSetting from "./EmailSetting";
import EmailImages from "./EmailImages";
import { SaveData } from "../../../commonComponents/CreateUpdateApi";

const { TabPane } = Tabs;

const EmailLayoutHtmlForm = ({
  selectedRecordId,
  recordData,
  setNewModalVisible,
  setEditModalVisible,
  fetchData,
  CancelBothModel,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [currentStep, setCurrentStep] = useState(1);
  const [formDataAllData, setFormDataAllData] = useState(null);
  const [formDataEnquiryData, setFormDataEnquiryData] = useState(null);

  const [emailSettingFormKey, setEmailSettingFormKey] = useState(0);
  const [emailImagesFormKey, setEmailImagesFormKey] = useState(0);

  const emailSettingFormRef = useRef(null);
  const emailImagesFormRef = useRef(null);

  const handleFinishAllData = (values) => {
    setFormDataAllData(values);
    setActiveTab("2"); // Move to the next tab
    setCurrentStep(currentStep + 1);
  };

  const handleFinishEnquiryData = (values) => {
    setFormDataEnquiryData(values);
  };

  useEffect(() => {
    if (formDataAllData) {
      const combinedFormData = {
        ...formDataAllData,
      };

      SaveData(
        "emailhtmllayouts", // Replace with your collection name
        combinedFormData,
        selectedRecordId,
        setEditModalVisible,
        setNewModalVisible,
        () => {
          resetAllFields();
          setActiveTab("1"); // Switch back to the first tab after submission
          fetchData(); // Fetch updated data after save (if needed)
        },
        fetchData,
        setCurrentStep,
        setActiveTab
      );
    }
  }, [formDataAllData]);

  const onChange = (key) => {
    setActiveTab(key);
  };

  const resetAllFields = () => {
    setFormDataAllData(null);
    setFormDataEnquiryData(null);

    if (emailSettingFormRef.current) emailSettingFormRef.current.resetFields();
    if (emailImagesFormRef.current) emailImagesFormRef.current.resetFields();

    setEmailSettingFormKey((prevKey) => prevKey + 1);
    setEmailImagesFormKey((prevKey) => prevKey + 1);

    setCurrentStep(1); // Reset step to 1
  };

  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
    setActiveTab("1");
  };

  return (
    <>
      <Tabs centered onChange={onChange} activeKey={activeTab}>
        <TabPane tab="Setting" key="1">
          <EmailSetting
            key={`EmailSetting-${emailSettingFormKey}`}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishAllData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (emailSettingFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="Images" key="2" disabled>
          <EmailImages
            key={`EmailImages-${emailImagesFormKey}`}
            onFinish={handleFinishEnquiryData}
            recordData={recordData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (emailImagesFormRef.current = form)}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default EmailLayoutHtmlForm;
