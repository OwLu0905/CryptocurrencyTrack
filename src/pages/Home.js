import React from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../api/cryptoApi";
import CryptoList from "../components/CryptoList/CryptoList";
import HomeCard from "../layout/HomeCard/HomeCard";
import style from "./Home.module.css";
import millify from "millify";
import NewsList from "../components/CryptoList/NewsList";
const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <h1>Loading...</h1>;
  return (
    <>
      <HomeCard>
        <h1>Global Stats</h1>
        <p>Total Cryptocurrencies: {millify(globalStats.total)}</p>
        <p>Total Exchanges: {millify(globalStats.totalExchanges)}</p>
        <p>Total Market Cap: {millify(globalStats.totalMarketCap)}</p>
        <p>Total 24h Volume: {millify(globalStats.total24hVolume)}</p>
      </HomeCard>
      <HomeCard>
        <div className={style.title}>
          <h1>Top 10 coins</h1>
          <Link to="cryptocurrency">Show More</Link>
        </div>
        <CryptoList more={false} />
      </HomeCard>
      <HomeCard>
        <div className={style.title}>
          <h1>Latest Crypto News</h1>
          <Link to="news">Show More</Link>
        </div>
        {/* <CryptoList more={true} /> */}
        <NewsList more={false} />
      </HomeCard>
    </>
  );
};

export default Home;
