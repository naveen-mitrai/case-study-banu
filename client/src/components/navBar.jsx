import React from "react";
import {
  HomeOutlined,
  MedicineBoxOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const items = [
  {
    key: "dashboard",
    icon: React.createElement(HomeOutlined),
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "drones",
    icon: React.createElement(ThunderboltOutlined),
    label: <Link to="/drones">Drones</Link>,
  },
  {
    key: "medications",
    icon: React.createElement(MedicineBoxOutlined),
    label: <Link to="/medications">Medications</Link>,
  },
  {
    key: "orders",
    icon: React.createElement(ShoppingCartOutlined),
    label: <Link to="/orders">Orders</Link>,
  },
  {
    key: "report",
    icon: React.createElement(BarChartOutlined),
    label: <Link to="/reports">Report</Link>,
  },
];

const NavBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      width={200}
      style={{
        background: colorBgContainer,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
      />
    </Sider>
  );
};
export default NavBar;
