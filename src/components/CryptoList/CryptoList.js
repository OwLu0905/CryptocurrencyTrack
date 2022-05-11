import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../../api/cryptoApi";
import HomeCard from "../../layout/HomeCard/HomeCard";
import CryptoItem from "./CryptoItem";
import style from "./CryptoList.module.css";
import CryptoTable from "./CryptoTable";
import Search from "./Search";

const CryptoList = (props) => {
  const count = !props.more ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [coinsValue, setCoinsValue] = useState([]);
  const [enteredValue, setEnteredValue] = useState("");

  useEffect(() => {
    setCoinsValue(data?.data?.coins);
    const filteredData = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(enteredValue.toLowerCase())
    );
    setCoinsValue(filteredData);
  }, [enteredValue, data]);

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  if (isFetching) return <h1>Loading...</h1>;

  return (
    <>
      {props.more && <Search onSearch={inputChangeHandler} />}
      <ul className={style.list}>
        <li className={style.item}>
          <div className={style.crypto}>
            <div className={style.icon}>
              <p>Name</p>
            </div>
            <p className={style.info}>Price</p>
            <p className={style.info}>Marker Cap</p>
            <p className={style.info}>Daily Change</p>
          </div>
        </li>
        {/* <tbody>
          <tr className={style.heads}>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Marker Cap</th>
            <th scope="col">Daily Change</th>
          </tr> */}
        {/* <CryptoTable key={coin.uuid} coin={coin} /> */}
        {coinsValue?.map((coin) => (
          <CryptoItem key={coin.uuid} coin={coin} />
        ))}
        {/* </tbody> */}
      </ul>
    </>
  );
};

export default CryptoList;
