// import React, { useState, useRef, useEffect } from "react";
// import { Tabs } from "antd";
// import FirstSchoolForm from "./FirstSchoolForm";
// import SettingsSchool from "./SettingsSchool";
// import PricesInvoices from "./PricesInvoices";
// import ClassAccommodation from "./ClassAccommodation";
// import Frontend from "./Frontend";
// import BankDetails from "./BankDetails";
// import Accounting from "./Accounting";
// import Cancellation from "./Cancellation";
// import { SaveData } from "../../../commonComponents/CreateUpdateApi";

// const { TabPane } = Tabs;

// const SchoolForm = ({
//   selectedRecordId,
//   recordData,
//   setNewModalVisible,
//   setEditModalVisible,
//   fetchData,
//   CancelBothModel,
// }) => {
//   const [activeTab, setActiveTab] = useState("1");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formSchoolData, setFormSchoolData] = useState(null);
//   const [formSettingData, setFormSettingData] = useState(null);
//   const [formPriceInvoiceData, setFormPriceInvoiceData] = useState(null);
//   const [formClassAccommodationData, setFormClassAccommodationData] = useState(null);
//   const [formBankDetailData, setFormBankDetailData] = useState(null);
//   const [formFrontendData, setFormFrontendData] = useState(null);
//   const [formAccountingData, setFormAccountingData] = useState(null);
//   const [formCancellationData, setFormCancellationData] = useState(null);

//   const [schoolFormKey, setSchoolFormKey] = useState(0);
//   const [settingFormKey, setSettingFormKey] = useState(0);
//   const [priceInvoiceFormKey, setPriceInvoiceFormKey] = useState(0);
//   const [classAccommodationFormKey, setClassAccommodationFormKey] = useState(0);
//   const [bankDetailFormKey, setBankDetailFormKey] = useState(0);
//   const [frontendFormKey, setFrontendFormKey] = useState(0);
//   const [accountingFormKey, setAccountingFormKey] = useState(0);
//   const [cancellationFormKey, setCancellationFormKey] = useState(0);

//   const schoolFormRef = useRef(null);
//   const settingFormRef = useRef(null);
//   const priceInvoiceFormRef = useRef(null);
//   const classAccommodationFormRef = useRef(null);
//   const bankDetailFormRef = useRef(null);
//   const frontendFormRef = useRef(null);
//   const accountingFormRef = useRef(null);
//   const cancellationFormRef = useRef(null);

//   const handleFinishSchoolData = (values) => {
//     setFormSchoolData(values);
//     setActiveTab("2");
//     setCurrentStep(currentStep + 1);
//   };

//   const handleFinishSettingData = (values) => {
//     setFormSettingData(values);
//     setActiveTab("3");
//     setCurrentStep(currentStep + 1);
//   };

//   const handleFinishPriceInvoiceData = (values) => {
//     setFormPriceInvoiceData(values);
//     setActiveTab("4");
//     setCurrentStep(currentStep + 1);
//   };

//   const handleFinishBankDetailData = (values) => {
//     setFormBankDetailData(values);
//     setActiveTab("5");
//     setCurrentStep(currentStep + 1);
//   };

//   const handleFinishClassAccommodationData = (values) => {
//     setFormClassAccommodationData(values);
//     setActiveTab("6");
//     setCurrentStep(currentStep + 1);
//   };

//   const handleFinishFrontendData = (values) => {
//     setFormFrontendData(values);
//     setActiveTab("7");
//     setCurrentStep(currentStep + 1);
//   };

//   const handleFinishAccountingData = (values) => {
//     setFormAccountingData(values);
//     setCurrentStep(currentStep + 1);
//   };

//   const handleFinishCancellationData = (values) => {
//     setFormCancellationData(values);
//   };

//   useEffect(() => {
//     if (
//       formSchoolData &&
//       formSettingData &&
//       formPriceInvoiceData &&
//       formClassAccommodationData &&
//       formBankDetailData &&
//       formFrontendData &&
//       formAccountingData
//     ) {
//       const combinedFormData = {
//         ...formSchoolData,
//         ...formSettingData,
//         ...formPriceInvoiceData,
//         ...formClassAccommodationData,
//         ...formBankDetailData,
//         ...formFrontendData,
//         ...formAccountingData,
//       };

//       SaveData(
//         "adminschools",
//         combinedFormData,
//         selectedRecordId,
//         setEditModalVisible,
//         setNewModalVisible,
//         () => {
//           resetAllFields();
//           setActiveTab("1"); // Switch back to the first tab after submission
//           fetchData(); // Fetch updated data after save (if needed)
//         },
//         fetchData,
//         setCurrentStep,
//         setActiveTab
//       );
//     }
//   }, [
//     formSchoolData,
//     formSettingData,
//     formPriceInvoiceData,
//     formClassAccommodationData,
//     formBankDetailData,
//     formFrontendData,
//     formAccountingData,
//   ]);

//   const onChange = (key) => {
//     setActiveTab(key);
//   };

//   const resetAllFields = () => {
//     setFormSchoolData(null);
//     setFormSettingData(null);
//     setFormPriceInvoiceData(null);
//     setFormClassAccommodationData(null);
//     setFormBankDetailData(null);
//     setFormFrontendData(null);
//     setFormAccountingData(null);
//     setFormCancellationData(null);

//     if (schoolFormRef.current) schoolFormRef.current.resetFields();
//     if (settingFormRef.current) settingFormRef.current.resetFields();
//     if (priceInvoiceFormRef.current) priceInvoiceFormRef.current.resetFields();
//     if (classAccommodationFormRef.current) classAccommodationFormRef.current.resetFields();
//     if (bankDetailFormRef.current) bankDetailFormRef.current.resetFields();
//     if (frontendFormRef.current) frontendFormRef.current.resetFields();
//     if (accountingFormRef.current) accountingFormRef.current.resetFields();
//     if (cancellationFormRef.current) cancellationFormRef.current.resetFields();

