import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const items = [
  {
    key: "dashboard",
    icon: React.createElement(NotificationOutlined),
    label: "Dashboard",
    link: "/drones",
  },
  {
    key: "drones",
    icon: React.createElement(NotificationOutlined),
    label: "Drones",
    link: "/drones",
  },
  {
    key: "medicines",
    icon: React.createElement(NotificationOutlined),
    label: "Medicines",
    link: "/drones",
  },
  {
    key: "delivery",
    icon: React.createElement(LaptopOutlined),
    label: "Delivery",
    link: "/drones",
  },
  {
    key: "report",
    icon: React.createElement(UserOutlined),
    label: "Report",
    link: "/drones",
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
        onClick={({ link }) => navigate("/drones")}
      />
    </Sider>
  );
};
export default NavBar;
