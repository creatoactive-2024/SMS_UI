// import React, { useState, useCallback, useEffect, useRef } from "react";
// import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Form,
//   Input,
//   Select,
//   Upload,
//   Row,
//   Col,
//   AutoComplete,
//   Divider,
//   message,
//   Tooltip,
// } from "antd";
// import "../commonComponents/common.css"

// import { DatePicker } from "antd";
// import { Checkbox, notification } from "antd";
// import baseURL from "../../../config";
// import moment from "moment";
// import { AiOutlineQuestionCircle } from "react-icons/ai";
// import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";
// import { FieldListDropdown } from "../../sidebar menu/commonComponents/FieldListDropdown";
// import axios from "axios";

// const { Option } = Select;

// const PersonalDetails = ({
//   mode,
//   selectedRecordId,
//   recordData,
//   fetchData,setActiveTabinform,
//   setEditModalVisible,onFinish,
//   setNewModalVisible,handleNewModalCancel,CancelBothModel,updateCandidateId
// }) => {
//   const [form] = Form.useForm();
//   const [formGroups, setFormGroups] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [nationality, setNationality] = useState([]);
//   const [motherTounge, setMotherTounge] = useState([]);
//   const [agentlist, setAgentList] = useState([]);
//   const [studentStatus, setStudentStatus] = useState([]);
//   const [howHereAboutUs, setHowHereAboutUs] = useState([]);
//   const [selectedAgent, setSelectedAgent] = useState(null);

//   const [salespersonList, setSalespersonList] = useState([]);
//   const [agentEmployeeList, setAgentEmployeeList] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState([]);

//   const formRefs = useRef({});

//   const fetchPaymentMethod = async () => {
//     try {
//       const responseData = await FieldListDropdown("paymentmethods", "title");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Name = responseData.map((name) => ({
//           value: name._id, // Use the appropriate property for the value
//           label: name.title // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setPaymentMethod(Name);
//       }
//     } catch (error) {
//       console.error("Error fetching paymentmethods:", error);
//     }
//   };

//   const fetchAgentEmployeeList = async () => {
//     try {
//       const responseData = await FieldListDropdown("agencyemployees", "firstname");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Name = responseData.map((firstname) => ({
//           value: firstname._id, // Use the appropriate property for the value
//           label: firstname.firstname // Use the appropriate property for the label
//         }));
//         setAgentEmployeeList(Name);
//       }
//     } catch (error) {
//       console.error("Error fetching firstname:", error);
//     }
//   };

//   const fetchSalesperson = async () => {
//     try {
//       const responseData = await FieldListDropdown("overviewadmins", "first_name");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Name = responseData.map((firstname) => ({
//           value: firstname._id, // Use the appropriate property for the value
//           label: firstname.first_name // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setSalespersonList(Name);
//       }
//     } catch (error) {
//       console.error("Error fetching firstname:", error);
//     }
//   };

//   const fetchCountries = async () => {
//     try {
//       const responseData = await FieldListDropdown("countries", "name");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Country = responseData.map((country) => ({
//           value: country._id, // Use the appropriate property for the value
//           label: country.name // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setCountries(Country);
//       }
//     } catch (error) {
//       console.error("Error fetching country:", error);
//     }
//   };

//   const fetchHowHereAboutUs = async () => {
//     try {
//       const responseData = await FieldListDropdown("howdidyouheres", "title_english");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Country = responseData.map((country) => ({
//           value: country._id, // Use the appropriate property for the value
//           label: country.title_english // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setHowHereAboutUs(Country);
//       }
//     } catch (error) {
//       console.error("Error fetching country:", error);
//     }
//   };

//   const fetchStudentStatus = async () => {
//     try {
//       const responseData = await FieldListDropdown("studentstatuses", "title");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Country = responseData.map((country) => ({
//           value: country._id, // Use the appropriate property for the value
//           label: country.title // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setStudentStatus(Country);
//       }
//     } catch (error) {
//       console.error("Error fetching country:", error);
//     }
//   };

//   const fetchAgentList = async () => {
//     try {
//       const responseData = await FieldListDropdown("agents", "name");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Agent = responseData.map((agent) => ({
//           value: agent._id, // Use the appropriate property for the value
//           label: agent.name // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setAgentList(Agent);
//       }
//     } catch (error) {
//       console.error("Error fetching Agents:", error);
//     }
//   };

//   const fetchNationality = async () => {
//     try {
//       const responseData = await FieldListDropdown("countries", "nationality"); // Your API call to get the list of countries

//       if (responseData) {
//         // Filter out entries with null or empty nationalities
//         const validCountries = responseData.filter(
//           (country) => country.nationality && country.nationality.trim() !== ""
//         );

//         // Construct objects with 'value' and 'label' properties
//         const Country = validCountries.map((country) => ({
//           value: country._id, // Use the appropriate property for the value
//           label: country.nationality, // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setNationality(Country); // Set the state with the filtered countries
//       }
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//     }
//   };

//   const fetchMotherTounge = async () => {
//     try {
//       const responseData = await FieldListDropdown("mothertongues", "name");
//       if (responseData) {
//         // Extract course levels and construct objects with value and label properties
//         const Mothertounge = responseData.map((item) => ({
//           value: item._id, // Use the appropriate property for the value
//           label: item.name // Use the appropriate property for the label
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

//         setMotherTounge(Mothertounge);
//       }
//     } catch (error) {
//       console.error("Error fetching Mothertounge:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCountries();
//     fetchNationality();
//     fetchMotherTounge();
//     fetchAgentList();
//     fetchStudentStatus();
//     fetchHowHereAboutUs();
//     fetchSalesperson();
//     fetchAgentEmployeeList();
//     fetchPaymentMethod();
//   }, []);

//   const normFile = (e) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };

//   const { RangePicker } = DatePicker;

//   const onSearch = (value) => {
//     // Handle search logic here
//     console.log("Search:", value);
//   };

//   const fetchEmployees = async (agentName) => {
//     try {
//       const response = await axios.post(`${baseURL}/agency-employees`, { agentName });
//       setAgentEmployeeList(response.data);
//     } catch (error) {
//       console.error('Error fetching employees', error);
//       setAgentEmployeeList([]);
//     }
//   };

//   useEffect(() => {
//     fetchAgentList();
//   }, []);

//   useEffect(() => {
//     if (selectedAgent) {
//       const selectedAgentObj = agentlist.find(agent => agent.value === selectedAgent);
//       if (selectedAgentObj) {
//         fetchEmployees(selectedAgentObj.label);
//         form.setFieldsValue({ agent_employee_name: null }); // Clear the agency employee name when agent changes
//       }
//     } else {
//       setAgentEmployeeList([]);
//     }
//   }, [selectedAgent, agentlist, form]);

//   useEffect(() => {
//     if (recordData) {
//       const emails = recordData.address?.emails?.map((email, index) => ({
//         email: email.email,
//         key: email._id || index,
//       })) || [];

//       const formattedDob = recordData.candidate.dob
//         ? moment(recordData.candidate.dob).format('YYYY-MM-DD')
//         : null;

//       const formGroups = recordData.furtherContacts.map(contact => ({
//         key: contact._id,
//         further_type: contact.further_type,
//         further_firstname: contact.further_firstname,
//         further_surname: contact.further_surname,
//         further_email: contact.further_email,
//         further_phone: contact.further_phone,
//       }));

//       form.setFieldsValue({
//         school_name: recordData.candidate.school_name || null,
//         surname: recordData.candidate.surname || null,
//         firstname: recordData.candidate.firstname || null,
//         gender: recordData.candidate.gender || null,
//         dob: formattedDob,
//         nationality: recordData.candidate.nationality || null,
//         mother_tongue: recordData.candidate.mother_tongue || null,
//         correspondence_language: recordData.candidate.correspondence_language || null,
//         address: recordData.address.address || null,
//         address_addon: recordData.address.address_addon || null,
//         zipcode: recordData.address.zipcode || null,
//         city: recordData.address.city || null,
//         state: recordData.address.state || null,
//         country: recordData.address.country || null,
//         phone: recordData.address.phone || null,
//         office: recordData.address.office || null,
//         cellphone: recordData.address.cellphone || null,
//         email: recordData.address.email || null,
//         automated_email: recordData.address.automated_email || null,
//         profession: recordData.address.profession || null,
//         social_security_number: recordData.address.social_security_number || null,
//         fax: recordData.address.fax || null,
//         company: recordData.address.company || null,
//         billing_address: recordData.address.billing_address || null,
//         billing_zipcode: recordData.address.billing_zipcode || null,
//         billing_city: recordData.address.billing_city || null,
//         billing_country: recordData.address.billing_country || null,
//         emergency_relation: recordData.address.emergency_relation || null,
//         emergency_name: recordData.address.emergency_name || null,
//         emergency_email: recordData.address.emergency_email || null,
//         emergency_language: recordData.address.emergency_language || null,
//         emergency_phone: recordData.address.emergency_phone || null,
//         consent: recordData.address.consent || null,
//         disability_affecting_mobility: recordData.medical.disability_affecting_mobility,
//         dyslexia: recordData.medical.dyslexia,
//         no_learning_difficulties: recordData.medical.no_learning_difficulties,
//         visual_hearing: recordData.medical.visual_hearing,
//         other_specific: recordData.medical.other_specific,
//         other_medical_condition: recordData.medical.other_medical_condition,
//         learningSupport: recordData.medical.learningSupport,
//         howDoYouLearnBest: recordData.medical.howDoYouLearnBest,
//         extraHelpNeeded: recordData.medical.extraHelpNeeded,
//         studyEnglishReason: recordData.medical.studyEnglishReason,
//         freeTimeOutsideSchoolWork: recordData.medical.freeTimeOutsideSchoolWork,
//         howMuchTimeHaveOutside: recordData.medical.howMuchTimeHaveOutside,
//         other: recordData.medical.other,
//         take_any_exam_end_course: recordData.medical.take_any_exam_end_course,
//         if_yes_specify: recordData.medical.if_yes_specify,
//         agent_name: recordData.booking.agent_name,
//         agent_employee_name: recordData.booking.agent_employee_name,
//         payment_method: recordData.booking.payment_method,
//         partial_payment: recordData.booking.partial_payment,
//         agent_currency: recordData.booking.agent_currency,
//         salesperson: recordData.booking.salesperson,
//         voucher_code: recordData.booking.voucher_code,
//         other_note: recordData.booking.other_note,
//         student_status: recordData.booking.student_status,
//         hear_about_us: recordData.booking.hear_about_us,
//         agent_comment: recordData.booking.agent_comment,
//         formGroups,
//         emails,
//       });

