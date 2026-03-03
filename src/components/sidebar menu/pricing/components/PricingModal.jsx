// import {
//   Modal,
//   Select,
//   InputNumber,
//   Button,
//   Divider,
//   Row,
//   Col,
//   Card,
//   Typography,
//   Space,
//   Table
// } from "antd";
// import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
// import { useState } from "react";

// const { Title, Text } = Typography;

// export default function PricingModal({ open, onClose }) {
//   const [course, setCourse] = useState(null);
//   const [unit, setUnit] = useState(null);
//   const [weeks, setWeeks] = useState([]);
//   const [unitPrice, setUnitPrice] = useState(null);
//   const [fees, setFees] = useState([]);

//   const addWeek = () =>
//     setWeeks([...weeks, { from: null, to: null, price: null }]);

//   const weekColumns = [
//     {
//       title: "From",
//       render: (_, r, i) => (
//         <InputNumber
//           value={r.from}
//           onChange={(v) => updateWeek(i, "from", v)}
//         />
//       ),
//     },
//     {
//       title: "To",
//       render: (_, r, i) => (
//         <InputNumber
//           value={r.to}
//           onChange={(v) => updateWeek(i, "to", v)}
//         />
//       ),
//     },
//     {
//       title: "£ / Week",
//       render: (_, r, i) => (
//         <InputNumber
//           value={r.price}
//           onChange={(v) => updateWeek(i, "price", v)}
//         />
//       ),
//     },
//     {
//       title: "",
//       render: (_, __, i) => (
//         <Button
//           icon={<DeleteOutlined />}
//           danger
//           onClick={() => removeWeek(i)}
//         />
//       ),
//     },
//   ];

//   const updateWeek = (i, f, v) => {
//     const updated = [...weeks];
//     updated[i][f] = v;
//     setWeeks(updated);
//   };

//   const removeWeek = (i) => {
//     const updated = [...weeks];
//     updated.splice(i, 1);
//     setWeeks(updated);
//   };

//   const addFee = () => setFees([...fees, { name: "", amount: 0 }]);

//   return (
//     <Modal
//       open={open}
//       onCancel={onClose}
//       width={900}
//       footer={null}
//       title="Add Pricing"
//     >
//       {/* BASIC SETUP */}
//       <Card bordered={false}>
//         <Title level={5}>Basic Setup</Title>
//         <Row gutter={16}>
//           <Col span={8}>
//             <Select
//               placeholder="Course"
//               style={{ width: "100%" }}
//               onChange={setCourse}
//               options={[
//                 { label: "General English", value: "ge" },
//                 { label: "Private Lessons", value: "pl" },
//               ]}
//             />
//           </Col>

//           <Col span={8}>
//             <Select
//               placeholder="Pricing Unit"
//               style={{ width: "100%" }}
//               disabled={!course}
//               onChange={(v) => {
//                 setUnit(v);
//                 setWeeks([]);
//                 setUnitPrice(null);
//                 setFees([]);
//               }}
//               options={[
//                 { label: "Per Week", value: "week" },
//                 { label: "Per Hour", value: "hour" },
//                 { label: "Per Lesson", value: "lesson" },
//                 { label: "Package", value: "package" },
//               ]}
//             />
//           </Col>
//         </Row>
//       </Card>

//       {/* PRICING */}
//       {unit === "week" && (
//         <Card style={{ marginTop: 16 }}>
//           <Title level={5}>Weekly Prices (£)</Title>
//           <Table
//             columns={weekColumns}
//             dataSource={weeks}
//             pagination={false}
//             locale={{ emptyText: "No ranges added" }}
//           />
//           <Button
//             type="dashed"
//             icon={<PlusOutlined />}
//             onClick={addWeek}
//             style={{ marginTop: 12 }}
//           >
//             Add Week Range
//           </Button>
//         </Card>
//       )}

//       {(unit === "hour" || unit === "lesson" || unit === "package") && (
//         <Card style={{ marginTop: 16 }}>
//           <Title level={5}>Price (£)</Title>
//           <InputNumber
//             style={{ width: 200 }}
//             value={unitPrice}
//             onChange={setUnitPrice}
//           />
//         </Card>
//       )}

//       {/* FEES */}
//       {unit && (
//         <Card style={{ marginTop: 16 }}>
//           <Title level={5}>Additional Fees</Title>
//           {fees.map((f, i) => (
//             <Space key={i}>
//               <InputNumber
//                 placeholder="£"
//                 value={f.amount}
//               />
//               <input placeholder="Fee name" />
//               <Button danger icon={<DeleteOutlined />} />
//             </Space>
//           ))}
//           <Button
//             type="dashed"
//             icon={<PlusOutlined />}
//             onClick={addFee}
//           >
//             Add Fee
//           </Button>
//         </Card>
//       )}

