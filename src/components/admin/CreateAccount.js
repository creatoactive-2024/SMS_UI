
import React, { useState, useEffect } from 'react';
import { Tabs, Table, Space, Button, Modal, Form, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import baseURL from "../../config";


const { TabPane } = Tabs;

const fetchData = async (collectionName) => {
  try {
    const response = await axios.post(`${baseURL}/getdata`, { collectionName });
    return response.data.reverse(); // Reverse the order of data to show the latest entry at the top
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const Agents = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('agents');
  }, []);

  const columns = [
    { title: 'Serial Number', dataIndex: 'serial_number', key: 'serial_number' },
    { title: 'Active', dataIndex: 'active', key: 'active' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Nickname', dataIndex: 'nickname', key: 'nickname' },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    fetchRecordData('agents', record._id).then((result) => {
      if (result) {
        form.setFieldsValue(result);
        setSelectedRecord(result);
        setEditModalVisible(true);
      } else {
        console.error('Error fetching record data:', result);
      }
    });
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  const handleEditModalOk = async () => {
    try {
      setLoading(true);

      if (!selectedRecord || !selectedRecord._id) {
        console.error('Selected record or _id is null or undefined');
        return;
      }

      const formData = form.getFieldsValue();

      const requestData = {
        collectionName: 'agents',
        data: {
          _id: selectedRecord._id,
          active: formData.active,
          name: formData.name,
          nickname: formData.nickname,
        },
      };

      await axios.post(`${baseURL}/createdataOne`, requestData);
      message.success('Record updated successfully!');
      setEditModalVisible(false);
      setSelectedRecord(null);

      fetchData('agents'); // Reload data after successful update
    } catch (error) {
      console.error('Error updating record:', error);
      message.error('Error updating record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (collectionName) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseURL}/getdata`, { collectionName });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecordData = async (collectionName, recordId) => {
    try {
      const response = await axios.post(`${baseURL}/getdata`, {
        collectionName,
        id: recordId,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching record data:', error);
      return null;
    }
  };

  return (
    <div>
      <Table
        dataSource={data.map((item, index) => ({ ...item, serial_number: index + 1 }))}
        columns={columns}
        loading={loading}
      />

      <Modal
        title="Edit Record"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
      >
        <Form
          form={form}
          initialValues={selectedRecord}
        >
          <Form.Item label="Active" name="active">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Nickname" name="nickname">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};












const AgentEmployee = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('agentemployees');
  }, []);

  const columns = [
    { title: 'Serial Number', dataIndex: 'serial_number', key: 'serial_number' },
    { title: 'Salutation', dataIndex: 'salutation', key: 'salutation' },
    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  const handleEditModalOk = async () => {
    try {
      setLoading(true);

      if (!selectedRecord || !selectedRecord._id) {
        console.error('Selected record or _id is null or undefined');
        return;
      }

      const formData = form.getFieldsValue();

      const requestData = {
        collectionName: 'AgentEmployees',
        data: {
          _id: selectedRecord._id,
          salutation: formData.salutation,
          first_name: formData.first_name,
          last_name: formData.last_name,
          name: formData.name,
        },
      };

      await axios.post(`${baseURL}/createdataOne`, requestData);
      message.success('Record updated successfully!');
      setEditModalVisible(false);
      setSelectedRecord(null);

      fetchData('agentemployees'); // Reload data after successful update
    } catch (error) {
      console.error('Error updating record:', error);
      message.error('Error updating record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (collectionName) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseURL}/getdata`, { collectionName });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Table
        dataSource={data.map((item, index) => ({ ...item, serial_number: index + 1 }))}
        columns={columns}
        loading={loading}
      />

      <Modal
        title="Edit Record"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
      >
        <Form
          form={form}
          initialValues={selectedRecord}
        >
          <Form.Item label="Salutation" name="salutation">
            <Input />
          </Form.Item>
          <Form.Item label="First Name" name="first_name">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};





const CandidateBookings = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('candidatebookings');
  }, []);

  const columns = [
    { title: 'Serial Number', dataIndex: 'serial_number', key: 'serial_number' },
    { title: 'Agent Name', dataIndex: 'agent_name', key: 'agent_name' },
    { title: 'Agent ID', dataIndex: 'agent_id', key: 'agent_id' },
    { title: 'Agent Employee Name', dataIndex: 'agent_employee_name', key: 'agent_employee_name' },
    { title: 'Agent Employee ID', dataIndex: 'agent_employee_id', key: 'agent_employee_id' },
    { title: 'Payment Method', dataIndex: 'payment_method', key: 'payment_method' },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  const handleEditModalOk = async () => {
    try {
      setLoading(true);

      if (!selectedRecord || !selectedRecord._id) {
        console.error('Selected record or _id is null or undefined');
        return;
      }

      const formData = form.getFieldsValue();

      const requestData = {
        collectionName: 'CandidateBookings',
        data: {
          _id: selectedRecord._id,
          // Add fields based on your data structure
          agent_name: formData.agent_name,
          agent_id: formData.agent_id,
          agent_employee_name: formData.agent_employee_name,
          agent_employee_id: formData.agent_employee_id,
          payment_method: formData.payment_method,
        },
      };

      await axios.post(`${baseURL}/createdataOne`, requestData);
      message.success('Record updated successfully!');
      setEditModalVisible(false);
      setSelectedRecord(null);

      fetchData('candidatebookings'); // Reload data after successful update
    } catch (error) {
      console.error('Error updating record:', error);
      message.error('Error updating record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (collectionName) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseURL}/getdata`, { collectionName });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Table
        dataSource={data.map((item, index) => ({ ...item, serial_number: index + 1 }))}
        columns={columns}
        loading={loading}
      />

      <Modal
        title="Edit Record"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
      >
        <Form
          form={form}
          initialValues={selectedRecord}
        >
          {/* Add form fields based on your data structure */}
          <Form.Item label="Agent Name" name="agent_name">
            <Input />
          </Form.Item>
          <Form.Item label="Agent ID" name="agent_id">
            <Input />
          </Form.Item>
          <Form.Item label="Agent Employee Name" name="agent_employee_name">
            <Input />
          </Form.Item>
          <Form.Item label="Agent Employee ID" name="agent_employee_id">
            <Input />
          </Form.Item>
          <Form.Item label="Payment Method" name="payment_method">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};








const App = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={onChange}>
      <TabPane tab="Agents" key="1">
        <Agents />
      </TabPane>
      <TabPane tab="Agent Employee" key="2">
        <AgentEmployee />
      </TabPane>
      <TabPane tab="Candidate Bookings" key="3">
        <CandidateBookings />
      </TabPane>
    </Tabs>
  );
};

export default App;