//       document.getElementById('date-picker-booking').value = formattedDob;

//       // Set the selected agent based on recordData
//       const selectedAgentObj = agentlist.find(agent => agent.label === recordData.booking.agent_name);
//       if (selectedAgentObj) {
//         setSelectedAgent(selectedAgentObj.value);
//         form.setFieldsValue({ agent_name: selectedAgentObj.value });
//       }
//     }
//   }, [recordData, agentlist, form]);

//   // Update agent_employee_name field when agentEmployeeList changes
//   useEffect(() => {
//     if (recordData && agentEmployeeList.length > 0) {
//       form.setFieldsValue({ agent_employee_name: recordData.booking.agent_employee_name });
//     }
//   }, [agentEmployeeList, recordData, form]);

//   const handleAgentChange = (value) => {
//     const selectedAgentObj = agentlist.find(agent => agent.value === value);
//     if (selectedAgentObj) {
//       setSelectedAgent(selectedAgentObj.value); // Set the agent's ID (value)
//     }
//   };

//   const resetAllFields = () => {
//     // Object.values(formRefs.current).forEach((form) => {
//       form.resetFields();
//     // });
//   };

//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllFields();
//     // console.log("its running");
//   };

//   const handleSearch = (value) => {
//     const suggestions = [
//       "First Name",
//       "Last Name",
//       "Email Address",
//       "Date of Birth",
//     ];
//     setOptions(
//       value ? suggestions.map((suggestion) => ({ value: suggestion })) : []
//     );
//   };

//   const onSelect = (value) => {
//     console.log("Selected:", value);
//   };

//   const handleChange = (value) => {
//     console.log(`Selected value: ${value}`);
//   };

//   const addFormGroup = () => {
//     setFormGroups([...formGroups, {}]);
//   };

//   const removeFormGroup = (index) => {
//     const updatedFormGroups = [...formGroups];
//     updatedFormGroups.splice(index, 1);
//     setFormGroups(updatedFormGroups);
//   };

// const handleFinish = async (values) => {
//   const formValues = form.getFieldsValue();

//   // Helper function to convert IDs to names
//   const transformValueToLabel = (value, list) => {
//     if (Array.isArray(value)) {
//       return value.map((id) => {
//         const item = list.find((item) => item.value === id);
//         return item ? item.label : id;
//       });
//     } else {
//       const item = list.find((item) => item.value === value);
//       return item ? item.label : value;
//     }
//   };

//   const agentNames = transformValueToLabel(formValues.agent_name, agentlist);
//   const salespersonNames = transformValueToLabel(formValues.salesperson, salespersonList);
//   const studentStatuses = transformValueToLabel(formValues.student_status, studentStatus);
//   const howHeardAboutUs = transformValueToLabel(formValues.hear_about_us, howHereAboutUs);

//   const updatedFormValues = {
//     ...formValues,
//     agent_name: agentNames,
//     salesperson: salespersonNames,
//     student_status: studentStatuses,
//     hear_about_us: howHeardAboutUs,
//   };

//   try {
//     let candidateId;

//     // Check if selectedRecordId is present
//     if (selectedRecordId) {
//       // console.log("in other api", selectedRecordId);

//       // Additional API call with selectedRecordId to update the record
//       const updateCandidateResponse = await fetch(`${baseURL}/createdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([
//           {
//             collectionName: "candidates",
//             data: {
//               _id: selectedRecordId,
//               school_name: updatedFormValues.school_name,
//               surname: updatedFormValues.surname,
//               firstname: updatedFormValues.firstname,
//               gender: updatedFormValues.gender,
//               dob: updatedFormValues.dob,
//               nationality: updatedFormValues.nationality,
//               mother_tongue: updatedFormValues.mother_tongue,
//               correspondence_language: updatedFormValues.correspondence_language,
//               // Add other fields as needed
//             },
//           },
//         ]),
//       });

//       const updateCandidateData = await updateCandidateResponse.json();
//       message.success("Data saved successfully!");

//       console.log("Additional API response:", updateCandidateData);
//       const emails = updatedFormValues.emails || [];

//       const updateCandidateAddressResponse = await fetch(
//         `${baseURL}/updateDocument`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             collectionName: "candidateaddresses",
//             candidate_id: selectedRecordId,
//             updatedData: {
//               address: updatedFormValues.address,
//               address_addon: updatedFormValues.address_addon,
//               zipcode: updatedFormValues.zipcode,
//               city: updatedFormValues.city,
//               state: updatedFormValues.state,
//               country: updatedFormValues.country,
//               phone: updatedFormValues.phone,
//               office: updatedFormValues.office,
//               cellphone: updatedFormValues.cellphone,
//               email: updatedFormValues.email,
//               automated_email: updatedFormValues.automated_email,
//               profession: updatedFormValues.profession,
//               social_security_number: updatedFormValues.social_security_number,
//               fax: updatedFormValues.fax,
//               company: updatedFormValues.company,
//               billing_address: updatedFormValues.billing_address,
//               billing_zipcode: updatedFormValues.billing_zipcode,
//               billing_city: updatedFormValues.billing_city,
//               billing_country: updatedFormValues.billing_country,
//               emergency_relation: updatedFormValues.emergency_relation,
//               emergency_name: updatedFormValues.emergency_name,
//               emergency_email: updatedFormValues.emergency_email,
//               emergency_language: updatedFormValues.emergency_language,
//               emergency_phone: updatedFormValues.emergency_phone,
//               consent: updatedFormValues.consent,
//               emails: emails,
//               // formGroups: formGroups,
//             },
//           }),
//         }
//       );

//       const updateCandidateaddressData = await updateCandidateAddressResponse.json();
//       console.log("Additional API response:", updateCandidateaddressData);

//       // Update candidatemedical
//       const updateCandidateMedicalResponse = await fetch(
//         `${baseURL}/updateDocument`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             collectionName: "candidatemedicals",
//             candidate_id: selectedRecordId,
//             updatedData: {
//               disability_affecting_mobility: updatedFormValues.disability_affecting_mobility,
//               dyslexia: updatedFormValues.dyslexia,
//               no_learning_difficulties: updatedFormValues.no_learning_difficulties,
//               visual_hearing: updatedFormValues.visual_hearing,
//               other_specific: updatedFormValues.other_specific,
//               other_medical_condition: updatedFormValues.other_medical_condition,
//               learningSupport: updatedFormValues.learningSupport,
//               howDoYouLearnBest: updatedFormValues.howDoYouLearnBest,
//               extraHelpNeeded: updatedFormValues.extraHelpNeeded,
//               studyEnglishReason: updatedFormValues.studyEnglishReason,
//               freeTimeOutsideSchoolWork: updatedFormValues.freeTimeOutsideSchoolWork,
//               howMuchTimeHaveOutside: updatedFormValues.howMuchTimeHaveOutside,
//               other: updatedFormValues.other,
//               take_any_exam_end_course: updatedFormValues.take_any_exam_end_course,
//               if_yes_specify: updatedFormValues.if_yes_specify,
//             },
//           }),
//         }
//       );

//       const updateCandidatemedicalData = await updateCandidateMedicalResponse.json();
//       console.log("Additional API response:", updateCandidatemedicalData);

//       // Update candidatebooking
//       const updateCandidateBookingResponse = await fetch(
//         `${baseURL}/updateDocument`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             collectionName: "candidatebookings",
//             candidate_id: selectedRecordId,
//             updatedData: {
//               agent_name: updatedFormValues.agent_name,
//               agent_employee_name: updatedFormValues.agent_employee_name,
//               agent_comment: updatedFormValues.agent_comment,
//               payment_method: updatedFormValues.payment_method,
//               partial_payment: updatedFormValues.partial_payment,
//               agent_currency: updatedFormValues.agent_currency,
//               salesperson: updatedFormValues.salesperson,
//               voucher_code: updatedFormValues.voucher_code,
//               other_note: updatedFormValues.other_note,
//               student_status: updatedFormValues.student_status,
//               hear_about_us: updatedFormValues.hear_about_us,
//             },
//           }),
//         }
//       );

//       const updateCandidatebookingData = await updateCandidateBookingResponse.json();

//       const updatedContacts = values.formGroups.map(group => ({
//         _id: group.key || null, // Ensure _id is included here
//         further_type: group.further_type,
//         further_firstname: group.further_firstname,
//         further_surname: group.further_surname,
//         further_email: group.further_email,
//         further_phone: group.further_phone,
//       }));

//       // Updating furtherContacts
//       const updateFurtherContactsResponse = await fetch(`${baseURL}/updateFurtherContacts`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           collectionName: 'furtherContacts',
//           candidateId: selectedRecordId,
//           updatedContacts: updatedContacts, // Pass updatedContacts array
//         }),
//       });

//       const furtherContactsData = await updateFurtherContactsResponse.json();
//       console.log("Further contacts updated:", furtherContactsData);

//       message.success("Data updated successfully!");
//       setNewModalVisible(false);
//       fetchData();
//     } else {
//       // Step 1: Send data to "candidates" collection
//       const responseCandidates = await fetch(`${baseURL}/createdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([
//           {
//             collectionName: "candidates",
//             data: {
//               school_name: updatedFormValues.school_name || null,
//               surname: updatedFormValues.surname || null,
//               firstname: updatedFormValues.firstname || null,
//               gender: updatedFormValues.gender || null,
//               dob: updatedFormValues.dob || null,
//               nationality: updatedFormValues.nationality || null,
//               mother_tongue: updatedFormValues.mother_tongue || null,
//               correspondence_language: updatedFormValues.correspondence_language || null,
//               // Add other fields as needed
//             },
//           },
//         ]),
//       });

//       const dataCandidates = await responseCandidates.json();
//       console.log("dataCandidates", dataCandidates);

//       candidateId = dataCandidates[0].data._id;
//       console.log("candidate_id", candidateId);
//       updateCandidateId(candidateId);

