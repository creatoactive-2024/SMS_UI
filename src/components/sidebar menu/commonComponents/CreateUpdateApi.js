import axios from "axios";

import baseURL from "./baseURL";
import { notification } from "antd";
import React from "react";

// export const SaveCombinedData1 = async (
//   combinedFormData,
//   collectionName,
//   selectedRecordId,
//   setEditModalVisible,
//   setNewModalVisible,
//   resetAllFields,
//   fetchData,
//   setCurrentStep,
//   setActiveTab
// ) => {
//   console.log("sarv data", combinedFormData);
//   try {
//     const response = await fetch(`${baseURL}/createdata`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify([
//         {
//           collectionName: collectionName,
//           data: combinedFormData, // Assuming combinedFormData already includes _id
//         },
//       ]),
//     });

//     const data = await response.json();
//     console.log("API Response:", data);

//     if (
//       data[0]?.message.includes(
//         `Document created successfully for collection: ${collectionName}.`
//       )
//     ) {
//       notification.success({
//         message: "Success",
//         description: "Data created successfully!",
//       });
//     } else if (
//       data[0]?.message.includes(
//         `Document updated successfully for collection: ${collectionName}.`
//       )
//     ) {
//       notification.success({
//         message: "Success",
//         description: "Data updated successfully!",
//       });
//     } else {
//       notification.error({
//         message: "Error",
//         description: "Failed to save data. Please try again.",
//       });
//     }

//     // Set modal visibility based on selectedRecordId
//     if (selectedRecordId) {
//       setEditModalVisible(false);
//     } else {
//       setNewModalVisible(false);
//     }

//     // Reset all form fields
//     resetAllFields();

//     // Fetch data
//     fetchData();

//     // Set current step and active tab
//     setCurrentStep(1);
//     setActiveTab("1");
//   } catch (error) {
//     console.error("Error saving combined data:", error);
//   }
// };







export const SaveData = async (
  collectionName,
  combinedFormData,
  selectedRecordId,
  setEditModalVisible,
  setNewModalVisible,
  resetAllFields,
  fetchData,
  setCurrentStep,
  setActiveTab,
  stateResetFunctions,
  // setSelectedRecordId
) => {
  try {
    const response = await fetch(`${baseURL}/createdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          collectionName: collectionName,
          data: {
            _id: selectedRecordId,
            ...combinedFormData,
          },
        },
      ]),
    });

    const data = await response.json();
    console.log("API Response:", data);

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
        setActiveTab("1");
        setEditModalVisible(false);
      } else {
        setActiveTab("1");
        setNewModalVisible(false);
      }

      // Optionally, perform any additional actions after successful submission

      resetAllFields(); // Reset all form fields

      fetchData();

      setCurrentStep(1);
      setActiveTab("1");

      // Reset specific form data if needed
      if (stateResetFunctions && Array.isArray(stateResetFunctions)) {
        stateResetFunctions.forEach((resetFunction) => resetFunction());
      }
    } else {
      notification.error({
        message: "Error",
        description: "Failed to save data. Please try again.",
      });
      fetchData();
      // setSelectedRecordId(null);
    }
  } catch (error) {
    console.error("Error saving data:", error);
    fetchData();

  }
};















// export const CommonFormSubmit = async (collectionName, data, setNewModalVisible, setEditModalVisible,form, fetchData, ) => {
//   try {
//     const response = await axios.post(
//       `${baseURL}/createdata`,
//       [
//         {
//           collectionName: collectionName,
//           data: data,
//         },
//       ],
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.data && response.data[0] && response.data[0].message) {
//       notification.success({
//         message: "Success",
//         description: response.data[0].message,
//       });

//       // Optionally, close modals
//       setNewModalVisible(false);
//       setEditModalVisible(false);

//       // Optionally, reset form fields
//       form.resetFields();

//       // Optionally, fetch data after addition
//       fetchData();
//     } else {
//       notification.error({
//         message: "Error",
//         description: "Failed to save data. Please try again.",
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     notification.error({
//       message: "Error",
//       description: "Failed to save data. Please try again.",
//     });
//   }
// };

export const CommonFormSubmit = async (
  collectionName,
  setSelectedRecordId,
  data,
  setNewModalVisible,
  setEditModalVisible,
  form,
  fetchData,
  setErrorMessage,
  setSuccessMessage
) => {

  try {
    const requestData = [
      {
        collectionName: collectionName,
        data: data,
        
      },
    ];
    const response = await axios.post(
      `${baseURL}/createdata`,
      requestData
    );
    const responseData = response.data;

    console.log("Response Data:", responseData); // Log response data for debugging

    responseData.forEach((res) => {
      if (res.message) {
        setSuccessMessage(res.message);
        setErrorMessage(''); // Clear any existing error message
        notification.success({
          message: "Success",
          description: response.data[0].message,
        });
        setNewModalVisible(false);
        setEditModalVisible(false);

        // Reset selectedRecordId to null for creating new records
        setSelectedRecordId(null);

        // Optionally, reset form fields
        form.resetFields();

        // Optionally, fetch data after addition
        fetchData();
      } else if (res.error) {
        setErrorMessage(res.error);
        setSuccessMessage(""); // Clear any existing success message
        notification.error({
          message: "Error",
          description: "Failed to save data. Please try again.",
        });
      }
    });
  } catch (error) {
    setErrorMessage("Internal server error. Please try again later.");
    console.error(error);
    setSuccessMessage(""); // Clear any existing success message
    notification.error({
      message: "Error",
      description: "Failed to save data. Please try again.",
    });
  }
};
