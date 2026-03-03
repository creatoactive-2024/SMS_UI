import React, { useState, useRef, useEffect } from "react";
import { Form, notification, Tabs } from "antd";
import PersonalDetails from "./PersonalDetails";
import Courses from "./Courses";
import Accomodation from "./Accomodation";
import Visa from "./Visa";
import Upload from "./UploadPhotos";
import { SaveData } from "../commonComponents/CreateUpdateApi";
import baseURL from "../commonComponents/baseURL";
import Payment from "./Payment";

const { TabPane } = Tabs;

const BookingForm = ({
  selectedRecordId,
  recordData,
  setNewModalVisible,
  setEditModalVisible,
  fetchData,
  CancelBothModel,
  setSelectedRecordId,
}) => {
  const [activeTab, setActiveTab] = useState("1");


const [personalForm] = Form.useForm();
  const [coursesForm] = Form.useForm();
  const [accommodationForm] = Form.useForm();
  const [visaForm] = Form.useForm();
  const [uploadForm] = Form.useForm();

  const [createdRecordId, setCreatedRecordId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);


  const [currentStep, setCurrentStep] = useState(1);
  const [formDataAllData, setFormDataAllData] = useState(null);
  const [formDataEnquiryData, setFormDataEnquiryData] = useState(null);
  const [candidateId, setCandidateId] = useState(null);
  const [savedStatus, setSavedStatus] = useState(recordData?.status || null);


  const formRefs = useRef({});
  const [form] = Form.useForm();



 useEffect(() => {
    if (!selectedRecordId) {
      resetAllFields();
    } else {
      setCreatedRecordId(selectedRecordId);
    }
  }, [selectedRecordId]);

  const resetAllFields = () => {
    personalForm.resetFields();
    coursesForm.resetFields();
    accommodationForm.resetFields();
    visaForm.resetFields();
    uploadForm.resetFields();
    setActiveTab("1");
    setCreatedRecordId(null);   // clear created ID
  setSelectedRecordId(null);  // clear selected ID
  };


 const handleFinishPersonal = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
 // collectionName: "bookingcopies",
                collectionName: "bookinghubspotdata",
                        data: selectedRecordId
          ? { _id: selectedRecordId, ...values }
          : values,
      };

      const response = await fetch(`${baseURL}/createdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([requestData]),
      });

      const data = await response.json();

      if (
        data[0]?.message.includes("Document created successfully") ||
        data[0]?.message.includes("Document updated successfully")
      ) {
        notification.success({ message: "Saved Personal Details" });

        const createdId = data[0].data?._id;
        if (!selectedRecordId) {
          setCreatedRecordId(createdId);
          setSelectedRecordId(createdId);

          setSavedStatus(values.status);
        }
        setActiveTab("2"); // go to next tab
      } else {
        notification.error({ message: "Error saving Personal Details" });
      }
    } catch (err) {
      setSubmitError(err.message);
      notification.error({ message: "Error", description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 generic handler for other tabs (always UPDATE)
  const handleFinishOtherTab = async (values, nextTabKey) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requestData = {
        // collectionName: "bookingcopies",
                collectionName: "bookinghubspotdata",

        data: { _id: createdRecordId || selectedRecordId, ...values },
      };

      const response = await fetch(`${baseURL}/createdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([requestData]),
      });

      const data = await response.json();

      if (
        data[0]?.message.includes("Document updated successfully") ||
        data[0]?.message.includes("Document created successfully")
      ) {
        notification.success({ message: "Saved Successfully" });

        if (nextTabKey) {
          setActiveTab(nextTabKey);
        } else {
          // last tab done → close modal
          if (selectedRecordId) setEditModalVisible(false);
          else setNewModalVisible(false);
          fetchData();
          resetAllFields();
        }
      } else {
        notification.error({ message: "Error saving data" });
      }
    } catch (err) {
      setSubmitError(err.message);
      notification.error({ message: "Error", description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };



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


  

  const onChange = (key) => {
    setActiveTab(key);
  };

  // const resetAllFields = () => {
  //   // Object.values(formRefs.current).forEach((form) => {
  //     form.resetFields();
  //   // });
  // };
  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
    fetchData();
    // console.log("its running");
  };
  return (
     <>
      {submitError && (
        <div style={{ color: "red", textAlign: "center" }}>{submitError}</div>
      )}

      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} centered>
        <TabPane tab="Personal Details" key="1">
          <PersonalDetails
            form={personalForm}
            recordData={recordData}
            onFinish={handleFinishPersonal}
            submitting={isSubmitting}
            CancelBothModel={CancelBothModel}
          />
        </TabPane>

        <TabPane tab="Courses" key="2">
          <Courses
            form={coursesForm}
            recordData={recordData}
 status={savedStatus}
             onFinish={(values) => handleFinishOtherTab(values, "3")}
            submitting={isSubmitting}
            CancelBothModel={CancelBothModel}
          />
        </TabPane>

        <TabPane tab="Accommodation" key="3">
          <Accomodation
            form={accommodationForm}
            recordData={recordData}
            onFinish={(values) => handleFinishOtherTab(values, "4")}
            submitting={isSubmitting}
            CancelBothModel={CancelBothModel}
          />
        </TabPane>

        <TabPane tab="Visa" key="4">
          <Visa
            form={visaForm}
            recordData={recordData}
            onFinish={(values) => handleFinishOtherTab(values, "5")}
            submitting={isSubmitting}
            CancelBothModel={CancelBothModel}
          />
        </TabPane>

        <TabPane tab="Upload" key="5">
          <Upload
            form={uploadForm}
            recordData={recordData}
            onFinish={(values) => handleFinishOtherTab(values, "6")}
            submitting={isSubmitting}
            CancelBothModel={CancelBothModel}
            createdRecordId={createdRecordId}
          />
        </TabPane>

         <TabPane tab="Payment" key="6">
          <Payment
            form={uploadForm}
            recordData={recordData}
            onFinish={(values) => handleFinishOtherTab(values, null)}
            submitting={isSubmitting}
            CancelBothModel={CancelBothModel}
            createdRecordId={createdRecordId}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default BookingForm;