//       const emails = updatedFormValues.emails || [];
//       const responseAddresses = await fetch(`${baseURL}/createdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([
//           {
//             collectionName: "candidateaddresses",
//             data: {
//               candidate_id: candidateId,
//               address: updatedFormValues.address || null,
//               address_addon: updatedFormValues.address_addon || null,
//               zipcode: updatedFormValues.zipcode || null,
//               city: updatedFormValues.city || null,
//               state: updatedFormValues.state || null,
//               country: updatedFormValues.country || null,
//               phone: updatedFormValues.phone || null,
//               office: updatedFormValues.office || null,
//               cellphone: updatedFormValues.cellphone || null,
//               email: updatedFormValues.email || null,
//               automated_email: updatedFormValues.automated_email || null,
//               profession: updatedFormValues.profession || null,
//               social_security_number: updatedFormValues.social_security_number || null,
//               fax: updatedFormValues.fax || null,
//               company: updatedFormValues.company || null,
//               billing_address: updatedFormValues.billing_address || null,
//               billing_zipcode: updatedFormValues.billing_zipcode || null,
//               billing_city: updatedFormValues.billing_city || null,
//               billing_country: updatedFormValues.billing_country || null,
//               emergency_relation: updatedFormValues.emergency_relation || null,
//               emergency_name: updatedFormValues.emergency_name || null,
//               emergency_email: updatedFormValues.emergency_email || null,
//               emergency_language: updatedFormValues.emergency_language || null,
//               emergency_phone: updatedFormValues.emergency_phone || null,
//               consent: updatedFormValues.consent || null,
//               emails: emails,
//               // formGroups: formGroups,
//             },
//           },
//         ]),
//       });

//       const dataAddresses = await responseAddresses.json();
//       console.log("Server response (Candidate Addresses):", dataAddresses);

//       const responseMedicals = await fetch(`${baseURL}/createdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([
//           {
//             collectionName: "candidatemedicals",
//             data: {
//               candidate_id: candidateId,
//               disability_affecting_mobility: updatedFormValues.disability_affecting_mobility,
//               dyslexia: updatedFormValues.dyslexia,
//               no_learning_difficulties: updatedFormValues.no_learning_difficulties,
//               visual_hearing: updatedFormValues.visual_hearing,
//               other_specific: updatedFormValues.other_specific,
//               other_medical_condition: updatedFormValues.other_medical_condition,
//               learningSupport: updatedFormValues.learningSupport,
//               howDoYouLearnBest: updatedFormValues.howDoYouLearnBest,
//               extraHelpNeeded: updatedFormValues.extraHelpNeeded,
//               studyEnglishReason: updatedFormValues.studyEnglishReason,
//               freeTimeOutsideSchoolWork: updatedFormValues.freeTimeOutsideSchoolWork,
//               howMuchTimeHaveOutside: updatedFormValues.howMuchTimeHaveOutside,
//               other: updatedFormValues.other,
//               take_any_exam_end_course: updatedFormValues.take_any_exam_end_course,
//               if_yes_specify: updatedFormValues.if_yes_specify,
//             },
//           },
//         ]),
//       });

//       const dataMedicals = await responseMedicals.json();
//       console.log("Server response (Candidate Medicals):", dataMedicals);

//       const responseBookings = await fetch(`${baseURL}/createdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([
//           {
//             collectionName: "candidatebookings",
//             data: {
//               candidate_id: candidateId,
//               agent_name: updatedFormValues.agent_name,
//               agent_employee_name: updatedFormValues.agent_employee_name,
//               agent_comment: updatedFormValues.agent_comment,
//               payment_method: updatedFormValues.payment_method,
//               partial_payment: updatedFormValues.partial_payment,
//               agent_currency: updatedFormValues.agent_currency,
//               salesperson: updatedFormValues.salesperson,
//               voucher_code: updatedFormValues.voucher_code,
//               other_note: updatedFormValues.other_note,
//               student_status: updatedFormValues.student_status,
//               hear_about_us: updatedFormValues.hear_about_us,
//             },
//           },
//         ]),
//       });

//       const dataBookings = await responseBookings.json();
//       console.log("Server response (Candidate bookings):", dataBookings);

//       const formGroupsData = values.formGroups.map((group) => ({
//         collectionName: "furthercontacts", // Adjust collection name as per your API endpoint
//         data: {
//           candidate_id: candidateId,
//           further_type: group.further_type,
//           further_firstname: group.further_firstname,
//           further_surname: group.further_surname,
//           further_email: group.further_email, // Include further_email field
//           further_phone: group.further_phone, // Include further_phone field
//         },
//       }));

//       const saveFormGroupsResponse = await fetch(`${baseURL}/createdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formGroupsData),
//       });

//       const saveFormGroupsData = await saveFormGroupsResponse.json();
//       console.log("Save FormGroups Response:", saveFormGroupsData);

//       message.success("Data saved successfully!");
//       resetAllFields();
//       onFinish();
//     }
//   } catch (error) {
//     console.error("Error sending data to the server:", error);
//   }
//   console.log("booking form values:", values);
//   onFinish(values);
//   resetAllFields();
// };

//   return (
//     <Form
//       form={form}
//       labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
//       wrapperCol={{ span: 15 }}
//       layout="horizontal"
//       style={{ width: "100%", lineHeight: "0.1" }}
//       onFinish={handleFinish}

//     >
//       <Row justify="center" style={{ marginTop: "24px" }}>
//         <Col span={16}>
//           <h5>Personal Details</h5>
//           {/* <Form.Item name="searchQuery" label="Search by">
//             <AutoComplete
//               dropdownClassName="certain-category-search-dropdown"
//               dropdownMatchSelectWidth={500}
//               style={{ width: "100%" }}
//               // options={options}
//               // onSelect={onSelect}
//               // onSearch={handleSearch}
//               // onFinish={handleFinish}
//             >
//               <Input.Search
//                 placeholder="Search by first name, last name, e-mail and date of birth"
//                 allowClear
//                 size="large"
//               />
//             </AutoComplete>
//           </Form.Item> */}

//           {/* <div style={{ marginTop: 0, marginBottom: 12, marginLeft: 102, color: 'rgba(0, 0, 0, 0.45)' }}>
//             Search by first name, last name, e-mail address, and date of birth
//           </div> */}

//           <Form.Item
//             label="School"
//             name="school_name"
//             rules={[{ required: true, message: "Please select School!" }]}
//           >
//             <Select placeholder="SELECT A SCHOOL" onChange={handleChange}>
//               <Option value="speakuplondon">Speakup london</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item label="Group" name="group">
//             <Select
//               placeholder="SELECT A Group"
//               onChange={handleChange}
//               disabled
//             >
//               <Option value="option1">option1</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Surname"
//             name="surname"
//             rules={[{ required: true, message: "Please select surname!" }]}
//           >
//             <Input placeholder="Enter surname" />
//           </Form.Item>

//           <Form.Item
//             label="First Name"
//             name="firstname"
//             rules={[{ required: true, message: "Please select firstname!" }]}
//           >
//             <Input placeholder="Enter first firstname" />
//           </Form.Item>

//           <Form.Item
//             label="Gender"
//             name="gender"
//             rules={[{ required: true, message: "Please select surname!" }]}
//           >
//             <Select placeholder="SELECT GENDER" onChange={handleChange}>
//               <Option value="female">Female</Option>
//               <Option value="male">Male</Option>
//               <Option value="non-binary">Non-Binary</Option>
//             </Select>
//           </Form.Item>
//           {/* <Form.Item
//             label="BirthDate"
//             name="dob"
//             rules={[{ required: true, message: "Please select BirthDate!" }]}
//           >
//             <DatePicker style={{ width: 400 }} />
//           </Form.Item> */}

// <Form.Item
//   label="Birthdate"
//   name="dob"
//   rules={[{ required: true, message: "Please select BirthDate!" }]}
//   valuePropName="value"
//   getValueFromEvent={(e) => e.target.value}
// >
//   <input
//     type="date"
//     id="date-picker-booking"
//     className="date-picker"
//   />
// </Form.Item>

//           <Form.Item
//             label="Nationality"
//             name="nationality"
//             rules={[{ required: true, message: "Please select Nationality!" }]}
//           >
//             <Select placeholder="SELECT NATIONALITY" showSearch optionFilterProp="children" onChange={handleChange}
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//             {nationality.map((name) => (
//             <Option key={name._id} value={name.label}>
//               {name.label}
//             </Option>
//           ))}              </Select>
//           </Form.Item>
//           <Form.Item
//             label="Mother Tongue"
//             name="mother_tongue"
//             rules={[
//               { required: true, message: "Please select Mother Tongue!" },
//             ]}
//           >
//             <Select placeholder="SELECT MOTHER TOUNGE" showSearch optionFilterProp="children" onChange={handleChange}
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//             {motherTounge.map((name) => (
//             <Option key={name._id} value={name.label}>
//               {name.label}
//             </Option>
//           ))}
//                       </Select>
//           </Form.Item>

//           <Form.Item
//             label="Correspondence language"
//             name="correspondence_language"
//             rules={[
//               {
//                 required: true,
//                 message: "Please select Correspondence language!",
//               },
//             ]}
//           >
//             <Select
//               placeholder="SELECT CORRESPONDENCE LANGUAGE"
//               onChange={handleChange}
//             >
//               <Option value="English">English</Option>
//           <Option value="Portuguese">Portuguese</Option>
//           <Option value="Spanish">Spanish</Option>
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col span={7} style={{ marginLeft: "10px" }}>
//           <Form.Item
//             label=""
//             valuePropName="fileList"
//             getValueFromEvent={normFile}
//           >
//             <Upload action="/upload.do" listType="picture">
//               <div
//                 style={{
//                   width: "200px",
//                   height: "200px",
//                   textAlign: "center",
//                   border: "1px dashed #d9d9d9",
//                   borderRadius: "4px",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <PlusOutlined style={{ fontSize: "36px", color: "#d9d9d9" }} />
//                 <div style={{ marginTop: 8 }}>Upload</div>
//               </div>
//             </Upload>
//           </Form.Item>
//         </Col>
//       </Row>

//       <hr />
//       <h5>Address Details</h5>

//       <Row justify="center" style={{ marginTop: "24px" }}>
//         <Col span={12}>
//           <Form.Item label="Address" name="address">
//             <Input placeholder="Enter Address" />
//           </Form.Item>

