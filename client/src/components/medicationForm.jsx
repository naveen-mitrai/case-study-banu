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

const MedicationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  };

  const saveMedication = async () => {
    try {
      const data = form.getFieldsValue();
      const response = await fetch("http://localhost:5000/api/medications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send JSON data
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create medication data");

      const result = await response.json();
      console.log("Response:", result);
      navigate("/medications");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <h1>Create Medication</h1>
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
          name="medicationCode"
          label="Medication Code"
          rules={[
            {
              required: true,
            },
            { len: 8, message: "Medication code must be exactly 8 characters" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="weightInGrams"
          label="Weight"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter in grams" type="Number" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                saveMedication();
              }}
            >
              Submit
            </Button>
            <Button htmlType="button" onClick={() => navigate("/medications")}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default MedicationForm;
