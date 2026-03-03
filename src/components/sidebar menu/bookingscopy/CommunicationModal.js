import { Modal, Tabs, Form, Select, Input, Table } from "antd";
const { TabPane } = Tabs;

const CommunicationModal = ({
  open,
  onCancel,
  recordId,
  templates,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const [form] = Form.useForm();

  // Example history data (replace with API response)
  const historyData = [
    { id: 1, subject: "Welcome Email", date: "2025-09-25", sentBy: "Admin" },
    { id: 2, subject: "Follow-up", date: "2025-09-20", sentBy: "Support" },
  ];

  const columns = [
        { title: "Recipient", dataIndex: "recipient", key: "recipient" },
            { title: "Sent By", dataIndex: "sentBy", key: "sentBy" },
    { title: "Date", dataIndex: "date", key: "date" },

    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "User", dataIndex: "user", key: "user" },
  ];

  return (
    <Modal
      title={`Communication`}
      open={open}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      <Tabs defaultActiveKey="1">
        {/* Communication Tab */}
        <TabPane tab="Communication" key="1">
          <Form form={form} layout="vertical">
            {/* Template Dropdown */}
            <Form.Item label="Template" name="template">
              <Select
                placeholder="Select a template"
                onChange={(val) => setSelectedTemplate(val)}
              >
                {templates.map((tpl) => (
                  <Select.Option key={tpl.id} value={tpl.id}>
                    {tpl.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Show additional fields only when template selected */}
            {selectedTemplate && (
              <>
                <Form.Item label="Sent By" name="sentBy">
                  <Select placeholder="Choose sender">
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="support">Support</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="To" name="to">
                  <Input placeholder="Recipient email" />
                </Form.Item>

                <Form.Item label="Students" name="students">
                  <Select mode="multiple" placeholder="Select students">
                    <Select.Option value="student1">Student 1</Select.Option>
                    <Select.Option value="student2">Student 2</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Further Contacts" name="contacts">
                  <Select mode="multiple" placeholder="Select contacts">
                    <Select.Option value="parent">Parent</Select.Option>
                    <Select.Option value="guardian">Guardian</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="CC" name="cc">
                  <Input placeholder="CC emails" />
                </Form.Item>

                <Form.Item label="BCC" name="bcc">
                  <Input placeholder="BCC emails" />
                </Form.Item>

                <Form.Item label="Subject" name="subject">
                  <Input placeholder="Enter subject" />
                </Form.Item>
              </>
            )}
          </Form>
        </TabPane>

        {/* History Tab */}
        <TabPane tab="History" key="2">
          <Table
            dataSource={historyData}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default CommunicationModal;
