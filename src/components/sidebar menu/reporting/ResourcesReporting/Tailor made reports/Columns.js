// import React from "react";
// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Layout, theme, Select, Input } from "antd";

// const { Option } = Select;
// const { Header, Content, Footer, Sider } = Layout;

// const items1 = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);
//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,
//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   }
// );

// const Columns = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout>
//       <Content style={{ padding: "0 15px" }}>
//         <Layout
//           style={{
//             padding: "24px 0",
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Sider
//             style={{
//               background: colorBgContainer,
//               borderRight: "1px solid #e8e8e8",
//               paddingLeft: "10px", // Add padding to the left
//               paddingRight: "10px",
//             }}
//             width={200}
//           >
//             <Select
//               style={{ width: "100%", marginRight: "10px" }} // Add margin to the right
//               defaultValue="All Categories"
//               onChange={() => {}}
//             >
//               <Option value="All Categories">All Categories</Option>
//               <Option value="nav2">nav2</Option>
//               <Option value="nav3">nav3</Option>
//             </Select>
//             <br />
//             <br />
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <label style={{ marginRight: "5px" }}>Search</label>
//               <Input placeholder="Enter your search query" />
//             </div>
//             <hr />
//           </Sider>

//           <Content style={{ padding: "0 24px", minHeight: 280 }}>
//             Content
//           </Content>
//         </Layout>
//       </Content>

//       <Footer style={{ textAlign: "center" }}>
//         {/* Ant Design ©{new Date().getFullYear()} Created by Ant UED */}
//       </Footer>
//     </Layout>
//   );
// };

// export default Columns;





import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row,Button } from "antd";

import { Layout, theme, Select, Input } from "antd";

const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;

const style = {
  background: "#0092ff",
  padding: "8px 0",
  height: "100px",
};

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const Columns = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: "0 15px" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
              borderRight: "1px solid #e8e8e8",
              paddingLeft: "10px", // Add padding to the left
              paddingRight: "10px",
            }}
            width={200}
          >
            <Select
              style={{ width: "100%", marginBottom: "10px" }} // Add margin to the bottom
              defaultValue="All Categories"
              onChange={() => {}}
            >
              <Option value="All Categories">All Categories</Option>
              <Option value="option2">option2</Option>
              <Option value="option3">option3</Option>
            </Select>
            <br />
            <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "5px" }}>Search</label>
              <Input placeholder="Enter your search query" />
            </div>
            <hr />
          </Sider>

          <Content style={{ padding: "0 24px", minHeight: 280, overflowX: "auto", }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "8px", // Add margin bottom
              }}
            >
              <Divider orientation="left">Arrangement</Divider>
            </div>
            <div
              style={{
                height: "100px", // Adjust the height as needed
                background: "#f0f2f5", // Background color of the column
                marginBottom: "24px", // Add margin bottom
              }}
            ></div>
            <Divider orientation="left">Columns</Divider>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div style={style}></div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}></div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}></div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}></div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: "center" }}>
      <Button
        type="primary"
        style={{ marginLeft: 8 }}
      >
        Save
      </Button>      </Footer>
    </Layout>
  );
};

export default Columns;
