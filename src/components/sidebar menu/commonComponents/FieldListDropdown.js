import baseURL from "./baseURL";

export const FieldListDropdown = async (collectionName, fieldName) => {
    try {
      const response = await fetch(`${baseURL}/getFieldList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionName: collectionName,
          fieldName: fieldName
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const responseData = await response.json(); // Extract JSON data
      console.log("Response Data:", responseData); // Log the actual data
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  
//   export default FieldListDropdown;