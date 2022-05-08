import React, { cloneElement, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import millify from "millify";
import Select from "react-select";
import style from "./LineChart.module.css";
Chart.register(...registerables);

// options={timeArray}
// onChange={timePeriodHandler}
// defaultValue={timeArray[1]}
const LineChart = ({
  historyData,
  period,
  name,
  price,
  chartFetcing,
  timeArray,
  timePeriodHandler,
}) => {
  const change = historyData?.data.change ? historyData?.data.change : false;
  const chnageInfo = change ? `${change}%` : "No Information";

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
        // backgroundColor: "rgba(75,192,192,0.2)",
        // borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75, 192, 151, 0.2)",
        borderColor: "rgba(75, 192, 141, 1)",
      },
    ],
  };

  const timeDetail = {
    "3h": "3 hours",
    "24h": "24 hours",
    "7d": "7 days",
    "30d": "30 days",
    "1y": "1 year",
    "3m": "3 months",
    "3y": "3 years",
    "5y": "5 years",
  };
  const option = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${timeDetail[period]} Price`,
        font: {
          size: 22,
        },
      },
    },
    scales: {
      yAxes: {
        barPercentage: 1.6,
        grid: {
          //   display: false,
          //   zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 125000,
          padding: 2,
          backdropPadding: 2,
          backdropColor: "rgba(255,255,255,1)",
          font: {
            // family: "Montserrat", // Add your font here to change the font of your y axis
            size: 14,
          },
          major: {
            enable: true,
          },
        },
      },
      xAxes: {
        barPercentage: 1.6,
        grid: {
          //   display: false,
          //   zeroLineColor: "transparent",
        },
        ticks: {
          //   padding: 20,
          font: {
            // family: "Montserrat", // Add your font here to change the font of your x axis
            size: 14,
          },

          major: {
            // enable: true,
          },
        },
      },
    },
  };

  if (chartFetcing) {
    return (
      <div>
        <h1>{name} Price Chart: </h1>
        <h1>loading...</h1>;
      </div>
    );
  }

  let changeStyle;
  if (!change) {
    changeStyle = "gray";
  } else {
    if (change > 0) {
      changeStyle = "green";
    } else {
      changeStyle = "red";
    }
  }
  //   let changeStyle = change > 0 ? "green" : "red";

  return (
    <>
      <div className={style.nameInfo}>
        <h1>{name} Price Chart: </h1>
        <div className={style.change}>
          <div className={style["change-info"]}>
            <p className={style["change-rate"]}>
              {timeDetail[period]} Change:{" "}
              <span style={{ color: `${changeStyle}` }}>{chnageInfo}</span>
            </p>
            <p className={style["change-price"]}>
              Current {name} Price: $ {fixedPrice}
            </p>
          </div>
          <Select
            options={timeArray}
            onChange={timePeriodHandler}
            defaultValue={timeArray[1]}
            className={style.select}
          />
        </div>
      </div>
      <div className={style.chart}>
        <Line data={data} options={option} height={"80%"} />
      </div>
    </>
  );
};

export default LineChart;
