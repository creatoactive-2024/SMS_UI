// import React, { useState, useEffect } from "react";
// import { Card, Row, Col, DatePicker, Table, Button, Select } from "antd";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
// import moment from "moment";

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// // Sample colors for pie chart
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#6633FF"];

// const sampleHubspotData = [
//   { status: "Enquiry", createdAt: "2025-01-10", nationality: "Indian", hs_first_url: "/home", hs_last_url: "/contact", hs_analytics_source: "Organic" },
//   { status: "Booking", createdAt: "2025-02-14", nationality: "Spanish", hs_first_url: "/courses", hs_last_url: "/signup", hs_analytics_source: "Paid" },
//   { status: "Booking", createdAt: "2025-03-20", nationality: "Italian", hs_first_url: "/about", hs_last_url: "/enquiry", hs_analytics_source: "Referral" },
// ];




// const DashboardNew = ({ hubspotData = sampleHubspotData }) => {
//   // States
//   const [period, setPeriod] = useState("year"); // week/month/quarter/year
//   const [barData, setBarData] = useState([]);
//   const [pieData, setPieData] = useState([]);
//   const [topPagesData, setTopPagesData] = useState([]);
//   const [channelData, setChannelData] = useState([]);
//   const [customRange, setCustomRange] = useState([moment().startOf('year'), moment().endOf('year')]);

  
//   // Filter change handlers
//   const handlePeriodChange = (value) => {
//     setPeriod(value);
//     // Recompute data based on selected period
//     computeBarChartData(value);
//     computePieChartData(value);
//   };

//   const handleRangeChange = (dates) => {
//     if (dates) setCustomRange(dates);
//   };

//   // Sample function to compute bar chart
//   const computeBarChartData = (filterPeriod) => {
//     // Group by month or period
//     // hubspotData assumed to be an array of objects with status, createdAt
//     const groupedData = {};
//     hubspotData.forEach((item) => {
//       const month = moment(item.createdAt).format("YYYY-MM");
//       if (!groupedData[month]) groupedData[month] = { month, enquiries: 0, bookings: 0 };
//       groupedData[month].enquiries += item.status === "Enquiry" ? 1 : 0;
//       groupedData[month].bookings += item.status === "Booking" ? 1 : 0;
//     });
//     setBarData(Object.values(groupedData));
//   };

//   // Sample function to compute pie chart
//   const computePieChartData = () => {
//     const nationalityCount = {};
//     hubspotData
//       .filter((item) => item.status === "Booking")
//       .forEach((item) => {
//         nationalityCount[item.nationality] = (nationalityCount[item.nationality] || 0) + 1;
//       });
//     const pieArray = Object.keys(nationalityCount).map((key) => ({ name: key, value: nationalityCount[key] }));
//     setPieData(pieArray);
//   };

//   // Compute top pages
//   const computeTopPagesData = () => {
//     const pagesCount = {};
//     hubspotData.forEach((item) => {
//       const page = item.hs_first_url || item.hs_last_url;
//       if (!page) return;
//       pagesCount[page] = (pagesCount[page] || 0) + 1;
//     });
//     const topPages = Object.keys(pagesCount)
//       .map((key) => ({ page: key, count: pagesCount[key] }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 10);
//     setTopPagesData(topPages);
//   };

//   // Compute channel breakdown
//   const computeChannelData = () => {
//     const channels = {};
//     hubspotData.forEach((item) => {
//       const source = item.hs_analytics_source || "Unknown";
//       channels[source] = (channels[source] || 0) + 1;
//     });
//     const channelArray = Object.keys(channels).map((key) => ({ channel: key, count: channels[key] }));
//     setChannelData(channelArray);
//   };

//   useEffect(() => {
//     computeBarChartData(period);
//     computePieChartData();
//     computeTopPagesData();
//     computeChannelData();
//   }, [hubspotData, period]);

