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
  AiOutlineExclamationCircle,
  AiOutlineFileExcel,
  AiOutlineFileText,
  AiOutlineImport,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import axios from "axios";
import baseURL from "../../../config";
import { Link } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

const VisaList = () => {
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
  
      console.log("Response Data:", responseData);
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
    console.log("check data", data);
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
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "_id",
//       key: "_id",
//       render: () => null, // Render an empty cell to hide the content
//       fixed: "left", // Fix this column to the left to keep it visible
//       width: 0, // Set the width to 0 to make it effectively hidden
//     },
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "From",
//       dataIndex: "from_time",
//       key: "from_time",
//     },
//     {
//       title: "Until",
//       dataIndex: "to_time",
//       key: "to_time",
//     },
//     {
//       title: "Lessons (Per day)",
//       dataIndex: "lesson_per_day",
//       key: "lesson_per_day",
//     },
//   ];





const columns = [
    {
      title: 'Personal details ',
      children: [
        {
          title: 'Student ID	',
          dataIndex: '',
          key: '',

        },
        {
          title: 'Name',
          dataIndex: '',
          key: '',

        },
        {
          title: 'Age',
          dataIndex: '',
          key: '',
        },
      ],
    },
    {
      title: 'Course',
      children: [
        {
          title: 'Course - Booked courses	',
          dataIndex: '',
          key: '',

        },
        {
            title: 'Start date (Course)',
            dataIndex: '',
            key: '',
          },
          {
            title: 'End date (Course)',
            dataIndex: '',
            key: '',
          },
      ],
    },
    {
        title: 'Accommodation',
        children: [
          {
            title: 'Accommodation',
            dataIndex: '',
            key: '',
  
          },
          {
              title: 'Start date (Acc.)',
              dataIndex: '',
              key: '',
            },
            {
              title: 'End date (Acc.)',
              dataIndex: '',
              key: '',
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
        <Breadcrumb.Item>VisaList</Breadcrumb.Item>
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
            {/* <Button icon={<AiOutlineQuestionCircle />}>Support</Button> */}
            <Input
              placeholder="Search"
              prefix={<AiOutlineSearch style={{ marginRight: 8 }} />}
            />
            <Button
              type="primary"
              icon={<AiOutlineFilter />}
              style={{ marginLeft: 8 }}
            >
              Filter
            </Button>
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

export default VisaList;
