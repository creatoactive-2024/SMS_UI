import React, { useState, useEffect } from "react";
import { Button, Space, Input, Upload, message, Select, Form, DatePicker } from "antd";
import {
  AiOutlineSearch,
  AiOutlineFilter,
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineExclamationCircle,
  AiOutlineFileExcel,
  AiOutlineFileText,
  AiOutlineImport,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { space } from "postcss/lib/list";

const { Option } = Select; // Add this line to import the Option component
const { RangePicker } = DatePicker;



const FiltersDropdownSpecial = ({
    handleFilter1Change,
    handleFilter2Change,
    handleFilter3Change,
    filterValue1,
    filterValue2,
    filterValue3,
  }) => {
    return (
      <Space>
        {/* New dropdowns for filtering */}
        <Select
          style={{ width: 120 }}
          placeholder="Online"
          onChange={handleFilter1Change}
          value={filterValue1}
        >
          {/* <Option value="online">Online</Option> */}
          <Option value="yes">Yes</Option>
          <Option value="no">No </Option>
  
          {/* Add more options as needed */}
        </Select>
        <Select
          style={{ width: 120 }}
          placeholder="--Not available separately--"
          onChange={handleFilter2Change}
          value={filterValue2}
        >
          {/* <Option value="" >--Not available separately--</Option> */}
          <Option value="yes">Yes</Option>
          <Option value="no">No </Option>
  
          {/* Add more options as needed */}
        </Select>
        <Select
          style={{ width: 120 }}
          placeholder="--Validity--"
          onChange={handleFilter3Change}
          value={filterValue3}
        >
          <Option value="activated">Activated</Option>
          <Option value="deactivated">Deactivated</Option>
          {/* Add more options as needed */}
        </Select>
      </Space>
    );
  };











  export {
    FiltersDropdownSpecial,
  };