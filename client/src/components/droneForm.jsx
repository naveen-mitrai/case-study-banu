import React from "react";
import { Button, Form, Input, InputNumber, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/droneForm.css";

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

const DroneForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  };

  const saveDrone = async () => {
    try {
      const data = form.getFieldsValue();
      const response = await fetch("http://localhost:5000/api/drones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send JSON data
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create drone data");

      const result = await response.json();
      console.log("Response:", result);
      navigate("/drones");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <h1>Create Drone</h1>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="model"
          label="Model"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="weightLimitInGrams"
          label="Weight Limit"
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              max: 1000,
              message: "Weight Limit should be less than 1000",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter in grams"
            type="Number"
            className="drone-input"
          />
        </Form.Item>
        <Form.Item
          name="batteryCapacity"
          label="Battery Capacity"
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              min: 2000,
              max: 10000,
              message: "Battery Capacity must be between 2,000 and 10,000",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter in mAh"
            type="Number"
            className="drone-input"
          />
        </Form.Item>
        <Form.Item
          name="batteryLevel"
          label="Battery Level"
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              min: 0,
              max: 100,
              message: "Battery level must be between 0 and 100",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter current battery level in %"
            type="Number"
            className="drone-input"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                saveDrone();
              }}
            >
              Submit
            </Button>
            <Button htmlType="button" onClick={() => navigate("/drones")}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default DroneForm;
