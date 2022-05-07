import React, { useState, useEffect, useRef } from "react";
import { useGetCryptosQuery } from "../../api/cryptoApi";
import { useGetCryptoNewsQuery } from "../../api/cryptoNewsApi";
import NewsItem from "./NewsItem";
import style from "./NewsList.module.css";

const demoImage =
  "https://coinrevolution.com/wp-content/uploads/2022/05/SEC-to-Protect-Crypto-investors.jpg";
const NewsList = (props) => {
  const [searchValue, setSearchValue] = useState("cryptocurrency");
  const count = !props.more ? 10 : 30;
  const { data, isFetching } = useGetCryptoNewsQuery({
    // newsCategory: "Cryptocurrency",
    newsCategory: searchValue,
    count: count,
  });

  /**
   * TODO select option要用state儲存，不然每次跳轉頁面都會回到default type
   */
  const { data: cryptoData } = useGetCryptosQuery(count);

  const [newsValue, setNewsValue] = useState([]);
  const [selectValue, setSelectValue] = useState([]);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setNewsValue(data?.value);
    setSelectValue(cryptoData?.data?.coins);
  }, [data, cryptoData]);

  if (!data?.value) return <h1>Loading ...</h1>;
  // const searchList = ["Bitcoin", "ETH", "SOL"];
  return (
    <>
      {/* {searchList.map((item) => (
        <input key={item} type="button" value={item} onClick={searchHandler} />
       
      ))} */}
      <div className={style.news}>
        <label htmlFor="coins">Get News :</label>
        <select
          className={style.select}
          placeholder="Select a Crypto"
          id="coins"
          onChange={searchHandler}
        >
          <option>Crypto News</option>
          {selectValue?.map((item) => (
            <option key={item.uuid}>{item.name}</option>
          ))}
        </select>
      </div>
      <ul className={style.list}>
        {newsValue?.map((news) => (
          <NewsItem key={news.name} news={news} defaultImg={demoImage} />
        ))}
      </ul>
    </>
  );
};
export default NewsList;
