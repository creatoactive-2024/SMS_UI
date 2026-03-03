import React, { useState, useEffect } from "react";
import { Alert, Space, Breadcrumb, List, Select, DatePicker,Button, message} from "antd";
import { Link } from "react-router-dom";
import { AiOutlineFileExcel } from "react-icons/ai";


const { Option } = Select;
const { RangePicker } = DatePicker;


const DeferredPayments = () => {
  const [filterValue1, setFilterValue1] = useState(null);


  
  const data = [
    "The amount paid refers to the end date of the booking and is calculated based on the paid services. Overpayments and incorrectly assigned are ignored.",
   ];

  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  const handleExcelExport = () => {
    // Logic to export data as Excel
    message.success("Excel export logic goes here");
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Reporting</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Deferred Payments</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
        <label htmlFor="filter1">Filter</label>
        <label htmlFor="dateRange">From - To: </label>

        <RangePicker id="dateRange" />
        <label htmlFor="dateRange">Base on service time : : </label>

        </Space>
      </div>

      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <Button icon={<AiOutlineFileExcel />} onClick={handleExcelExport}>
            Excel
          </Button>
        </Space>
        </div>

      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        {/* <Alert
          message=""
          description="Please migrate to a new report as this one is no longer maintained and will be removed in the future."
          type="error"
          showIcon
        /> */}

        <Alert
          message="Note"
          description={
            <List
              size="small"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <span style={{ display: "inline-block", marginRight: "5px" }}>
                    •
                  </span>
                  {item}
                </List.Item>
              )}
            />
          }
          type="info"
          showIcon
        />
      </Space>
    </>
  );
};
export default DeferredPayments;
 
 
 
 
 
