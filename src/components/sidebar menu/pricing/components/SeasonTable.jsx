

// import { Table, Tag, Button, Modal } from "antd";
// import { useState } from "react";
// import PublishSeasonButton from "./PublishSeasonButton";
// import DiscountTable from "./DiscountTable";

// export default function SeasonTable({ seasons }) {
//   const [selectedSeason, setSelectedSeason] = useState(null);

//   const columns = [
//     {
//       title: "Season Name",
//       dataIndex: "name"
//     },
//     {
//       title: "Start Date",
//       dataIndex: "startDate",
//       render: d => new Date(d).toLocaleDateString()
//     },
//     {
//       title: "End Date",
//       dataIndex: "endDate",
//       render: d => new Date(d).toLocaleDateString()
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: s => (
//         <Tag color={s === "LIVE" ? "green" : "orange"}>{s}</Tag>
//       )
//     },
//     {
//       title: "Actions",
//       render: (_, record) => (
//         <>
//           <Button
//             style={{ marginRight: 8 }}
//             onClick={() => setSelectedSeason(record)}
//           >
//             Discounts
//           </Button>

//           {record.status === "DRAFT" && (
//             <PublishSeasonButton seasonId={record._id} />
//           )}
//         </>
//       )
//     }
//   ];

//   return (
//     <>
//       <Table columns={columns} dataSource={seasons} rowKey="_id" />

//       <Modal
//         open={!!selectedSeason}
//         footer={null}
//         width={900}
//         onCancel={() => setSelectedSeason(null)}
//       >
//         {selectedSeason && (
//           <DiscountTable season={selectedSeason} />
//         )}
//       </Modal>
//     </>
//   );
// }



// import { Table, Tag } from "antd";
// import PublishSeasonButton from "./PublishSeasonButton";

// export default function SeasonTable({ seasons, reload }) {
//   const columns = [
//     { title: "Name", dataIndex: "name" },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: s => (
//         <Tag color={s === "LIVE" ? "green" : "orange"}>{s}</Tag>
//       )
//     },
//     {
//       title: "Action",
//       render: (_, r) =>
//         r.status === "DRAFT" && (
//           <PublishSeasonButton id={r._id} reload={reload} />
//         )
//     }
//   ];

//   return <Table rowKey="_id" columns={columns} dataSource={seasons} />;
// }





import { Table, Tag, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import PublishSeasonButton from "./PublishSeasonButton";

export default function SeasonTable({ seasons, reload }) {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Season",
      dataIndex: "name"
    },
    {
      title: "Period",
      render: r =>
        `${new Date(r.startDate).toLocaleDateString()} - ${new Date(
          r.endDate
        ).toLocaleDateString()}`
    },
    {
      title: "Status",
      dataIndex: "status",
      render: s => (
        <Tag color={s === "LIVE" ? "green" : "orange"}>
          {s}
        </Tag>
      )
    },
    {
      title: "Actions",
      render: (_, r) => (
        <Space>
          {r.status === "DRAFT" && (
            <PublishSeasonButton id={r._id} reload={reload} />
          )}

          {/* <Button
            onClick={() =>
              navigate(`/admindashboard/base_price`)
            }
          >
            Manage Pricing
          </Button> */}
        </Space>
      )
    }
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={seasons}
      pagination={false}
    />
  );
}
