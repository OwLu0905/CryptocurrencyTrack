import React, { useState, useEffect, useRef } from "react";
import { useGetCryptoNewsQuery } from "../../api/cryptoNewsApi";
import NewsItem from "./NewsItem";
import style from "./NewsList.module.css";

const demoImage =
  "https://coinrevolution.com/wp-content/uploads/2022/05/SEC-to-Protect-Crypto-investors.jpg";
const NewsList = (props) => {
  const [searchValue, setSearchValue] = useState("cryptocurrency");
  const { data, isFetching } = useGetCryptoNewsQuery({
    // newsCategory: "Cryptocurrency",
    newsCategory: searchValue,
    count: !props.more ? 10 : 30,
  });
  const [newsValue, setNewsValue] = useState([]);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setNewsValue(data?.value);
  }, [data]);

  if (!data?.value) return <h1>Loading ...</h1>;

  const searchList = ["Bitcoin", "ETH", "SOL"];
  return (
    <>
      {searchList.map((item) => (
        <input key={item} type="button" value={item} onClick={searchHandler} />
      ))}
      <ul className={style.list}>
        {newsValue?.map((news) => (
          <NewsItem key={news.name} news={news} defaultImg={demoImage} />
        ))}
      </ul>
    </>
  );
};
export default NewsList;
