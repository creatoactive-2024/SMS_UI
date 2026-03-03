


import axios from 'axios';
import baseURL from './baseURL';
import { message } from "antd";


export const handleDelete = async (collectionName,selectedRowKeys,fetchData,setDeleteModalVisible) => {
  try {
    const requestBody = [
      {
        collectionName: collectionName,
        ids: selectedRowKeys,
      },
    ];

    console.log("Request Body:", requestBody);

    // Call the common delete API with the selected record IDs
    const response = await axios.post(`${baseURL}/deleteRecord`, requestBody);

    console.log("API Response:", response.data);

    // Handle success (show message, refresh data, etc.)
    message.success("Records deleted successfully");

    // Refresh data after deletion
    fetchData();

    // Close the delete confirmation modal
    setDeleteModalVisible(false);
  } catch (error) {
    fetchData();
    console.error("Error deleting records:", error);
    // Handle error (show message or other error handling)
  }
};