//       {/* PREVIEW */}
//       {unit && (
//         <Card style={{ marginTop: 16, background: "#fafafa" }}>
//           <Title level={5}>Preview</Title>
//           <Text>Course: {course}</Text><br />
//           <Text>Pricing Unit: {unit}</Text><br />
//           <Text type="secondary">
//             Final price will be calculated during enrollment
//           </Text>
//         </Card>
//       )}

//       <Divider />

//       <Row justify="end">
//         <Button type="primary">Save Pricing</Button>
//       </Row>
//     </Modal>
//   );
// }





import {
  Modal,
  Select,
  InputNumber,
  Button,
  Divider,
  Row,
  Col,
  Card,
  Typography,
  Space,
  Table
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../commonComponents/baseURL";

const { Title, Text } = Typography;

export default function PricingModal({ open, onClose, seasonId,  pricingId, onSaved }) {
  const [course, setCourse] = useState(null);
  const [unit, setUnit] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [unitPrice, setUnitPrice] = useState(null);
  const [fees, setFees] = useState([]);
  const [courses, setCourses] = useState([]); // ← added
const [loadedPricing, setLoadedPricing] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
  if (pricingId) {
    fetchPricingById(pricingId);
  }
}, [pricingId]);

// useEffect(() => {
//   if (pricingId && courses.length && course) {
//     setCourse(course);
//   }
// }, [courses]);


