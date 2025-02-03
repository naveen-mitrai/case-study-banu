import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "20%",
  },
  {
    title: "Medication Code",
    dataIndex: "medicationCode",
    width: "20%",
  },
  {
    title: "Weight (grams)",
    dataIndex: "weightInGrams",
    sorter: true,
    width: "20%",
  },
];

const Medications = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/medications", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get medication data");

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
        <h1>Medications</h1>
        <Button type="primary" onClick={() => navigate("/medications/new")}>
          Add Medication
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

export default Medications;
