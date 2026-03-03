// import { Form, Input, DatePicker, Button } from "antd";

// export default function SeasonForm({ onSubmit }) {
//   const [form] = Form.useForm();

//   return (
//     <Form form={form} layout="vertical" onFinish={onSubmit}>
//       <Form.Item name="name" label="Season Name" rules={[{ required: true }]}>
//         <Input placeholder="Summer 2025" />
//       </Form.Item>

//       <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
//         <DatePicker />
//       </Form.Item>

//       <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
//         <DatePicker />
//       </Form.Item>

//       <Button type="primary" htmlType="submit">
//         Create Season
//       </Button>
//     </Form>
//   );
// }



// import { Form, Input, DatePicker, Button } from "antd";

// export default function SeasonForm({ onSubmit }) {
//   return (
//     <Form layout="inline" onFinish={onSubmit}>
//       <Form.Item name="name" rules={[{ required: true }]}>
//         <Input placeholder="Summer 2025" />
//       </Form.Item>
//       <Form.Item name="startDate" rules={[{ required: true }]}>
//         <DatePicker />
//       </Form.Item>
//       <Form.Item name="endDate" rules={[{ required: true }]}>
//         <DatePicker />
//       </Form.Item>
//       <Button type="primary" htmlType="submit">
//         Create
//       </Button>
//     </Form>
//   );
// }




import { Form, Input, DatePicker, Button } from "antd";

export default function SeasonForm({ onSubmit }) {
  return (
    <Form
      layout="inline"
      onFinish={values => {
        onSubmit({
          ...values,
          startDate: values.startDate.toDate(),
          endDate: values.endDate.toDate()
        });
      }}
      style={{ marginBottom: 20 }}
    >
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Base 2025–2026" />
      </Form.Item>

      <Form.Item name="startDate" rules={[{ required: true }]}>
        <DatePicker placeholder="Start date" />
      </Form.Item>

      <Form.Item name="endDate" rules={[{ required: true }]}>
        <DatePicker placeholder="End date" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Create Season
      </Button>
    </Form>
  );
}