//           <Form.Item label="Address addon" name="address_addon">
//             <Input placeholder="Enter Add on" />
//           </Form.Item>
//           <Form.Item label="Zip / Portal code" name="zipcode">
//             <Input placeholder="Enter zip / postal code" />
//           </Form.Item>

//           <Form.Item label="City" name="city">
//             <Input placeholder="Enter city" />
//           </Form.Item>
//           <Form.Item label="State" name="state">
//             <Input placeholder="Enter state" />
//           </Form.Item>

//           <Form.Item label="Country" name="country">
//             <Select placeholder="SELECT COUNTRY" showSearch optionFilterProp="children" onChange={handleChange}
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//             {countries.map((name) => (
//             <Option key={name._id} value={name.label}>
//               {name.label}
//             </Option>
//           ))}
//             </Select>
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item label="Phone" name="phone">
//             <Input type="number" placeholder="Enter phone" />
//           </Form.Item>
//           <Form.Item label="Phone (office)" name="office">
//             <Input type="number" placeholder="Enter phone(office)" />
//           </Form.Item>
//           <Form.Item label="Cellphone" name="cellphone">
//             <Input type="number" placeholder="Enter cellphone" />
//           </Form.Item>
//           <Form.Item label="Email" name="email">
//             <Input type="email" placeholder="Enter email" />
//           </Form.Item>
//           <Form.List name="emails">
//         {(fields, { add, remove }) => (
//           <>
//             {fields.map(({ key, name, fieldKey, ...restField }) => (
//               <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
//                 <Form.Item
//                   {...restField}
//                   label="Email"
//                   name={[name, 'email']}
//                   fieldKey={[fieldKey, 'email']}
//                   style={{ marginRight: 8, flex: 1 }}
//                   rules={[

//                     { type: 'email', message: 'Please enter a valid email' }
//                   ]}
//                 >
//                   <Input type="email" placeholder="Enter email" />
//                 </Form.Item>
//                 <Button
//                   type="link"
//                   style={{ backgroundColor: '#ff4d4f', color: '#fff' }}
//                   onClick={() => remove(name)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             ))}
//             <Divider />
//             <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
//               <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
//                 Add
//               </Button>
//             </Form.Item>
//           </>
//         )}
//       </Form.List>

//           <Form.Item label="Automated Mailing" name="automated_email">
//             <Checkbox></Checkbox>
//           </Form.Item>
//         </Col>
//       </Row>

//       <hr />
//       <h5>Additional information</h5>
//       <Row justify="center" align="middle">
//         <Col span={24}>
//           <Form.Item label="Profession" name="profession">
//             <Input placeholder="Enter Profession" />
//           </Form.Item>
//         </Col>
//         <Col span={24}>
//           <Form.Item
//             label="Social security number"
//             name="social_security_number"
//           >
//             <Input placeholder="Enter social security number" />
//           </Form.Item>
//         </Col>
//         <Col span={24}>
//           <Form.Item label="Fax" name="fax">
//             <Input placeholder="Enter fax" />
//           </Form.Item>
//         </Col>
//       </Row>

//       <hr />

//       <h5>Billing Address</h5>
//       <Row justify="center" align="middle">
//         <Col span={24}>
//           <Form.Item label="Company" name="company">
//             <Input placeholder="Enter company" />
//           </Form.Item>
//         </Col>
//         <Col span={24}>
//           <Form.Item label="Address" name="billing_address">
//             <Input placeholder="Enter address" />
//           </Form.Item>
//         </Col>
//         <Col span={24}>
//           <Form.Item label="Zip / Portal code" name="billing_zipcode">
//             <Input type="number" placeholder="Enter zip/postal code" />
//           </Form.Item>
//         </Col>
//         <Col span={24}>
//           <Form.Item label="City" name="billing_city">
//             <Input placeholder="Enter city" />
//           </Form.Item>
//         </Col>
//         <Col span={24}>
//           <Form.Item label="Country" name="billing_country">
//             <Select placeholder="select country" showSearch optionFilterProp="children" onChange={handleChange}
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//             {countries.map((name) => (
//             <Option key={name._id} value={name.label}>
//               {name.label}
//             </Option>
//           ))}
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>
//       <hr />

//       {/* <h5>Further contact details</h5>

// <Form.List name="formGroups">
//   {(fields, { add, remove }) => (
//     <>
//       {fields.map(({ key, name, fieldKey, ...restField }) => (
//         <div
//           key={key}
//           style={{
//             display: "flex",
//             marginBottom: 16,
//             alignItems: "center",
//           }}
//         >
//           <Form.Item
//             labelCol={{ span: 24 }}
//             wrapperCol={{ span: 24 }}
//             {...restField}
//             label="Relation"
//             name={[name, "further_type"]}
//             fieldKey={[fieldKey, "further_type"]}
//             rules={[{ required: true, message: "Please select a relation!" }]}
//             style={{ marginRight: 8 }}
//           >
//             <Select placeholder="Select relation">
//               <Option value="emergency contact">Emergency Contact</Option>
//               <Option value="parents">Parents</Option>
//               <Option value="others">Others</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             {...restField}
//             labelCol={{ span: 24 }}
//             wrapperCol={{ span: 24 }}
//             label="First Name"
//             name={[name, "further_firstname"]}
//             fieldKey={[fieldKey, "further_firstname"]}
//             rules={[{ required: true, message: "Please enter first name!" }]}
//             style={{ marginRight: 8 }}
//           >
//             <Input placeholder="Enter First name" />
//           </Form.Item>

//           <Form.Item
//             {...restField}
//             labelCol={{ span: 24 }}
//             wrapperCol={{ span: 24 }}
//             label="Surname"
//             name={[name, "further_surname"]}
//             fieldKey={[fieldKey, "further_surname"]}
//             rules={[{ required: true, message: "Please enter surname!" }]}
//             style={{ marginRight: 8 }}
//           >
//             <Input placeholder="Enter Surname" />
//           </Form.Item>

//           <Form.Item
//             labelCol={{ span: 24 }}
//             wrapperCol={{ span: 24 }}
//             label="Phone"
//             name={[name, "further_phone"]}
//             fieldKey={[fieldKey, "further_phone"]}
//             rules={[{ required: true, message: "Please enter phone!" }]}
//             style={{ marginRight: 8 }}
//           >
//             <Input type="phone" placeholder="Enter phone" />
//           </Form.Item>

//           <Form.Item
//             labelCol={{ span: 24 }}
//             wrapperCol={{ span: 24 }}
//             label="Email"
//             name={[name, "further_email"]}
//             fieldKey={[fieldKey, "further_email"]}
//             rules={[{ required: true, message: "Please enter email!" }]}
//             style={{ marginRight: 8 }}
//           >
//             <Input type="email" placeholder="Enter Email" />
//           </Form.Item>

//           <Button
//             type="link"
//             style={{
//               backgroundColor: "#ff4d4f",
//               color: "#fff",
//               marginRight: 8,
//               marginTop: 13,
//             }}
//             onClick={() => remove(name)}
//           >
//             <DeleteOutlined /> Delete
//           </Button>
//         </div>
//       ))}

//       <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
//         <Button
//           type="dashed"
//           onClick={() => add()}
//           icon={<PlusOutlined />}
//         >
//           Add New Contact
//         </Button>
//       </Form.Item>
//     </>
//   )}
// </Form.List> */}

//       {/* <hr /> */}

//       <h5>Booking Data</h5>

//       <Col span={24}>
//         <Form.Item label="Agent" name="agent_name">
//           <Select placeholder="SELECT AGENT" onChange={handleAgentChange} showSearch optionFilterProp="children"
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//             {agentlist.map((agent) => (
//               <Option key={agent.value} value={agent.value}>
//                 {agent.label}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item label="Agency employees" name="agent_employee_name">
//           <Select placeholder="SELECT AGENCY EMPLOYEE">
//             {agentEmployeeList.map((employee) => (
//               <Option key={employee._id} value={employee.firstname}>
//                 {employee.firstname}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item label="Payment method" name="payment_method">
//         <Select placeholder="SELECT PAYMENT METHOD" showSearch optionFilterProp="children" onChange={handleChange}  filterOption={(input, option) =>
//     option.children.toLowerCase().includes(input.toLowerCase())
//   }>
//           {/* <Option value="Net Prior To Arrival">Net Prior To Arrival</Option>
//           <Option value="Gross Prior To Arrival">Gross Prior To Arrival</Option>
//           <Option value="Net At School">Net At School</Option> */}
//            {paymentMethod.map((name) => (
//             <Option key={name._id} value={name.label}>
//               {name.label}
//             </Option>
//           ))}
//         </Select>
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item
//           label={
//             <span>
//               Partial payment&nbsp;
//               <Tooltip
//                 title="Payment plans can be set by
//       selecting the appropriate payment
//       term. The invoices are automatically created in parts and
//       the payment overview shows the calculated amounts and
//       instalments."
//               >
//                 <AiOutlineQuestionCircle />
//               </Tooltip>
//             </span>
//           }
//           name="partial_payment"
//         >
//           <Select placeholder="SELECT PARTIAL PAYMENT" onChange={handleChange}>
//           <Option value="Net Prior To Arrival">Net Prior To Arrival</Option>
//             <Option value=" Gross Prior To Arrival"> Gross Prior To Arrival</Option>
//             <Option value="Net At School">Net At School</Option>
//             <Option value="Gross At School">Gross At School</Option>
//           </Select>
//         </Form.Item>
//       </Col>

//       <Col span={24}>
//         <Form.Item label="Comment agent" name="agent_comment">
//           <Input placeholder="Enter Comment agent" />
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item
//           label="Currency" name="agent_currency"
//           rules={[{ required: true, message: "Please select Currency!" }]}
//         >
//           <Select placeholder="SELECT CURRENCY" onChange={handleChange}>
//             <Option value="GBP (£)">GBP (£)</Option>
//           </Select>
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item label="Salesperson" name="salesperson">
//           <Select placeholder="SELECT SALESPERON" showSearch optionFilterProp="children" onChange={handleChange}
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//           {salespersonList.map((name) => (
//             <Option key={name.value} value={name.value}>
//               {name.label}
//             </Option>
//           ))}
//           </Select>
//                     {/* <Input placeholder="Enter salesperson" /> */}

//         </Form.Item>
//       </Col>

//       <hr />

