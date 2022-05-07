import React, { cloneElement, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import millify from "millify";
Chart.register(...registerables);
const LineChart = ({ historyData, period, name, price, chartFetcing }) => {
  const change = historyData?.data.change;

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = historyData?.data?.history?.length - 1; i > 0; i -= 1) {
    coinPrice.push(historyData.data.history[i].price);
    coinTimestamp.push(
      new Date(
        historyData.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }
  let fixedPrice;
  if (typeof price === "string") {
    fixedPrice = millify(price);
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const option = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${period} Price`,
      },
      //   maintainAspectRatio: false,
    },
  };

  if (chartFetcing) {
    return (
      <div>
        <h1>Price Chart: </h1>
        <h1>loading...</h1>;
      </div>
    );
  }
  return (
    <div>
      <h1>Price Chart: </h1>
      <p>Change: {change}%</p>
      <p>
        Current {name} Price: ${fixedPrice}
      </p>
      <Line data={data} options={option} height={"80%"} />
    </div>
  );
};

export default LineChart;
