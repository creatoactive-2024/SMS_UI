

import {
  Modal,
  Descriptions,
  Spin,
  Card,
  Tag,
  Row,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../../../config";
import moment from "moment";

const val = (v) =>
  v === null || v === undefined || v === ""
    ? <span style={{ color: "#999" }}>—</span>
    : v;

const formatDate = (d) =>
  d ? moment(d).format("DD MMM YYYY") : <span style={{ color: "#999" }}>—</span>;

const descProps = {
  size: "small",
  column: 2,
  labelStyle: {
    width: 170,
    fontWeight: 600,
    color: "#555",
  },
  contentStyle: {
    color: "#222",
    wordBreak: "break-word",
  },
};

const Section = ({ title, children }) => (
  <Card
    title={title}
    size="small"
    style={{
      marginBottom: 16,
      borderRadius: 8,
    }}
  >
    {children}
  </Card>
);

const TeacherDetailsModal = ({ open, teacherId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!open || !teacherId) return;
    fetchDetails();
  }, [open, teacherId]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/getdata`, {
        collectionName: "teachers",
        id: teacherId,
      });
      setDetails(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1100}
      title="Teacher Details"
      bodyStyle={{ background: "#f5f7fa", padding: 16 }}
      destroyOnClose
    >
      <Spin spinning={loading}>
        {details && (
          <>
            {/* PERSONAL */}
            <Section title="Personal Details">
              <Descriptions {...descProps}>
                <Descriptions.Item label="Teacher ID">
                  {val(details.teacherId)}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {val(`${details.first_name || ""} ${details.last_name || ""}`)}
                </Descriptions.Item>
                
              </Descriptions>
            </Section>

            {/* COURSE */}
            <Section title="Bank Details">
              <Descriptions {...descProps}>
                <Descriptions.Item label="Account holder">
                  {val(details.account_holder)}
                </Descriptions.Item>
                <Descriptions.Item label="Account details">
                  {val(details.account_number)}
                </Descriptions.Item>
                <Descriptions.Item label="Bank code">
                  {val(details.bank_code)}
                </Descriptions.Item>
                <Descriptions.Item label="Name of bank">
                  {val(details.name_of_bank)}
                </Descriptions.Item>
                <Descriptions.Item label="Address of bank">
                  {val(details.bank_address)}
                </Descriptions.Item>
                <Descriptions.Item label="IBAN">
                  {val(details.iban)}
                </Descriptions.Item>
                
              </Descriptions>
            </Section>

            {/* ACCOMMODATION */}
            <Section title="Qualification">
              <Descriptions {...descProps}>
                <Descriptions.Item label="Course categories">
                  {val(details.course_category_name)}
                </Descriptions.Item>
                <Descriptions.Item label="Level">
                  {val(details.course_level_name)}
                </Descriptions.Item>
                <Descriptions.Item label="Course language">
                  {val(details.course_language_name)}
                </Descriptions.Item>
                
              </Descriptions>
            </Section>

            {/* VISA */}
            <Section title="Access rights">
              <Descriptions {...descProps}>
                <Descriptions.Item label="Schedule">
                  {details.schedule ? "Yes" : "No"}
                </Descriptions.Item>
                <Descriptions.Item label="Attendance">
                  {val(details.attendance ? "Yes" : "No")}
                </Descriptions.Item>
                <Descriptions.Item label="Communication">
                  {val(details.communication ? "Yes" : "No")}
                </Descriptions.Item>
                <Descriptions.Item label="Report card">
                  {val(details.report_card ? "Yes" : "No")}
                </Descriptions.Item>
                <Descriptions.Item label="All classes/assingment">
                  {val(details.classes_assingment ? "Yes" : "No")}
                </Descriptions.Item>
                
              </Descriptions>
            </Section>

        
          </>
        )}
      </Spin>
    </Modal>
  );
};

export default TeacherDetailsModal;
