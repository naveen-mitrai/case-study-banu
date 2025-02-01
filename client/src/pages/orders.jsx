import React from "react";
import InfoBox from "../components/common/infoBox";
import { Button, Space } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <h1>Orders</h1>
      <InfoBox></InfoBox>
      <Space>
        <Button type="primary" onClick={() => navigate("/orders/new")}>
          Create new order
        </Button>
      </Space>
    </React.Fragment>
  );
};

export default Orders;
