import {
  Modal,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Button,
  Row,
  Col,
  Typography,
  message
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../../commonComponents/baseURL";
import dayjs from "dayjs";

const { Title } = Typography;

export default function DiscountModal({
  open,
  onClose,
  seasonId,
  discountId,
  onSaved
}) {
  const [course, setCourse] = useState(null);
  const [type, setType] = useState(null);
  const [value, setValue] = useState(null);
  const [validFrom, setValidFrom] = useState(null);
  const [validTo, setValidTo] = useState(null);
  const [isActive, setIsActive] = useState(true);

const [courses, setCourses] = useState([]);
const [courseIds, setCourseIds] = useState([]);



useEffect(() => {

  if (discountId && open) {

    fetchDiscountById();

  }

}, [discountId, open]);


useEffect(() => {
  fetchCourses();
}, []);

 const fetchCourses = async () => {
    try {
      const res = await axios.post(`${baseURL}/getdata`, {
        collectionName: "courses",
      });
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };



 const submitDiscount = async () => {
  try {

    const payload = {
      ...(discountId && { _id: discountId }),
      seasonId,
      courseIds,
      discountType: type,
      value,
     validFrom: validFrom?.toISOString(),
validTo: validTo?.toISOString(),

      isActive
    };

    await axios.post(`${baseURL}/add_discount`, payload);

    message.success(
      discountId
        ? "Discount updated successfully"
        : "Discount added successfully"
    );

    onSaved();

  } catch (error) {

    console.error(error);

    message.error("Failed to save discount");

  }
};


const fetchDiscountById = async () => {

  try {

    const res = await axios.get(`${baseURL}/discountbyidToFetch/${discountId}`);

    const d = res.data;

    setCourseIds(d.courseIds?.map(c => c._id) || []);

    setType(d.discountType);

    setValue(d.value);

    setValidFrom(d.validFrom ? dayjs(d.validFrom) : null);

    setValidTo(d.validTo ? dayjs(d.validTo) : null);

    setIsActive(d.isActive);

  } catch (err) {

    console.error("Failed to fetch discount", err);

  }

};


  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={discountId ? "Edit Discount" : "Add Discount"}
    >
        <Row style={{ marginBottom: 16 }}>
  <Col span={24}>
    <Select
      mode="multiple"
      placeholder="Select Courses"
      style={{ width: "100%" }}
      value={courseIds}
      onChange={setCourseIds}
      options={courses.map(course => ({
        label: course.title_english,
        value: course._id
      }))}
    />
  </Col>
</Row>

      <Row gutter={16}>
        <Col span={12}>
          <Select
            placeholder="Discount Type"
            style={{ width: "100%" }}
            value={type}
            onChange={setType}
            options={[
              { label: "Percentage", value: "percentage" },
              { label: "Flat Amount", value: "flat" }
            ]}
          />
        </Col>

        <Col span={12}>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Value"
            value={value}
            onChange={setValue}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <DatePicker
  style={{ width: "100%" }}
  placeholder="Valid From"
  value={validFrom}
  onChange={(d) => {
    setValidFrom(d);
  }}
/>

        </Col>

        <Col span={12}>
         <DatePicker
  style={{ width: "100%" }}
  placeholder="Valid To"
  value={validTo}
  onChange={(d) => {
    setValidTo(d);
  }}
/>

        </Col>
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col span={12}>
          Active: <Switch checked={isActive} onChange={setIsActive} />
        </Col>
      </Row>

      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Button type="primary" onClick={submitDiscount}>
          {discountId ? "Update" : "Save"}
        </Button>
      </div>
    </Modal>
  );
}
