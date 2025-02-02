import React, { useEffect, useState } from "react";
import { Button, Table, Space, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
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
  {
    title: "",
    dataIndex: "action",
    render: (text, record) => {
      if (record.state != "DELIVERED") {
        const statusToBeChanged = status[status.indexOf(record.state) + 1];
        return (
          <Button
            variant="outlined"
            color={statusToBeChanged == "DELIVERING" ? "primary" : "cyan"}
            onClick={() => {
              updateStatusChange(statusToBeChanged);
            }}
          >{`Mark As ${statusToBeChanged}`}</Button>
        );
      }
    },
  },
];

const status = ["LOADING", "DELIVERING", "DELIVERED"];

const updateStatusChange = (statusToBeChanged) => {
  console.log("in status", statusToBeChanged);

  // TODO: Need to call update endpoint
};

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

  const count = [
    {
      today: "Total Drones",
      title: "$53,000",
      persent: "+30%",
      //   icon: heart,
      bnb: "bnb2",
    },
    {
      today: "Total Medications",
      title: "3,200",
      persent: "+20%",
      //   icon: heart,
      bnb: "bnb2",
    },
    {
      today: "New Clients",
      title: "+1,200",
      persent: "-20%",
      //   icon: heart,
      bnb: "redtext",
    },
    {
      today: "New Orders",
      title: "$13,200",
      persent: "10%",
      //   icon: heart,
      bnb: "bnb2",
    },
  ];

  return (
    <React.Fragment>
      <h1>Orders</h1>
      <InfoBox infoItems={count} />
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
