import React from "react";
import { Link } from "react-router-dom";
import style from "./CryptoItem.module.css";
import millify from "millify";
const CryptoItem = (props) => {
  const data = props.coin;

  const dailyChange = +data.change;
  let dailyChangeStyle = "black ";
  if (dailyChange > 0) {
    dailyChangeStyle = "green";
  } else {
    dailyChangeStyle = "red";
  }
  return (
    <>
      <li className={style.item}>
        <Link className={style.crypto} to={`/cryptocurrency/${data.uuid}`}>
          <div className={style.icon}>
            <h2>{data.name}</h2>
            <img src={data.iconUrl} alt={data.name} />
          </div>
          <div className={style.info}>
            <p>Price: {millify(data.price)}</p>
            <p>Marker Cap: {millify(data.marketCap)}</p>
            <p style={{ color: `${dailyChangeStyle}` }}>
              Daily Change: {millify(data.change)}%
            </p>
          </div>
        </Link>
      </li>
    </>
  );
};

export default CryptoItem;
