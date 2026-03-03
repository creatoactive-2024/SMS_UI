import { Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import "../commonComponents/common.css"


const CommonTable = ({loading,selectedRowKeys,onSelectChange,visibleColumns,transformedData}) => {


    const [totalItems, setTotalItems] = useState(0);

// Define state variables for page and page size
const [currentPage, setCurrentPage] = useState(1);
const [currentPageSize, setCurrentPageSize] = useState(10);

// Simulate fetching total items from API
const fetchTotalItems = () => {
    // Perform API call or set total items from data source
    // For example:
    setTotalItems(100); // Set the total number of items (e.g., fetched from API response)
  };
  
  // Fetch total items on component mount or when current page size changes
  useEffect(() => {
    fetchTotalItems();
  }, [currentPageSize]); // Fetch total items when current page size changes
  
  // Function to handle page changes
  const handlePageChange = (page, pageSize) => {
    console.log("Current Page:", page);
    setCurrentPage(page); // Update the current page state
    // You can perform any other actions here based on the new page
  };
  
  // Function to handle page size changes
  const handlePageSizeChange = (current, size) => {
    console.log("Current Page Size:", size);
    setCurrentPageSize(size); // Update the current page size state
    // You can perform any other actions here based on the new page size
  };
  
  // Calculate total pages based on total items and current page size
  const totalPages = Math.ceil(totalItems / currentPageSize);
  




  return (
    <>
    {/* <Spin spinning={loading}>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
              fixed: true,
            }}
            columns={visibleColumns}
            dataSource={transformedData}
            rowKey={(record) => record._id} // Use a unique key for each row
            pagination={{
              total: totalItems, // Total number of items (if using server-side pagination)
              pageSize: currentPageSize, // Number of items per page
              showSizeChanger: true, // Show option to change page size
              showQuickJumper: true, // Show quick jump to page
              onChange: handlePageChange, // Function to handle page changes
              onShowSizeChange: handlePageSizeChange, // Function to handle page size changes
              style: { textAlign: 'center', },
            }}
            scroll={{ x: "max-content" }}
          />
        </Spin> */}

<Spin spinning={loading}>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
              fixed: true,
            }}
            columns={visibleColumns}
            dataSource={transformedData}
            rowKey={(record) => record._id} // Use a unique key for each row
            scroll={{ x: "max-content" }}
          />
        </Spin>
    
    </>
  )
}

export default CommonTable