const fetchPricingById = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/get_price/${id}`
    );

    const p = res.data;
setLoadedPricing(res.data);

    setCourse(p.courseId?._id || p.courseId);
    setUnit(p.pricingUnit);
    setWeeks(p.weeklyPrices || []);
    setUnitPrice(p.unitPrice || null);
    setFees(p.additionalFees || []);
    
  } catch (err) {
    console.error("Failed to fetch pricing by id", err);
  }
};


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

  const addWeek = () =>
    setWeeks([...weeks, { from: null, to: null, price: null }]);


// const submitPricing = async () => {
//   const payload = {
//     seasonId,
//     courseId: course,
//     pricingUnit: unit,
//     weeklyPrices: unit === "week" ? weeks : [],
//     unitPrice: unit !== "week" ? unitPrice : null,
//     additionalFees: fees,
//   };

//   try {
//     await axios.post("http://localhost:5005/add_price", payload);

//     resetForm();     // clear form
//     onSaved();       // tell parent to refresh table
//   } catch (err) {
//     console.error("Failed to save pricing", err);
//   }
// };



const submitPricing = async () => {
  const payload = {
    ...(pricingId && { _id: pricingId }), // ✅ send id only if editing
    seasonId,
    courseId: course,
    pricingUnit: unit,
    weeklyPrices: unit === "week" ? weeks : [],
    unitPrice: unit !== "week" ? unitPrice : null,
    additionalFees: fees,
  };

  try {
    await axios.post(`${baseURL}/add_price`, payload);

    resetForm();
    onSaved();
  } catch (err) {
    console.error("Failed to save pricing", err);
  }
};


  const weekColumns = [
    {
      title: "From",
      render: (_, r, i) => (
        <InputNumber
          value={r.from}
          onChange={(v) => updateWeek(i, "from", v)}
        />
      ),
    },
    {
      title: "To",
      render: (_, r, i) => (
        <InputNumber
          value={r.to}
          onChange={(v) => updateWeek(i, "to", v)}
        />
      ),
    },
    {
      title: "£ / Week",
      render: (_, r, i) => (
        <InputNumber
          value={r.price}
          onChange={(v) => updateWeek(i, "price", v)}
        />
      ),
    },
    {
      title: "",
      render: (_, __, i) => (
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => removeWeek(i)}
        />
      ),
    },
  ];

  const updateWeek = (i, f, v) => {
    const updated = [...weeks];
    updated[i][f] = v;
    setWeeks(updated);
  };

  const removeWeek = (i) => {
    const updated = [...weeks];
    updated.splice(i, 1);
    setWeeks(updated);
  };

  const addFee = () => setFees([...fees, { name: "", amount: 0 }]);

const updateFee = (index, field, value) => {
  const updated = [...fees];
  updated[index][field] = value;
  setFees(updated);
};

const removeFee = (index) => {
  const updated = [...fees];
  updated.splice(index, 1);
  setFees(updated);
};



const selectedCourse = courses.find(c => c._id === course);

const renderPricingPreview = () => {
  if (!unit) return null;

  if (unit === "week") {
    if (!weeks.length) return <Text type="secondary">No weekly ranges added</Text>;

    return weeks.map((w, i) => (
      <div key={i}>
        <Text>
          {w.from || "?"}–{w.to || "?"} weeks : £{w.price || 0}
        </Text>
      </div>
    ));
  }

  return (
    <Text>
      £{unitPrice || 0} per {unit}
    </Text>
  );
};


const resetForm = () => {
  setCourse(null);
  setUnit(null);
  setWeeks([]);
  setUnitPrice(null);
  setFees([]);
};

useEffect(() => {
  if (loadedPricing && courses.length) {
    setCourse(loadedPricing.courseId._id);
    setUnit(loadedPricing.pricingUnit);
    setWeeks(loadedPricing.weeklyPrices || []);
    setUnitPrice(loadedPricing.unitPrice || null);
    setFees(loadedPricing.additionalFees || []);
  }
}, [loadedPricing, courses]);

useEffect(() => {
  if (!open) resetForm();
}, [open]);


  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={900}
      footer={null}
      title="Add Pricing"
    >
      {/* BASIC SETUP */}
      <Card bordered={false}>
        <Title level={5}>Basic Setup</Title>
        <Row gutter={16}>
          <Col span={8}>
            <Select
              placeholder="Course"
              style={{ width: "100%" }}
              value={course} 
              onChange={setCourse}
              options={courses.map(c => ({
                label: c.title_english,
                value: c._id,
              }))}
            />
          </Col>

          <Col span={8}>
            <Select
              placeholder="Pricing Unit"
              style={{ width: "100%" }}
              value={unit} 
              disabled={!course}
              onChange={(v) => {
                setUnit(v);
                setWeeks([]);
                setUnitPrice(null);
                setFees([]);
              }}
              options={[
                { label: "Per Week", value: "week" },
                { label: "Per Hour", value: "hour" },
                { label: "Per Lesson", value: "lesson" },
                { label: "Package", value: "package" },
              ]}
            />
          </Col>
        </Row>
      </Card>

      {/* PRICING */}
      {unit === "week" && (
        <Card style={{ marginTop: 16 }}>
          <Title level={5}>Weekly Prices (£)</Title>
          <Table
            columns={weekColumns}
            dataSource={weeks}
            pagination={false}
            locale={{ emptyText: "No ranges added" }}
          />
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addWeek}
            style={{ marginTop: 12 }}
          >
            Add Week Range
          </Button>
        </Card>
      )}

      {(unit === "hour" || unit === "lesson" || unit === "package") && (
        <Card style={{ marginTop: 16 }}>
          <Title level={5}>Price (£)</Title>
          <InputNumber
            style={{ width: 200 }}
            value={unitPrice}
            onChange={setUnitPrice}
          />
        </Card>
      )}

     {/* FEES */}
{unit && (
  <Card style={{ marginTop: 16 }}>
    <Title level={5}>Additional Fees</Title>

    <Space direction="vertical" style={{ width: "100%" }}>
      {fees.map((f, i) => (
        <Row key={i} gutter={12} align="middle">
          <Col span={10}>
            <input
              style={{
                width: "100%",
                padding: "6px 8px",
                border: "1px solid #d9d9d9",
                borderRadius: 6,
              }}
              placeholder="Fee name (e.g. Registration)"
              value={f.name}
              onChange={(e) =>
                updateFee(i, "name", e.target.value)
              }
            />
          </Col>

          <Col span={6}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Amount (£)"
              value={f.amount}
              onChange={(v) =>
                updateFee(i, "amount", v)
              }
            />
          </Col>

          <Col span={2}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeFee(i)}
            />
          </Col>
        </Row>
      ))}
    </Space>

    <Button
      type="dashed"
      icon={<PlusOutlined />}
      onClick={addFee}
      style={{ marginTop: 12 }}
    >
      Add Fee
    </Button>
  </Card>
)}


     {/* PREVIEW */}
{unit && (
  <Card style={{ marginTop: 16, background: "#fafafa" }}>
    <Title level={5}>Preview</Title>

    <Space direction="vertical">
      <Text>
        <strong>Course:</strong>{" "}
        {selectedCourse?.title_english || "-"}
      </Text>

      <Text>
        <strong>Pricing Unit:</strong>{" "}
        {unit === "week"
          ? "Per Week"
          : unit === "hour"
          ? "Per Hour"
          : unit === "lesson"
          ? "Per Lesson"
          : "Package"}
      </Text>

      <div>
        <strong>Pricing:</strong>
        <div style={{ marginLeft: 8 }}>
          {renderPricingPreview()}
        </div>
      </div>

      {fees.length > 0 && (
        <div>
          <strong>Additional Fees:</strong>
          <div style={{ marginLeft: 8 }}>
            {fees.map((f, i) => (
              <div key={i}>
                <Text>
                  {f.name || "Unnamed fee"} : £{f.amount || 0}
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}

      <Text type="secondary">
        Final price will be calculated during enrollment
      </Text>
    </Space>
  </Card>
)}


      <Divider />

      <Row justify="end">
        <Button type="primary" onClick={submitPricing}>
  {pricingId ? "Update Pricing" : "Save Pricing"}
</Button>

      </Row>
    </Modal>
  );
}
