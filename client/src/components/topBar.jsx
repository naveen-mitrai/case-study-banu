import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { Image, Dropdown, Space, Input } from "antd";
import React from "react";
import drone from "../images/drone.png";
import "../styles/topBar.css";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Logout
      </a>
    ),
  },
];

const TopBar = () => {
  return (
    <div className="topbar">
      <h1 className="title">MEDIDRONE</h1>
      <Image className="logo" src={drone} />
      <Input
        className="searchbox"
        style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}
        placeholder="Search"
      />
      <div className="container">
        <UserOutlined size={32} />
        <div className="userdetails">
          <div className="name">Banupriyan</div>
          <div className="position">Administrator</div>
        </div>
        <div className="dropdown">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <CaretDownOutlined
                  size={16}
                  onClick={() => {
                    console.log("logout...");
                  }}
                />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
