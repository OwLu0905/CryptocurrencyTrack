import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useGetCryptosQuery } from "../../api/cryptoApi";

import CryptoItem from "./CryptoItem";
import style from "./CryptoList.module.css";
import Search from "./Search";
import { Chart, registerables } from "chart.js";
import Select from "react-select";
import { BiSortAlt2 } from "react-icons/bi";
import Loading from "../../layout/Load/Loading";
Chart.register(...registerables);

const CryptoList = (props) => {
  const count = !props.more ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [coinsValue, setCoinsValue] = useState(data?.data?.coins);
  const [enteredValue, setEnteredValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [sortStyle, setSortStyle] = useState({
    rank: false,
    name: false,
    price: false,
    marketCap: false,
    change: false,
  });
  const [isPending, startTransition] = useTransition();
  const [isSorting, startSortingTransition] = useTransition();

  const sortListHandler = useCallback(
    (sortData) => {
      if (sortValue === "name") {
        sortData?.sort((a, b) => {
          return a[sortValue].localeCompare(b[sortValue]);
        });
      } else {
        sortData?.sort((a, b) => {
          return +b[sortValue] - +a[sortValue];
        });
      }
    },
    [sortValue]
  );

  const sortArray = [
    { value: "rank", label: "Rank" },
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
    { value: "marketCap", label: "MarketCap" },
    { value: "change", label: "Change" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredData = data?.data?.coins.filter((coin) =>
        coin.name.toLowerCase().includes(enteredValue.toLowerCase())
      );

      startSortingTransition(() => {
        // ! sort is in-place operator
        sortListHandler(filteredData);
        setCoinsValue((prev) => filteredData);
      });
      // console.log("render in use effect");
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, [enteredValue, data, sortListHandler]);

  // TODO Search items
  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  // TODO : sort by asc or des
  const sortAscDesHandler = () => {
    startTransition(() => {
      const Items = [...coinsValue].reverse();
      setCoinsValue(Items);
    });
  };

  // TODO : set the select sort condition
  const sortStateHandler = (e) => {
    setSortValue(e.value);
    switch (e.value) {
      case "rank":
        setSortStyle({
          rank: true,
          name: false,
          price: false,
          marketCap: false,
          change: false,
        });
        break;
      case "name":
        setSortStyle({
          rank: false,
          name: true,
          price: false,
          marketCap: false,
          change: false,
        });
        break;
      case "price":
        setSortStyle({
          rank: false,
          name: false,
          price: true,
          marketCap: false,
          change: false,
        });
        break;
      case "marketCap":
        setSortStyle({
          rank: false,
          name: false,
          price: false,
          marketCap: true,
          change: false,
        });
        break;
      case "change":
        setSortStyle({
          rank: false,
          name: false,
          price: false,
          marketCap: false,
          change: true,
        });
        break;

      default:
        setSortStyle({
          rank: false,
          name: false,
          price: false,
          marketCap: false,
          change: false,
        });
    }
  };

  if (isFetching)
    return (
      <>
        <Loading />
      </>
    );
  return (
    <>
      {props.more && (
        <div className={style["ss-gb"]}>
          <Search onSearch={inputChangeHandler} />
          <Select
            options={sortArray}
            onChange={sortStateHandler}
            defaultValue={sortArray[0]}
            className={style.select}
          />
        </div>
      )}

      <ul className={style.list}>
        <li className={style.item}>
          <div className={style.crypto}>
            <div className={style.icon}>
              {sortStyle.rank ? (
                <p
                  className={`${style.info} ${style.sort}`}
                  onClick={sortAscDesHandler}
                >
                  Rank
                  <BiSortAlt2 size={20} />
                </p>
              ) : (
                <p className={style.info}>Rank</p>
              )}

              {sortStyle.name ? (
                <p
                  className={`${style.info} ${style.sort}`}
                  onClick={sortAscDesHandler}
                >
                  Name
                  <BiSortAlt2 size={20} />
                </p>
              ) : (
                <p className={style.info}>Name</p>
              )}
            </div>

            {sortStyle.price ? (
              <p
                className={`${style.info} ${style.sort}`}
                onClick={sortAscDesHandler}
              >
                Price
                <BiSortAlt2 size={20} />
              </p>
            ) : (
              <p className={style.info}>Price</p>
            )}

            {sortStyle.marketCap ? (
              <p
                className={`${style.info} ${style.sort}`}
                onClick={sortAscDesHandler}
              >
                Marker Cap
                <BiSortAlt2 size={20} />
              </p>
            ) : (
              <p className={style.info}>Marker Cap</p>
            )}
            {sortStyle.change ? (
              <p
                className={`${style.info} ${style.sort}`}
                onClick={sortAscDesHandler}
              >
                Daily Change
                <BiSortAlt2 size={20} />
              </p>
            ) : (
              <p className={style.info}>Daily Change</p>
            )}
          </div>
        </li>
        {coinsValue?.map((coin) => (
          <CryptoItem key={coin.uuid} coin={coin} />
        ))}
      </ul>
    </>
  );
};

export default CryptoList;