//       <h5>Other</h5>
//       <Col span={24}>
//         <Form.Item label="Voucher code" name="voucher_code">
//           <Input placeholder="Enter voucher code" />
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item label="Note" name="other_note">
//           <Input placeholder="Enter note" />
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item label="Student status" name="student_status">
//           <Select placeholder="SELECT STATUS" showSearch optionFilterProp="children" onChange={handleChange}
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//           {studentStatus.map((name) => (
//             <Option key={name.value} value={name.value}>
//               {name.label}
//             </Option>
//           ))}
//           </Select>
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item label="How did you hear about us?" name="hear_about_us">
//           <Select placeholder="SELECT.." showSearch optionFilterProp="children" onChange={handleChange}
//          filterOption={(input, option) =>
//           option.children.toLowerCase().includes(input.toLowerCase())
//         }>
//           {howHereAboutUs.map((name) => (
//             <Option key={name.value} value={name.value}>
//               {name.label}
//             </Option>
//           ))}
//           </Select>
//         </Form.Item>
//       </Col>

//       <hr />
//       <h5>Emergency Contact 2</h5>

//       <Col span={24}>
//         <Form.Item label="EC 1 Relationship" name="emergency_relation">
//           <Input placeholder="Enter EC 1 Relationship" />
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item label="EC 2 - Full Name" name="emergency_name">
//           <Input placeholder="Enter EC 2 - Full Name" />
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item label="EC 2 - Email" name="emergency_email">
//           <Input placeholder="Enter EC 2 - Email" />
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item
//           label="EC 2 - Relationship & language spoken"
//           name="emergency_language"
//         >
//           <Input placeholder="Enter EC 2 - Relationship & language spoken" />
//         </Form.Item>
//       </Col>
//       <Col span={24}>
//         <Form.Item label="EC 2 - Phone Number" name="emergency_phone">
//           <Input placeholder="Enter EC 2 - Phone Number" />
//         </Form.Item>
//       </Col>

//       <hr />
//       <h5>You do not need to fill out fields below - Valid for ONLINE FORM</h5>
//       <Col span={24}>
//         <Form.Item label="Consent for Promotional Materials" name="consent">
//           <Select
//             placeholder="SELECT..."
//             onChange={handleChange}
//           >
//             {/* <Option value="Yes, I am happy for my photographs and videos to be taken">Yes, I am happy for my photographs and videos to be taken.</Option>
//             <Option value="No, I don't want my photographs and videos to be taken">No, I don't want my photographs and videos to be taken.</Option>
//              */}
//               {studentStatus.map((name) => (
//             <Option key={name._id} value={name.label}>
//               {name.label}
//             </Option>
//           ))}
//           </Select>
//           {/* <Input placeholder="Enter Consent for Promotional Materials" /> */}
//         </Form.Item>
//       </Col>

//       <hr />
//       <h5>Online Medical Health</h5>
//       <Form.Item
//         label="Disability affecting mobility"
//         name="disability_affecting_mobility"
//         valuePropName="checked"
//       >
//         <Checkbox name="disability_affecting_mobility"></Checkbox>
//       </Form.Item>
//       <Form.Item label="Dyslexia" name="dyslexia" valuePropName="checked">
//         <Checkbox name="dyslexia"></Checkbox>
//       </Form.Item>
//       <Form.Item
//         label="No disabilities / No learning difficulties"
//         name="no_learning_difficulties"
//         valuePropName="checked"
//       >
//         <Checkbox name="no_learning_difficulties"></Checkbox>
//       </Form.Item>

//       {/* visual_hearing other_specific other_medical_condition */}
//       <Form.Item
//         label="Visual / Hearing impairment"
//         name="visual_hearing"
//         valuePropName="checked"
//       >
//         <Checkbox></Checkbox>
//       </Form.Item>
//       <Form.Item
//         label="Other specific learning difficulties"
//         name="other_specific"
//         valuePropName="checked"
//       >
//         <Checkbox></Checkbox>
//       </Form.Item>
//       <Form.Item label="Other medical conditions" name="other_medical_condition"  valuePropName="checked">
//         <Checkbox></Checkbox>
//       </Form.Item>

//       {/* <Form.Item
//         label="Did you receive any special learning support at school?"
//         name="learningSupport"
//         labelCol={{ span: 24 }}
//         wrapperCol={{ span: 24 }}
//         style={{ display: 'block' }}
//       >        <Select defaultValue="Option 1" onChange={handleChange}>
//           <Option value="Option 1">Option 1</Option>
//           <Option value="Option 2">Option 2</Option>
//           <Option value="Option 3">Option 3</Option>
//         </Select>
//       </Form.Item> */}

//       <Form.Item
//         label="Did you receive any special learning support at school?"
//         name="learningSupport"
//       >
//         <Select placeholder="SELECT" onChange={handleChange}>
//           <Option value="yes">Yes</Option>
//           <Option value="no">No</Option>
//         </Select>
//       </Form.Item>

//       <Form.Item
//         name="howDoYouLearnBest"
//         label="How do you learn best?"

//       >
//         {/* <Select mode="multiple" placeholder="Please select">
//           <Option value="A">A</Option>
//           <Option value="B">B</Option>
//           <Option value="C">C</Option>
//           <Option value="D">D</Option>
//         </Select> */}
//          <Input placeholder="Enter How do you learn best?" />
//       </Form.Item>

//       <Form.Item
//         name="extraHelpNeeded"
//         label="What extra help do you think you will need during your course?"

//       >
//         {/* <Select mode="multiple" placeholder="Please select">
//           <Option value="X">X</Option>
//           <Option value="Y">Y</Option>
//           <Option value="Z">Z</Option>
//         </Select> */}
//          <Input placeholder="Enter What extra help do you think you will need during your course?" />
//       </Form.Item>

//       <Form.Item
//         name="studyEnglishReason"
//         label="Why do you want to study English?"

//       >
//         {/* <Select mode="multiple" placeholder="Please select">
//           <Option value="H">H</Option>
//           <Option value="G">G</Option>
//           <Option value="L">L</Option>
//         </Select> */}
//      <Input placeholder="Enter Why do you want to study English?" />

//       </Form.Item>

//       <Form.Item
//         name="freeTimeOutsideSchoolWork"
//         label="How much free time do you have outside of school or work?"

//       >
//         {/* <Select mode="multiple" placeholder="Please select">
//           <Option value="red">Red</Option>
//           <Option value="green">Green</Option>
//           <Option value="blue">Blue</Option>
//         </Select> */}
//              <Input placeholder="Enter Why do you want to study English?" />

//       </Form.Item>

//       <Form.Item
//         name="howMuchTimeHaveOutside"
//         label="Which How much free time do you have outside of school or work?"

//       >
//         {/* <Select mode="multiple" placeholder="Please select">
//           <Option value="red">Red</Option>
//           <Option value="green">Green</Option>
//           <Option value="blue">Blue</Option>
//         </Select> */}
//         <Input placeholder="Enter Which How much free time do you have outside of school or work?" />
//       </Form.Item>

//       <Form.Item label="Other" name="other">
//         <Input placeholder="Enter Other" />
//       </Form.Item>

//       <Form.Item
//         label="Are you going to take any exams at the end of the this course?"
//         name="take_any_exam_end_course"
//         style={{ display: "block" }}
//       >
//         <Select placeholder="SELECT" onChange={handleChange}>
//           <Option value="yes">Yes</Option>
//           <Option value="no">No</Option>
//         </Select>
//       </Form.Item>

//       <Form.Item label="If Yes, please specify" name="if_yes_specify">
//         <Input placeholder="Specify if yes" />
//       </Form.Item>

//       {/* <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
//         <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
//           Save
//         </Button>
//       </Form.Item> */}
//        <SubmitCancelButtonGroup
//         recordData={recordData}
//         handleNewModalCancel={handleNewModalCancel}
//         CancelBothModel={CancelBothModel1}
//       />
//     </Form>
//   );
// };

// export default PersonalDetails;

import React, { useState,  useEffect, useRef } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
 
  Row,
  Col,
  
  
  message,
 
  Modal,
} from "antd";
import "../commonComponents/common.css";

import { DatePicker } from "antd";
import { Checkbox, notification } from "antd";
import baseURL from "../../../config";
import moment from "moment";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SubmitCancelButtonGroup } from "../commonComponents/ButtonsDropdown";
import { FieldListDropdown } from "../../sidebar menu/commonComponents/FieldListDropdown";
import axios from "axios";
import dayjs from "dayjs";


const { Option } = Select;

