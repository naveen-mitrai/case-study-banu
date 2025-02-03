import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Drones = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "15%",
    },
    {
      title: "Model",
      dataIndex: "model",
      width: "15%",
    },
    {
      title: "Weight Limit (g)",
      dataIndex: "weightLimitInGrams",
      sorter: true,
      width: "15%",
    },
    {
      title: "Battery Capacity (mAh)",
      dataIndex: "batteryCapacity",
      width: "15%",
    },
    {
      title: "Battery Level (%)",
      dataIndex: "batteryLevel",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "state",
      width: "15%",
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => {
        if (record.state == "DELIVERED" || record.state == "RETURNING") {
          const statusToBeChanged =
            record.state == "DELIVERED" ? "RETURNING" : "IDLE";
          return (
            <Button
              variant="outlined"
              color={statusToBeChanged == "RETURNING" ? "primary" : "cyan"}
              onClick={() => {
                updateStatusChange(record.id, statusToBeChanged);
              }}
            >{`Mark As ${statusToBeChanged}`}</Button>
          );
        }
      },
    },
  ];

  const updateStatusChange = async (droneID, statusToBeChanged) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/drones/${droneID}`,
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

      if (!response.ok) throw new Error("Failed to update drone data");

      const result = await response.json();
      console.log("Response:", result);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/drones", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get drone data");

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Drones</h1>
        <Button type="primary" onClick={() => navigate("/drones/new")}>
          Add Drone
        </Button>
      </div>
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

export default Drones;
