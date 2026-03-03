// // EnquiryForm.js
// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import AllData from "./AllData";
// import EnquiryData from "./EnquiryData";
// import { SaveData } from "../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const EnquiryForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel, form, formValues, setFormValues,
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
//   if (formDataAllData && formDataEnquiryData) {
//     // Combine the form data pieces
//     const combinedFormData = {
//       ...formDataAllData,
//       ...formDataEnquiryData,
//     };
//     // Call the saveData function with the combined form data and state reset functions
//     SaveData(
//       "enquiries", // Replace with your collection name
//       combinedFormData,
//       selectedRecordId, // Pass the selected record ID (can be null for new records)
//       setEditModalVisible,
//       setNewModalVisible,
//       () => {
//         resetAllFields(); // Call resetAllFields after SaveData completes
//       },      fetchData,
//       setCurrentStep,
//       setActiveTab,
//       stateResetFunctions // Pass the array of state reset functions
//     );
//     resetAllFields();

//   }
// }, [formDataAllData, formDataEnquiryData]); 

 
//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     setFormDataAllData(null);
//   setFormDataEnquiryData(null);
//   Object.values(formRefs.current).forEach((form) => {
//     form.resetFields();
//   });
//   console.log("Resetting all fields");

//   };
//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllFields();
//     console.log("Canceling both models");
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Data" key="1">
//           <AllData
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}
//             formValues={formValues} 
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Enquiry" key="2">
//           <EnquiryData
//             onFinish={handleFinishEnquiryData}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Enquiry"] = form)}
//             formValues={formValues} 
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default EnquiryForm;






// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import AllData from "./AllData";
// import EnquiryData from "./EnquiryData";
// import { SaveData } from "../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const EnquiryForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
//   formValues,
//   setFormValues,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataAllData, setFormDataAllData] = useState(null);
//   const [formDataEnquiryData, setFormDataEnquiryData] = useState(null);
//   const [formKey, setFormKey] = useState(0); // State to manage form key
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
//     setFormKey((prevKey) => prevKey + 1); // Increment key to reset forms
//   };

//   const handleFinishEnquiryData = (values) => {
//     setFormDataEnquiryData(values);
//   };

//   useEffect(() => {
//     if (formDataAllData && formDataEnquiryData) {
//       const combinedFormData = {
//         ...formDataAllData,
//         ...formDataEnquiryData,
//       };

//       SaveData(
//         "enquiries", // Replace with your collection name
//         combinedFormData,
//         selectedRecordId, // Pass the selected record ID (can be null for new records)
//         setEditModalVisible,
//         setNewModalVisible,
//         () => {
//           resetAllFields(); // Call resetAllFields after SaveData completes
//         },
//         fetchData,
//         setCurrentStep,
//         setActiveTab
//       );
//       resetAllFields(); // Reset fields immediately after initiating save
//     }
//   }, [formDataAllData, formDataEnquiryData, formKey]); // Include formKey in dependency array

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     setFormDataAllData(null);
//     setFormDataEnquiryData(null);
//     Object.values(formRefs.current).forEach((form) => {
//       form.resetFields(); // Reset each form's fields
//     });
//     console.log("Resetting all fields");
//   };

//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllFields();
//     console.log("Canceling both models");
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Data" key="1">
//           <AllData
//             key={`AllData-${formKey}`} // Key prop with dynamic value
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Data"] = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Enquiry" key="2">
//           <EnquiryData
//             key={`EnquiryData-${formKey}`} // Key prop with dynamic value
//             onFinish={handleFinishEnquiryData}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (formRefs.current["Enquiry"] = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default EnquiryForm;


// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import AllData from "./AllData";
// import EnquiryData from "./EnquiryData";
// import { SaveData } from "../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const EnquiryForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
//   formValues,
//   setFormValues,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formDataAllData, setFormDataAllData] = useState(null);
//   const [formDataEnquiryData, setFormDataEnquiryData] = useState(null);
//   const [allDataFormKey, setAllDataFormKey] = useState(0); // Key for AllData form
//   const [enquiryDataFormKey, setEnquiryDataFormKey] = useState(0); // Key for EnquiryData form
//   const allDataFormRef = useRef(null);
//   const enquiryDataFormRef = useRef(null);

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
//     setAllDataFormKey((prevKey) => prevKey + 1); // Increment key to reset AllData form
//   };

