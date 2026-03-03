// import React, { useState, useEffect } from 'react';
// import { Form, Upload, Button, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { SubmitCancelButtonGroup } from '../commonComponents/ButtonsDropdown';
// import axios from 'axios';

// const UploadPhotos = ({
//   recordData, // should contain _id after form save
//   handleNewModalCancel,
//   CancelBothModel,
//   onFinish,
// }) => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState({
//     passport: [],
//     visa: [],
//     other_docs: [],
//   });

//   const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

//   // Pre-populate files if editing existing record
//   useEffect(() => {
//     if (recordData) {
//       const mapExistingFiles = (files = []) =>
//         files.map((f) => ({ uid: f._id || f.name, name: f.name, status: 'done', url: f.url }));

//       setFileList({
//         passport: mapExistingFiles(recordData.passport),
//         visa: mapExistingFiles(recordData.visa),
//         other_docs: mapExistingFiles(recordData.other_docs),
//       });
//     }
//   }, [recordData]);

//   const handleFileChange = (fileType) => ({ fileList: newFileList }) => {
//     if (fileType === 'other_docs' && newFileList.length > 10) {
//       message.error('You can upload up to 10 documents only.');
//       newFileList = newFileList.slice(0, 10);
//     }
//     setFileList((prev) => ({
//       ...prev,
//       [fileType]: newFileList,
//     }));
//   };

//   const beforeUpload = (file) => {
//     if (!allowedTypes.includes(file.type)) {
//       message.error('You can only upload JPEG, PNG, or PDF files!');
//       return Upload.LIST_IGNORE;
//     }
//     return false; // prevent auto upload
//   };

//   const handleUpload = async () => {
//     if (!recordData?._id) {
//       return message.error('Booking ID not found. Save the form first.');
//     }

//     const formData = new FormData();

//     Object.keys(fileList).forEach((key) => {
//       fileList[key].forEach((file) => {
//         if (file.originFileObj) {
//           formData.append(key, file.originFileObj);
//         }
//       });
//     });

//     try {
//       const res = await axios.post(
//         `http://localhost:5005/booking/${recordData._id}/upload`,
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       message.success('Files uploaded successfully');
//       if (onFinish) onFinish(res.data);
//     } catch (err) {
//       console.error('Upload error:', err);
//       message.error('Upload failed');
//     }
//   };

//   const resetAllFields = () => {
//     form.resetFields();
//     setFileList({ passport: [], visa: [], other_docs: [] });
//   };

//   const CancelBothModel1 = () => {
//     CancelBothModel();
//     resetAllFields();
//   };

//   return (
//     <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
//       <Form.Item label="Passport" name="passport">
//         <Upload
//           beforeUpload={beforeUpload}
//           fileList={fileList.passport}
//           onChange={handleFileChange('passport')}
//           multiple
//         >
//           <Button icon={<UploadOutlined />}>Upload</Button>
//         </Upload>
//       </Form.Item>

//       <Form.Item label="Visa" name="visa">
//         <Upload
//           beforeUpload={beforeUpload}
//           fileList={fileList.visa}
//           onChange={handleFileChange('visa')}
//           multiple
//         >
//           <Button icon={<UploadOutlined />}>Upload</Button>
//         </Upload>
//       </Form.Item>

//       <Form.Item label="Other Documents" name="other_docs">
//         <Upload
//           beforeUpload={beforeUpload}
//           fileList={fileList.other_docs}
//           onChange={handleFileChange('other_docs')}
//           multiple
//         >
//           <Button icon={<UploadOutlined />}>Upload</Button>
//         </Upload>
//       </Form.Item>

//       <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//         <Button type="primary" onClick={handleUpload}>
//           Upload Files
//         </Button>
//         <Button style={{ marginLeft: 8 }} onClick={CancelBothModel1}>
//           Cancel
//         </Button>
//       </Form.Item>

//       {/* Optional: your existing SubmitCancelButtonGroup */}
//       <SubmitCancelButtonGroup
//         recordData={recordData}
//         handleNewModalCancel={handleNewModalCancel}
//         CancelBothModel={CancelBothModel1}
//       />
//     </Form>
//   );
// };

// export default UploadPhotos;