//   // Export data as Excel
//   const exportData = (data, filename) => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     XLSX.writeFile(workbook, `${filename}.xlsx`);
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <Row gutter={[16, 16]}>
//         <Col span={24}>
//           <Card title="Filter">
//             <Select value={period} onChange={handlePeriodChange} style={{ width: 150, marginRight: 16 }}>
//               <Option value="week">Week</Option>
//               <Option value="month">Month</Option>
//               <Option value="quarter">Quarter</Option>
//               <Option value="year">Year</Option>
//             </Select>
//             <RangePicker value={customRange} onChange={handleRangeChange} />
//           </Card>
//         </Col>

//         {/* Bar Chart */}
//         <Col span={12}>
//           <Card title="Enquiries vs Bookings">
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={barData}>
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="enquiries" fill="#8884d8" />
//                 <Bar dataKey="bookings" fill="#82ca9d" />
//               </BarChart>
//             </ResponsiveContainer>
//             <Button onClick={() => exportData(barData, "enquiries_bookings")} style={{ marginTop: 10 }}>
//               Export Data
//             </Button>
//           </Card>
//         </Col>

//         {/* Pie Chart */}
//         <Col span={12}>
//           <Card title="Students by Nationality">
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//             <Button onClick={() => exportData(pieData, "students_nationality")} style={{ marginTop: 10 }}>
//               Export Data
//             </Button>
//           </Card>
//         </Col>

//         {/* Top Pages Table */}
//         <Col span={12}>
//           <Card title="Top Pages for Enquiries">
//             <Table
//               dataSource={topPagesData}
//               columns={[
//                 { title: "Page URL", dataIndex: "page", key: "page" },
//                 { title: "Count", dataIndex: "count", key: "count" },
//               ]}
//               pagination={false}
//               rowKey="page"
//             />
//             <Button onClick={() => exportData(topPagesData, "top_pages")} style={{ marginTop: 10 }}>
//               Export Data
//             </Button>
//           </Card>
//         </Col>

//         {/* Channel Breakdown Table */}
//         <Col span={12}>
//           <Card title="Channel Breakdown">
//             <Table
//               dataSource={channelData}
//               columns={[
//                 { title: "Channel", dataIndex: "channel", key: "channel" },
//                 { title: "Count", dataIndex: "count", key: "count" },
//               ]}
//               pagination={false}
//               rowKey="channel"
//             />
//             <Button onClick={() => exportData(channelData, "channel_breakdown")} style={{ marginTop: 10 }}>
//               Export Data
//             </Button>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default DashboardNew;





