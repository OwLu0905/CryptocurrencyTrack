import React, { useEffect, useState, Component } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../api/cryptoApi";
import HTMLReactParser from "html-react-parser";
import DetailStatistic from "../Detail/DetailStatistic";
import DetailLink from "../Detail/DetailLink";
import style from "./CryptoDetail.module.css";

// import Select from "react-select";
import millify from "millify";
import LineChart from "../Detail/LineChart";
import HomeCard from "../../layout/HomeCard/HomeCard";
import { TiTickOutline, TiTimesOutline } from "react-icons/ti";

const CryptoDetail = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: historyData, isFetching: chartFetcing } =
    useGetCryptoHistoryQuery({
      coinId,
      timePeriod,
    });
  const [cryptoDetailItem, setCryptoDetailItem] = useState([]);

  useEffect(() => {
    setCryptoDetailItem(data?.data?.coin);
  }, [data]);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const timeArray = [];

  for (let i = 0; i < time.length; i++) {
    const arr = { value: time[i], label: time[i] };
    timeArray.push(arr);
  }

  if (isFetching) return <h1>Loading...</h1>;
  const stats = [
    {
      title: "Price to USD",
      value: `${cryptoDetailItem?.price && millify(cryptoDetailItem?.price)}`,
      icon: <TiTickOutline />,
    },
    {
      title: "Rank",
      value: `${cryptoDetailItem?.rank}`,
      icon: <TiTickOutline />,
    },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetailItem?.name ? millify(cryptoDetailItem["24hVolume"]) : ""
      }`,
      icon: <TiTickOutline />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetailItem?.marketCap && millify(cryptoDetailItem?.marketCap)
      }`,
      icon: <TiTickOutline />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetailItem?.allTimeHigh?.price
          ? millify(cryptoDetailItem?.allTimeHigh.price)
          : ""
      }`,
      icon: <TiTickOutline />,
    },
  ];

  const genericStats = [
    {
      title: "Number of Markets",
      value: `${
        cryptoDetailItem?.numberOfMarkets
          ? millify(cryptoDetailItem?.numberOfMarkets)
          : "null"
      }`,
      icon: <TiTickOutline />,
    },
    {
      title: "Number of Exchanges",
      value: `${
        cryptoDetailItem?.numberOfExchanges
          ? millify(cryptoDetailItem?.numberOfExchanges)
          : ""
      }`,
      icon: <TiTickOutline />,
    },
    {
      title: "Approved Supply",
      value: `${cryptoDetailItem?.supply?.confirmed ? "Yes" : "No"}`,

      icon: <TiTickOutline />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetailItem?.supply?.total
          ? millify(cryptoDetailItem?.supply?.total)
          : ""
      }`,
      icon: <TiTickOutline />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetailItem?.supply?.circulating
          ? millify(cryptoDetailItem?.supply?.circulating)
          : ""
      }`,
      icon: <TiTickOutline />,
    },
  ];

  const timePeriodHandler = (e) => {
    setTimePeriod(e.value);
  };

  let description;
  if (cryptoDetailItem?.description) {
    description = HTMLReactParser(cryptoDetailItem?.description);
  }

  return (
    <>
      <HomeCard>
        <div className={style.abstract}>
          <h1>
            <img
              src={cryptoDetailItem?.iconUrl}
              alt={cryptoDetailItem?.symbol}
              width={"50px"}
            />
            {cryptoDetailItem?.name} ({cryptoDetailItem?.symbol}){" "}
          </h1>
          <p>
            {cryptoDetailItem?.name} live price in US dollars. View value
            statistics, market cap and supply.
          </p>
        </div>

        <div className={style.chart}>
          <LineChart
            historyData={historyData}
            name={cryptoDetailItem?.name}
            price={cryptoDetailItem?.price}
            period={timePeriod}
            chartFetcing={chartFetcing}
            timeArray={timeArray}
            timePeriodHandler={timePeriodHandler}
          />
        </div>

        <div className={style["wrap"]}>
          <DetailStatistic
            name={cryptoDetailItem?.name}
            stats={stats}
            other={false}
          />
          <DetailStatistic
            name={cryptoDetailItem?.name}
            stats={genericStats}
            other={true}
          />
        </div>

        <div className={style["wrap"]}>
          <div className={style.description}>
            <h1>What is {cryptoDetailItem?.name}</h1>
            {description}
          </div>

          <div className={style.description}>
            <h1>{cryptoDetailItem?.name} Links</h1>
            <DetailLink links={cryptoDetailItem?.links} />
          </div>
        </div>
      </HomeCard>
    </>
  );
};

export default CryptoDetail;
