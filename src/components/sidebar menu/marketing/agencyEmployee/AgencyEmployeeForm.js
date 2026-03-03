import React, { useState, useRef, useEffect } from "react";
import { Tabs } from "antd";
import Detail from "./Detail";
import Uploads from "./Uploads";
import ResponsiblrFor from "./ResponsiblrFor";

import { SaveData } from "../../commonComponents/CreateUpdateApi";

const { TabPane } = Tabs;

const AgencyEmployeeForm = ({
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
    // setActiveTab("2");
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
        "agencyemployees", // Replace with your collection name
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
        <TabPane tab="Employee details" key="1">
          <Detail
            key={`DataSponsor-${dataSponsorFormKey}`}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishAllData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (dataSponsorFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="Uploads" key="2" disabled>
          <Uploads
            key={`TermsOfPayment-${termsOfPaymentFormKey}`}
            onFinish={handleFinishTermsOfPayment}
            recordData={recordData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (termsOfPaymentFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="ResponsiblrFor" key="3" disabled>
          <ResponsiblrFor
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

export default AgencyEmployeeForm;
