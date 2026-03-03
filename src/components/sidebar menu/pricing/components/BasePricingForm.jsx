
// import { useState } from "react";
// import { Table, InputNumber, Select, Button, message, Space } from "antd";
// import { saveBasePricing } from "../api/pricing.api";

// export default function BasePricingForm({ courses, seasonId }) {
//   const [courseId, setCourseId] = useState(null);
//   const [rows, setRows] = useState([
//     { weekFrom: 1, weekTo: 3, pricePerWeek: null }
//   ]);

//   const updateRow = (index, field, value) => {
//     setRows(prev =>
//       prev.map((r, i) =>
//         i === index ? { ...r, [field]: value } : r
//       )
//     );
//   };

//   const addRow = () => {
//     setRows(prev => [
//       ...prev,
//       { weekFrom: null, weekTo: null, pricePerWeek: null }
//     ]);
//   };

//   const removeRow = index => {
//     setRows(prev => prev.filter((_, i) => i !== index));
//   };

//   const save = async () => {
//     if (!courseId) {
//       return message.error("Select course first");
//     }

//     await saveBasePricing({
//       pricingSeasonId: seasonId,
//       pricingList: rows.map(r => ({
//         ...r,
//         courseId
//       }))
//     });

//     message.success("Base pricing saved");
//   };

//   return (
//     <>
//       <h3>Base Pricing</h3>

//       <Select
//         placeholder="Select course"
//         style={{ width: 400, marginBottom: 16 }}
//         value={courseId}
//         onChange={setCourseId}
//       >
//         {courses.map(c => (
//           <Select.Option key={c._id} value={c._id}>
//             {c.title_english}
//           </Select.Option>
//         ))}
//       </Select>

//       <Table
//         pagination={false}
//         rowKey={(_, i) => i}
//         dataSource={rows}
//         columns={[
//           {
//             title: "From (weeks)",
//             render: (_, r, i) => (
//               <InputNumber
//                 min={1}
//                 value={r.weekFrom}
//                 onChange={v => updateRow(i, "weekFrom", v)}
//               />
//             )
//           },
//           {
//             title: "To (weeks)",
//             render: (_, r, i) => (
//               <InputNumber
//                 min={r.weekFrom || 1}
//                 value={r.weekTo}
//                 onChange={v => updateRow(i, "weekTo", v)}
//               />
//             )
//           },
//           {
//             title: "₹ per week",
//             render: (_, r, i) => (
//               <InputNumber
//                 min={0}
//                 value={r.pricePerWeek}
//                 onChange={v => updateRow(i, "pricePerWeek", v)}
//               />
//             )
//           },
//           {
//             title: "Action",
//             render: (_, __, i) => (
//               <Button danger onClick={() => removeRow(i)}>
//                 Remove
//               </Button>
//             )
//           }
//         ]}
//       />

//       <Space style={{ marginTop: 16 }}>
//         <Button onClick={addRow}>Add Range</Button>
//         <Button type="primary" onClick={save} disabled={!courseId}>
//           Save Pricing
//         </Button>
//       </Space>
//     </>
//   );
// }











// import { useState, useEffect } from "react";
// import { Table, InputNumber, Select, Button, message } from "antd";
// import { saveBasePricing } from "../api/pricing.api";

// export default function BasePricingForm({ courses, seasonId }) {
//   const [course, setCourse] = useState(null);
//   const [prices, setPrices] = useState([]);

//   const onCourseSelect = courseId => {
//     const selected = courses.find(c => c._id === courseId);
//     setCourse(selected);

//     // build rows from week_name
//     const rows = (selected.week_name || []).map(w => ({
//       weekName: w,
//       pricePerWeek: null
//     }));

//     setPrices(rows);
//   };

//   const updatePrice = (index, value) => {
//     setPrices(prev =>
//       prev.map((r, i) =>
//         i === index ? { ...r, pricePerWeek: value } : r
//       )
//     );
//   };

//   const save = async () => {
//     if (!course) return message.error("Select course");

//     await saveBasePricing({
//       pricingSeasonId: seasonId,
//       pricingList: prices.map(p => ({
//         courseId: course._id,
//         weekName: p.weekName,
//         pricePerWeek: p.pricePerWeek
//       }))
//     });

//     message.success("Base pricing saved");
//   };

