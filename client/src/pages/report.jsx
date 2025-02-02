import React, { useState, useEffect } from "react";
import { Button, Form, Space, DatePicker, Table, Select } from "antd";
import generatePDF from "../utils/generateReport.js";
import { format } from "date-fns";

const { RangePicker } = DatePicker;
const { Option } = Select;

const batteryLogs = [
  {
    id: "drone1",
    status: "IDLE",
    batteryLevel: "94",
    updatedAt: "2024-01-12 09:08:27",
  },
  {
    id: "drone2",
    status: "IDLE",
    batteryLevel: "20",
    updatedAt: "2024-01-11 10:08:47",
  },
  {
    id: "drone3",
    status: "LOADING",
    batteryLevel: "32",
    updatedAt: "2024-10-11 09:08:36",
  },
  {
    id: "drone4",
    status: "DELIVERED",
    batteryLevel: "45",
    updatedAt: "2024-10-11 09:08:47",
  },
  {
    id: "drone5",
    status: "IDLE",
    batteryLevel: "20",
    updatedAt: "2024-10-11 09:08:38",
  },
  {
    id: "drone6",
    status: "IDLE",
    batteryLevel: "44",
    updatedAt: "2024-10-11 09:08:34",
  },
  {
    id: "drone7",
    status: "LOADING",
    batteryLevel: "98",
    updatedAt: "2024-10-11 09:08:54",
  },
  {
    id: "drone8",
    status: "DELIVERED",
    batteryLevel: "85",
    updatedAt: "2024-10-11 09:08:24",
  },
  {
    id: "drone9",
    status: "IDLE",
    batteryLevel: "35",
    updatedAt: "2024-10-11 09:08:12",
  },
  {
    id: "drone10",
    status: "IDLE",
    batteryLevel: "54",
    updatedAt: "2024-10-11 09:08:34",
  },
  {
    id: "dron11",
    status: "LOADING",
    batteryLevel: "58",
    updatedAt: "2024-10-11 09:08:24",
  },
  {
    id: "drone12",
    status: "DELIVERED",
    batteryLevel: "37",
    updatedAt: "2024-10-11 09:08:28",
  },
  {
    id: "drone13",
    status: "IDLE",
    batteryLevel: "95",
    updatedAt: "2024-10-11 09:08:54",
  },
  {
    id: "drone14",
    status: "IDLE",
    batteryLevel: "60",
    updatedAt: "2024-10-11 09:08:45",
  },
  {
    id: "drone15",
    status: "LOADING",
    batteryLevel: "30",
    updatedAt: "2024-10-11 09:08:39",
  },
  {
    id: "drone16",
    status: "DELIVERED",
    batteryLevel: "90",
    updatedAt: "2024-10-11 09:08:29",
  },
];

const droneStatesColumns = [
  { title: "Drone ID", dataIndex: "id", key: "id" },
  { title: "State", dataIndex: "state", key: "state" },
  {
    title: "Battery Level (%)",
    dataIndex: "batteryLevel",
    key: "batteryLevel",
  },
];

const droneBatteryLogsColumns = [
  { title: "Drone ID", dataIndex: "id", key: "id" },
  {
    title: "Battery Level (%)",
    dataIndex: "batteryLevel",
    key: "batteryLevel",
  },
  { title: "Updated At", dataIndex: "updatedAt", key: "updatedAt" },
];

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const Report = () => {
  const [showTables, setShowTables] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);
  const [droneStates, setDroneStates] = useState([]);

  const [form] = Form.useForm();

  const droneTableColumn = ["Drone ID", "State", "Battery Level (%)"];
  const logTableColumn = ["Drone ID", "Battery Level (%)", "updatedAt"];

  const onGenerateReport = () => {
    setShowTables(true);
  };

  const onClickDownloadPDF = () => {
    let startTime;
    let endTime;
    if (selectedReportType == "droneBatteryLogs") {
      const { range } = form.getFieldsValue();
      if (!range) return;

      // Extract start and end dates
      startTime = range[0].format("YYYY-MM-DD HH:mm:ss");
      endTime = range[1].format("YYYY-MM-DD HH:mm:ss");
      generatePDF(
        logTableColumn,
        batteryLogs.map((drone) => [
          drone.id,
          drone.batteryLevel,
          drone.updatedAt,
        ]),
        `Battery level log for the given specified time period: \n${format(
          new Date(startTime),
          "yyyy-MM-dd HH:mm:ss"
        )} - ${format(new Date(endTime), "yyyy-MM-dd HH:mm:ss")}`,
        selectedReportType
      );
    } else {
      generatePDF(
        droneTableColumn,
        droneStates.map((drone) => [drone.id, drone.state, drone.batteryLevel]),
        `Report generated for Drones. Time: at ${format(
          new Date(),
          "yyyy-MM-dd HH:mm:ss"
        )}`,
        selectedReportType
      );
    }
  };

  const onReportChange = (value) => {
    setSelectedReportType(value);
    setShowTables(false);
  };

  const fetchDrones = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/drones", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get drone data");

      const result = await response.json();
      const formattedOptions = result.data.map((drone) => ({
        id: drone.id,
        state: drone.state,
        batteryLevel: drone.batteryLevel,
      }));
      setDroneStates(formattedOptions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDrones();
  }, []);

  return (
    <Form {...layout} form={form} name="control-hooks">
      <Form.Item
        name="reportType"
        label="Select Report"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onReportChange}
          allowClear
        >
          <Option value="droneStatus">Status of Drones</Option>
          <Option value="droneBatteryLogs">
            Audit table for Drone battery level
          </Option>
        </Select>
      </Form.Item>
      {selectedReportType == "droneBatteryLogs" && (
        <Form.Item
          name="range"
          label="Select Date Time Range:"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <RangePicker showTime />
        </Form.Item>
      )}

      <Form.Item {...tailLayout}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onGenerateReport()}
            disabled={!selectedReportType}
          >
            Generate Report
          </Button>
          {showTables && (
            <Button
              color="cyan"
              variant="outlined"
              onClick={() => onClickDownloadPDF()}
            >
              Download Report as PDF
            </Button>
          )}
        </Space>
      </Form.Item>

      {showTables && selectedReportType == "droneStatus" && (
        <div>
          <h3>Drone Status</h3>
          <Table
            dataSource={droneStates}
            columns={droneStatesColumns}
            rowKey="id"
            pagination={false}
          />
        </div>
      )}
      {showTables && selectedReportType == "droneBatteryLogs" && (
        <div>
          <h3>Battery Logs</h3>
          <Table
            dataSource={batteryLogs}
            columns={droneBatteryLogsColumns}
            rowKey="id"
            pagination={false}
          />
        </div>
      )}
    </Form>
  );
};
export default Report;
