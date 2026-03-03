import { Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { getDiscountPreview } from "../api/pricing.api";

export default function DiscountPreviewModal({ discount, onClose }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getDiscountPreview(discount._id).then(r => setRows(r.data));
  }, [discount]);

  return (
    <Modal
      open
      width={900}
      title="Discounted Price Preview"
      onCancel={onClose}
      footer={null}
    >
      <Table
        rowKey={r =>
          `${r.courseId}-${r.weekFrom}-${r.weekTo}`
        }
        dataSource={rows}
        pagination={false}
        columns={[
          { title: "Course", dataIndex: "courseName" },
          { title: "Duration", dataIndex: "weekLabel" },
          { title: "Base Price", dataIndex: "basePrice" },
          { title: "Discount %", dataIndex: "discountValue" },
          { title: "Final Price", dataIndex: "discountedPrice" }
        ]}
      />
    </Modal>
  );
}
