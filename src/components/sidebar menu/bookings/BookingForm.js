import React, { useState, useRef, useEffect } from "react";
import { Form, Tabs } from "antd";
import PersonalDetails from "./PersonalDetails";
import Courses from "./Courses";
import Accomodation from "./Accomodation";
import Matching from "./Matching";
import Transfer from "./Transfer";
import Visa from "./Visa";
import Upload from "./UploadPhotos";
import Classes from "./Classes";
import { SaveData } from "../commonComponents/CreateUpdateApi";

const { TabPane } = Tabs;

const BookingForm = ({
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
  const [candidateId, setCandidateId] = useState(null);

  const formRefs = useRef({});
  const [form] = Form.useForm();


  // Function to update candidateId
  const updateCandidateId = (id) => {
    setCandidateId(id);
  };


  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinishAllData = (values) => {
    setFormDataAllData(values);
    setActiveTab("2"); // Move to the next tab
    nextStep();
  };

  const setActiveTabinform=()=>{
    setActiveTab("2"); // Move to the next tab
    nextStep();
  }

  const handleFinishEnquiryData = (values) => {
    setFormDataEnquiryData(values);
    setActiveTab("1"); // Move to the next tab
    handleFinishData();
    resetAllFields();
  };



  const handleFinishData = () => {
    // Handle both form submit actions together
    console.log("First form data:", formDataAllData);
    console.log("Second form data:", formDataEnquiryData);
    // You can call your API functions here or perform any other actions
  };
  

  const onChange = (key) => {
    setActiveTab(key);
  };

  const resetAllFields = () => {
    // Object.values(formRefs.current).forEach((form) => {
      form.resetFields();
    // });
  };
  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
    fetchData();
    // console.log("its running");
  };
  return (
    <>
      <Tabs defaultActiveKey="1" centered onChange={onChange} activeKey={activeTab}>
        <TabPane tab="PERSONAL DETAILS" key="1">
          <PersonalDetails
            selectedRecordId={selectedRecordId}
            fetchData={fetchData}
            recordData={recordData}
            setActiveTabinform={setActiveTabinform}
            onFinish={handleFinishAllData}
            CancelBothModel={CancelBothModel1}
            formRef={(form) => (formRefs.current["PERSONAL DETAILS"] = form)}
            updateCandidateId={updateCandidateId}
          />
        </TabPane>
        <TabPane tab="COURSES" key="2">
          <Courses
                      selectedRecordId={selectedRecordId}

          candidateId={candidateId}
            onFinish={handleFinishEnquiryData}
            fetchData={fetchData}
            recordData={recordData}
            CancelBothModel={CancelBothModel1}
            setNewModalVisible={setNewModalVisible}
            setEditModalVisible={setEditModalVisible}
            formRef={(form) => (formRefs.current["COURSES"] = form)}
            
          />
        </TabPane>
        <TabPane tab="ACCOMODATION" key="3" disabled>
          <Accomodation />
        </TabPane>
        <TabPane tab="MATCHING" key="4" disabled>
          <Matching />
        </TabPane>
        <TabPane tab="TRANSFER" key="5" disabled>
          <Transfer />
        </TabPane>
        <TabPane tab="VISA" key="6" disabled>
          <Visa />
        </TabPane>
        <TabPane tab="UPLOAD" key="7" disabled>
          <Upload />
        </TabPane>
        <TabPane tab="CLASSES & ATT." key="8" disabled>
          <Classes />
        </TabPane>
      </Tabs>
    </>
  );
};

export default BookingForm;
