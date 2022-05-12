import React from "react";
import { Link } from "react-router-dom";
import style from "./CryptoItem.module.css";
import millify from "millify";
import { sendFavData } from "../../api/facAction";
import { useDispatch, useSelector } from "react-redux";
import { favActions } from "../../api/favSlice";
const CryptoItem = (props) => {
  const data = props.coin;
  const dispatch = useDispatch();
  const dailyChange = +data.change;
  let dailyChangeStyle = "black ";
  if (dailyChange > 0) {
    dailyChangeStyle = "rgba(6, 84, 30, 0.766)";
  } else {
    dailyChangeStyle = "rgba(196, 21, 21, 0.906)";
  }

  const favHandler = () => {
    dispatch(favActions.addFavItem({ uuid: data.uuid }));
  };

  return (
    <li className={style.item} onClick={favHandler}>
      <Link className={style.crypto} to={`/cryptocurrency/${data.uuid}`}>
        <div className={style.icon}>
          <span style={{ width: "2rem", margin: "0rem 2rem" }}>
            {data.rank}.
          </span>{" "}
          <img src={data.iconUrl} alt={data.name} /> {data.name}
        </div>
        <p className={style.info}>{millify(data.price)}</p>
        <p className={style.info}>{millify(data.marketCap)}</p>
        <p className={style.info}>
          <span
            style={{
              color: `${dailyChangeStyle}`,
              width: "6rem",
              textAlign: "center",
            }}
          >
            {millify(data.change)}%
          </span>
        </p>
      </Link>
    </li>
  );
};

export default CryptoItem;