import React, { useState, useEffect } from 'react';
import { Form, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { SubmitCancelButtonGroup } from '../commonComponents/ButtonsDropdown';
import axios from 'axios';

const UploadPhotos = ({
  fetchData,
  setEditModalVisible,
  recordData,
  handleNewModalCancel,
  setNewModalVisible,
  selectedRecordId,
  candidateId,
  CancelBothModel,
  onFinish,
  createdRecordId
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState({
    passport: [],
    visa: [],
    other_docs: [],
  });
  const [removedFiles, setRemovedFiles] = useState({
    passport: [],
    visa: [],
    other_docs: [],
  });

  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
// console.log("idddddd",createdRecordId)
  // Pre-populate files if editing existing record
  useEffect(() => {
    if (recordData) {
      const mapExistingFiles = (files = []) =>
        files.map((f) => ({
          uid: f._id || f.name,
          name: f.name,
          status: 'done',
          // url: `http://localhost:5005/${f.url}`, // ensure proper URL
                    url: `https://globaltourmanager.com/backend/${f.url}`, // ensure proper URL

          existing: true,
          _id: f._id,
        }));

      setFileList({
        passport: mapExistingFiles(recordData.passport),
        visa: mapExistingFiles(recordData.visa),
        other_docs: mapExistingFiles(recordData.other_docs),
      });
    }
  }, [recordData]);

  const handleFileChange = (fileType) => ({ fileList: newFileList, file }) => {
    // Track deletions of existing files
    if (file.status === 'removed' && file.existing) {
      setRemovedFiles((prev) => ({
        ...prev,
        [fileType]: [...prev[fileType], file._id], // send IDs to backend for deletion
      }));
    }

    if (fileType === 'other_docs' && newFileList.length > 10) {
      message.error('You can upload up to 10 documents only.');
      newFileList = newFileList.slice(0, 10);
    }
    setFileList((prev) => ({
      ...prev,
      [fileType]: newFileList,
    }));
  };

  const beforeUpload = (file) => {
    if (!allowedTypes.includes(file.type)) {
      message.error('You can only upload JPEG, PNG, or PDF files!');
      return Upload.LIST_IGNORE;
    }
    return false; // prevent auto upload
  };

 const handleUpload = async () => {
  const bookingId = recordData?._id || createdRecordId;
  if (!bookingId) {
    return message.error('Booking ID not found. Save the form first.');
  }

  const formData = new FormData();

  Object.keys(fileList).forEach((key) => {
    fileList[key].forEach((file) => {
      if (file.originFileObj) {
        formData.append(key, file.originFileObj);
      }
    });
  });

  formData.append('removedFiles', JSON.stringify(removedFiles));

  try {
    // ✅ Use bookingId instead of recordData._id
    const res = await axios.post(
      // `http://localhost:5005/booking/${bookingId}/upload`,
            `https://globaltourmanager.com/backend/booking/${bookingId}/upload`,

      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    message.success('Files updated successfully');
    setRemovedFiles({ passport: [], visa: [], other_docs: [] });
    if (onFinish) onFinish(res.data);
  } catch (err) {
    console.error('Upload error:', err);
    message.error('Upload failed');
  }
};


  const resetAllFields = () => {
    form.resetFields();
    setFileList({ passport: [], visa: [], other_docs: [] });
    setRemovedFiles({ passport: [], visa: [], other_docs: [] });
  };

  const CancelBothModel1 = () => {
    CancelBothModel();
    resetAllFields();
  };

  return (
    <Form form={form} onFinish={handleUpload} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item label="Passport" name="passport">
        <Upload
          beforeUpload={beforeUpload}
          fileList={fileList.passport}
          onChange={handleFileChange('passport')}
          multiple
          listType="text"
          itemRender={(originNode, file, currFileList, actions) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span>{file.name}</span>
        <span
          style={{ color: 'red', cursor: 'pointer', marginLeft: 8 }}
          onClick={() => actions.remove(file)}
        >
          Delete
        </span>
      </div>
    );
  }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Visa" name="visa">
        <Upload
          beforeUpload={beforeUpload}
          fileList={fileList.visa}
          onChange={handleFileChange('visa')}
          multiple
          listType="text"
           itemRender={(originNode, file, currFileList, actions) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <span>{file.name}</span>
      <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => actions.remove(file)}>
        Delete
      </span>
    </div>
  )}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Other Documents" name="other_docs">
        <Upload
          beforeUpload={beforeUpload}
          fileList={fileList.other_docs}
          onChange={handleFileChange('other_docs')}
          multiple
          listType="text"
           itemRender={(originNode, file, currFileList, actions) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <span>{file.name}</span>
      <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => actions.remove(file)}>
        Delete
      </span>
    </div>
  )}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" onClick={handleUpload}>
          Save Changes
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={CancelBothModel1}>
          Cancel
        </Button>
      </Form.Item> */}

      <SubmitCancelButtonGroup
        recordData={recordData}
        handleNewModalCancel={handleNewModalCancel}
        CancelBothModel={CancelBothModel1}
      />
    </Form>
  );
};

export default UploadPhotos;
