

import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"; // ← add this at top
import {
  Modal,
  Descriptions,
  Spin,
  Divider,
  Tag,
  message,
  Tooltip,
} from "antd";

import PricingModal from "../components/PricingModal";
import {
  Card,
  Select,
  Button,
  Table,
  Row,
  Col,
  Typography,
  Tabs,
  Empty,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../commonComponents/baseURL";
import { Popconfirm } from "antd";
import DiscountModal from "../components/DiscountModal";

const { Title } = Typography;

export default function PricingPage() {
  const [season, setSeason] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pricing");
  const [seasons, setSeasons] = useState([]); // ← added

  const [pricingData, setPricingData] = useState([]);
  const [editingPricingId, setEditingPricingId] = useState(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [discountData, setDiscountData] = useState([]);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [editingDiscountId, setEditingDiscountId] = useState(null);

const [discountPreviewOpen, setDiscountPreviewOpen] = useState(false);
const [discountPreviewData, setDiscountPreviewData] = useState(null);
const [discountPreviewLoading, setDiscountPreviewLoading] = useState(false);



  useEffect(() => {
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    try {
      const res = await axios.get(`${baseURL}/season`);
      setSeasons(res.data);
    } catch (err) {
      console.error("Failed to fetch seasons", err);
    }
  };

  useEffect(() => {
    if (season) fetchPricing();
  }, [season]);

  const fetchPricing = async () => {
    try {
      const res = await axios.get(`${baseURL}/get_price`, {
        params: { seasonId: season },
      });

      const formatted = res.data.map((p) => ({
        key: p._id,
        course: p.courseId?.title_english || "-",
        unit: `Per ${p.pricingUnit}`,
        price:
          p.pricingUnit === "week"
            ? p.weeklyPrices
                .map((w) => `${w.from}-${w.to} £${w.price}`)
                .join(" | ")
            : `£${p.unitPrice}`,
      }));

      setPricingData(formatted);
    } catch (err) {
      console.error("Failed to fetch pricing", err);
    }
  };

  const handlePricingSaved = () => {
    setOpen(false);
    setEditingPricingId(null);
    fetchPricing(); // refresh table
  };

  const columns = [
    { title: "Course", dataIndex: "course" },
    { title: "Pricing Unit", dataIndex: "unit" },
    { title: "Price", dataIndex: "price" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Preview">
            <Button
              type="default"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => handlePreview(record.key)}
              style={{ transition: "all 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </Tooltip>

          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingPricingId(record.key);
                setOpen(true);
              }}
              style={{ transition: "all 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Are you sure to delete this pricing?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                style={{ transition: "all 0.2s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const discountColumns = [
{
  title: "Title",
  dataIndex: "name",
  width: 220
},
{
  title: "Courses",
  dataIndex: "courses",
  width: 300,

  render: (courses) => {

    if (courses.includes("All Courses")) {
      return <Tag color="blue">All Courses</Tag>;
    }

    const visible = courses.slice(0, 2);
    const hidden = courses.slice(2);

    return (
      <Space wrap>

        {visible.map((course, index) => (
          <Tag key={index} color="geekblue">
            {course}
          </Tag>
        ))}

        {hidden.length > 0 && (

          <Tooltip
            title={hidden.join(", ")}
          >

            <Tag color="purple">
              +{hidden.length} more
            </Tag>

          </Tooltip>

        )}

      </Space>
    );

  }

},

{
  title: "Discount",
  dataIndex: "type",
  width: 120,
  render: (val) => (
    <Tag color="green" style={{fontWeight:500}}>
      {val}
    </Tag>
  )
},

{
  title: "Validity",
  dataIndex: "validity",
  width: 220
},

{
  title: "Status",
  dataIndex: "status",
  width: 120,

  render: (status) => (
    <Tag color={status === "Active" ? "green" : "red"}>
      {status}
    </Tag>
  )
},

{
  title: "Actions",
  width: 150,
  render: (_, record) => (
    <Space>

      <Tooltip title="Preview">
        <Button
          shape="circle"
          icon={<EyeOutlined />}
          onClick={() =>
            handleDiscountPreview(record.key)
          }
        />
      </Tooltip>

      <Tooltip title="Edit">
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => {
            setEditingDiscountId(record.key);
            setDiscountOpen(true);
          }}
        />
      </Tooltip>

      <Popconfirm
        title="Delete discount?"
        onConfirm={() =>
          handleDeleteDiscount(record.key)
        }
      >
        <Button
          danger
          shape="circle"
          icon={<DeleteOutlined />}
        />
      </Popconfirm>

    </Space>
  )
}

];


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/pricing/${id}`);

      message.success("Pricing deleted successfully");

      fetchPricing(); // 🔥 re-fetch your list
    } catch (error) {
      message.error("Failed to delete pricing");
    }
  };

  const handlePreview = async (id) => {
    try {
      setPreviewLoading(true);
      setPreviewOpen(true);

      const res = await axios.get(`${baseURL}/get_price/${id}`);
      setPreviewData(res.data);
    } catch (err) {
      console.error("Failed to fetch pricing details", err);
    } finally {
      setPreviewLoading(false);
    }
  };

  useEffect(() => {
    if (season && activeTab === "discount") {
      fetchDiscounts();
    }
  }, [season, activeTab]);

  const fetchDiscounts = async () => {
    try {
      const res = await axios.get(`${baseURL}/get_discount`, {
        params: { seasonId: season },
      });

     const formatted = res.data.map(d => ({
  key: d._id,

  courses: d.courseIds?.length > 0
    ? d.courseIds.map(c => c.title_english)
    : ["All Courses"],

  type:
    d.discountType === "percentage"
      ? `${d.value}%`
      : `£${d.value}`,

  validity:
    `${d.validFrom?.slice(0,10)} → ${d.validTo?.slice(0,10)}`,
    name: d.name || "Untitled Discount",

  status: d.isActive ? "Active" : "Inactive"
}));



      setDiscountData(formatted);
    } catch (err) {
      console.error("Failed to fetch discounts", err);
    }
  };

  const handleDeleteDiscount = async (id) => {
    try {
      await axios.delete(`${baseURL}/deletediscount/${id}`);
      message.success("Discount deleted successfully");
      fetchDiscounts();
    } catch (err) {
      message.error("Failed to delete discount");
    }
  };

const handleDiscountPreview = async (id) => {
  try {

    setDiscountPreviewLoading(true);
    setDiscountPreviewOpen(true);

    const res = await axios.get(`${baseURL}/discountbyid/${id}`);

    setDiscountPreviewData(res.data);

  } catch (err) {

    console.error(err);

  } finally {

    setDiscountPreviewLoading(false);

  }
};


  return (
    <>
      <Card>
        {/* HEADER */}
       <Row
  justify="space-between"
  align="middle"
  style={{ marginBottom: 16 }}
>
  <Col>
    <Title level={3} style={{ margin: 0 }}>
      Pricing Management
    </Title>
  </Col>

  <Col>
    {activeTab === "pricing" && (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        disabled={!season}
        onClick={() => setOpen(true)}
      >
        Add Pricing
      </Button>
    )}

    {activeTab === "discount" && (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        disabled={!season}
        onClick={() => setDiscountOpen(true)}
      >
        Add Discount
      </Button>
    )}
  </Col>
</Row>


        {/* SEASON SELECT */}
        <Row style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Select
              placeholder="Select Season"
              style={{ width: "100%" }}
              onChange={setSeason}
              options={seasons.map((s) => ({
                label: s.name, // e.g. "Winter 2025"
                value: s._id, // season id
              }))}
            />
          </Col>
        </Row>

        {/* TABS */}
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Pricing" key="pricing">
            <Table
              columns={columns}
              dataSource={pricingData}
              pagination={false}
            />
          </Tabs.TabPane>

          {/* <Tabs.TabPane tab="Discount" key="discount">
            <Empty description="No discounts configured yet" />
          </Tabs.TabPane> */}

          <Tabs.TabPane tab="Discount" key="discount">
            <Table
              columns={discountColumns}
              dataSource={discountData}
              pagination={false}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <PricingModal
        open={open}
        pricingId={editingPricingId}
        onClose={() => {
          setOpen(false);
          setEditingPricingId(null);
        }}
        seasonId={season}
        onSaved={handlePricingSaved}
      />


<DiscountModal
  open={discountOpen}
  discountId={editingDiscountId}
  seasonId={season}
  onClose={() => {
    setDiscountOpen(false);
    setEditingDiscountId(null);
  }}
  onSaved={() => {
    setDiscountOpen(false);
    setEditingDiscountId(null);
    fetchDiscounts();
  }}
/>


      <Modal
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={null}
        width={700}
        title="Pricing Preview"
        destroyOnClose
      >
        <Spin spinning={previewLoading}>
          {previewData && (
            <>
              <Descriptions
                bordered
                column={1}
                size="middle"
                labelStyle={{ width: 220, fontWeight: 600 }}
              >
                <Descriptions.Item label="Course">
                  {previewData.courseId?.title_english || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Season">
                  {previewData.seasonId?.name || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Pricing Unit">
                  <Tag color="blue">
                    {previewData.pricingUnit
                      ? `Per ${previewData.pricingUnit}`
                      : "-"}
                  </Tag>
                </Descriptions.Item>

                {/* WEEKLY PRICING */}
                {previewData.pricingUnit === "week" ? (
                  <Descriptions.Item label="Weekly Pricing">
                    {previewData.weeklyPrices?.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {previewData.weeklyPrices.map((w, index) => (
                          <div
                            key={index}
                            style={{
                              padding: "6px 12px",
                              background: "#fafafa",
                              borderRadius: 6,
                              border: "1px solid #f0f0f0",
                            }}
                          >
                            {w.from || 0} – {w.to || 0} weeks → £{w.price || 0}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: "#999" }}>
                        No weekly pricing defined
                      </span>
                    )}
                  </Descriptions.Item>
                ) : (
                  <Descriptions.Item label="Unit Price">
                    {previewData.unitPrice ? (
                      <strong style={{ fontSize: 16 }}>
                        £{previewData.unitPrice}
                      </strong>
                    ) : (
                      <span style={{ color: "#999" }}>No price defined</span>
                    )}
                  </Descriptions.Item>
                )}

                {/* ✅ ADDITIONAL FEES */}
                <Descriptions.Item label="Additional Fees">
                  {previewData.additionalFees?.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {previewData.additionalFees.map((fee, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "6px 12px",
                            background: "#fafafa",
                            borderRadius: 6,
                            border: "1px solid #f0f0f0",
                          }}
                        >
                          {fee.name || "Unnamed Fee"} → £{fee.amount || 0}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span style={{ color: "#999" }}>No additional fees</span>
                  )}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <div style={{ textAlign: "right" }}>
                <Tag color="green">Read Only</Tag>
              </div>
            </>
          )}
        </Spin>
      </Modal>



{/* <Modal
  open={discountPreviewOpen}
  onCancel={() => setDiscountPreviewOpen(false)}
  footer={null}
  width={700}
  title="Discount Preview"
>

<Spin spinning={discountPreviewLoading}>

{discountPreviewData && (

<Descriptions
 bordered
 column={1}
 size="middle"
 labelStyle={{ width: 220, fontWeight: 600 }}
>

<Descriptions.Item label="Courses">

<Space wrap>

{discountPreviewData.courseIds?.map((course, index) => (

<Tag key={index} color="blue">

{course.title_english}

</Tag>

))}

</Space>

</Descriptions.Item>


<Descriptions.Item label="Season">

{discountPreviewData.seasonId?.name}

</Descriptions.Item>


<Descriptions.Item label="Discount">

<Tag color="green">

{discountPreviewData.discountType === "percentage"

? `${discountPreviewData.value}%`

: `£${discountPreviewData.value}`}

</Tag>

</Descriptions.Item>


<Descriptions.Item label="Validity">

{discountPreviewData.validFrom?.slice(0,10)}

 →

{discountPreviewData.validTo?.slice(0,10)}

</Descriptions.Item>


<Descriptions.Item label="Status">

<Tag color={discountPreviewData.isActive ? "green" : "red"}>

{discountPreviewData.isActive ? "Active" : "Inactive"}

</Tag>

</Descriptions.Item>


</Descriptions>

)}

</Spin>

</Modal> */}


<Modal
  open={discountPreviewOpen}
  onCancel={() => setDiscountPreviewOpen(false)}
  footer={null}
  width={800}
  title="Discount Preview"
>

<Spin spinning={discountPreviewLoading}>

{discountPreviewData && (

<Tabs defaultActiveKey="1">

{/* ================= TAB 1 ================= */}

<Tabs.TabPane tab="Discount Info" key="1">

<Descriptions bordered column={1} size="middle"
labelStyle={{ width: 220, fontWeight: 600 }}>

<Descriptions.Item label="Courses">

<Space wrap>

{discountPreviewData.discountInfo.courseIds?.map((course, index) => (

<Tag key={index} color="blue">

{course.title_english}

</Tag>

))}

</Space>

</Descriptions.Item>


<Descriptions.Item label="Season">

{discountPreviewData.discountInfo.seasonId?.name}

</Descriptions.Item>


<Descriptions.Item label="Discount">

<Tag color="green">

{discountPreviewData.discountInfo.discountType === "percentage"

? `${discountPreviewData.discountInfo.value}%`

: `£${discountPreviewData.discountInfo.value}`}

</Tag>

</Descriptions.Item>


<Descriptions.Item label="Validity">

{discountPreviewData.discountInfo.validFrom?.slice(0,10)}

 →

{discountPreviewData.discountInfo.validTo?.slice(0,10)}

</Descriptions.Item>


<Descriptions.Item label="Status">

<Tag color={
discountPreviewData.discountInfo.isActive ? "green" : "red"
}>

{discountPreviewData.discountInfo.isActive ? "Active" : "Inactive"}

</Tag>

</Descriptions.Item>

</Descriptions>

</Tabs.TabPane>



{/* ================= TAB 2 ================= */}

<Tabs.TabPane tab="Discounted Prices" key="2">

{discountPreviewData.calculatedPricing.map(course => (

<div key={course.courseId} style={{marginBottom:30}}>

<h3>

{course.courseName}

<Tag color="blue">

Per {course.pricingUnit}

</Tag>

</h3>


{/* WEEK TABLE */}

{course.pricingUnit === "week" ? (

<Table

pagination={false}

dataSource={course.weeklyPrices}

rowKey={(r)=>r.from}

columns={[

{
title:"Weeks",
render:(row)=>`${row.from}-${row.to}`
},

{
title:"Original",
render:(row)=>`£${row.originalPrice}`
},

{
title:"Discount",
render:(row)=>`£${row.discountAmount.toFixed(2)}`
},

{
title:"Final",
render:(row)=>(

<b style={{color:"green"}}>

£{row.finalPrice.toFixed(2)}

</b>

)
}

]}

/>

)

:

(

<Table

pagination={false}

dataSource={[course]}

rowKey="courseId"

columns={[

{
title:"Original",
render:(row)=>`£${row.originalPrice}`
},

{
title:"Discount",
render:(row)=>`£${row.discountAmount.toFixed(2)}`
},

{
title:"Final",
render:(row)=>(

<b style={{color:"green"}}>

£{row.finalPrice.toFixed(2)}

</b>

)
}

]}

/>

)

}


</div>

))}

</Tabs.TabPane>



</Tabs>

)}

</Spin>

</Modal>



    </>
  );
}