//   const handleFinishEnquiryData = (values) => {
//     setFormDataEnquiryData(values);
//     setEnquiryDataFormKey((prevKey) => prevKey + 1); // Increment key to reset EnquiryData form
//   };

//   useEffect(() => {
//     if (formDataAllData && formDataEnquiryData) {
//       const combinedFormData = {
//         ...formDataAllData,
//         ...formDataEnquiryData,
//       };

//       SaveData(
//         "enquiries", // Replace with your collection name
//         combinedFormData,
//         selectedRecordId, // Pass the selected record ID (can be null for new records)
//         setEditModalVisible,
//         setNewModalVisible,
//         () => {
//           resetAllDataFields(); // Call resetAllDataFields after SaveData completes
//           resetEnquiryDataFields(); // Call resetEnquiryDataFields after SaveData completes
//           setActiveTab("1")
//         },
//         fetchData,
//         setCurrentStep,
//         setActiveTab
//       );
//     }
//   }, [formDataAllData, formDataEnquiryData, allDataFormKey, enquiryDataFormKey]); // Include form keys in dependency array

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllDataFields = () => {
//     setFormDataAllData(null);
//     allDataFormRef.current.resetFields();
//     console.log("Resetting AllData fields");
//   };

//   const resetEnquiryDataFields = () => {
//     setFormDataEnquiryData(null);
//     enquiryDataFormRef.current.resetFields();
//     console.log("Resetting EnquiryData fields");
//   };

//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllDataFields();
//     resetEnquiryDataFields();
//     console.log("Canceling both models");
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Data" key="1">
//           <AllData
//             key={`AllData-${allDataFormKey}`} // Key prop for AllData form
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (allDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Enquiry" key="2">
//           <EnquiryData
//             key={`EnquiryData-${enquiryDataFormKey}`} // Key prop for EnquiryData form
//             onFinish={handleFinishEnquiryData}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (enquiryDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default EnquiryForm;


















// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import AllData from "./AllData";
// import EnquiryData from "./EnquiryData";
// import { SaveData } from "../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const EnquiryForm = ({
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
//   const [formDataAllData, setFormDataAllData] = useState(null);
//   const [formDataEnquiryData, setFormDataEnquiryData] = useState(null);
//   const [allDataFormKey, setAllDataFormKey] = useState(0);
//   const [enquiryDataFormKey, setEnquiryDataFormKey] = useState(0);
//   const allDataFormRef = useRef(null);
//   const enquiryDataFormRef = useRef(null);
//   const formRefs = useRef({});

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinishAllData = (values) => {
//     setFormDataAllData(values);
//     setActiveTab("2");
//     nextStep();
//     setAllDataFormKey((prevKey) => prevKey + 1);
//   };

//   const handleFinishEnquiryData = (values) => {
//     setFormDataEnquiryData(values);
//     setEnquiryDataFormKey((prevKey) => prevKey + 1);
//   };

//   useEffect(() => {
//     if (formDataAllData && formDataEnquiryData) {
//       const combinedFormData = {
//         ...formDataAllData,
//         ...formDataEnquiryData,
//       };

//       SaveData(
//         "enquiries",
//         combinedFormData,
//         selectedRecordId,
//         setEditModalVisible,
//         setNewModalVisible,
//         () => {
//           resetAllDataFields();
//           resetEnquiryDataFields();
//           setActiveTab("1"); // Switch back to first tab after submission
//         },
//         fetchData,
//         setCurrentStep,
//         setActiveTab
//       );
//       setActiveTab("1");
//       setSelectedRecordId(null);
//     }
//   }, [formDataAllData, formDataEnquiryData, allDataFormKey, enquiryDataFormKey]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllDataFields = () => {
//     setFormDataAllData(null);
//     allDataFormRef.current.resetFields();
//     console.log("Resetting AllData fields");
//   };

//   const resetEnquiryDataFields = () => {
//     setFormDataEnquiryData(null);
//     enquiryDataFormRef.current.resetFields();
//     console.log("Resetting EnquiryData fields");
//     setActiveTab("1"); 

//     setCurrentStep(1);
   
//   };
//   const resetAllFields = () => {
//     setFormDataAllData(null);
//   setFormDataEnquiryData(null);
//   Object.values(formRefs.current).forEach((form) => {
//     form.resetFields();
//   });
//   console.log("Resetting all fields");

// }
//   const CancelBothModel1 = () => {
//         CancelBothModel();
//         resetAllFields();
//         console.log("Canceling both models");
//         setActiveTab("1");
//       };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Data" key="1">
//           <AllData
//             key={`AllData-${allDataFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (allDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Enquiry" key="2">
//           <EnquiryData
//             key={`EnquiryData-${enquiryDataFormKey}`}
//             onFinish={handleFinishEnquiryData}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (enquiryDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default EnquiryForm;





// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import AllData from "./AllData";
// import EnquiryData from "./EnquiryData";
// import { SaveData } from "../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const EnquiryForm = ({
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
//   const [formDataAllData, setFormDataAllData] = useState(null);
//   const [formDataEnquiryData, setFormDataEnquiryData] = useState(null);
//   const [allDataFormKey, setAllDataFormKey] = useState(0);
//   const [enquiryDataFormKey, setEnquiryDataFormKey] = useState(0);
//   const allDataFormRef = useRef(null);
//   const enquiryDataFormRef = useRef(null);
//   const formRefs = useRef({});

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFinishAllData = (values) => {
//     setFormDataAllData(values);
//     setActiveTab("2");
//     nextStep();
//     setAllDataFormKey((prevKey) => prevKey + 1);
//   };

//   const handleFinishEnquiryData = (values) => {
//     setFormDataEnquiryData(values);
//     setEnquiryDataFormKey((prevKey) => prevKey + 1);
//   };

//   useEffect(() => {
//     if (formDataAllData && formDataEnquiryData) {
//       const combinedFormData = {
//         ...formDataAllData,
//         ...formDataEnquiryData,
//       };

//       SaveData(
//         "enquiries",
//         combinedFormData,
//         selectedRecordId,
//         setEditModalVisible,
//         setNewModalVisible,
//         () => {
//           resetAllDataFields();
//           resetEnquiryDataFields();
//           setActiveTab("1"); // Switch back to first tab after submission
//         },
//         fetchData,
//         setCurrentStep,
//         setActiveTab
//       );
//       setSelectedRecordId(null); // Reset selected record ID after save
//     }
//   }, [formDataAllData, formDataEnquiryData, allDataFormKey, enquiryDataFormKey]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllDataFields = () => {
//     setFormDataAllData(null);
//     allDataFormRef.current.resetFields();
//     setAllDataFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//     setCurrentStep(1); // Reset step to 1
//   };

//   const resetEnquiryDataFields = () => {
//     setFormDataEnquiryData(null);
//     enquiryDataFormRef.current.resetFields();
//     setEnquiryDataFormKey((prevKey) => prevKey + 1); // Reset form key to trigger re-render
//   };

//   const resetAllFields = () => {
//     resetAllDataFields();
//     resetEnquiryDataFields();
//   };

//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllFields();
//     setActiveTab("1");
//   };

//   return (
//     <>
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Data" key="1">
//           <AllData
//             key={`AllData-${allDataFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (allDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Enquiry" key="2">
//           <EnquiryData
//             key={`EnquiryData-${enquiryDataFormKey}`}
//             onFinish={handleFinishEnquiryData}
//             recordData={recordData}
//             onFinish1={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (enquiryDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default EnquiryForm;




// last imp code


// import React, { useState, useRef, useEffect } from "react";
// import { Tabs } from "antd";
// import AllData from "./AllData";
// import EnquiryData from "./EnquiryData";
// import { SaveData } from "../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const EnquiryForm = ({
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
//         "enquiries",
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
//         <TabPane tab="Student details" key="1">
//           <AllData
//             key={`AllData-${allDataFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishAllData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (allDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//         <TabPane tab="Enquiry" key="2">
//           <EnquiryData
//             key={`EnquiryData-${enquiryDataFormKey}`}
//             recordData={recordData}
//             onFinish={handleFinishEnquiryData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (enquiryDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default EnquiryForm;


// last multistep good code

// import React, { useState, useRef, useEffect } from "react";
// import { Tabs, notification } from "antd";
// import AllData from "./AllData";
// import EnquiryData from "./EnquiryData";
// import baseURL from "../commonComponents/baseURL";

// const { TabPane } = Tabs;

// const EnquiryForm = ({
//   selectedRecordId,
//   setNewModalVisible,
//   setEditModalVisible,
//   CancelBothModel,
//   fetchData,
//   formValues,
//   setFormValues,
//   setSelectedRecordId,
//   recordData,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const allDataFormRef = useRef(null);
//   const enquiryDataFormRef = useRef(null);
//   const [createdRecordId, setCreatedRecordId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   useEffect(() => {
//     if (recordData && recordData._id) {
//       setSelectedRecordId(recordData._id);
//     }
//   }, [recordData, setSelectedRecordId]);

//   const handleFinishAllData = async (values) => {
//     setIsSubmitting(true);
//     setSubmitError(null);
//     try {
//       const requestData = {
//         collectionName: "enquiries",
//         data: selectedRecordId ? { _id: selectedRecordId, ...values } : values,
//       };

//       if (!selectedRecordId) {
//         delete requestData.data._id; // Ensure _id is null for new records in first tab
//       }

//       const response = await fetch(`${baseURL}/createdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([requestData]),
//       });

//       const data = await response.json();
//       console.log("API Response:", data);

//       const collectionName = "enquiries"; // Make sure this matches your actual collection name
//       if (
//         data[0]?.message.includes(
//           `Document created successfully for collection: ${collectionName}.`
//         ) ||
//         data[0]?.message.includes(
//           `Document updated successfully for collection: ${collectionName}.`
//         )
//       ) {
//         notification.success({
//           message: "Success",
//           description: "Data saved successfully!",
//         });

//         const createdId = data[0]?.data?._id;
//         if (!createdId && !selectedRecordId) {
//           throw new Error("API response does not contain the expected '_id' field.");
//         }

//         if (setFormValues) {
//           setFormValues(data[0]?.data); // Ensure setFormValues is only called if defined
//         }

//         if (!selectedRecordId) {
//           setCreatedRecordId(createdId);
//           setSelectedRecordId(createdId); // Set selectedRecordId to the created ID for subsequent tabs
//         }
//         setActiveTab("2");

//         if (allDataFormRef.current) {
//           allDataFormRef.current.resetFields();
//         }
//       } else {
//         notification.error({
//           message: "Error",
//           description: "Failed to save data. Please try again.",
//         });
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//       setSubmitError(`Error saving data: ${error.message}`);
//       notification.error({
//         message: "Error",
//         description: `Error saving data: ${error.message}`,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleFinishEnquiryData = async (values) => {
//     setIsSubmitting(true);
//     setSubmitError(null);
//     try {
//       const requestData = {
//         collectionName: "enquiries",
//         data: { _id: createdRecordId || selectedRecordId, ...values },
//       };

//       const response = await fetch(`${baseURL}/createdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([requestData]),
//       });

//       const data = await response.json();
//       console.log("API Response:", data);

//       const collectionName = "enquiries"; // Make sure this matches your actual collection name
//       if (
//         data[0]?.message.includes(
//           `Document created successfully for collection: ${collectionName}.`
//         ) ||
//         data[0]?.message.includes(
//           `Document updated successfully for collection: ${collectionName}.`
//         )
//       ) {
//         notification.success({
//           message: "Success",
//           description: "Data saved successfully!",
//         });

//         if (selectedRecordId) {
//           setActiveTab("1");
//           setEditModalVisible(false);
//         } else {
//           setActiveTab("1");
//           setNewModalVisible(false);
//         }

//         fetchData();

//         if (enquiryDataFormRef.current) {
//           enquiryDataFormRef.current.resetFields();
//         }
//       } else {
//         notification.error({
//           message: "Error",
//           description: "Failed to save data. Please try again.",
//         });
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//       setSubmitError(`Error saving data: ${error.message}`);
//       notification.error({
//         message: "Error",
//         description: `Error saving data: ${error.message}`,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancelBothModel = () => {
//     CancelBothModel();
//     if (allDataFormRef.current) {
//       allDataFormRef.current.resetFields();
//     }
//     if (enquiryDataFormRef.current) {
//       enquiryDataFormRef.current.resetFields();
//     }
//     setActiveTab("1");
//     setSubmitError(null);
//   };

//   const onChange = (activeKey) => {
//     setActiveTab(activeKey);
//   };

//   return (
//     <>
//       {submitError && (
//         <div style={{ marginBottom: "10px", textAlign: "center" }}>
//           <p style={{ color: "red" }}>{submitError}</p>
//         </div>
//       )}
//       <Tabs centered onChange={onChange} activeKey={activeTab}>
//         <TabPane tab="Student details" key="1">
//           <AllData
//             onFinish={handleFinishAllData}
//             CancelBothModel={handleCancelBothModel}
//             formRef={(form) => (allDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//             recordData={recordData}
//             submitting={isSubmitting}
//           />
//         </TabPane>
//         <TabPane tab="Enquiry" key="2">
//           <EnquiryData
//             onFinish={handleFinishEnquiryData}
//             CancelBothModel={handleCancelBothModel}
//             formRef={(form) => (enquiryDataFormRef.current = form)}
//             formValues={formValues}
//             setFormValues={setFormValues}
//             recordData={recordData}
//             submitting={isSubmitting}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default EnquiryForm;

import React, { useEffect, useState } from 'react';
import { Tabs, notification, Form } from 'antd';
import AllData from './AllData';
import EnquiryData from './EnquiryData';
import baseURL from '../commonComponents/baseURL';

const { TabPane } = Tabs;

const EnquiryForm = ({
  selectedRecordId,
  setNewModalVisible,
  setEditModalVisible,
  CancelBothModel,
  fetchData,
  recordData,
  setSelectedRecordId,
}) => {
  const [activeTab, setActiveTab] = useState('1');
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
    setActiveTab('1');
    console.log('Resetting all fields');
  };

  const handleFinishAllData = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: 'enquiries',
        data: selectedRecordId ? { _id: selectedRecordId, ...values } : values,
      };

      const response = await fetch(`${baseURL}/createdata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([requestData]),
      });

      const data = await response.json();
      console.log('API Response:', data);

      const collectionName = 'enquiries';
      if (
        data[0]?.message.includes(
          `Document created successfully for collection: ${collectionName}.`
        ) ||
        data[0]?.message.includes(
          `Document updated successfully for collection: ${collectionName}.`
        )
      ) {
        notification.success({
          message: 'Success',
          description: 'Data saved successfully!',
        });

        const createdId = data[0].data?._id;
        if (!selectedRecordId) {
          setCreatedRecordId(createdId);
          setSelectedRecordId(createdId);
        }
        setActiveTab('2');
      } else {
        notification.error({
          message: 'Error',
          description: 'Failed to save data. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setSubmitError(`Error saving data: ${error.message}`);
      notification.error({
        message: 'Error',
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
        collectionName: 'enquiries',
        data: { _id: createdRecordId || selectedRecordId, ...values },
      };

      const response = await fetch(`${baseURL}/createdata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([requestData]),
      });

      const data = await response.json();
      console.log('API Response:', data);

      const collectionName = 'enquiries';
      if (
        data[0]?.message.includes(
          `Document created successfully for collection: ${collectionName}.`
        ) ||
        data[0]?.message.includes(
          `Document updated successfully for collection: ${collectionName}.`
        )
      ) {
        notification.success({
          message: 'Success',
          description: 'Data saved successfully!',
        });

        if (selectedRecordId) {
          setEditModalVisible(false);
        } else {
          setNewModalVisible(false);
        }

        fetchData();
        resetAllFields(); // Reset fields after successful submission
        setSelectedRecordId(null);
        setActiveTab('1');
      } else {
        notification.error({
          message: 'Error',
          description: 'Failed to save data. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setSubmitError(`Error saving data: ${error.message}`);
      notification.error({
        message: 'Error',
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
      {submitError && (
        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
          <p style={{ color: 'red' }}>{submitError}</p>
        </div>
      )}
      <Tabs centered onChange={onChange} activeKey={activeTab}>
        <TabPane tab="Student details" key="1">
          <AllData
            form={allDataForm} // Pass the form instance
            onFinish={handleFinishAllData}
            CancelBothModel={handleCancelBothModel}
            recordData={recordData}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Enquiry" key="2">
          <EnquiryData
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

export default EnquiryForm;
