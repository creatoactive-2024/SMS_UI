import { Modal, Select, DatePicker, InputNumber, Button, message } from "antd";
import { useState } from "react";
import { createDiscount } from "../api/pricing.api";
import dayjs from "dayjs";

export default function DiscountCreateModal({
  open,
  onClose,
  courses,
  seasons,
  reload
}) {
  const [form, setForm] = useState({});

  const save = async () => {
    if (!form.pricingSeasonId || !form.courseIds?.length) {
      return message.error("Missing required fields");
    }

    await createDiscount({
      ...form,
      discountType: "PERCENT"
    });

    message.success("Discount created");
    reload();
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Create Discount"
      onCancel={onClose}
      footer={null}
    >
      <Select
        placeholder="Season"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={v => setForm({ ...form, pricingSeasonId: v })}
      >
        {seasons.map(s => (
          <Select.Option key={s._id} value={s._id}>
            {s.name}
          </Select.Option>
        ))}
      </Select>

      <Select
        mode="multiple"
        placeholder="Courses"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={v => setForm({ ...form, courseIds: v })}
      >
        {courses.map(c => (
          <Select.Option key={c._id} value={c._id}>
            {c.title_english}
          </Select.Option>
        ))}
      </Select>

      <DatePicker.RangePicker
        style={{ width: "100%", marginBottom: 10 }}
        onChange={d =>
          setForm({
            ...form,
            startDate: d[0].toISOString(),
            endDate: d[1].toISOString()
          })
        }
      />

      <InputNumber
        min={1}
        max={90}
        placeholder="Discount %"
        style={{ width: "100%", marginBottom: 20 }}
        onChange={v => setForm({ ...form, discountValue: v })}
      />

      <Button type="primary" block onClick={save}>
        Create Discount
      </Button>
    </Modal>
  );
}
