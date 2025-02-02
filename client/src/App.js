import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import "./App.css";
import NavBar from "./components/navBar";
import Drones from "./pages/drones";
import DroneForm from "./components/droneForm";
import Medications from "./pages/medications";
import MedicationForm from "./components/medicationForm";
import OrderForm from "./components/orderForm";
import Orders from "./pages/orders";
import Dashboard from "./pages/dashboard";

const { Header, Content, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <React.Fragment>
      <Layout>
        {/* <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header> */}
        <Layout>
          <Router>
            <NavBar />
            <Layout
              style={{
                padding: "0 24px 24px",
              }}
            >
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <main className="container">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/drones/new" element={<DroneForm />} />
                    <Route path="/drones" element={<Drones />} />
                    <Route
                      path="/medications/new"
                      element={<MedicationForm />}
                    />
                    <Route path="/medications" element={<Medications />} />
                    <Route path="/orders/new" element={<OrderForm />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                      path="*"
                      element={<Navigate to="/dashboard" replace />}
                    />
                  </Routes>
                </main>
              </Content>
            </Layout>
          </Router>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}

export default App;