//     setSchoolFormKey((prevKey) => prevKey + 1);
//     setSettingFormKey((prevKey) => prevKey + 1);
//     setPriceInvoiceFormKey((prevKey) => prevKey + 1);
//     setClassAccommodationFormKey((prevKey) => prevKey + 1);
//     setBankDetailFormKey((prevKey) => prevKey + 1);
//     setFrontendFormKey((prevKey) => prevKey + 1);
//     setAccountingFormKey((prevKey) => prevKey + 1);
//     setCancellationFormKey((prevKey) => prevKey + 1);

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
//         <TabPane tab="School" key="1">
//           <FirstSchoolForm
//             key={`SchoolForm-${schoolFormKey}`}
//             selectedRecordId={selectedRecordId}
//             recordData={recordData}
//             onFinish={handleFinishSchoolData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (schoolFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Setting" key="2">
//           <SettingsSchool
//             key={`SettingsSchool-${settingFormKey}`}
//             onFinish={handleFinishSettingData}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (settingFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Prices/Invoices" key="3">
//           <PricesInvoices
//             key={`PricesInvoices-${priceInvoiceFormKey}`}
//             onFinish={handleFinishPriceInvoiceData}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (priceInvoiceFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Bank Details" key="4">
//           <BankDetails
//             key={`BankDetails-${bankDetailFormKey}`}
//             onFinish={handleFinishBankDetailData}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (bankDetailFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Classes Accommodation" key="5">
//           <ClassAccommodation
//             key={`ClassAccommodation-${classAccommodationFormKey}`}
//             onFinish={handleFinishClassAccommodationData}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (classAccommodationFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Frontend" key="6">
//           <Frontend
//             key={`Frontend-${frontendFormKey}`}
//             onFinish={handleFinishFrontendData}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (frontendFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Accounting" key="7">
//           <Accounting
//             key={`Accounting-${accountingFormKey}`}
//             onFinish={handleFinishAccountingData
// }
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (accountingFormRef.current = form)}
//           />
//         </TabPane>
//         <TabPane tab="Cancellation" key="8" disabled>
//           <Cancellation
//             onFinish={handleFinishCancellationData}
//             recordData={recordData}
//             CancelBothModel={CancelBothModel1}
//             formRef={(form) => (cancellationFormRef.current = form)}
//           />
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default SchoolForm;



import React, { useState, useEffect } from "react";
import { Tabs, notification, Form } from "antd";
import FirstSchoolForm from "./FirstSchoolForm";
import SettingsSchool from "./SettingsSchool";
import PricesInvoices from "./PricesInvoices";
import ClassAccommodation from "./ClassAccommodation";
import Frontend from "./Frontend";
import BankDetails from "./BankDetails";
import Accounting from "./Accounting";
import Cancellation from "./Cancellation";
import baseURL from "../../../commonComponents/baseURL";

const { TabPane } = Tabs;

const SchoolForm = ({
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

  const [schoolForm] = Form.useForm();
  const [settingForm] = Form.useForm();
  const [priceInvouceForm] = Form.useForm();
  const [bankDetailsForm] = Form.useForm();

  const [classAccommodationForm] = Form.useForm();
  const [frontendForm] = Form.useForm();
  const [accountingForm] = Form.useForm();

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
    schoolForm.resetFields();
    settingForm.resetFields();
    priceInvouceForm.resetFields();
    bankDetailsForm.resetFields();
    classAccommodationForm.resetFields();
    frontendForm.resetFields();
    accountingForm.resetFields();

    setActiveTab("1");
    setSubmitError(null);
  };

  const handleFinishSchool = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "adminschools",
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

      const collectionName = "adminschools";
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

  const handleFinishSettings = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "adminschools",
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

      const collectionName = "adminschools";
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

  const handleFinishPriceInvoice = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "adminschools",
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

      const collectionName = "adminschools";
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

  const handleFinishBankDetails = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "adminschools",
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

      const collectionName = "adminschools";
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

        setActiveTab("5");
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

  const handleFinishClassAccomodation = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "adminschools",
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

      const collectionName = "adminschools";
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

  const handleFinishFrontend = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "adminschools",
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

      const collectionName = "adminschools";
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

        setActiveTab("7");
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

  const handleFinishAccounting = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        collectionName: "adminschools",
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

      const collectionName = "adminschools";
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
        <TabPane tab="School" key="1">
          <FirstSchoolForm
            form={schoolForm}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishSchool}
            updateCategoryOptions={updateCategoryOptions}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Setting" key="2">
          <SettingsSchool
            form={settingForm}
            onFinish={handleFinishSettings}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Prices/Invoices" key="3">
          <PricesInvoices
            form={priceInvouceForm}
            onFinish={handleFinishPriceInvoice}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Bank Details" key="4">
          <BankDetails
            form={bankDetailsForm}
            onFinish={handleFinishBankDetails}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>

        <TabPane tab="Classes Accommodation" key="5">
          <ClassAccommodation
            form={classAccommodationForm}
            onFinish={handleFinishClassAccomodation}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Frontend" key="6">
          <Frontend
            form={frontendForm}
            onFinish={handleFinishFrontend}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Accounting" key="7">
          <Accounting
            form={accountingForm}
            onFinish={handleFinishAccounting}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
        <TabPane tab="Cancellation" key="8" disabled>
          <Cancellation
            form={accountingForm}
            onFinish={handleFinishSettings}
            recordData={recordData}
            CancelBothModel={handleCancelBothModel}
            submitting={isSubmitting}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default SchoolForm;
