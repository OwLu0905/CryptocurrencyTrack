import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptosQuery,
} from "../../api/cryptoApi";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import DetailStatistic from "../Detail/DetailStatistic";
import style from "./CryptoDetail.module.css";
import DetailLink from "../Detail/DetailLink";
const CryptoDetail = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: historyData } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const [cryptoDetailItem, setCryptoDetailItem] = useState([]);
  console.log(historyData);
  useEffect(() => {
    setCryptoDetailItem(data?.data?.coin);
  }, [data]);
  if (isFetching) return <h1>Loading...</h1>;
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `${cryptoDetailItem?.price && millify(cryptoDetailItem?.price)}`,
      icon: "icon",
    },
    {
      title: "Rank",
      value: `${cryptoDetailItem?.rank}`,
      icon: "icon",
    },
    {
      title: "24h Volume",
      value: `${
        cryptoDetailItem?.name ? millify(cryptoDetailItem["24hVolume"]) : ""
      }`,
      icon: "icon",
    },
    {
      title: "Market Cap",
      value: `${
        cryptoDetailItem?.marketCap && millify(cryptoDetailItem?.marketCap)
      }`,
      icon: "icon",
    },
    {
      title: "All-time-high(daily avg.)",
      value: `${
        cryptoDetailItem?.allTimeHigh?.price
          ? millify(cryptoDetailItem?.allTimeHigh.price)
          : ""
      }`,
      icon: "icon",
    },
  ];

  const genericStats = [
    {
      title: "Number of Markets",
      value: `${cryptoDetailItem?.numberOfMarkets}`,
      icon: "icon",
    },
    {
      title: "Number of Exchanges",
      value: `${cryptoDetailItem?.numberOfExchanges}`,
      icon: "icon",
    },
    {
      title: "Approved Supply",
      value: `${cryptoDetailItem?.supply?.confirmed ? "yes" : "no"}`,
      icon: "icon",
    },
    {
      title: "Total Supply",
      value: `${cryptoDetailItem?.supply?.total}`,
      icon: "icon",
    },
    {
      title: "Circulating Supply",
      value: `${cryptoDetailItem?.supply?.circulating}`,
      icon: "icon",
    },
  ];

  const timePeriodHandler = (e) => {
    setTimePeriod(e.target.value);
  };

  let description;
  if (cryptoDetailItem?.description) {
    description = HTMLReactParser(cryptoDetailItem?.description);
  }
  return (
    <div>
      {/* <p>{JSON.stringify(cryptoDetailItem)}</p> */}
      <div>
        <div>
          <h1>
            {cryptoDetailItem?.name} ({cryptoDetailItem?.symbol})
          </h1>
        </div>
        <p>
          {cryptoDetailItem?.name} live price in US dollars. View value
          statistics, market cap and supply.
        </p>
      </div>
      <select onChange={timePeriodHandler}>
        {time.map((time) => (
          <option key={time}>{time}</option>
        ))}
      </select>
      <div className={style["wrap-stats"]}>
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
      <div>
        <h1>What is {cryptoDetailItem?.name}</h1>
        {description}
      </div>
      <div>
        <h1>{cryptoDetailItem?.name} Link</h1>
        <DetailLink links={cryptoDetailItem?.links} />
      </div>
    </div>
  );
};

export default CryptoDetail;
