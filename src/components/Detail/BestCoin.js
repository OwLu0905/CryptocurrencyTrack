import React from "react";
import style from "./BestCoin.module.css";
const BestCoin = ({ coin }) => {
  return (
    <>
      <li className={style.globalPara}>
        <div className={style.info}>
          <img src={coin.iconUrl} alt={coin.name} width={"30px"} />
          {/* <p>{`${coin.name.substring(0, 15)}...`}</p> */}
          <p>{coin.name}</p>
          <p>({coin.symbol})</p>
        </div>
        <a
          href={coin.coinrankingUrl}
          alt="newest best"
          target="_blank"
          rel="noreferrer"
        >
          more
        </a>
      </li>
    </>
  );
};

export default BestCoin;