const PersonalDetails = ({
  mode,
  selectedRecordId,
  recordData,
  fetchData,
  setActiveTabinform,
  setEditModalVisible,
  onFinish,
  setNewModalVisible,
  handleNewModalCancel,
  CancelBothModel,
  updateCandidateId,
}) => {
  const [form] = Form.useForm();
    const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { RangePicker } = DatePicker;

  const onSearch = (value) => {
    // Handle search logic here
    console.log("Search:", value);
  };
  const [formGroups, setFormGroups] = useState([]);

  //fetched dropdown options start
  const [options, setOptions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [motherTounge, setMotherTounge] = useState([]);
  const [agentlist, setAgentList] = useState([]);
  const [studentStatus, setStudentStatus] = useState([]);
  const [howHereAboutUs, setHowHereAboutUs] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [salespersonList, setSalespersonList] = useState([]);
  const [agentEmployeeList, setAgentEmployeeList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [deletedContactIds, setDeletedContactIds] = useState([]);
   //fetched dropdown options end

   //adress and billing address start
    const [sameAsAddress, setSameAsAddress] = useState(false);
     //adress and billing address end

//birthdate start
    const [dob, setDob] = useState(null);
  const [weekday, setWeekday] = useState("");
  const [age, setAge] = useState("");
//birthdate end


//check-in start
 const [checked, setChecked] = useState(false);
const [checkIn, setCheckIn] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [tempCheckIn, setTempCheckIn] = useState(null);
//check-in end

  const formRefs = useRef({});

  //all dropdown options fetched functions bstart

  const fetchPaymentMethod = async () => {
    try {
      const responseData = await FieldListDropdown("paymentmethods", "title");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Name = responseData
          .map((name) => ({
            value: name._id, // Use the appropriate property for the value
            label: name.title, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setPaymentMethod(Name);
      }
    } catch (error) {
      console.error("Error fetching paymentmethods:", error);
    }
  };

  const fetchAgentEmployeeList = async () => {
    try {
      const responseData = await FieldListDropdown(
        "agencyemployees",
        "firstname"
      );
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Name = responseData.map((firstname) => ({
          value: firstname._id, // Use the appropriate property for the value
          label: firstname.firstname, // Use the appropriate property for the label
        }));
        setAgentEmployeeList(Name);
      }
    } catch (error) {
      console.error("Error fetching firstname:", error);
    }
  };

  const fetchSalesperson = async () => {
    try {
      const responseData = await FieldListDropdown(
        "overviewadmins",
        "first_name"
      );
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Name = responseData
          .map((firstname) => ({
            value: firstname._id, // Use the appropriate property for the value
            label: firstname.first_name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setSalespersonList(Name);
      }
    } catch (error) {
      console.error("Error fetching firstname:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const responseData = await FieldListDropdown("countries", "name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Country = responseData
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCountries(Country);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  const fetchHowHereAboutUs = async () => {
    try {
      const responseData = await FieldListDropdown(
        "howdidyouheres",
        "title_english"
      );
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Country = responseData
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.title_english, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setHowHereAboutUs(Country);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  const fetchStudentStatus = async () => {
    try {
      const responseData = await FieldListDropdown("studentstatuses", "title");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Country = responseData
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.title, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setStudentStatus(Country);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };

  const fetchAgentList = async () => {
    try {
      const responseData = await FieldListDropdown("agents", "name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Agent = responseData
          .map((agent) => ({
            value: agent._id, // Use the appropriate property for the value
            label: agent.name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setAgentList(Agent);
      }
    } catch (error) {
      console.error("Error fetching Agents:", error);
    }
  };

  const fetchNationality = async () => {
    try {
      const responseData = await FieldListDropdown("countries", "nationality"); // Your API call to get the list of countries

      if (responseData) {
        // Filter out entries with null or empty nationalities
        const validCountries = responseData.filter(
          (country) => country.nationality && country.nationality.trim() !== ""
        );

        // Construct objects with 'value' and 'label' properties
        const Country = validCountries
          .map((country) => ({
            value: country._id, // Use the appropriate property for the value
            label: country.nationality, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setNationality(Country); // Set the state with the filtered countries
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchMotherTounge = async () => {
    try {
      const responseData = await FieldListDropdown("mothertongues", "name");
      if (responseData) {
        // Extract course levels and construct objects with value and label properties
        const Mothertounge = responseData
          .map((item) => ({
            value: item._id, // Use the appropriate property for the value
            label: item.name, // Use the appropriate property for the label
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setMotherTounge(Mothertounge);
      }
    } catch (error) {
      console.error("Error fetching Mothertounge:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchNationality();
    fetchMotherTounge();
    fetchAgentList();
    fetchStudentStatus();
    fetchHowHereAboutUs();
    fetchSalesperson();
    fetchAgentEmployeeList();
    fetchPaymentMethod();
  }, []);

  const fetchEmployees = async (agentName) => {
    try {
      const response = await axios.post(`${baseURL}/agency-employees`, {
        agentName,
      });
      setAgentEmployeeList(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
      setAgentEmployeeList([]);
    }
  };

  useEffect(() => {
    fetchAgentList();
  }, []);

  useEffect(() => {
    if (selectedAgent) {
      const selectedAgentObj = agentlist.find(
        (agent) => agent.value === selectedAgent
      );
      if (selectedAgentObj) {
        fetchEmployees(selectedAgentObj.label);
        form.setFieldsValue({ agent_employee_name: null }); // Clear the agency employee name when agent changes
      }
    } else {
      setAgentEmployeeList([]);
    }
  }, [selectedAgent, agentlist, form]);

// useEffect(() => {
//   if (recordData) {
//     const dobMoment = recordData.dob ? moment(recordData.dob) : null;
//     const bookingDate = recordData.bookingdate ? moment(recordData.bookingdate) : null;
//     const arrivalDate = recordData.date_arrival ? dayjs(recordData.date_arrival) : null;

//     form.setFieldsValue({
//       studentid: recordData.studentid || null,
//       surname: recordData.surname || null,
//       firstname: recordData.firstname || null,
//       gender: recordData.gender || null,
//       dob: dobMoment,
//       country_birth: recordData.country_birth || null,
//       country_residence: recordData.country_residence || null,
//       nationality: recordData.nationality || null,
//       mother_tongue: recordData.mother_tongue || null,
//       phone: recordData.phone || null,
//       email: recordData.email || null,
//       lead: recordData.lead || null,
//       status: recordData.status || null,
//       studyEnglishReason: recordData.studyEnglishReason || null,
//       online_medical_health: recordData.online_medical_health || null,
//       // Address
//       address_address: recordData.address_address || null,
//       address_city: recordData.address_city || null,
//       address_state: recordData.address_state || null,
//       address_country: recordData.address_country || null,
//       address_zipcode: recordData.address_zipcode || null,
//       // Booking
//       bookingdate: bookingDate,
//       // Billing
//       billing_address: recordData.billing_address || null,
//       billing_city: recordData.billing_city || null,
//       billing_state: recordData.billing_state || null,
//       billing_country: recordData.billing_country || null,
//       billing_zipcode: recordData.billing_zipcode || null,
//       salesperson: recordData.salesperson || null,
//       date_arrival: arrivalDate || null,
//       // 🔹 Initialize checkbox state from existing date
//       checkIn: arrivalDate,          // optional local state sync
//     });

//     // ✅ Set checkbox and tempCheckIn state
//     setChecked(!!arrivalDate);       // checked if date exists
//     setCheckIn(arrivalDate);         // actual check-in
//     setTempCheckIn(arrivalDate);     // temp for modal editing

//     // 🔹 Populate Form.List
//     form.setFieldsValue({
//       formGroups: recordData.formGroups
//         ? recordData.formGroups.map((group) => ({
//             _id: group._id || null,
//             further_type: group.further_type || null,
//             further_firstname: group.further_firstname || null,
//             further_surname: group.further_surname || null,
//             further_phone: group.further_phone || null,
//             further_email: group.further_email || null,
//           }))
//         : [],
//     });
//   }
// }, [recordData, form]);



  // Update agent_employee_name field when agentEmployeeList changes
  // useEffect(() => {
  //   if (recordData && agentEmployeeList.length > 0) {
  //     form.setFieldsValue({
  //       agent_employee_name: recordData.booking.agent_employee_name,
  //     });
  //   }
  // }, [agentEmployeeList, recordData, form]);



  useEffect(() => {
  if (recordData) {
    const dobMoment = recordData.dob ? dayjs(recordData.dob) : null; // ✅ use dayjs consistently
    const bookingDate = recordData.bookingdate ? dayjs(recordData.bookingdate) : null;
    const arrivalDate = recordData.date_arrival ? dayjs(recordData.date_arrival) : null;

    form.setFieldsValue({
      studentid: recordData.studentid || null,
      surname: recordData.surname || null,
      firstname: recordData.firstname || null,
      gender: recordData.gender || null,
      dob: dobMoment,
      country_birth: recordData.country_birth || null,
      country_residence: recordData.country_residence || null,
      nationality: recordData.nationality || null,
      mother_tongue: recordData.mother_tongue || null,
      phone: recordData.phone || null,
      email: recordData.email || null,
      lead: recordData.lead || null,
      status: recordData.status || null,
      studyEnglishReason: recordData.studyEnglishReason || null,
      online_medical_health: recordData.online_medical_health || null,
      // Address
      address_address: recordData.address_address || null,
      address_city: recordData.address_city || null,
      address_state: recordData.address_state || null,
      address_country: recordData.address_country || null,
      address_zipcode: recordData.address_zipcode || null,
      // Booking
      bookingdate: bookingDate,
      // Billing
      billing_address: recordData.billing_address || null,
      billing_city: recordData.billing_city || null,
      billing_state: recordData.billing_state || null,
      billing_country: recordData.billing_country || null,
      billing_zipcode: recordData.billing_zipcode || null,
      salesperson: recordData.salesperson || null,
      date_arrival: arrivalDate || null,
      checkIn: arrivalDate,
    });

    // ✅ set check-in related states
    setChecked(!!arrivalDate);
    setCheckIn(arrivalDate);
    setTempCheckIn(arrivalDate);

    // ✅ Recalculate weekday + age if dob exists
    if (dobMoment) {
      const dayName = dobMoment.format("ddd"); // Mon, Tue, etc.
      setWeekday(dayName);

      const today = dayjs();
      const years = today.diff(dobMoment, "year");
      setAge(years);
    } else {
      setWeekday("");
      setAge("");
    }

    // ✅ Populate Form.List
    form.setFieldsValue({
      formGroups: recordData.formGroups
        ? recordData.formGroups.map((group) => ({
            _id: group._id || null,
            further_type: group.further_type || null,
            further_firstname: group.further_firstname || null,
            further_surname: group.further_surname || null,
            further_phone: group.further_phone || null,
            further_email: group.further_email || null,
          }))
        : [],
    });
  }
}, [recordData, form]);




  const handleAgentChange = (value) => {
    const selectedAgentObj = agentlist.find((agent) => agent.value === value);
    if (selectedAgentObj) {
      setSelectedAgent(selectedAgentObj.value); // Set the agent's ID (value)
    }
  };
 //all dropdown options fetched functions end




//birthdate, day, age calculation start
  const handleDateChange = (date) => {
    setDob(date);

    if (date) {
      // Calculate weekday
      const dayName = date.format("ddd"); // Mon, Tue, Wed...
      setWeekday(dayName);

      // Calculate age
      const today = dayjs();
      let years = today.diff(date, "year");
      setAge(years);
    } else {
      setWeekday("");
      setAge("");
    }
  };
//birthdate, day, age calculation end

  const resetAllFields = () => {
    // Object.values(formRefs.current).forEach((form) => {
    form.resetFields();
    setChecked(false);       // reset checkbox
  setCheckIn(null);        // reset date
  setModalVisible(false);  // close modal if open
    // });
  };

  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
    // console.log("its running");
  };

  const handleSearch = (value) => {
    const suggestions = [
      "First Name",
      "Last Name",
      "Email Address",
      "Date of Birth",
    ];
    setOptions(
      value ? suggestions.map((suggestion) => ({ value: suggestion })) : []
    );
  };

  const onSelect = (value) => {
    console.log("Selected:", value);
  };

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const addFormGroup = () => {
    setFormGroups([...formGroups, {}]);
  };

  const removeFormGroup = (index) => {
    const updatedFormGroups = [...formGroups];
    updatedFormGroups.splice(index, 1);
    setFormGroups(updatedFormGroups);
  };

 const handleFinish = async (formValues) => {
  // ✅ Transform salesperson (id → label)
  const salespersonName = Array.isArray(formValues.salesperson)
    ? formValues.salesperson.map((id) => {
        const selected = salespersonList.find((p) => p.value === id);
        return selected ? selected.label : id;
      })
    : salespersonList.find((p) => p.value === formValues.salesperson)?.label ||
      formValues.salesperson;

       const selectedSalesperson = salespersonList.find(
    (p) => p.value === formValues.salesperson
  );

  // ✅ Transform nationality
  const nationalityName = countries.find(
    (c) => c.label === formValues.nationality
  )?.label;

  // ✅ Country of birth
  const countryOfBirth = countries.find(
    (c) => c.label === formValues.country_birth
  )?.label;

  // ✅ Country of residence
  const countryResidence = countries.find(
    (c) => c.label === formValues.country_residence
  )?.label;

  // ✅ Mother tongue
  const motherTongue = motherTounge.find(
    (m) => m.label === formValues.mother_tongue
  )?.label;

  // ✅ Emergency contacts list (flatten values)
  const emergencyContacts =
    formValues.formGroups?.map((c) => ({
      relation: c.further_type,
      firstname: c.further_firstname,
      surname: c.further_surname,
      phone: c.further_phone,
      email: c.further_email,
      _id: c._id, // keep if exists (for updates)
    })) || [];

  // ✅ Build clean object
  const allValues = {
    ...formValues,
     salesperson: selectedSalesperson
      ? { id: selectedSalesperson.value, name: selectedSalesperson.label }
      : formValues.salesperson, // fallback
    // salesperson: salespersonName,
    nationality: nationalityName,
    country_birth: countryOfBirth,
    country_residence: countryResidence,
    mother_tongue: motherTongue,
    formGroups: emergencyContacts,
  };

  console.log("📌 PersonalDetails transformed values:", allValues);

  // ✅ Call parent onFinish (this is passed down from BookingForm)
  onFinish(allValues);
};

//adress and billing address start
// const handlePostcodeLookup = async (e) => {
//   let postcode = e.target.value.trim().toUpperCase();
//   if (!postcode) return;

//   try {
//     const res = await axios.get(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    
//     if (res.data && res.data.status === 200) {
//      const details = res.data.result;

//       form.setFieldsValue({
//         address_address: details.admin_ward || details.admin_district || "", // 👈 area/locality
//         address_city: details.admin_district || "",
//         address_state: details.region || "",
//         address_postcode: details.postcode ||"",
//         address_country: "United Kingdom",
//       });
//     } else {
//       console.error("❌ Postcode not found");
//     }
//   } catch (err) {
//     console.error("❌ Invalid or unsupported postcode:", postcode, err);
//   }
// };

// 🔹 Generic postcode lookup function (works for both shipping & billing)
const handlePostcodeLookup = async (postcode, type = "address") => {
  if (!postcode) return;

  try {
    const res = await axios.get(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`
    );

    if (res.data && res.data.status === 200) {
      const details = res.data.result;

      // 🔹 Autofill form fields dynamically
      form.setFieldsValue({
        [`${type}_address`]: details.admin_ward || details.admin_district || "",
        [`${type}_city`]: details.admin_district || "",
        [`${type}_state`]: details.region || "",
        [`${type}_zipcode`]: details.postcode || "",
        [`${type}_country`]: "United Kingdom",
      });
    } else {
      console.error("❌ Postcode not found");
    }
  } catch (err) {
    console.error("❌ Invalid or unsupported postcode:", postcode, err);
  }
};

  const handleSameAsAddress = (e) => {
    const checked = e.target.checked;
    setSameAsAddress(checked);

    if (checked) {
      // get Address Details values
      const addressDetails = form.getFieldsValue([
        "address_address",
        "address_zipcode",
        "address_city",
        "address_state",
        "address_country",
      ]);

      // set them into Billing fields
      form.setFieldsValue({
        billing_address: addressDetails.address_address,
        billing_zipcode: addressDetails.address_zipcode,
        billing_city: addressDetails.address_city,
        billing_state: addressDetails.address_state,
        billing_country: addressDetails.address_country,
      });
    } else {
      // clear billing address if unchecked
      form.resetFields([
        "billing_address",
        "billing_zipcode",
        "billing_city",
        "billing_state",
        "billing_country",
      ]);
    }
  };
//adress and billing address end


//check-in functions start
 const handleCheck = (e) => {
  const isChecked = e.target.checked;
  setChecked(isChecked);

  if (isChecked) {
    const today = dayjs();
    setCheckIn(today);
    setTempCheckIn(today);
    form.setFieldsValue({ date_arrival: today }); // ✅ update form
  } else {
    setCheckIn(null);
    setTempCheckIn(null);
    form.setFieldsValue({ date_arrival: null }); // ✅ remove date
  }
};

const handleSave = () => {
  setCheckIn(tempCheckIn);
  form.setFieldsValue({ date_arrival: tempCheckIn }); // ✅ update form value
  setModalVisible(false);
};

const handleCancel = () => {
  setTempCheckIn(checkIn);
  setModalVisible(false);
};

//check-in functions end

  return (
    <Form
      form={form}
      labelCol={{ span: 8, style: { whiteSpace: "normal" } }}
      wrapperCol={{ span: 15 }}
      layout="horizontal"
      style={{ width: "100%", lineHeight: "0.1" }}
      onFinish={onFinish}
    >
      <Row justify="center" style={{ marginTop: "24px" }}>
        <Col span={24}>
          <h5>Personal Details</h5>
         
          {/* <Form.Item
            label="Student ID"
            name="studentid"
            rules={[{ required: true, message: "Please select student id!" }]}
          >
            <Select
              showSearch
              placeholder="Select student ID"
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) =>
                option?.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="5846">5846</Option>
              <Option value="7854">7854</Option>
              <Option value="9632">9632</Option>
            </Select>
          </Form.Item> */}

          <Form.Item label="Salesperson" name="salesperson"
           rules={[{ required: true, message: "Please select salesperson!" }]}
          >
            <Select
              placeholder="Select salesperson"
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {salespersonList.map((name) => (
                <Option key={name.value} value={name.value}>
                  {name.label}
                </Option>
              ))}
            </Select>
            {/* <Input placeholder="Enter salesperson" /> */}
          </Form.Item>

          <Form.Item
            label="Lead"
            name="lead"
            rules={[{ required: true, message: "Please select lead!" }]}
          >
            <Select placeholder="Select lead" onChange={handleChange}>
              <Option value="B2B">B2B</Option>
              <Option value="B2C">B2C</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: "Please select firstname!" }]}
          >
            <Input placeholder="Enter first firstname" />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true, message: "Please select surname!" }]}
          >
            <Input placeholder="Enter surname" />
          </Form.Item>

        <Form.Item
  label="Phone"
  name="phone"
  rules={[
    { required: true, message: "Please enter phone number!" },
    {
      pattern: /^[0-9]{7,15}$/,
      message: "Phone number must be 7 to 15 digits only",
    },
  ]}
>
  <Input
    placeholder="Enter phone number"
    maxLength={15} // Restrict max digits
    onKeyPress={(e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault(); // Block anything that's not a digit
      }
    }}
  />
</Form.Item>



<Form.Item
  label="E-mail"
  name="email"
  rules={[
    { required: true, message: "Please enter email id!" },
    { type: "email", message: "Please enter a valid email address!" },
  ]}
>
  <Input placeholder="Enter email" />
</Form.Item>


          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select surname!" }]}
          >
            <Select placeholder="Select gender" onChange={handleChange}>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Non-binary">Non-binary</Option>
            </Select>
          </Form.Item>
        

     <Form.Item
  label="Birthdate"
  name="dob"
  rules={[{ required: true, message: "Please select Birthdate!" }]}
  getValueFromEvent={(value) => value} // ensures DatePicker value goes to Form
>
  <div
    style={{
      display: "flex",
      border: "1px solid #d9d9d9",
      borderRadius: 6,
      overflow: "hidden",
      width: "70%", // adjust container width
    }}
  >
    {/* Date Picker */}
    <DatePicker
      format="DD/MM/YYYY"
      placeholder="dd/mm/yyyy"
      style={{
        flex: 2, // wider
        border: "none",
        boxShadow: "none",
      }}
      value={form.getFieldValue("dob")}   // ✅ bind DatePicker to Form
      onChange={(date) => {
        form.setFieldsValue({ dob: date }); // ✅ update form value
        handleDateChange(date); // keep your existing logic
      }}
    />

    {/* Divider */}
    <div
      style={{
        width: "1px",
        background: "#d9d9d9",
      }}
    />

    {/* Weekday */}
    <div
      style={{
        flex: 1,
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
      }}
    >
      {weekday || "Day"}
    </div>

    {/* Divider */}
    <div
      style={{
        width: "1px",
        background: "#d9d9d9",
      }}
    />

    {/* Age */}
    <div
      style={{
        flex: 1,
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
      }}
    >
      Age : {age || "--"}
    </div>
  </div>
</Form.Item>




          <Form.Item
            label="Nationality"
            name="nationality"
            rules={[{ required: true, message: "Please select Nationality!" }]}
          >
            <Select
              placeholder="Select nationality"
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {nationality.map((name) => (
                <Option key={name._id} value={name.label}>
                  {name.label}
                </Option>
              ))}{" "}
            </Select>
          </Form.Item>

          <Form.Item label="Country of birth" name="country_birth"
           rules={[{ required: true, message: "Please select country of birth!" }]}
          >
            <Select
              placeholder="select country of birth"
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {countries.map((name) => (
                <Option key={name._id} value={name.label}>
                  {name.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Country of residence" name="country_residence"
           rules={[{ required: true, message: "Please select country of residence!" }]}
          >
            <Select
              placeholder="Select country of residence"
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {countries.map((name) => (
                <Option key={name._id} value={name.label}>
                  {name.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Mother tongue"
            name="mother_tongue"
            rules={[
              { required: true, message: "Please select Mother Tongue!" },
            ]}
          >
            <Select
              placeholder="Select mother tounge"
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {motherTounge.map((name) => (
                <Option key={name._id} value={name.label}>
                  {name.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item
            label="Correspondence language"
            name="correspondence_language"
          >
            <Select
              placeholder="Select Correspondence language"
              onChange={handleChange}
            >
              <Option value="English">English</Option>
              <Option value="Portuguese">Portuguese</Option>
              <Option value="Spanish">Spanish</Option>
            </Select>
          </Form.Item> */}
        </Col>

        {/* <Col span={7} style={{ marginLeft: "10px" }}>
          <Form.Item
            label=""
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture">
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  textAlign: "center",
                  border: "1px dashed #d9d9d9",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PlusOutlined style={{ fontSize: "36px", color: "#d9d9d9" }} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Col> */}
      </Row>

      <hr />
       <h5>Address Details</h5>
       <Row justify="center" align="middle">
  <Col span={24}>
    <Form.Item
      label="Address"
      name="address_address"
      rules={[{ required: true, message: "Please enter address!" }]}
    >
      <Input placeholder="Enter address" />
    </Form.Item>
  </Col>

  <Col span={24}>
    <Form.Item
      label="Zip / Postal code"
      name="address_zipcode"
      rules={[{ required: true, message: "Please enter zip/postal code!" }]}
    >
      <Input
    placeholder="Enter zip/postal code"
    onChange={(e) => {
      let value = e.target.value.toUpperCase(); // 🔹 Force uppercase
      form.setFieldsValue({ address_zipcode: value }); // Update field value

      // 🔹 Trigger lookup automatically when length is valid (5–8 chars)
      if (value.replace(/\s/g, "").length >= 5) {
        handlePostcodeLookup(value, "address");
      }
    }}
  />
    </Form.Item>
  </Col>

  <Col span={24}>
    <Form.Item
      label="City"
      name="address_city"
      rules={[{ required: true, message: "Please enter city!" }]}
    >
      <Input placeholder="Enter city" />
    </Form.Item>
  </Col>

  <Col span={24}>
    <Form.Item
      label="State"
      name="address_state"
      rules={[{ required: true, message: "Please enter state!" }]}
    >
      <Input placeholder="Enter state" />
    </Form.Item>
  </Col>

  <Col span={24}>
    <Form.Item
      label="Country"
      name="address_country"
      rules={[{ required: true, message: "Please select country!" }]}
    >
      <Select placeholder="Select country" showSearch optionFilterProp="children">
        {countries.map((name) => (
          <Option key={name._id} value={name.label}>
            {name.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </Col>
</Row>


      <hr />

      <h5>Billing Address</h5>

      {/* <Checkbox onChange={handleSameAsAddress} checked={sameAsAddress}>
        Same as Address Details
      </Checkbox> */}

      <Row justify="center" align="middle">
        <Col span={24}>
          <Form.Item label="Address" name="billing_address"
           rules={[{ required: true, message: "Please enter address!" }]}
           >
            <Input placeholder="Enter address" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Zip / Postal code" name="billing_zipcode"
           rules={[{ required: true, message: "Please enter zip/postal code!" }]}
          >
             <Input
    placeholder="Enter zip/postal code"
    onChange={(e) => {
      let value = e.target.value.toUpperCase(); 
      form.setFieldsValue({ billing_zipcode: value });

      if (value.replace(/\s/g, "").length >= 5) {
        handlePostcodeLookup(value, "billing");
      }
    }}
  />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="City" name="billing_city"
           rules={[{ required: true, message: "Please enter city!" }]}
          >
            <Input placeholder="Enter city" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="State" name="billing_state"
            rules={[{ required: true, message: "Please enter state!" }]}
           >
            <Input placeholder="Enter state" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Country" name="billing_country"
           rules={[{ required: true, message: "Please select country!" }]}
          >
            <Select
              placeholder="Select country"
              showSearch
              optionFilterProp="children"
            >
              {countries.map((name) => (
                <Option key={name._id} value={name.label}>
                  {name.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <hr />

      <h5>Emergency contact details</h5>

    

      <Form.List name="formGroups">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 16,
                  alignItems: "center",
                }}
              >
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  {...restField}
                  label="Emergency contact"
                  name={[name, "further_type"]}
                  fieldKey={[fieldKey, "further_type"]}
                  rules={[
                    { required: true, message: "Please select a relation!" },
                  ]}
                  style={{ marginRight: 8 }}
                >
                  <Select placeholder="Select relation">
                    <Option value="partner">Partner</Option>
                    <Option value="parent">Parent</Option>
                    <Option value="others">Others</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="First Name"
                  name={[name, "further_firstname"]}
                  fieldKey={[fieldKey, "further_firstname"]}
                  rules={[
                    { required: true, message: "Please enter first name!" },
                  ]}
                  style={{ marginRight: 8 }}
                >
                  <Input placeholder="Enter First name" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Last name"
                  name={[name, "further_surname"]}
                  fieldKey={[fieldKey, "further_surname"]}
                  rules={[{ required: true, message: "Please enter surname!" }]}
                  style={{ marginRight: 8 }}
                >
                  <Input placeholder="Enter Surname" />
                </Form.Item>

               <Form.Item
  labelCol={{ span: 24 }}
  wrapperCol={{ span: 24 }}
  label="Phone"
  name={[name, "further_phone"]}
  fieldKey={[fieldKey, "further_phone"]}
  rules={[
    { required: true, message: "Please enter phone!" },
    {
      pattern: /^[0-9]{7,15}$/,
      message: "Phone number must be 7 to 15 digits only",
    },
  ]}
  style={{ marginRight: 8 }}
>
  <Input
    placeholder="Enter phone"
    maxLength={15}
    onKeyPress={(e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault(); // block non-digits
      }
    }}
    onChange={(e) => {
      e.target.value = e.target.value.replace(/\D/g, ""); // remove non-digits if pasted
    }}
  />
</Form.Item>


                <Form.Item
  labelCol={{ span: 24 }}
  wrapperCol={{ span: 24 }}
  label="Email"
  name={[name, "further_email"]}
  fieldKey={[fieldKey, "further_email"]}
  rules={[
    { required: true, message: "Please enter email!" },
    { type: "email", message: "Please enter a valid email address!" },
  ]}
  style={{ marginRight: 8 }}
>
  <Input type="email" placeholder="Enter Email" />
</Form.Item>


                <Button
                  type="link"
                  style={{
                    backgroundColor: "#ff4d4f",
                    color: "#fff",
                    marginRight: 8,
                    marginTop: 13,
                  }}
                  onClick={() => {
                    const contactId = form.getFieldValue([
                      "formGroups",
                      name,
                      "_id",
                    ]);
                    if (contactId) {
                      setDeletedContactIds((prevIds) => [
                        ...prevIds,
                        contactId,
                      ]);
                      console.log("dele", deletedContactIds);
                    }
                    remove(name);
                  }}
                >
                  <DeleteOutlined /> Delete
                </Button>
              </div>
            ))}

            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add contacts
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <hr />

      <h5>Booking Data</h5>

      <Col span={24}>
         <Form.Item
            label="Date"
            name="bookingdate"
            rules={[{ required: true, message: "Please select date!" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="dd/mm/yyyy"
              style={{ width: "30%" }}
            />
          </Form.Item>
      </Col>

<Col span={24}>
         <Form.Item
        name="online_medical_health"
        label="Online Medical Health"
         rules={[{ required: true, message: "Please online medical health!" }]}
      >
        <Input placeholder="Enter online medical health" />
      </Form.Item>
      </Col>

      <Col span={24}>
         <Form.Item
        name="studyEnglishReason"
        label="Why do you want to study English?"
         rules={[{ required: true, message: "Please enter why do you want to study English!" }]}
      >
        {/* <Select mode="multiple" placeholder="Please select">
          <Option value="H">H</Option>
          <Option value="G">G</Option>
          <Option value="L">L</Option>
        </Select> */}
        <Input placeholder="Enter Why do you want to study English?" />
      </Form.Item>
      </Col>

      

      
      {/* <h5>Online Medical Health</h5> */}
      <Form.Item label="Check-in" name="date_arrival">
  <>
    <Checkbox checked={checked} onChange={handleCheck}>
      {checked && checkIn
        ? `Student Arrived (${checkIn.format("DD.MM.YYYY")})`
        : ""}
    </Checkbox>

    {checked && checkIn && (
      <Button
        type="link"
        size="small"
        onClick={() => setModalVisible(true)}
      >
        Edit
      </Button>
    )}

    <Modal
      title="Edit Check-in Date"
      open={modalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <DatePicker
        format="DD/MM/YYYY"
        value={tempCheckIn}
        onChange={(date) => setTempCheckIn(date)}
        style={{ width: "100%" }}
      />
    </Modal>
  </>
</Form.Item>

      
<Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select placeholder="Select status" onChange={handleChange}>
              <Option value="New – just added, no contact yet.">New – just added, no contact yet.</Option>
              <Option value="In Progress – communication in progress.">In Progress – communication in progress.</Option>
              <Option value="Trial Scheduled – a trial lesson is scheduled.">Trial Scheduled – a trial lesson is scheduled.</Option>
              <Option value="Converted – enquiry confirmed, booking created.">Converted – enquiry confirmed, booking created.</Option>
              <Option value="New – just added, no contact yet.">New – just added, no contact yet.</Option>
              <Option value="Enrolled – confirmed course participation, not started yet.">Enrolled – confirmed course participation, not started yet.</Option>
              <Option value="Active – currently attending the course.">Active – currently attending the course.</Option>
              <Option value="Paused – temporarily on hold (e.g. vacation).">Paused – temporarily on hold (e.g. vacation).</Option>
              <Option value="Completed – finished the course successfully.">Completed – finished the course successfully.</Option>
              <Option value="Declined / Not Enrolled – decided not to join.">Declined / Not Enrolled – decided not to join.</Option>
              <Option value="Lost – inactive, no response.">Lost – inactive, no response.</Option>
              <Option value="Deleted – removed manually or by mistake.">Deleted – removed manually or by mistake.</Option>

            </Select>
          </Form.Item>



      {/* <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
          Save
        </Button>
      </Form.Item> */}
      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel1}
      />
    </Form>
  );
};

export default PersonalDetails;
