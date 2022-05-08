import React from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery, useGetCryptoStateQuery } from "../api/cryptoApi";
import CryptoList from "../components/CryptoList/CryptoList";
import HomeCard from "../layout/HomeCard/HomeCard";
import style from "./Home.module.css";
import millify from "millify";
import NewsList from "../components/CryptoList/NewsList";
import BestCoin from "../components/Detail/BestCoin";
const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  const { data: stats } = useGetCryptoStateQuery();
  console.log(stats);
  if (isFetching) return <h1>Loading...</h1>;
  return (
    <>
      <HomeCard>
        <div className={style.global}>
          <h1>Global Stats</h1>
        </div>
        <section className={style["section-row"]}>
          <ul className={style.globalInfo}>
            <h2>Total Stats</h2>
            <li className={style.globalPara} key="total">
              <h3>Total Cryptocurrencies: </h3>
              <p> {millify(globalStats.total)}</p>
            </li>
            <li className={style.globalPara} key="exchanges">
              <h3>Total Exchanges: </h3>
              <p> {millify(globalStats.totalExchanges)}</p>
            </li>
            <li className={style.globalPara} key="marketcap">
              <h3>Total Market Cap: </h3>
              <p> {millify(globalStats.totalMarketCap)}</p>
            </li>
            <li className={style.globalPara} key="24hvolume">
              <h3>Total 24h Volume: </h3>
              <p> {millify(globalStats.total24hVolume)}</p>
            </li>
            <li className={style.globalPara} key="markets">
              <h3>Total Market: </h3>
              <p> {millify(globalStats.totalMarkets)}</p>
            </li>
          </ul>

          <ul className={style.globalInfo}>
            <h2>Best Coins</h2>
            {stats?.data?.bestCoins.map((coin) => (
              <BestCoin coin={coin} key={coin.uuid} />
            ))}
          </ul>
        </section>
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
        <NewsList more={false} />
      </HomeCard>
    </>
  );
};

export default Home;
