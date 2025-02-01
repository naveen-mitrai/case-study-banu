import React, { useState, useEffect } from "react";
import { Select, Space, Button, Form, Alert } from "antd";
import { Card, Row, Col, Typography } from "antd";
import DeliveryService from "../services/delivery.service.js";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const OrderForm = () => {
  const [allMedications, setMedications] = useState();
  const [allDrones, setDrones] = useState();
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [totalWeight, setWeight] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (value) => {
    let currentWeight;
    if (value.length > selectedMedications.length) {
      const newItem = allMedications.find(
        (option) => option.value === value[value.length - 1]
      );
      if (newItem) {
        currentWeight = newItem.weight + totalWeight;
      }
    } else {
      const removedOption = selectedMedications.find(
        (option) => !value.includes(option)
      );
      const removedItem = allMedications.find(
        (option) => option.value === removedOption
      );
      if (removedItem) {
        currentWeight = totalWeight - removedItem.weight;
      }
    }
    setWeight(currentWeight);
    setSelectedMedications(value);
    validateDrones(currentWeight);
  };

  const validateDrones = (totalWeight) => {
    let dronesAvailable = DeliveryService.validateDrones(
      allDrones,
      totalWeight
    );
    dronesAvailable = dronesAvailable.filter((drone) => drone.state == "IDLE");
    if (dronesAvailable.length == 0) {
      setAlertVisible(true);
      setAlertMessage("Drones are busy");
    } else {
      setAlertVisible(false);
      setAlertMessage("");
    }
  };

  const fetchMedications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/medications", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get medication data");

      const result = await response.json();
      const formattedOptions = result.data.map((medication) => ({
        value: medication.medicationCode, // Unique key
        label: medication.name, // Display name
        weight: medication.weightInGrams,
      }));
      setMedications(formattedOptions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDrones = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/drones", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get drone data");

      const result = await response.json();
      const formattedOptions = result.data.map((drone) => ({
        value: drone._id, // Unique key
        label: `Drone ${drone._id}`, // Display name
        weightLimit: drone.weightLimitInGrams,
        batteryCapacity: drone.batteryCapacity,
        state: drone.state,
      }));
      setDrones(formattedOptions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMedications();
    fetchDrones();
  }, []);

  return (
    <React.Fragment>
      <h1>Create Order</h1>
      <Form>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Form.Item
            name="batteryCapacity"
            label="Select Medicine"
            rules={[
              {
                required: true,
                message: "Atleast one medication should be selected.",
              },
            ]}
            style={{
              width: "100%",
            }}
          >
            <Select
              mode="tags"
              style={{
                width: "50%",
              }}
              onChange={handleChange}
              tokenSeparators={[","]}
              placeholder="Select Medicine..."
              options={allMedications}
            />
          </Form.Item>
          {selectedMedications.length > 0 && (
            <Card
              bordered={false}
              className="criclebox"
              style={{ backgroundColor: "#D3D3D3", width: "100%" }}
            >
              <div className="number">
                <Title level={3}>My Basket</Title>
                {selectedMedications.map((medication) => {
                  const med = allMedications.find(
                    (med) => med.value == medication
                  );
                  return (
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>{med.label}</span>
                      </Col>
                      <Col xs={6}>
                        <span>{med.weight} grams</span>
                      </Col>
                    </Row>
                  );
                })}
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <b>Total Weight</b>
                  </Col>
                  <Col xs={6}>
                    <b>{totalWeight} grams</b>
                  </Col>
                </Row>
              </div>
            </Card>
          )}
        </div>
        {alertVisible && <Alert type="error" message={alertMessage} />}
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                // saveDrone();
              }}
            >
              Place Order
            </Button>
            <Button htmlType="button" onClick={() => navigate("/orders")}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default OrderForm;
