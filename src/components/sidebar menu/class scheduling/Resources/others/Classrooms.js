import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Space,
  Modal,
  message,
  Checkbox,
  Select,
  Breadcrumb,
  Form,
} from "antd";

import axios from "axios";
import baseURL from "../../../../../config";
import { Link } from "react-router-dom";
import { fetchDataCommon } from "../../../commonComponents/GetDataApi";
import { Spin } from "antd";
import { handleDelete } from "../../../commonComponents/DeleteApi";
import {
  AddEditDeleteDeactivate,
  SaveBtn,
  UpdateBtn,
  FiltersDropdown1,
  SearchInput,
} from "../../../commonComponents/ButtonsDropdown";
import { CommonFormSubmit } from "../../../commonComponents/CreateUpdateApi";

const { Option } = Select;

const Classrooms = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [buildingOptions, setBuildingOptions] = useState([]); // State to store building names for dropdown
  const [error, setError] = useState(null);

  const [formValues, setFormValues] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [filterValue1, setFilterValue1] = useState(null);
  const [filterValue2, setFilterValue2] = useState(null);

  const [form] = Form.useForm();

  //----------------filter functions-----------------
  const handleFilter1Change = (value) => {
    setFilterValue1(value);
  };

  const handleFilter2Change = (value) => {
    setFilterValue2(value);
  };

  //----------------populate building names------------------
  // Function to fetch building names
  const fetchBuildingNames = async () => {
    try {
      const response = await axios.post(`${baseURL}/getdata`, {
        collectionName: "buildings",
      });

      if (response.data && Array.isArray(response.data)) {
        // Extract unique building names
        const uniqueBuildingNames = [
          ...new Set(response.data.map((entry) => entry.name)),
        ];

        // Sort the building names
        const sortedBuildingNames = uniqueBuildingNames.sort();

        // Create options array for Select dropdown
        const buildingOptionsArray = sortedBuildingNames.map(
          (buildingName) => ({
            value: buildingName,
            label: buildingName,
          })
        );

        // Set the building names in the state
        setBuildingOptions(buildingOptionsArray);
      } else {
        console.error("Invalid response format for building names");
      }
    } catch (error) {
      console.error("Error fetching building names:", error);
    }
  };

  useEffect(() => {
    // Fetch building names when the component mounts
    fetchBuildingNames();
  }, []); // Empty deps ensures the effect runs only once on mount

  //----------------table functions------------
  const fetchData = async () => {
    // Call the common fetch API with the selected record IDs
    await fetchDataCommon(
      "classrooms",
      setData,
      setSelectedRowKeys,
      setLoading
    );
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
      title: "Classrooms",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Floor",
      dataIndex: "floor_name",
      key: "floor_name",
    },
    {
      title: "School building",
      dataIndex: "building_name",
      key: "building_name",
    },
    {
      title: "online",
      dataIndex: "class_online",
      key: "class_online",
    },
    {
      title: "Max. capacity",
      dataIndex: "class_max_students",
      key: "class_max_students",
    },
  ];

  console.log("check data", data);
  // Check if data is undefined before mapping
  const transformedData = data
    ? data.map((entry) => ({
        _id: entry._id || null,
        title: `${entry.title}` || null,
        floor_name: entry.floor_name || null,
        class_max_students: entry.class_max_students || null,
        building_name: entry.building_name || null,
        class_online: entry.class_online || null,
        characteristics_tag: entry.characteristics_tag || null,
        class_note: entry.class_note || null,
      }))
    : [];

  const visibleColumns = columns.filter((column) => column.dataIndex !== "_id");

  //----------------edit button functions-----------
  const handleEditModalOpen = () => {
    setEditModalVisible(true);
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
        collectionName: "classrooms",
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

  useEffect(() => {
    if (editingRecordData) {
      form.setFieldsValue(editingRecordData);
    }
  }, [editingRecordData, form]);

  const onFinish = async () => {
    const values = form.getFieldsValue();

    // Replace the hardcoded values with dynamic ones from your form or other sources
    const collectionName = "classrooms";
    const data = {
      _id: selectedRecordId ? selectedRecordId : null,
      title: values.title || null,
      class_max_students: values.class_max_students || null,
      building_name: values.building_name || null,
      floor_name: values.floor_name || null,
      //   class_online: values.class_online || null,
      class_online: values.class_online ? "yes" : "no",
      characteristics_tag: values.characteristics_tag || null,
      class_note: values.class_note || null,
    };

    // Call the common API function with dynamic collection name and data
    await CommonFormSubmit(
      collectionName,
      setSelectedRecordId,
      data,
      setNewModalVisible,
      setEditModalVisible,
      form,
      fetchData,
      setErrorMessage,
      setSuccessMessage
    );
  };

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

  //---------------new button functions-------------------
  const handleNewModalOpen = () => {
    fetchBuildingNames();
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

    // Optionally, reset the form values
    setFormValues({});
  };

  // Form layout settings
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  //---------------delete button functions---------------
  const handleDeleteButtonClick = () => {
    if (selectedRowKeys.length === 0) {
      // No record selected, show a warning message
      message.warning("Please select records to delete.");
    } else {
      // Records are selected, show the delete confirmation modal
      setDeleteModalVisible(true);
    }
  };
  //-----------delete record--------------
  const handleDeleteModalOk = async () => {
    // Call the common delete API with the selected record IDs
    await handleDelete(
      "classrooms",
      selectedRowKeys,
      fetchData,
      setDeleteModalVisible
    );
  };

  const handleDeleteModalCancel = () => {
    // Close the delete confirmation modal without performing the deletion
    setDeleteModalVisible(false);
  };

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
  };

  const CancelBothModel = () => {
    setNewModalVisible(false);
    setEditModalVisible(false);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="">Class Scheduling</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Resourses</Breadcrumb.Item>
        <Breadcrumb.Item>Classrooms</Breadcrumb.Item>
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
            <FiltersDropdown1
              handleFilter1Change={handleFilter1Change}
              handleFilter2Change={handleFilter2Change}
              filterValue1={filterValue1}
              filterValue2={filterValue2}
            />
          </Space>
        </div>

        <Modal
          title="Add New Classroom"
          visible={newModalVisible}
          onOk={handleNewModalOk}
          onCancel={handleNewModalCancel}
          width={1000} // Set your preferred width value
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          {/* Ant Design Form */}
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter Title!" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item
              label="Max. capacity"
              name="class_max_students"
              rules={[
                {
                  required: true,
                  message: "Please select Max. capacity",
                },
              ]}
            >
              <Input placeholder="Enter Max. capacity " />
            </Form.Item>

            {/* Building Name dropdown */}
            <Form.Item
              name="building_name"
              label="School building"
              rules={[
                {
                  required: true,
                  message: "Please select School building",
                },
              ]}
            >
              <Select placeholder="Please select">
                {buildingOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="floor_name" label="School floor">
              <Select placeholder="Please select" onChange={handleChange}>
                <Option value="floor 1">floor 1</Option>
                <Option value="floor 2">floor 2</Option>
                <Option value="floor 3">floor 3</Option>
                <Option value="floor 4">floor 4</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Online"
              name="class_online"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item label="Characteristics" name="characteristics_tag">
              <Input placeholder="Enter Characteristics" />
            </Form.Item>

            <Form.Item label="Note" name="class_note">
              <Input.TextArea />
            </Form.Item>

            <SaveBtn CancelBothModel={CancelBothModel} />
          </Form>
        </Modal>

        <Modal
          title="Edit Classroom"
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          width={1000}
          style={{
            top: 20,
          }}
          footer={null} // Set footer to null to remove buttons
        >
          {/* Ant Design Form */}
          <Form
            {...formLayout}
            onFinish={onFinish}
            initialValues={formValues}
            form={form}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter Title!" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item
              label="Max. capacity"
              name="class_max_students"
              rules={[
                {
                  required: true,
                  message: "Please select Max. capacity",
                },
              ]}
            >
              <Input placeholder="Enter Max. capacity " />
            </Form.Item>

            <Form.Item
              name="building_name"
              label="School building"
              rules={[
                {
                  required: true,
                  message: "Please select School building",
                },
              ]}
            >
              <Select placeholder="Please select">
                {buildingOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="floor_name" label="School floor">
              <Select placeholder="Please select" onChange={handleChange}>
                <Option value="floor 1">floor 1</Option>
                <Option value="floor 2">floor 2</Option>
                <Option value="floor 3">floor 3</Option>
                <Option value="floor 4">floor 4</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Online"
              name="class_online"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item label="Characteristics" name="characteristics_tag">
              <Input placeholder="Enter Characteristics" />
            </Form.Item>

            <Form.Item label="Note" name="class_note">
              <Input.TextArea />
            </Form.Item>

            <UpdateBtn CancelBothModel={CancelBothModel} />
          </Form>
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

export default Classrooms;
