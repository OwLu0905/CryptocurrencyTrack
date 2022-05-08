import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../../api/cryptoApi";
import HomeCard from "../../layout/HomeCard/HomeCard";
import CryptoItem from "./CryptoItem";
import style from "./CryptoList.module.css";
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
        {coinsValue?.map((coin) => (
          <CryptoItem key={coin.uuid} coin={coin} />
        ))}
      </ul>
    </>
  );
};

export default CryptoList;
