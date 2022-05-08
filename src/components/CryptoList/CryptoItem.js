import React from "react";
import { Link } from "react-router-dom";
import style from "./CryptoItem.module.css";
import millify from "millify";
const CryptoItem = (props) => {
  const data = props.coin;

  const dailyChange = +data.change;
  let dailyChangeStyle = "black ";
  if (dailyChange > 0) {
    dailyChangeStyle = "rgba(6, 84, 30, 0.766)";
  } else {
    dailyChangeStyle = "rgba(196, 21, 21, 0.906)";
  }
  return (
    <>
      <li className={style.item}>
        <Link className={style.crypto} to={`/cryptocurrency/${data.uuid}`}>
          <div className={style.icon}>
            <h2>
              {data.rank}. {data.name}
            </h2>
            <img src={data.iconUrl} alt={data.name} />
          </div>
          <div className={style.info}>
            <p>
              <span className={style.detailInfo}>Price:</span>{" "}
              {millify(data.price)}
            </p>
            <p>
              <span className={style.detailInfo}>Marker Cap:</span>{" "}
              {millify(data.marketCap)}
            </p>
            <p>
              <span className={style.detailInfo}>Daily Change:</span>{" "}
              <span style={{ color: `${dailyChangeStyle}` }}>
                {millify(data.change)}%
              </span>
            </p>
          </div>
        </Link>
      </li>
    </>
  );
};

export default CryptoItem;
