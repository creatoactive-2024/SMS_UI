// import { useState } from "react";
// import { Button, InputNumber, Select, DatePicker } from "antd";
// import { calculatePrice } from "../api/pricing.api";

// export default function PricePreviewPage({ courses }) {
//   const [result, setResult] = useState(null);

//   const calculate = async values => {
//     const res = await calculatePrice(values);
//     setResult(res.data);
//   };

//   return (
//     <>
//       <h2>Price Preview</h2>

//       <Select placeholder="Course" style={{ width: 200 }}>
//         {courses.map(c => (
//           <Select.Option key={c._id} value={c._id}>
//             {c.name}
//           </Select.Option>
//         ))}
//       </Select>

//       <InputNumber placeholder="Weeks" />
//       <DatePicker />

//       <Button type="primary" onClick={calculate}>
//         Calculate
//       </Button>

//       {result && (
//         <div style={{ marginTop: 20 }}>
//           <p>Base Price: ₹{result.basePrice || ""}</p>
//           <p>Discount: ₹{result.discount || ""}</p>
//           <b>Final Price: ₹{result.finalPrice || ""}</b>
//         </div>
//       )}
//     </>
//   );
// }



import { useEffect, useState } from "react";
import { Select, InputNumber, DatePicker, Button } from "antd";
import { getCourses, calculatePrice } from "../api/pricing.api";

export default function PricePreviewPage() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    getCourses().then(r => setCourses(r.data));
  }, []);

  const calc = async () => {
    const res = await calculatePrice(form);
    setResult(res.data);
  };

  return (
    <>
      <h2>Price Preview</h2>

      <Select placeholder="Course" onChange={v => setForm({ ...form, courseId: v })}>
        {courses.map(c => (
          <Select.Option key={c._id} value={c._id}>{c.title_english}</Select.Option>
        ))}
      </Select>

      <InputNumber placeholder="Weeks" onChange={v => setForm({ ...form, weeks: v })} />
      <DatePicker onChange={d => setForm({ ...form, startDate: d })} />

      <Button type="primary" onClick={calc}>Calculate</Button>

      {result && (
        <>
          <p>Base: ₹{result.basePrice}</p>
          <p>Discount: ₹{result.discount}</p>
          <b>Final: ₹{result.finalPrice}</b>
        </>
      )}
    </>
  );
}
