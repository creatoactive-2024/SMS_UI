import { Modal, Tabs, Form, Input, DatePicker, Select, Table, message } from "antd";
import { useEffect, useState } from "react";

const { TabPane } = Tabs;

const PaymentModal = ({ open, onCancel, recordId }) => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (recordId && open) {
      setLoading(true);
      // 🔹 Call API here
      fetch(`/api/payments/${recordId}`)
        .then((res) => res.json())
        .then((data) => setPaymentData(data))
        .catch(() => message.error("Failed to load payment data"))
        .finally(() => setLoading(false));
    }
  }, [recordId, open]);

  const columns = [
    { title: "Invoice #", dataIndex: "invoiceNumber", key: "invoiceNumber" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Currency", dataIndex: "currency", key: "currency" },
    { title: "Date", dataIndex: "paymentDate", key: "paymentDate" },
  ];

  return (
    <Modal
      title="Payments"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      loading={loading}
    >
      <Tabs defaultActiveKey="1">
        {/* 🔹 Tab 1: Form */}
        <TabPane tab="Add / Edit Payment" key="1">
          <Form layout="vertical">
            <Form.Item label="Payment Date" name="paymentDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Method" name="method">
              <Select
                options={[
                  { value: "cash", label: "Cash" },
                  { value: "card", label: "Debit/Credit Card" },
                  { value: "bank", label: "Bank Transfer" },
                  { value: "hubspot", label: "HubSpot" },
                  { value: "paypal", label: "PayPal" },
                  { value: "wechat", label: "WeChat Pay" },
                ]}
              />
            </Form.Item>
            
            <Form.Item label="Type" name="type">
              <Select
                options={[
                  { value: "prior", label: "Prior to Arrival" },
                  { value: "refund", label: "Refund" },
                  { value: "school", label: "Paid at School" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Paid By" name="paidBy">
              <Select
                options={[
                  { value: "student", label: "Student" },
                  { value: "agent", label: "Agent" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Comments" name="comments">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        </TabPane>

        {/* 🔹 Tab 2: Table */}
        <TabPane tab="Payment Records" key="2">
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={paymentData?.invoices || []}
            loading={loading}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default PaymentModal;
