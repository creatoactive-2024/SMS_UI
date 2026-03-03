import React, { useEffect, useState } from "react";
import { Card, Input, Typography, Space, Spin, message } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const Addprice = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://globaltourmanager.com/backend/getdata",
        {
          collectionName: "courses",
        }
      );

      setCourses(res.data || []);
    } catch (error) {
      message.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (courseId, weekName, value) => {
    setPrices((prev) => ({
      ...prev,
      [courseId]: {
        ...(prev[courseId] || {}),
        [weekName]: value,
      },
    }));
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <Title level={3}>Course Week Pricing</Title>

      {courses.map((course) => (
        <Card
          key={course._id}
          style={{ marginBottom: 16 }}
          bordered
        >
          <Title level={5}>{course.title_english}</Title>

          <Space direction="vertical" style={{ width: "100%" }}>
            {course.week_name?.map((week) => (
              <div
                key={week}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Text style={{ minWidth: 120 }}>{week}</Text>

                <Input
                  placeholder="Enter price"
                  style={{ width: 200 }}
                  value={prices?.[course._id]?.[week]}
                  onChange={(e) =>
                    handlePriceChange(
                      course._id,
                      week,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </Space>
        </Card>
      ))}
    </div>
  );
};

export default Addprice;
