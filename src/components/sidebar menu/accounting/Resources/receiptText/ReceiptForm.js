import React, { useState, useEffect, useRef } from "react";
import { Tabs } from "antd";
import ReceiptTemplate from "./ReceiptTemplate";
import Placeholder from "./Placeholder";
import { SaveData } from "../../../commonComponents/CreateUpdateApi";

const { TabPane } = Tabs;

const ReceiptForm = ({
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
        "templatereceipttexts", // Replace with your collection name
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
          <ReceiptTemplate
            key={`ReceiptTemplate-${receiptTemplateFormKey}`}
            selectedRecordId={selectedRecordId}
            recordData={recordData}
            onFinish={handleFinishAllData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (receiptTemplateFormRef.current = form)}
          />
        </TabPane>
        <TabPane tab="Placeholder" key="2" disabled>
          <Placeholder
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

export default ReceiptForm;
