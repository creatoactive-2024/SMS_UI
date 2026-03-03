// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import TermsOfPayment from "./TermsOfPayment";
// import DataSponsor from "./DataSponsor";
// import { SaveData } from "../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const SponsorForm = ({
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
//       // ...formDataEnquiryData,
//     };
//     // Call the saveData function with the combined form data and state reset functions
//     SaveData(
//       "sponsors", // Replace with your collection name
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
// }, [formDataAllData, formDataEnquiryData]);

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
//           <DataSponsor
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}
//           />
//         </TabPane>
//         <TabPane tab="Terms Of Payments" key="2">
//           <TermsOfPayment
//             onFinish={handleFinishEnquiryData}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Enquiry"] = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default SponsorForm;




import React, { useState, useRef, useEffect } from "react";
import { Tabs } from "antd";
import TermsOfPayment from "./TermsOfPayment";
import DataSponsor from "./DataSponsor";
import { SaveData } from "../../commonComponents/CreateUpdateApi";

const { TabPane } = Tabs;

const SponsorForm = ({
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
  const [formDataTermsOfPayment, setFormDataTermsOfPayment] = useState(null);

  const [dataSponsorFormKey, setDataSponsorFormKey] = useState(0);
  const [termsOfPaymentFormKey, setTermsOfPaymentFormKey] = useState(0);

  const dataSponsorFormRef = useRef(null);
  const termsOfPaymentFormRef = useRef(null);

  const handleFinishAllData = (values) => {
    setFormDataAllData(values);
    setActiveTab("2"); // Move to the next tab
    setCurrentStep(currentStep + 1);
  };

  const handleFinishTermsOfPayment = (values) => {
    setFormDataTermsOfPayment(values);
  };

  useEffect(() => {
    if (formDataAllData) {
      const combinedFormData = {
        ...formDataAllData,
      };

      SaveData(
        "sponsors", // Replace with your collection name
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
    setFormDataTermsOfPayment(null);

    if (dataSponsorFormRef.current) dataSponsorFormRef.current.resetFields();
    if (termsOfPaymentFormRef.current)
      termsOfPaymentFormRef.current.resetFields();

    setDataSponsorFormKey((prevKey) => prevKey + 1);
    setTermsOfPaymentFormKey((prevKey) => prevKey + 1);

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
        <TabPane tab="Sponsor details" key="1">
          <DataSponsor
            key={`DataSponsor-${dataSponsorFormKey}`}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishAllData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (dataSponsorFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="Terms Of Payments" key="2" disabled>
          <TermsOfPayment
            key={`TermsOfPayment-${termsOfPaymentFormKey}`}
            onFinish={handleFinishTermsOfPayment}
            recordData={recordData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (termsOfPaymentFormRef.current = form)}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default SponsorForm;
