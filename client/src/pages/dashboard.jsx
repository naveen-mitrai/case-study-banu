import React, { useEffect, useState } from "react";
import BarChart from "../components/common/barChart";
import InfoBox from "../components/common/infoBox";

const Dashboard = () => {
  const statuses = ["IDLE", "LOADING", "DELIVERING", "DELIVERED", "RETURNING"];

  const [droneData, setDroneData] = useState([]);
  const [medicationData, setMedicationData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const items = [
    {
      title: droneData.length,
      user: "Total No of Drones",
    },
    {
      title: droneData.filter(
        (drone) => drone.batteryLevel > 25 && drone.state == "IDLE"
      ).length,
      user: "No of Available Drones",
    },
  ];
  const infoItems = [
    {
      today: "Total Drones",
      title: droneData.length,
      //   persent: "+30%",
      //   icon: heart,
      bnb: "bnb2",
    },
    {
      today: "Total Medications",
      title: medicationData.length,
      //   persent: "+20%",
      //   icon: heart,
      bnb: "bnb2",
    },
    {
      today: "Orders In Progress",
      title: orderData.filter((ord) => ord.state != "DELIVERED").length,
      //   persent: "-20%",
      //   icon: heart,
      bnb: "redtext",
    },
    {
      today: "Available Drones",
      title: droneData.filter(
        (drone) => drone.batteryLevel > 25 && drone.state == "IDLE"
      ).length,
      //   persent: "10%",
      //   icon: heart,
      bnb: "bnb2",
    },
  ];
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/drones", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get drone data");

      const result = await response.json();
      console.log("Response:", result.data);
      setDroneData(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchMedicineData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/medications", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get medication data");

      const result = await response.json();
      console.log("Response:", result);
      setMedicationData(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to get order data");

      const result = await response.json();
      console.log("Response:", result);
      setOrderData(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchMedicineData();
    fetchOrderData();
    setLoading(false);
  }, []);

  return (
    <div>
      {/* <header className="App-header"> */}
      <InfoBox infoItems={infoItems} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <BarChart
          title="Battery level of Drones"
          description="Current battery level of each drone is shown in this chart. Battery level is in %. should be less than 100"
          items={items}
          xData={droneData.map((drone) => drone.id)}
          yData={droneData.map((drone) => drone.batteryLevel)}
        />
        <BarChart
          title="State of Drones"
          description="Number of drones in each state is shown in this chart. Each bar show it's number when you hover the bar"
          //   description="Our drones progress through five key lifecycle stages: IDLE, LOADING, DELIVERING, DELIVERED, and RETURNING. This chart offers a real-time snapshot of their current distribution, enabling efficient monitoring and analysis. "
          items={[]}
          xData={statuses}
          yData={statuses.map(
            (status) =>
              droneData.filter((drone) => drone.state === status).length
          )}
        />
      </div>
      {/* <ReportGeneration /> */}

      {/* <InfoBox /> */}
      {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
      {/* </header> */}
    </div>
  );
};

export default Dashboard;
