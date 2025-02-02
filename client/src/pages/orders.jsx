import React, { useEffect, useState } from "react";
import { Button, Table, Space, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import InfoBox from "../components/common/infoBox";

const status = ["LOADING", "DELIVERING", "DELIVERED"];

const Orders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

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
                updateStatusChange(record.id, statusToBeChanged);
              }}
            >{`Mark As ${statusToBeChanged}`}</Button>
          );
        }
      },
    },
  ];

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

  const updateStatusChange = async (orderID, statusToBeChanged) => {
    console.log("in status", statusToBeChanged);
    console.log(orderID);
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: statusToBeChanged,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update order data");

      const result = await response.json();
      console.log("Response:", result);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cards = [
    {
      today: "Total Orders",
      title: data.length,
      persent: "+30%",
      bnb: "bnb2",
    },
    {
      today: "Successful Orders",
      title: data.filter((ord) => ord.state == "DELIVERED").length,
      persent: "+20%",
      bnb: "bnb2",
    },
    {
      today: "Orders In Progess",
      title: data.filter((ord) => ord.state != "DELIVERED").length,
      persent: "+20%",
      bnb: "redtext",
    },
    {
      today: "Total Revenue",
      title: "$13,200",
      persent: "10%",
      bnb: "bnb2",
    },
  ];

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Orders</h1>
        <Button type="primary" onClick={() => navigate("/orders/new")}>
          Create new order
        </Button>
      </div>
      <InfoBox infoItems={cards} />
      <br></br>
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
