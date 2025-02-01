import React from "react";
import { Button, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";

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
          ]}
        >
          <Input placeholder="Enter in grams" type="Number" />
        </Form.Item>
        <Form.Item
          name="batteryCapacity"
          label="Battery Capacity"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter in W" type="Number" />
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
