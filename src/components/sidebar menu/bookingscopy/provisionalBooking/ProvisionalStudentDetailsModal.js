



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
import baseURL from "../../commonComponents/baseURL";
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

const ProvisonalStudentDetailsModal = ({ open, studentId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!open || !studentId) return;
    fetchDetails();
  }, [open, studentId]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/getdata`, {
        collectionName: "provisionalbookings",
        id: studentId,
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
      title="Student Details"
      bodyStyle={{ background: "#f5f7fa", padding: 16 }}
      destroyOnClose
    >
      <Spin spinning={loading}>
        {details && (
          <>
            {/* PERSONAL */}
            <Section title="Personal Details">
              <Descriptions {...descProps}>
                <Descriptions.Item label="Student ID">
                  {val(details.studentid)}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {val(`${details.firstname || ""} ${details.surname || ""}`)}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {val(details.email)}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {val(details.phone)}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {val(details.gender)}
                </Descriptions.Item>
                <Descriptions.Item label="DOB">
                  {formatDate(details.dob)}
                </Descriptions.Item>
                <Descriptions.Item label="Nationality">
                  {val(details.nationality)}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={details.is_active ? "green" : "red"}>
                    {details.student_status}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Section>

            {/* COURSE */}
            <Section title="Course">
              <Descriptions {...descProps}>
                <Descriptions.Item label="Category">
                  {val(details.category)}
                </Descriptions.Item>
                <Descriptions.Item label="Course">
                  {val(details.course)}
                </Descriptions.Item>
                <Descriptions.Item label="Level">
                  {val(details.level)}
                </Descriptions.Item>
                <Descriptions.Item label="Days / Week">
                  {val(details.days_per_week)}
                </Descriptions.Item>
                <Descriptions.Item label="Hours / Week">
                  {val(details.hours_per_week)}
                </Descriptions.Item>
                <Descriptions.Item label="Duration (Weeks)">
                  {val(details.no_of_weeks)}
                </Descriptions.Item>
                <Descriptions.Item label="From">
                  {formatDate(details.course_from_date)}
                </Descriptions.Item>
                <Descriptions.Item label="To">
                  {formatDate(details.course_to_date)}
                </Descriptions.Item>
              </Descriptions>
            </Section>

            {/* ACCOMMODATION */}
            <Section title="Accommodation">
              <Descriptions {...descProps}>
                <Descriptions.Item label="Type">
                  {val(details.accommodation)}
                </Descriptions.Item>
                <Descriptions.Item label="Room">
                  {val(details.room)}
                </Descriptions.Item>
                <Descriptions.Item label="Board">
                  {val(details.board)}
                </Descriptions.Item>
                <Descriptions.Item label="From">
                  {formatDate(details.accommodation_from_date)}
                </Descriptions.Item>
                <Descriptions.Item label="To">
                  {formatDate(details.accommodation_to_date)}
                </Descriptions.Item>
                <Descriptions.Item label="Weeks">
                  {val(details.no_of_weeks_accommodation)}
                </Descriptions.Item>
              </Descriptions>
            </Section>

            {/* VISA */}
            <Section title="Visa & Passport">
              <Descriptions {...descProps}>
                <Descriptions.Item label="Visa Required">
                  {details.student_visa ? "Yes" : "No"}
                </Descriptions.Item>
                <Descriptions.Item label="Visa Type">
                  {val(details.visa_type)}
                </Descriptions.Item>
                <Descriptions.Item label="Visa Status">
                  {val(details.visa_status)}
                </Descriptions.Item>
                <Descriptions.Item label="Visa Valid From">
                  {formatDate(details.visa_from)}
                </Descriptions.Item>
                <Descriptions.Item label="Visa Valid Until">
                  {formatDate(details.visa_until)}
                </Descriptions.Item>
                <Descriptions.Item label="Passport Number">
                  {val(details.passport_number)}
                </Descriptions.Item>
              </Descriptions>
            </Section>

            {/* UPLOADS */}
            <Section title="Uploaded Documents">
              <Row gutter={[0, 8]}>
                {["passport", "visa", "other_docs"].map((key) => (
                  <Col span={24} key={key}>
                    <strong style={{ width: 170, display: "inline-block" }}>
                      {key.replace("_", " ").toUpperCase()}
                    </strong>
                    {details[key]?.length ? (
                      details[key].map((f, i) => (
                        <div key={i}>
                          <a href={f.url} target="_blank" rel="noreferrer">
                            {f.name}
                          </a>
                        </div>
                      ))
                    ) : (
                      <span style={{ color: "#999" }}>—</span>
                    )}
                  </Col>
                ))}
              </Row>
            </Section>

            {/* PAYMENT */}
            <Section title="Payment">
              <Descriptions {...descProps}>
                <Descriptions.Item label="Payment Date">
                  {formatDate(details.payment_date)}
                </Descriptions.Item>
                <Descriptions.Item label="Method">
                  {val(details.payment_method)}
                </Descriptions.Item>
                <Descriptions.Item label="Amount">
                  {val(details.payment_amount)} {val(details.payment_currency)}
                </Descriptions.Item>
                <Descriptions.Item label="Scheme">
                  {val(details.payment_scheme)}
                </Descriptions.Item>
                <Descriptions.Item label="Invoice No">
                  {val(details.payment_invoice_number)}
                </Descriptions.Item>
                <Descriptions.Item label="Paid By">
                  {val(details.payment_paid_by)}
                </Descriptions.Item>
              </Descriptions>
            </Section>
          </>
        )}
      </Spin>
    </Modal>
  );
};

export default ProvisonalStudentDetailsModal;
