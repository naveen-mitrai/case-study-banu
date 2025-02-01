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
                  {/* <Router> */}
                  <Routes>
                    <Route path="/drones/new" element={<DroneForm />} />
                    <Route path="/drones" element={<Drones />} />
                    {/* <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="movies" /> */}
                    {/* <Redirect to="not-found" /> */}
                  </Routes>
                  {/* </Router> */}
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
