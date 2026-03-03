import React, { useState, useEffect } from "react";
import { Alert, Space, Breadcrumb, List, Select, DatePicker } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;


const WhereDidStudentComeFrom = () => {
  const [filterValue1, setFilterValue1] = useState(null);
  const data = [
    "One time course or accomodation fees are assigned to the first service.",
    "General costs are assigned on the related period.",
    "Totals are only displayed for columns where amounts are used.",
    "Some small rounding errors can appear if you select revenue based on performance time frame.",
    "The calculation for course and accommodation revenue on performance time frame splits the amounts on a daily basis. This means, that if a student is booking a 4 weeks course from Monday through Friday, the system will calculate with 3 weeks of 7 days each and the last week with 5 days. The scheduling of the classes is not taking into consideration.",
  ];

  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Reporting</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Where Did Student Come From</Breadcrumb.Item>
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
        <label htmlFor="filter1">Select : : Date </label>
        <label htmlFor="dateRange">From - To: </label>

        <RangePicker id="dateRange" />

        </Space>
      </div>

      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Alert
          message=""
          description="Please migrate to a new report as this one is no longer maintained and will be removed in the future."
          type="error"
          showIcon
        />

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
export default WhereDidStudentComeFrom;
 
 
 
 
