// import React, { useState,useRef,useEffect  } from "react";
// import { Tabs, notification ,Form} from "antd";
// import baseURL from "../../../../../config";
// import SettingSms from "./SettingSms";
// import PlaceholderSms from "./PlaceholderSms";
// import ExampleSms from "./ExampleSms";
// import { SaveData } from "../../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const SmsTemplateForm = ({ selectedRecordId, recordData, updateCategoryOptions, setNewModalVisible, setEditModalVisible,fetchData,CancelBothModel }) => {
//   const [activeTab, setActiveTab] = useState("1");

//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataCourseData, setFormDataCourseData] = useState(null);
//   const [formDataCourseDocument, setFormDataCourseDocument] = useState(null);
//   const [formDataCourseFrontend, setFormDataCourseFrontend] = useState(null);
//   const [form] = Form.useForm();
//   const formRefs = useRef({});

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinishAllData = (values) => {
//     setFormDataCourseData(values);
//     // setActiveTab("2");
//     // nextStep();

//   };

//   const handleFinishCourseDocument = (values) => {
//     setFormDataCourseDocument(values);
//     // setActiveTab("3");
//   };

//   const handleFinishCourseFrontend = (values) => {
//     setFormDataCourseFrontend(values);

//       };

//       const stateResetFunctions = [formDataCourseData];

//       // Use the useEffect hook to trigger the saveData function when form data changes
//       useEffect(() => {
//         // Check if both form data pieces are available
//         if (formDataCourseData) {
//           // Combine the form data pieces
//           const combinedFormData = {
//             ...formDataCourseData,
//             // ...formDataCourseDocument,
//             // ...formDataCourseFrontend,
//           };
//           // Call the saveData function with the combined form data and state reset functions
//           SaveData(
//             "smstemplates", // Replace with your collection name
//             combinedFormData,
//             selectedRecordId, // Pass the selected record ID (can be null for new records)
//             setEditModalVisible,
//             setNewModalVisible,
//             resetAllFields,
//             fetchData,
//             setCurrentStep,
//             setActiveTab,
//             stateResetFunctions // Pass the array of state reset functions
//           );
//         }
//       }, [formDataCourseData]);

//   const resetAllFields = () => {
//     Object.values(formRefs.current).forEach((form) => {
//         form.resetFields();
//     });
// };
//   const CancelBothModel1= () =>{
//     CancelBothModel();
//     resetAllFields();
//       // console.log("its running");
//   }

//   const onChange = (key) => {
//     setActiveTab(key);

//     console.log(key);
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Settings" key="1">
//           <SettingSms
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             updateCategoryOptions={updateCategoryOptions}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}

//           />
//         </TabPane>
//         <TabPane tab="Placeholder" key="2">
//           <PlaceholderSms
//             onFinish={handleFinishCourseDocument}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Document"] = form)}

//           />
//         </TabPane>
//         <TabPane tab="Examples" key="3">
//           <ExampleSms
//             onFinish={handleFinishCourseFrontend}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Frontend"] = form)}

//           />
//         </TabPane>
//       </Tabs>

//     </>
//   );
// };

// export default SmsTemplateForm;

import React, { useState, useEffect, useRef } from "react";
import { Tabs, Form } from "antd";
import SettingSms from "./SettingSms";
import PlaceholderSms from "./PlaceholderSms";
import ExampleSms from "./ExampleSms";
import { SaveData } from "../../../commonComponents/CreateUpdateApi";

const { TabPane } = Tabs;

const SmsTemplateForm = ({
  selectedRecordId,
  recordData,
  updateCategoryOptions,
  setNewModalVisible,
  setEditModalVisible,
  fetchData,
  CancelBothModel,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [currentStep, setCurrentStep] = useState(1);
  const [formDataAllData, setFormDataAllData] = useState(null);

  const [receiptTemplateFormKey, setReceiptTemplateFormKey] = useState(0);
  const [placeholderFormKey, setPlaceholderFormKey] = useState(0);

  const receiptTemplateFormRef = useRef(null);
  const placeholderFormRef = useRef(null);

  const handleFinishAllData = (values) => {
    setFormDataAllData(values);
    setActiveTab("2");
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    if (formDataAllData) {
      const combinedFormData = {
        ...formDataAllData,
      };

      SaveData(
        "smstemplates", // Replace with your collection name
        combinedFormData,
        selectedRecordId,
        setEditModalVisible,
        setNewModalVisible,
        () => {
          resetAllFields();
          setActiveTab("1");
          fetchData();
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

    if (receiptTemplateFormRef.current)
      receiptTemplateFormRef.current.resetFields();
    if (placeholderFormRef.current) placeholderFormRef.current.resetFields();

    setReceiptTemplateFormKey((prevKey) => prevKey + 1);
    setPlaceholderFormKey((prevKey) => prevKey + 1);

    setCurrentStep(1);
  };

  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
    setActiveTab("1");
  };

  return (
    <>
      <Tabs centered onChange={onChange} activeKey={activeTab}>
        <TabPane tab="Settings" key="1">
          <SettingSms
            key={`SettingSms-${receiptTemplateFormKey}`}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishAllData}
            updateCategoryOptions={updateCategoryOptions}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (receiptTemplateFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="Placeholder" key="2" disabled>
          <PlaceholderSms
            key={`PlaceholderSms-${placeholderFormKey}`}
            onFinish={handleFinishAllData} // Ensure this does not change formDataAllData
            recordData={recordData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (placeholderFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="Examples" key="3" disabled>
          <ExampleSms
            key={`ExampleSms-${placeholderFormKey}`}
            onFinish={handleFinishAllData} // Ensure this does not change formDataAllData
            recordData={recordData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (placeholderFormRef.current = form)}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default SmsTemplateForm;