// src/components/dashboard/DashboardNew.js
import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  DatePicker,
  Table,
  Button,
  Segmented,
  Space,
  Typography,
  Spin,
  Empty,
  Tooltip,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import { DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import DashboardInsights from "./DashboardInsights";




const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

const COLORS = [
  "#4f8ef7",
  "#6ad29a",
  "#ffb86b",
  "#ff6b8a",
  "#7f7aff",
  "#00c2ff",
  "#f28bff",
];

const defaultSampleData = [
  // January
  ...Array.from({ length: 250 }, (_, i) => ({
    id: i + 1,
    status: i % 2 === 0 ? "Enquiry" : "Booking",
    bookedStatus: i % 4 === 0 ? "Active" : undefined,
    createdAt: `2025-01-${(i % 28) + 1}T10:00:00Z`,
    nationality: "Indian",
  })),

  // February
  ...Array.from({ length: 150 }, (_, i) => ({
    id: 300 + i,
    status: i % 3 === 0 ? "Enquiry" : "Booking",
    bookedStatus: i % 5 === 0 ? "Active" : undefined,
    createdAt: `2025-02-${(i % 28) + 1}T11:00:00Z`,
    nationality: "French",
  })),

  // March
  ...Array.from({ length: 200 }, (_, i) => ({
    id: 500 + i,
    status: i % 4 === 0 ? "Enquiry" : "Booking",
    bookedStatus: i % 6 === 0 ? "Active" : undefined,
    createdAt: `2025-03-${(i % 28) + 1}T12:00:00Z`,
    nationality: "German",
  })),

  // April
  ...Array.from({ length: 300 }, (_, i) => ({
    id: 800 + i,
    status: i % 5 === 0 ? "Enquiry" : "Booking",
    bookedStatus: i % 4 === 0 ? "Active" : undefined,
    createdAt: `2025-04-${(i % 28) + 1}T13:00:00Z`,
    nationality: "Italian",
  })),

  // May
  ...Array.from({ length: 180 }, (_, i) => ({
    id: 1100 + i,
    status: i % 2 === 0 ? "Enquiry" : "Booking",
    bookedStatus: i % 3 === 0 ? "Active" : undefined,
    createdAt: `2025-05-${(i % 28) + 1}T14:00:00Z`,
    nationality: "Spanish",
  })),

  // June
  ...Array.from({ length: 270 }, (_, i) => ({
    id: 1400 + i,
    status: i % 3 === 0 ? "Enquiry" : "Booking",
    bookedStatus: i % 2 === 0 ? "Active" : undefined,
    createdAt: `2025-06-${(i % 28) + 1}T15:00:00Z`,
    nationality: "Japanese",
  })),
];



/**
 * DashboardNew
 * Props:
 *  - hubspotData: array of objects from HubSpot (optional). If omitted, uses sample data.
 */
const DashboardNew = ({ hubspotData = defaultSampleData, loading = false , stats = null,}) => {
  // UI state
  const [period, setPeriod] = useState("month"); // week/month/quarter/year
const [range, setRange] = useState([dayjs().startOf("year"), dayjs().endOf("year")]);

  // Data state for charts/tables
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [channelComparison, setChannelComparison] = useState([]);

  // Defensive: always treat incoming data as array
  const safeData = Array.isArray(hubspotData) ? hubspotData : [];

  // HELPERS
  const inRange = (dateStr) => {
  if (!dateStr) return false;
  const m = moment(dateStr);
  const start = moment(range[0].toDate());
  const end = moment(range[1].toDate());
  return m.isBetween(start.startOf("day"), end.endOf("day"), null, "[]");
};


  // Determine grouping key based on selected period
  const getPeriodKey = (dateStr) => {
    const m = moment(dateStr);
    if (period === "week") return `${m.year()}-W${m.isoWeek()}`;
    if (period === "quarter") return `${m.year()}-Q${m.quarter()}`;
    if (period === "year") return `${m.year()}`;
    // default month
    return m.format("YYYY-MM");
  };

  // Format a friendly label for x-axis based on period key
  const formatLabel = (key) => {
    if (!key) return "";
    if (period === "week") {
      const [y, w] = key.split("-W");
      return `W${w}/${y}`;
    }
    if (period === "quarter") {
      const [y, q] = key.split("-Q");
      return `Q${q}/${y}`;
    }
    if (period === "year") return key;
    // month
    return moment(key + "-01").format("MMM YYYY");
  };

  // COMPUTE bar (enquiries vs bookings)
  useEffect(() => {
    // guard
    if (!safeData.length) {
      setBarData([]);
      return;
    }

    const grouped = {}; // key -> { key, enquiries, bookings }
    safeData.forEach((item) => {
      if (!item || !item.createdAt) return;
      if (!inRange(item.createdAt)) return;

      const key = getPeriodKey(item.createdAt);
      if (!grouped[key]) grouped[key] = { key, enquiries: 0, bookings: 0 };

      // Treat any record with status containing "Enquiry" as enquiry
      // Treat either status === "Booking" or bookedStatus === "Active" as booking (Active)
      const st = (item.status || "").toString().toLowerCase();
      const bookedStatus = (item.bookedStatus || item.bookingStatus || "").toString().toLowerCase();

      if (st.includes("enquiry")) grouped[key].enquiries += 1;
      // consider booking only if it turned into active booking OR status explicitly 'booking'
      if (st.includes("booking") || bookedStatus === "active") grouped[key].bookings += 1;
    });

    // Convert to sorted array by key (time order)
    const arr = Object.values(grouped)
      .sort((a, b) => {
        // derive moment for sort
        const ma = period === "week" ? moment(a.key.replace("-W", "-1"), "YYYY-[W]W-E") : moment(a.key, period === "month" ? "YYYY-MM" : period === "quarter" ? "YYYY-[Q]Q" : "YYYY");
        const mb = period === "week" ? moment(b.key.replace("-W", "-1"), "YYYY-[W]W-E") : moment(b.key, period === "month" ? "YYYY-MM" : period === "quarter" ? "YYYY-[Q]Q" : "YYYY");
        return ma - mb;
      })
      .map((r) => ({ ...r, label: formatLabel(r.key) }));

    setBarData(arr);
  }, [safeData, range, period]);

  // COMPUTE pie (students by nationality for active bookings)
  useEffect(() => {
    if (!safeData.length) {
      setPieData([]);
      return;
    }
    const counts = {};
    safeData.forEach((item) => {
      if (!item || !item.createdAt) return;
      if (!inRange(item.createdAt)) return;
      // Only Active bookings
      const st = (item.status || "").toString().toLowerCase();
      const bookedStatus = (item.bookedStatus || item.bookingStatus || "").toString().toLowerCase();
      const isActiveBooking = st.includes("booking") || bookedStatus === "active";
      if (!isActiveBooking) return;

      const nat = item.nationality || "Unknown";
      counts[nat] = (counts[nat] || 0) + 1;
    });

    const arr = Object.keys(counts)
      .map((k) => ({ name: k, value: counts[k] }))
      .sort((a, b) => b.value - a.value);
    setPieData(arr);
  }, [safeData, range]);

  // COMPUTE top pages (the last url where enquiry happened)
  useEffect(() => {
    if (!safeData.length) {
      setTopPages([]);
      return;
    }
    const counts = {};
    safeData.forEach((item) => {
      if (!item || !item.createdAt) return;
      if (!inRange(item.createdAt)) return;
      // prefer last url (conversion page)
      const page = item.hs_last_url || item.hs_first_url || null;
      if (!page) return;
      counts[page] = (counts[page] || 0) + 1;
    });
    const arr = Object.keys(counts)
      .map((k) => ({ page: k, count: counts[k] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
    setTopPages(arr);
  }, [safeData, range]);

  // COMPUTE channel breakdown - first-touch vs last-touch
  useEffect(() => {
    if (!safeData.length) {
      setChannelComparison([]);
      return;
    }
    const firstCounts = {};
    const lastCounts = {};
    safeData.forEach((item) => {
      if (!item || !item.createdAt) return;
      if (!inRange(item.createdAt)) return;
      const first = item.hs_analytics_source || item.hsObjectSource || "Unknown";
      const last = item.hs_latest_source || item.hsLatestSource || first || "Unknown";
      firstCounts[first] = (firstCounts[first] || 0) + 1;
      lastCounts[last] = (lastCounts[last] || 0) + 1;
    });

    // Create unified list of channels
    const channels = Array.from(new Set([...Object.keys(firstCounts), ...Object.keys(lastCounts)])).map((ch) => ({
      channel: ch,
      firstTouch: firstCounts[ch] || 0,
      lastTouch: lastCounts[ch] || 0,
    }));

    // sort by total desc
    channels.sort((a, b) => b.firstTouch + b.lastTouch - (a.firstTouch + a.lastTouch));
    setChannelComparison(channels);
  }, [safeData, range]);

  // Export helpers
  const exportToExcel = (data, name = "export") => {
    if (!data || !data.length) {
      // nothing to export
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${name}.xlsx`);
  };

  // Columns for tables
  const topPagesCols = [
    { title: "Page URL", dataIndex: "page", key: "page", render: (t) => <Text copyable>{t}</Text> },
    { title: "Count", dataIndex: "count", key: "count" },
  ];

  const channelCols = [
    { title: "Channel", dataIndex: "channel", key: "channel" },
    { title: "First Touch", dataIndex: "firstTouch", key: "firstTouch" },
    { title: "Last Touch", dataIndex: "lastTouch", key: "lastTouch" },
  ];

  // Derived totals for quick stats
  // const totals = useMemo(() => {
  //   const totalEnquiries = safeData.filter((d) => (d.status || "").toString().toLowerCase().includes("enquiry")).length;
  //   const totalBookings = safeData.filter((d) => (d.status || "").toString().toLowerCase().includes("booking") || (d.bookedStatus || "").toString().toLowerCase() === "active").length;
  //   const activeBookings = safeData.filter((d) => (d.bookedStatus || d.bookingStatus || "").toString().toLowerCase() === "active" || (d.status || "").toString().toLowerCase().includes("booking")).length;
  //   return { totalEnquiries, totalBookings, activeBookings };
  // }, [safeData]);

  const totals = useMemo(() => {
  return {
    totalEnquiries: stats?.hubspot_contacts?.total ?? 0,
    totalBookings: stats?.bookinghubspotdata?.total ?? 0,   // ✅ 22
    activeBookings: stats?.bookinghubspotdata?.active ?? 0, // ✅ 4
  };
}, [stats]);


// const computeBarChartData = (filterPeriod) => {
//   if (!hubspotData || !Array.isArray(hubspotData)) return;

//   // Initialize grouped object
//   const groupedData = {};

//   hubspotData.forEach((item) => {
//     const monthLabel = moment(item.createdAt).format("MMM YYYY");
//     if (!groupedData[monthLabel]) {
//       groupedData[monthLabel] = { label: monthLabel, enquiries: 0, bookings: 0 };
//     }

//     if (item.status === "Enquiry") groupedData[monthLabel].enquiries += 1;
//     if (item.status === "Booking") groupedData[monthLabel].bookings += 1;
//   });

//   // Convert object → sorted array (latest by month)
//   const sortedData = Object.values(groupedData).sort((a, b) =>
//     moment(a.label, "MMM YYYY").diff(moment(b.label, "MMM YYYY"))
//   );

//   setBarData(sortedData);
// };



  // UI rendering
  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 12 }}>
        <Col xs={24} md={10}>
          <Title level={4} style={{ margin: 0 }}>
            HubSpot — Enquiries & Bookings Dashboard
          </Title>
          <Text type="secondary">Overview of enquiries, active bookings, channels and top pages.</Text>
        </Col>
        <Col xs={24} md={14} style={{ textAlign: "right" }}>
          <Space>
            <Segmented
              value={period}
              onChange={(val) => setPeriod(val)}
              options={[
                { label: "Week", value: "week" },
                { label: "Month", value: "month" },
                { label: "Quarter", value: "quarter" },
                { label: "Year", value: "year" },
              ]}
            />
           <RangePicker
  value={range}
  allowClear={false}
  onChange={(vals) => {
    if (vals && vals[0] && vals[1]) setRange(vals);
  }}
  disabled={loading}
  defaultPickerValue={[dayjs(), dayjs()]}
/>

          </Space>
        </Col>
      </Row>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Spin size="large" />
        </div>
      ) : safeData.length === 0 ? (
        <Empty description="No HubSpot data available for the selected range." />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card>
                <Title level={5} style={{ marginBottom: 6 }}>
                  Total Enquiries
                </Title>
                <Title level={2} style={{ marginTop: 0 }}>
                  {totals.totalEnquiries}
                </Title>
                <Text type="secondary">All incoming enquiries in dataset</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Title level={5} style={{ marginBottom: 6 }}>
                  Total Bookings (Active)
                </Title>
                <Title level={2} style={{ marginTop: 0 }}>
                  {totals.activeBookings}
                </Title>
                <Text type="secondary">Bookings with Active status</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Title level={5} style={{ marginBottom: 6 }}>
                  Bookings (All)
                </Title>
                <Title level={2} style={{ marginTop: 0 }}>
                  {totals.totalBookings}
                </Title>
                <Text type="secondary">All records flagged as Booking</Text>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 6 }}>
            <Col xs={24} lg={12}>
             <Card
  title="Enquiries vs Bookings"
  extra={
    <Space>
      <Tooltip title="Export raw bar data to Excel">
        <Button
          type="text"
          icon={<DownloadOutlined />}
          onClick={() =>
            exportToExcel(
              barData.map((r) => ({
                period: r.label,
                enquiries: r.enquiries,
                bookings: r.bookings,
              })),
              "enquiries_bookings"
            )
          }
        />
      </Tooltip>
    </Space>
  }
>
  {barData.length ? (
    <div style={{ width: "100%", height: 350 }}>
     <ResponsiveContainer width="100%" height={300}>
  <BarChart
    data={barData}
    barSize={40}
    margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
  >
    <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
    <YAxis
      axisLine={false}
      tickLine={false}
      domain={[0, 300]}
      ticks={[0, 50, 100, 150, 200, 250, 300]}
      tick={{ fontSize: 12 }}
    />
   <ReTooltip
  cursor={{ fill: "transparent" }}
  contentStyle={{
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    padding: "8px 12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}
  formatter={(value, name) => {
    // Recharts passes the "name" prop from <Bar name="...">
    return [value, name]; // just show the same label from Bar
  }}
  labelFormatter={(label) => `Period: ${label}`}
/>


    <Legend verticalAlign="top" />
   <Bar
  name="Enquiries"
  dataKey="enquiries"
  fill="#4f8ef7"
  radius={[6, 6, 0, 0]}
  animationDuration={800}
  activeBar={{ fillOpacity: 0.9 }}
/>
<Bar
  name="Bookings"
  dataKey="bookings"
  fill="#6ad29a"
  radius={[6, 6, 0, 0]}
  animationDuration={800}
  activeBar={{ fillOpacity: 0.9 }}
/>

  </BarChart>
</ResponsiveContainer>

    </div>
  ) : (
    <Empty description="No data for selected range/period" />
  )}
</Card>

            </Col>

            <Col xs={24} lg={12}>
              <Card
                title="Students by Nationality (Active bookings)"
                extra={
                  <Space>
                    <Tooltip title="Export nationality table">
                      <Button type="text" icon={<DownloadOutlined />} onClick={() => exportToExcel(pieData, "students_by_nationality")} />
                    </Tooltip>
                  </Space>
                }
              >
                {pieData.length ? (
                  <div style={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={110} label>
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ReTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ marginTop: 8 }}>
                      <Space wrap>
                        {pieData.slice(0, 8).map((slice, i) => (
                          <div key={slice.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 12, height: 12, background: COLORS[i % COLORS.length], borderRadius: 3 }} />
                            <Text>{slice.name} — {slice.value}</Text>
                          </div>
                        ))}
                      </Space>
                    </div>
                  </div>
                ) : (
                  <Empty description="No active bookings for selected range" />
                )}
              </Card>
            </Col>
          </Row>




          {/* <Row gutter={[16, 16]} style={{ marginTop: 6 }}>
            <Col xs={24} lg={12}>
              <Card
                title="Top Pages (where enquiries happened)"
                extra={
                  <Space>
                    <Button
                      type="link"
                      onClick={() => exportToExcel(topPages, "top_pages")}
                      icon={<DownloadOutlined />}
                    >
                      Export
                    </Button>
                  </Space>
                }
              >
                <Table
                  dataSource={topPages}
                  columns={topPagesCols}
                  pagination={{ pageSize: 6 }}
                  rowKey="page"
                  size="small"
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title="Channel Breakdown — First Touch vs Last Touch"
                extra={
                  <Space>
                    <Button
                      type="link"
                      onClick={() => exportToExcel(channelComparison, "channel_comparison")}
                      icon={<DownloadOutlined />}
                    >
                      Export
                    </Button>
                  </Space>
                }
              >
                <Table
                  dataSource={channelComparison}
                  columns={channelCols}
                  pagination={{ pageSize: 6 }}
                  rowKey="channel"
                  size="small"
                />
              </Card>
            </Col>
          </Row> */}
        </>
      )}

<DashboardInsights />
    </div>

    
  );
};

export default DashboardNew;
