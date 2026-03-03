import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Input,
  Space,
  message,
  Select,
  Breadcrumb,
  Form,
  notification,
  TimePicker,
} from "antd";
import {
  AiOutlineSearch,
  AiOutlineFilter,
  AiOutlineFileExcel,
  AiOutlineFileText,
} from "react-icons/ai";
import baseURL from "../../../config";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  CsvExcelImport,
  SearchInput
} from "../../sidebar menu/commonComponents/ButtonsDropdown";

const { Option } = Select;

const DefaultTime = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [formValues, setFormValues] = useState({});

  const [filterValue1, setFilterValue1] = useState(null);
  const [filterValue2, setFilterValue2] = useState(null);
  const [filterValue3, setFilterValue3] = useState(null);

  const [form] = Form.useForm();

  //----------------filter functions-----------------
  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  const handleFilter2Change = (value) => {
    setFilterValue2(value);
  };

  const handleFilter3Change = (value) => {
    setFilterValue3(value);
  };

  //----------------table functions------------
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/getdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionName: "coursedefaulttimes",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const responseData = await response.json();

      // Reverse the order of responseData
      const reversedData = responseData.reverse();

      setData(reversedData);
      setSelectedRowKeys([]);

      // console.log("Response Data:", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty depsures the effect runs only once on mount

  // Log the data after it has been set in the state
  useEffect(() => {
    // console.log("check data", data);
  }, [data]);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    // Assuming the first selected row contains the desired record ID
    if (selectedRows.length > 0) {
      setSelectedRecordId(selectedRows[0]._id);
    } else {
      setSelectedRecordId(null);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: true,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    {
      title: "Personal details ",
      children: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
      ],
    },
    {
      title: "Course",
      children: [
        {
          title: "	Course - Booked courses",
          dataIndex: "",
          key: "",
        },
        {
          title: "Start date (Course)",
          dataIndex: "",
          key: "",
        },
        {
          title: "End date (Course)",
          dataIndex: "",
          key: "",
        },
      ],
    },
    {
      title: "Accommodation",
      children: [
        {
          title: "Accommodation",
          dataIndex: "",
          key: "",
        },
        {
          title: "Start date (Acc.)",
          dataIndex: "",
          key: "",
        },
        {
          title: "End date (Acc.)",
          dataIndex: "",
          key: "",
        },
      ],
    },
    {
      title: "Payments",
      children: [
        {
          title: "Balance due total",
          dataIndex: "",
          key: "",
        },
        {
          title: "Net PDF",
          dataIndex: "",
          key: "",
        },
        {
          title: "Invoice (Gross)",
          dataIndex: "",
          key: "",
        },
        {
          title: "Confirmed on",
          dataIndex: "",
          key: "",
        },
      ],
    },
    // Add more columns as needed
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        title: `${entry.title}` || null,
        from_time: entry.from_time
          ? moment(entry.from_time).format("hh:mm A")
          : null,
        to_time: entry.to_time ? moment(entry.to_time).format("hh:mm A") : null,
        lesson_per_day: entry.lesson_per_day || null,
      }))
    : [];

  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

  //-----------------import export functions------------------
  const handleCsvExport = () => {
    // Logic to export data as CSV
    message.success("CSV export logic goes here");
  };

  const handleExcelExport = () => {
    // Logic to export data as Excel
    message.success("Excel export logic goes here");
  };

  const handleImport = (file) => {
    // Logic to handle file import
    message.success(`File ${file.name} uploaded successfully`);
  };

  const importProps = {
    beforeUpload: (file) => {
      // Disable default upload behavior
      return false;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        handleImport(info.file.originFileObj);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Students</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student View</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <div>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
          <SearchInput />
          </Space>
        </div>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Space>
            <Button icon={<AiOutlineFileText />} onClick={handleCsvExport}>
              CSV
            </Button>

            <Button icon={<AiOutlineFileExcel />} onClick={handleExcelExport}>
              Excel
            </Button>
            {/* <Upload {...importProps}>
              <Button icon={<AiOutlineImport />}>Import</Button>
            </Upload> */}
          </Space>
        </div>

        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
            fixed: true,
          }}
          columns={visibleColumns}
          bordered
          dataSource={transformedData}
          rowKey={(record) => record._id} // Use a unique key for each row
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
};

export default DefaultTime;
