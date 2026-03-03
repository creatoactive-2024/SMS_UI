import React, { useState, useEffect } from "react";
import { Alert, Space, Breadcrumb, List, Select, DatePicker,Button, message} from "antd";
import { Link } from "react-router-dom";
import { AiOutlineFileExcel } from "react-icons/ai";


const { Option } = Select;
const { RangePicker } = DatePicker;


const AgentRevenues = () => {
  const [filterValue1, setFilterValue1] = useState(null);


  
  const data = [
    "The report is based on the actual payments. Overpayments that are not assigned to a position are not included.",
    "Agencies marked with an asterisk indicate that this agency has students with missing credit notes, which distort the calculation of commision and net amount.",
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
        <Breadcrumb.Item>Agent Revenues</Breadcrumb.Item>
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
        <label htmlFor="dateRange">Base on payment time frame : : </label>

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
export default AgentRevenues;
 
 
 
 