//   return (
//     <>
//       {/* <h3>Base Pricing</h3> */}

//       <Select
//         placeholder="Select course"
//         style={{ width: 450, marginBottom: 20 }}
//         onChange={onCourseSelect}
//       >
//         {courses.map(c => (
//           <Select.Option key={c._id} value={c._id}>
//             {c.title_english}
//           </Select.Option>
//         ))}
//       </Select>

//       {prices.length > 0 && (
//         <Table
//           pagination={false}
//           rowKey="weekName"
//           dataSource={prices}
//           columns={[
//             {
//               title: "Duration",
//               dataIndex: "weekName"
//             },
//             {
//               title: "₹ Price per week",
//               render: (_, r, i) => (
//                 <InputNumber
//                   min={0}
//                   value={r.pricePerWeek}
//                   onChange={v => updatePrice(i, v)}
//                 />
//               )
//             }
//           ]}
//         />
//       )}

//       {prices.length > 0 && (
//         <Button
//           type="primary"
//           style={{ marginTop: 20 }}
//           onClick={save}
//         >
//           Save Pricing
//         </Button>
//       )}
//     </>
//   );
// }


import { useEffect, useState } from "react";
import {
  Select,
  Card,
  Table,
  InputNumber,
  Button,
  message
} from "antd";
import { saveBasePricing } from "../api/pricing.api";

const { Option } = Select;

export default function BasePricingForm({ courses, seasonId }) {
  const [filterCourseId, setFilterCourseId] = useState("ALL");
  const [coursePrices, setCoursePrices] = useState({});

  // ✅ Normalize backend data ONCE
  useEffect(() => {
    const map = {};

    courses.forEach(course => {
      if (course.pricing && course.pricing.length > 0) {
        map[course.courseId] = course.pricing.map(p => ({
          weekLabel: p.weekLabel,
          weekFrom: p.weekFrom,
          weekTo: p.weekTo,
          pricePerWeek: p.pricePerWeek
        }));
      } else {
        map[course.courseId] = (course.week_name || []).map(w => ({
          weekLabel: w,
          weekFrom: null,
          weekTo: null,
          pricePerWeek: null
        }));
      }
    });

    setCoursePrices(map);
  }, [courses]);

  const updatePrice = (courseId, index, value) => {
    setCoursePrices(prev => ({
      ...prev,
      [courseId]: prev[courseId].map((r, i) =>
        i === index ? { ...r, pricePerWeek: value } : r
      )
    }));
  };

  const saveCoursePricing = async course => {
    const rows = coursePrices[course.courseId];

    await saveBasePricing({
      pricingSeasonId: seasonId,
      pricingList: rows.map(r => ({
        courseId: course.courseId,
        weekName: r.weekLabel,
        pricePerWeek: r.pricePerWeek
      }))
    });

    message.success(`${course.courseName} pricing saved`);
  };

  const visibleCourses =
    filterCourseId === "ALL"
      ? courses
      : courses.filter(c => c.courseId === filterCourseId);

  return (
    <>
      {/* 🔹 Course Filter */}
      <Select
        value={filterCourseId}
        style={{ width: 500, marginBottom: 20 }}
        onChange={setFilterCourseId}
      >
        <Option value="ALL">All Courses</Option>
        {courses.map(c => (
          <Option key={c.courseId} value={c.courseId}>
            {c.courseName}
          </Option>
        ))}
      </Select>

      {/* 🔹 Course Blocks */}
      {visibleCourses.map(course => {
        const prices = coursePrices[course.courseId] || [];

        return (
          <Card
            key={course.courseId}
            title={course.courseName}
            style={{ marginBottom: 20 }}
          >
            <Table
              pagination={false}
              rowKey="weekLabel"
              dataSource={prices}
              columns={[
                {
                  title: "Duration",
                  dataIndex: "weekLabel"
                },
                {
                  title: "₹ Price per week",
                  render: (_, r, i) => (
                    <InputNumber
                      min={0}
                      value={r.pricePerWeek}
                      onChange={v =>
                        updatePrice(course.courseId, i, v)
                      }
                    />
                  )
                }
              ]}
            />

            <Button
              type="primary"
              style={{ marginTop: 15 }}
              onClick={() => saveCoursePricing(course)}
            >
              Save Pricing
            </Button>
          </Card>
        );
      })}
    </>
  );
}
