// import { Table } from "antd";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import DiscountForm from "./DiscountForm";

// export default function DiscountTable({ season }) {
//   const [discounts, setDiscounts] = useState([]);

//   const loadDiscounts = async () => {
//     const res = await axios.get(
//       `http://localhost:5005/discounts/${season._id}`
//     );
//     setDiscounts(res.data);
//   };

//   useEffect(() => {
//     loadDiscounts();
//   }, []);

//   return (
//     <>
//       <h3>Add Discount for {season.name}</h3>

//       <DiscountForm seasonId={season._id} onSaved={loadDiscounts} />

//       <Table
//         rowKey="_id"
//         dataSource={discounts}
//         columns={[
//           { title: "Name", dataIndex: "name" },
//           { title: "Type", dataIndex: "discountType" },
//           { title: "Value", dataIndex: "discountValue" },
//           {
//             title: "Start",
//             dataIndex: "startDate",
//             render: d => new Date(d).toLocaleDateString()
//           },
//           {
//             title: "End",
//             dataIndex: "endDate",
//             render: d => new Date(d).toLocaleDateString()
//           }
//         ]}
//       />
//     </>
//   );
// }



import { Table, Tag } from "antd";
import dayjs from "dayjs";
import DiscountPreviewModal from "./DiscountPreviewModal";
import { useState } from "react";

const getStatus = d => {
  const now = dayjs();
  if (now.isBefore(d.startDate)) return "UPCOMING";
  if (now.isAfter(d.endDate)) return "EXPIRED";
  return "ACTIVE";
};

export default function DiscountTable({ discounts }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Table
        rowKey="_id"
        dataSource={discounts}
        columns={[
          {
            title: "Season",
            dataIndex: "pricingSeasonId"
          },
          {
            title: "Discount %",
            dataIndex: "discountValue"
          },
          {
            title: "Period",
            render: r =>
              `${dayjs(r.startDate).format("DD MMM")} - ${dayjs(
                r.endDate
              ).format("DD MMM")}`
          },
          {
            title: "Status",
            render: r => {
              const s = getStatus(r);
              return (
                <Tag
                  color={
                    s === "ACTIVE"
                      ? "green"
                      : s === "UPCOMING"
                      ? "blue"
                      : "red"
                  }
                >
                  {s}
                </Tag>
              );
            }
          }
        ]}
        onRow={r => ({
          onClick: () => setSelected(r)
        })}
      />

      {selected && (
        <DiscountPreviewModal
          discount={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
