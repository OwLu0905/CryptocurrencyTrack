import React from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { sendFavData } from "../../api/facAction";
import { useDispatch, useSelector } from "react-redux";
import { favActions } from "../../api/favSlice";
import style from "./CryptoTable.module.css";
const CryptoTable = (props) => {
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
    <>
      <tr className={style.table}>
        <th scope="row" className={style.head}>
          {data.rank}.
          <Link className={style.crypto} to={`/cryptocurrency/${data.uuid}`}>
            <img src={data.iconUrl} alt={data.name} width={30} />
            {data.name}
          </Link>
        </th>
        <td className={style.body}> {millify(data.price)}</td>
        <td className={style.body}> {millify(data.marketCap)}</td>
        <td className={style.body}>
          <span style={{ color: `${dailyChangeStyle}` }}>
            {millify(data.change)}%
          </span>
        </td>
      </tr>
    </>
  );
};

export default CryptoTable;
