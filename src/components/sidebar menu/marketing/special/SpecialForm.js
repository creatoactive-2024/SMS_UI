// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import DataSpecial from "./DataSpecial";
// import Overview from "./Overview";
// import { SaveData } from "../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const SpecialForm = ({
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
//   if (formDataAllData) {
//     // Combine the form data pieces
//     const combinedFormData = {
//       ...formDataAllData,
//       ...formDataEnquiryData,
//     };
//     // Call the saveData function with the combined form data and state reset functions
//     SaveData(
//       "specials", // Replace with your collection name
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
//         <TabPane tab="Data" key="1">
//           <DataSpecial
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Overview" key="2">
//           <Overview
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

// export default SpecialForm;

import React, { useState, useRef, useEffect } from "react";
import { Tabs } from "antd";
import DataSpecial from "./DataSpecial";
import Overview from "./Overview";
import { SaveData } from "../../commonComponents/CreateUpdateApi";

const { TabPane } = Tabs;

const SpecialForm = ({
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
  const [formDataOverview, setFormDataOverview] = useState(null);

  const [dataSpecialFormKey, setDataSpecialFormKey] = useState(0);
  const [overviewFormKey, setOverviewFormKey] = useState(0);

  const dataSpecialFormRef = useRef(null);
  const overviewFormRef = useRef(null);

  const handleFinishAllData = (values) => {
    setFormDataAllData(values);
    setActiveTab("2"); // Move to the next tab
    setCurrentStep(currentStep + 1);
  };

  const handleFinishOverview = (values) => {
    setFormDataOverview(values);
  };

  useEffect(() => {
    if (formDataAllData) {
      const combinedFormData = {
        ...formDataAllData,
        // Skip the second form in combine submit
      };

      SaveData(
        "specials", // Replace with your collection name
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
    setFormDataOverview(null);

    if (dataSpecialFormRef.current) dataSpecialFormRef.current.resetFields();
    if (overviewFormRef.current) overviewFormRef.current.resetFields();

    setDataSpecialFormKey((prevKey) => prevKey + 1);
    setOverviewFormKey((prevKey) => prevKey + 1);

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
        <TabPane tab="Details" key="1">
          <DataSpecial
            key={`DataSpecial-${dataSpecialFormKey}`}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishAllData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (dataSpecialFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="Overview" key="2" disabled>
          <Overview
            key={`Overview-${overviewFormKey}`}
            onFinish={handleFinishOverview}
            recordData={recordData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (overviewFormRef.current = form)}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default SpecialForm;
