import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Link } from "react-router-dom";

const { Sider } = Layout;
const items = [
  {
    key: "dashboard",
    icon: React.createElement(NotificationOutlined),
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "drones",
    icon: React.createElement(NotificationOutlined),
    label: <Link to="/drones">Drones</Link>,
  },
  {
    key: "medications",
    icon: React.createElement(NotificationOutlined),
    label: <Link to="/medications">Medications</Link>,
  },
  {
    key: "orders",
    icon: React.createElement(LaptopOutlined),
    label: <Link to="/orders">Orders</Link>,
  },
  {
    key: "report",
    icon: React.createElement(UserOutlined),
    label: <Link to="/reports">Report</Link>,
  },
];

const NavBar = () => {
  const navigate = useNavigate();
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
