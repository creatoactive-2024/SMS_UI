

import baseURL from './baseURL';

// export const fetchDataCommon = async (collectionName,setData,setSelectedRowKeys,setLoading) => {
//   try {
//     setLoading(true);
//     const response = await fetch(`${baseURL}/getdata`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         collectionName: collectionName,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.statusText}`);
//     }

//     const responseData = await response.json(); // Extract JSON data
//     setData(responseData); // Update the state with fetched data
//     setSelectedRowKeys([]); // Reset selectedRowKeys
//     setLoading(false);
//     console.log("Response Data:", responseData); // Log the actual data
//   } catch (error) {
//     setLoading(false);

//     console.error("Error fetching data:", error);
//   }
// };

// export const fetchDataCommon = async (
//   collectionName,
//   setData,
//   setSelectedRowKeys,
//   setLoading,
//   setErrorMessage
// ) => {
//   try {
//     setLoading(true);
//     const response = await fetch(`${baseURL}/getdata`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         collectionName: collectionName,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.statusText}`);
//     }

//     const responseData = await response.json(); // Extract JSON data

//     if (responseData.error && responseData.error === "Collection is empty") {
//       // Handle empty collection error here
//       // For example, update state to show 'No data found' message
//       setData([]); // Set data to an empty array or null
//       setErrorMessage("No data found");
//     } else {
//       // Update the state with fetched data
//       setData(responseData);
//       setSelectedRowKeys([]);
//       setErrorMessage(""); // Clear any previous error message
//     }

//     setSelectedRowKeys([]); // Reset selectedRowKeys
//     setLoading(false);
//     console.log("Response Data:", responseData); // Log the actual data
//   } catch (error) {
//     setLoading(false);
//     console.error("Error fetching data:", error);
//     // Handle other errors if needed
//   }
// };




export const fetchDataCommon = async (
  collectionName,
  setData,
  setSelectedRowKeys,
  setLoading,
  setErrorMessage
) => {
  try {
    setLoading(true);
    const response = await fetch(`${baseURL}/getdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionName: collectionName,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const responseData = await response.json(); // Extract JSON data

    if (responseData.error && responseData.error === "Collection is empty") {
      // Handle empty collection error here
      // For example, update state to show 'No data found' message
      setData([]); // Set data to an empty array or null
      setErrorMessage("No data found");
    } else {
      // Reverse the data to display the last entry first
      const reversedData = responseData.reverse();
      // Update the state with fetched data
      setData(reversedData);
      setSelectedRowKeys([]);
      setErrorMessage(""); // Clear any previous error message
    }

    setSelectedRowKeys([]); // Reset selectedRowKeys
    setLoading(false);
    console.log("Response Data:", responseData); // Log the actual data
  } catch (error) {
    setLoading(false);
    console.error("Error fetching data:", error);
  }
};
