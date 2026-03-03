// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import NewData from "./NewData";
// import Columns from "./Columns";
// import { SaveData } from "../../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const TailorMadeReportForm = ({
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
//       "tailormadereports", // Replace with your collection name
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
//           <NewData
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Columns" key="2">
//           <Columns
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

// export default TailorMadeReportForm;



import React, { useState, useRef, useEffect } from "react";
import { Tabs } from "antd";
import NewData from "./NewData";
import Columns from "./Columns";
import { SaveData } from "../../../commonComponents/CreateUpdateApi";

const { TabPane } = Tabs;

const TailorMadeReportForm = ({
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

  const [newDataFormKey, setNewDataFormKey] = useState(0);
  const [columnsFormKey, setColumnsFormKey] = useState(0);

  const newDataFormRef = useRef(null);
  const columnsFormRef = useRef(null);

  const handleFinishAllData = (values) => {
    setFormDataAllData(values);
  };

  const handleFinishEnquiryData = (values) => {
    setFormDataEnquiryData(values);
  };

  useEffect(() => {
    if (formDataAllData) {
      const combinedFormData = {
        ...formDataAllData,
        // Skip the second form in combine submit
      };

      SaveData(
        "tailormadereports", // Replace with your collection name
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

    if (newDataFormRef.current) newDataFormRef.current.resetFields();
    if (columnsFormRef.current) columnsFormRef.current.resetFields();

    setNewDataFormKey((prevKey) => prevKey + 1);
    setColumnsFormKey((prevKey) => prevKey + 1);

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
        <TabPane tab="Data" key="1">
          <NewData
            key={`NewData-${newDataFormKey}`}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishAllData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (newDataFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="Columns" key="2" disabled>
          <Columns
            key={`Columns-${columnsFormKey}`}
            onFinish={handleFinishEnquiryData}
            recordData={recordData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (columnsFormRef.current = form)}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default TailorMadeReportForm;
