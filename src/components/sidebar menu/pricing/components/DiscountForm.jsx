// import { Form, Input, Button, DatePicker, Select, message } from "antd";
// import axios from "axios";

// export default function DiscountForm({ seasonId, onSaved }) {
//   const onFinish = async values => {
//     await axios.post("http://localhost:5005/discounts", {
//       ...values,
//       seasonId,
//       startDate: values.range[0],
//       endDate: values.range[1]
//     });

//     message.success("Discount added");
//     onSaved();
//   };

//   return (
//     <Form layout="inline" onFinish={onFinish}>
//       <Form.Item name="name" rules={[{ required: true }]}>
//         <Input placeholder="Christmas Discount" />
//       </Form.Item>

//       <Form.Item name="discountType" rules={[{ required: true }]}>
//         <Select
//           placeholder="Type"
//           options={[
//             { label: "Percent", value: "PERCENT" },
//             { label: "Flat", value: "FLAT" }
//           ]}
//         />
//       </Form.Item>

//       <Form.Item name="discountValue" rules={[{ required: true }]}>
//         <Input placeholder="30" />
//       </Form.Item>

//       <Form.Item name="range" rules={[{ required: true }]}>
//         <DatePicker.RangePicker />
//       </Form.Item>

//       <Button type="primary" htmlType="submit">
//         Add Discount
//       </Button>
//     </Form>
//   );
// }



import { Select, InputNumber, Button, message } from "antd";
import { saveSeasonDiscount } from "../api/pricing.api";
import { useState } from "react";

export default function DiscountForm({ courses, seasons }) {
  const [data, setData] = useState({});

  const save = async () => {
    await saveSeasonDiscount([data]);
    message.success("Discount saved");
  };

  return (
    <>
      <Select placeholder="Season" onChange={v => setData({ ...data, pricingSeasonId: v })}>
        {seasons.map(s => (
          <Select.Option key={s._id} value={s._id}>{s.name}</Select.Option>
        ))}
      </Select>

      <Select placeholder="Course" onChange={v => setData({ ...data, courseId: v })}>
        {courses.map(c => (
          <Select.Option key={c._id} value={c._id}>{c.title_english}</Select.Option>
        ))}
      </Select>

      <InputNumber placeholder="Week From" onChange={v => setData({ ...data, weekFrom: v })} />
      <InputNumber placeholder="Week To" onChange={v => setData({ ...data, weekTo: v })} />
      <InputNumber placeholder="Discount %" onChange={v => setData({ ...data, discountValue: v, discountType: "PERCENT" })} />

      <Button type="primary" onClick={save}>Save Discount</Button>
    </>
  );
}
