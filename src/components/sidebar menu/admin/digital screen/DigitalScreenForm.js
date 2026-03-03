// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import ScreenSettings from "./ScreenSettings";
// import ScheduleScreen from "./ScheduleScreen";
// import { SaveData } from "../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const DigitalScreenForm = ({
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
//     // setActiveTab("2");
//     // nextStep();
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

//     };
//     // Call the saveData function with the combined form data and state reset functions
//     SaveData(
//       "digitalscreens", // Replace with your collection name
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
//         <TabPane tab="Settings" key="1">
//           <ScreenSettings
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Schedule" key="2">
//           <ScheduleScreen
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

// export default DigitalScreenForm;

import React, { useState, useEffect, useRef } from "react";
import { Tabs } from "antd";
import ScreenSettings from "./ScreenSettings";
import ScheduleScreen from "./ScheduleScreen";
import { SaveData } from "../../commonComponents/CreateUpdateApi";
const { TabPane } = Tabs;

const DigitalScreenForm = ({
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

  const [receiptTemplateFormKey, setReceiptTemplateFormKey] = useState(0);
  const [placeholderFormKey, setPlaceholderFormKey] = useState(0);

  const receiptTemplateFormRef = useRef(null);
  const placeholderFormRef = useRef(null);

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
        "digitalscreens", // Replace with your collection name
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

    if (receiptTemplateFormRef.current)
      receiptTemplateFormRef.current.resetFields();
    if (placeholderFormRef.current) placeholderFormRef.current.resetFields();

    setReceiptTemplateFormKey((prevKey) => prevKey + 1);
    setPlaceholderFormKey((prevKey) => prevKey + 1);

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
        <TabPane tab="Templates" key="1">
          <ScreenSettings
            key={`ReceiptTemplate-${receiptTemplateFormKey}`}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishAllData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (receiptTemplateFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="Placeholder" key="2" disabled>
          <ScheduleScreen
            key={`Placeholder-${placeholderFormKey}`}
            onFinish={handleFinishEnquiryData}
            recordData={recordData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (placeholderFormRef.current = form)}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default DigitalScreenForm;
