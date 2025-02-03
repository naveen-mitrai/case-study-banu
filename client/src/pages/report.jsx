import React, { useState, useEffect } from "react";
import { Button, Form, Space, DatePicker, Table, Select } from "antd";
import generatePDF from "../utils/generateReport.js";
import { format } from "date-fns";

const { RangePicker } = DatePicker;
const { Option } = Select;

const droneStatesColumns = [
  { title: "Drone ID", dataIndex: "id", key: "id" },
  { title: "State", dataIndex: "state", key: "state" },
  {
    title: "Battery Level (%)",
    dataIndex: "batteryLevel",
    key: "batteryLevel",
    sorter: (a, b) => a.batteryLevel - b.batteryLevel,
  },
];

const droneBatteryLogsColumns = [
  { title: "Drone ID", dataIndex: "droneID", key: "droneID" },
  {
    title: "Battery Level (%)",
    dataIndex: "batteryLevel",
    key: "batteryLevel",
    sorter: (a, b) => a.batteryLevel - b.batteryLevel,
  },
  {
    title: "Updated At",
    dataIndex: "createdAt",
    key: "createdAt",

    sorter: (a, b) =>
      new Date(a.createdAt.replace(" at ", "T")) -
      new Date(b.createdAt.replace(" at ", "T")),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
  },
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
  const [auditLogs, setAuditLogs] = useState([]);

  const [form] = Form.useForm();

  const droneTableColumn = ["Drone ID", "State", "Battery Level (%)"];
  const logTableColumn = ["Drone ID", "Battery Level (%)", "updatedAt"];

  const onGenerateReport = () => {
    setShowTables(true);
    if (selectedReportType === "droneBatteryLogs") {
      const { range } = form.getFieldsValue();
      const filtered = auditLogs.filter(
        (elem) =>
          new Date(elem.createdAt.replace(" at ", " ")) >= new Date(range[0]) &&
          new Date(elem.createdAt.replace(" at ", " ")) <= new Date(range[1])
      );
      setAuditLogs(filtered);
    }
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
        auditLogs.map((log) => [log.droneID, log.batteryLevel]),
        `Battery level log for the given specified time period: \nFrom ${format(
          new Date(startTime),
          "yyyy-MM-dd 'at' HH:mm:ss"
        )} To ${format(new Date(endTime), "yyyy-MM-dd 'at' HH:mm:ss")}`,
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

  const fetchAuditLogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logs", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get audit logs");

      const result = await response.json();
      const formattedOptions = result.data.map((log) => ({
        droneID: log.droneID,
        batteryLevel: log.batteryLevel,
        createdAt: `${format(
          new Date(log.createdAt),
          "yyyy-MM-dd 'at' HH:mm:ss"
        )}`,
      }));
      setAuditLogs(formattedOptions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDrones();
    fetchAuditLogs();
  }, []);

  return (
    <div>
      <h1>Generate Reports</h1>
      <Form {...layout} form={form} name="control-hooks">
        <Form.Item
          name="reportType"
          label="Select Type of Report"
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
            style={{ width: "50%" }}
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
              dataSource={auditLogs}
              columns={droneBatteryLogsColumns}
              rowKey="id"
              pagination={false}
            />
          </div>
        )}
      </Form>
    </div>
  );
};
export default Report;
