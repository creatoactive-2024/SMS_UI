import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Modal,
  message,
  Select,
  Breadcrumb,
  Form,
} from "antd";
import axios from "axios";
import baseURL from "../../../../config";
import { Link } from "react-router-dom";
import CourseForm from "./CourseForm";
import { fetchDataCommon } from "../../commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../../commonComponents/DeleteApi";
import {
  AddEditDeleteDeactivate,
  CsvExcelImport,
  FiltersDropdown,
  SearchInput
} from "../../commonComponents/ButtonsDropdown";


const { Option } = Select;

const AllCourses = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [error, setError] = useState(null);

  const [categoryOptions, setCategoryOptions] = useState([]); // State to store building names for dropdown

  const [formValues, setFormValues] = useState({});

  const [filterValue1, setFilterValue1] = useState(null);
  const [filterValue2, setFilterValue2] = useState(null);
  const [filterValue3, setFilterValue3] = useState(null);
  const [form] = Form.useForm(); // Define the form object

  //----------------------filter functions----------------------
  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  const handleFilter2Change = (value) => {
    setFilterValue2(value);
  };

  const handleFilter3Change = (value) => {
    setFilterValue3(value);
  };

  //----------------populate building names------------------
  // Function to fetch Category Names
  const fetchCategoryNames = async () => {
    try {
      const response = await axios.post(`${baseURL}/getdata`, {
        collectionName: "coursecategories",
      });

      if (response.data && Array.isArray(response.data)) {
        // Extract unique category names
        const uniqueCategoryNames = [
          ...new Set(
            response.data.map((entry) => entry.name || entry.name_english)
          ),
        ];

        // Sort the category names
        const sortedCategoryNames = uniqueCategoryNames.sort();

        // Create options array for Select dropdown
        const categoryOptionsArray = sortedCategoryNames.map(
          (categoryName) => ({
            value: categoryName,
            label: categoryName,
          })
        );

        // Set the category names in the state
        setCategoryOptions(categoryOptionsArray);
      } else {
        console.error("Invalid response format for category names");
      }
    } catch (error) {
      console.error("Error fetching category names:", error);
    }
  };

  useEffect(() => {
    // Fetch building names when the component mounts
    fetchCategoryNames();
  }, []); // Empty deps ensures the effect runs only once on mount

  //----------------------------table functions------------------------
  
  const fetchData = async () => {
    // Call the common fetch API with the selected record IDs
    await fetchDataCommon("courses", setData, setSelectedRowKeys, setLoading);
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

  //-----------------------------new button function--------------------------
  const handleNewModalOpen = () => {
    setSelectedRecordId(null); 
    setNewModalVisible(true);
    setSelectedRowKeys([]);
    form.resetFields();
  };

  const handleNewModalOk = async () => {
    try {
      // Use formValues in your API call
      console.log("Form Values:", formValues);

      // Your API call logic here

      // Close the modal
      setNewModalVisible(false);
      form.resetFields(); // Reset form fields

      // Optionally, reset the form values
      setFormValues({});
    } catch (error) {
      console.error("Error:", error);
      // Handle error (show message or other error handling)
    }
  };

  const handleNewModalCancel = () => {
    // Close the modal without performing any action
    setNewModalVisible(false);
    form.resetFields(); // Reset form fields

    // Optionally, reset the form values
    setFormValues({});
    form.resetFields(); // Reset form fields

  };

  // Form layout settings
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: () => null, // Render an empty cell to hide the content
      fixed: "left", // Fix this column to the left to keep it visible
      width: 0, // Set the width to 0 to make it effectively hidden
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Online",
    //   dataIndex: "online",
    //   key: "online",
    // },
    {
      title: "Only available for combination courses",
      dataIndex: "Only_available",
      key: "Only_available",
    },
    {
      title: "Lessons per week",
      dataIndex: "lessons_per_week",
      key: "lessons_per_week",
    },
    {
      title: "Number of students",
      dataIndex: "average_students",
      key: "average_students",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        name: `${entry.title_english}` || null,
        online: entry.online || null,
        lessons_per_week: entry.lessons_per_week || null,
Only_available: entry.not_available_separately === "true" ? "YES" : "NO",
        nickname: entry.nickname || null,
        category_name: entry.category_name || null,
        average_students: entry.average_students || null,
        online: entry.online || null,
      }))
    : [];

  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

  //-------------------------edit button functions--------------------------
  const handleEditModalOpen = () => {
    setEditModalVisible(true);

    // Set the active tab based on whether a record is being edited
    const activeKey = editingRecordData ? "1" : "2";
    setActiveKey(activeKey);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditModalOk = () => {
    // Handle logic when submitting the edit form
    setEditModalVisible(false);
  };

  const handleEditButtonClick = async () => {
    try {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Record ID Before Fetch:", selectedRecordId);

      if (!selectedRecordId) {
        // No record selected, show a message
        Modal.warning({
          title: "Please Select a Record",
          content: "Please select a record to edit.",
        });
        return;
      }

      if (selectedRowKeys.length > 1) {
        // More than one record selected, show a message
        Modal.warning({
          title: "Select Only One Record",
          content: "Please select only one record at a time for editing.",
        });
        return;
      }

      // Send the selected record ID in the request body
      const response = await axios.post(`${baseURL}/getdata`, {
        collectionName: "courses",
        id: selectedRecordId,
      });

      // The response.data should contain the data for the selected record
      console.log("API Response for Edit:", response.data);

      // Set the editing record data
      setEditingRecordData(response.data);

      // Open the edit modal
      handleEditModalOpen();
    } catch (error) {
      console.error("Error fetching data for edit:", error);
      // Handle the error (show a message or return)
    }
  };

  //--------------------import export functions-----------------------
  const handleCsvExport = () => {
    // Logic to export data as CSV
    message.success("CSV export logic goes here");
  };

  const handleExcelExport = () => {
    // Logic to export data as Excel
    message.success("Excel export logic goes here");
  };

  //---------------------delete button functions---------------------
  const handleDeleteButtonClick = () => {
    if (selectedRowKeys.length === 0) {
      // No record selected, show a warning message
      message.warning("Please select records to delete.");
    } else {
      // Records are selected, show the delete confirmation modal
      setDeleteModalVisible(true);
    }
  };

  const handleDeleteModalOk = async () => {
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "courses",
      selectedRowKeys,
      fetchData,
      setDeleteModalVisible
    );
  };

  const handleDeleteModalCancel = () => {
    // Close the delete confirmation modal without performing the deletion
    setDeleteModalVisible(false);
  };

  const updateCategoryOptions = async () => {
    try {
      await fetchCategoryNames();
      return categoryOptions; // Return the updated category options
    } catch (error) {
      console.error("Error updating category options:", error);
    }
  };

  const CancelBothModel= () =>{
    setNewModalVisible(false);
    setEditModalVisible(false);
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Class Scheduling</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Resourses</Breadcrumb.Item>
        <Breadcrumb.Item>Courses</Breadcrumb.Item>
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

          <Space>
            <AddEditDeleteDeactivate
              onClickNew={handleNewModalOpen}
              onClickEdit={handleEditButtonClick}
              onClickDelete={handleDeleteButtonClick}
            />
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
            <FiltersDropdown
              handleFilter1Change={handleFilter1Change}
              handleFilter2Change={handleFilter2Change}
              handleFilter3Change={handleFilter3Change}
              filterValue1={filterValue1}
              filterValue2={filterValue2}
              filterValue3={filterValue3}
            />
          </Space>
          <Space>
            <CsvExcelImport
              handleCsvExport={handleCsvExport}
              handleExcelExport={handleExcelExport}
            />
          </Space>
        </div>

        <Modal
          title="Add New Course"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          <CourseForm
          form={form}
          formValues={formValues}
          setSelectedRecordId={setSelectedRecordId}

            updateCategoryOptions={updateCategoryOptions}
            fetchData={fetchData}
            setNewModalVisible={setNewModalVisible}
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
          />
        </Modal>

        <Modal
          title="Edit Course"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          <CourseForm
          form={form}
          formValues={formValues}
          setSelectedRecordId={setSelectedRecordId}

            selectedRecordId={selectedRecordId}
            recordData={editingRecordData}
            updateCategoryOptions={updateCategoryOptions}
            setEditModalVisible={setEditModalVisible}
            handleNewModalCancel={handleNewModalCancel}
            CancelBothModel={CancelBothModel}
            fetchData={fetchData}

          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Delete Confirmation"
          visible={deleteModalVisible}
          onOk={handleDeleteModalOk}
          onCancel={handleDeleteModalCancel}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete the selected records?</p>
        </Modal>

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
      </div>
    </>
  );
};

export default AllCourses;
