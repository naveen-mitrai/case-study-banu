import React, { useEffect, useState } from "react";
import { Button, Table, Space } from "antd";
import { useNavigate } from "react-router-dom";
import InfoBox from "../components/common/infoBox";

const columns = [
  {
    title: "Order_ID",
    dataIndex: "id",
  },
  {
    title: "Drone_ID",
    dataIndex: "carrier",
  },
  {
    title: "Medications",
    dataIndex: "items",
    render: (arr) => {
      return <>{arr.join(", ")}</>;
    },
  },
  {
    title: "Status",
    dataIndex: "state",
  },
];

const Orders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get order data");

      const result = await response.json();
      console.log("Response:", result);
      setData(result.data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: result.data.length,
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <React.Fragment>
      <h1>Orders</h1>
      <InfoBox></InfoBox>
      <Space>
        <Button type="primary" onClick={() => navigate("/orders/new")}>
          Create new order
        </Button>
      </Space>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </React.Fragment>
  );
};

export default Orders;
