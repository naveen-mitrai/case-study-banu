import React from "react";
import { Typography, Row, Col, Card } from "antd";
import ReactApexChart from "react-apexcharts";
const { Title, Paragraph } = Typography;

const BarChart = ({ title, items, xData, yData }) => {
  const stateChart = {
    series: [
      {
        name: "Sales",
        data: yData,
        color: "#008000",
      },
    ],
    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
      },
      toolbar: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: xData,
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            color: "008000",
            // colors: [
            //   "#008000",
            //   "#008000",
            //   "#008000",
            //   "#008000",
            //   "#008000",
            //   "#008000",
            // ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            color: "008000",
            // colors: [
            //   "#008000",
            //   "#008000",
            //   "#008000",
            //   "#008000",
            //   "#008000",
            //   "#008000",
            // ],
          },
        },
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return `${val}${xData.includes("IDLE") ? " Drones" : "%"}`;
          },
        },
      },
    },
  };

  return (
    <Card style={{ background: "#F5F5F5", margin: "10px 0px 0 0" }}>
      <div>
        <div id="chart">
          <ReactApexChart
            series={stateChart.series}
            options={stateChart.options}
            height={220}
            width={"100%"}
            type="bar" // area,bar
          />
        </div>
        <div className="chart-vistior">
          <Title level={5} style={{ alignItems: "center" }}>
            {title}
          </Title>
          <Paragraph className="lastweek">
            We have created multiple options for you to put together and
            customise into pixel perfect pages.
          </Paragraph>
          <Row style={{ justifyContent: "space-around" }}>
            {items.map(({ title, user }, index) => (
              <Col xs={6} key={index}>
                <div className="chart-visitor-count">
                  <Title level={4}>{title}</Title>
                  <span>{user}</span>
                </div>
              </Col>
            ))}
          </Row>

          {/* <ReactApexChart
          options={eChart.options}
          series={eChart.series[0].data}
          type="pie"
          height={"40%"}
        /> */}
        </div>
      </div>
    </Card>
  );
};

export default BarChart;
