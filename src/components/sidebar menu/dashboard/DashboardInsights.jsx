import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Spin, Statistic, Divider, Tabs } from "antd";
import { Pie, Bar } from "@ant-design/plots";
import axios from "axios";
import baseURL from "../commonComponents/baseURL";

const { TabPane } = Tabs;

const DashboardInsights = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  // ---------------- API CALL ----------------
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/dashboard`); // 🔁 adjust URL
        setData(res.data);
      } catch (err) {
        console.error("Dashboard API error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading || !data) {
    return <Spin size="large" />;
  }

  const { summary, insights } = data;

  // ---------------- TOP FINAL PAGES ----------------
  const topPagesColumns = [
    {
      title: "Page URL",
      dataIndex: "_id",
      key: "_id",
      render: (url) => (
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: "Enquiries",
      dataIndex: "count",
      key: "count",
    },
  ];

  // ---------------- CHANNEL DISTRIBUTION ----------------
  const channelPieData = insights.channels.first_touch.map((item) => ({
    type: item._id.source || "Unknown",
    value: item.count,
  }));


  
const channelTotal = channelPieData.reduce(
  (sum, d) => sum + d.value,
  0
);

const channelPieConfig = {
  data: channelPieData,
  angleField: "value",
  colorField: "type",
  radius: 0.9,

  label: {
    formatter: (datum) => {
      if (!datum?.value || !channelTotal) return "";
      return `${datum.type}: ${datum.value}`;
    },
  },

  tooltip: {
    formatter: (datum) => ({
      name: datum.type,
      value: datum.value,
    }),
  },
};



  // ---------------- CHANNEL DETAIL TABLE ----------------
  const channelTableData = insights.channels.first_touch.map((item, index) => ({
    key: index,
    channel: item._id.source,
    sourceDetail: item._id.source_1,
    campaign: item._id.source_2,
    count: item.count,
  }));

  const channelColumns = [
    { title: "Channel", dataIndex: "channel" },
    { title: "Source Detail", dataIndex: "sourceDetail" },
    { title: "Campaign / Extra", dataIndex: "campaign" },
    { title: "Enquiries", dataIndex: "count" },
  ];

  // ---------------- FIRST VS LAST TOUCH (PLACEHOLDER STRUCTURE) ----------------
  const firstVsLastData = [
    { channel: "Organic Search", touch: "First Touch", value: 392 },
    { channel: "Organic Search", touch: "Last Touch", value: 210 },
    { channel: "Paid Search", touch: "First Touch", value: 260 },
    { channel: "Paid Search", touch: "Last Touch", value: 300 },
  ];

  const firstLastConfig = {
    data: firstVsLastData,
    isGroup: true,
    xField: "value",
    yField: "channel",
    seriesField: "touch",
    legend: { position: "top" },
  };

  return (
    <>
      {/* ---------------- SUMMARY ---------------- */}
      {/* <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Enquiries" value={summary.enquiries} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Active Bookings" value={summary.bookings} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Conversion Rate" value={summary.conversion_rate} />
          </Card>
        </Col>
      </Row> */}

      <Divider />

      {/* ---------------- ENQUIRY PAGES ---------------- */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Top Pages Where Enquiries Happen (Last Touch)">
            <Table
              columns={topPagesColumns}
              dataSource={insights.top_final_pages}
              pagination={{ pageSize: 5 }}
              rowKey="_id"
            />
          </Card>
        </Col>

        {/* ---------------- CHANNEL PIE ---------------- */}
        <Col span={12}>
          <Card title="Enquiries by Channel (First Touch)">
            <Pie {...channelPieConfig} />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* ---------------- CHANNEL BREAKDOWN ---------------- */}
      <Card title="Channel Breakdown (Detailed)">
        <Table
          columns={channelColumns}
          dataSource={channelTableData}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Divider />

      {/* ---------------- FIRST VS LAST TOUCH ---------------- */}
      <Card title="First Touch vs Last Touch Comparison">
        <Bar {...firstLastConfig} />
      </Card>
    </>
  );
};

export default DashboardInsights;
