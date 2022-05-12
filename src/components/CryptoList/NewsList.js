import React, { useState, useEffect } from "react";
import { useGetCryptosQuery } from "../../api/cryptoApi";
import { useGetCryptoNewsQuery } from "../../api/cryptoNewsApi";
import Loading from "../../layout/Load/Loading";
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
  const [selectNews, setSelectNews] = useState("Crypto News");
  const [newsValue, setNewsValue] = useState([]);
  const [selectValue, setSelectValue] = useState([]);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    setSelectNews(e.target.value);
  };

  useEffect(() => {
    setNewsValue(data?.value);
    setSelectValue(cryptoData?.data?.coins);
  }, [data, cryptoData]);

  if (isFetching || !data?.value)
    return (
      <>
        <Loading />
      </>
    );

  // const searchList = ["Bitcoin", "ETH", "SOL"];
  return (
    <>
      {props.more && (
        <div className={style.news}>
          <label htmlFor="coins">Get News :</label>
          <select className={style.select} id="coins" onChange={searchHandler}>
            <option>{selectNews}</option>
            {selectValue?.map((item) => (
              <option key={item.uuid}>{item.name}</option>
            ))}
          </select>
        </div>
      )}
      <ul className={style.list}>
        {newsValue?.map((news) => (
          <NewsItem key={news.name} news={news} defaultImg={demoImage} />
        ))}
      </ul>
    </>
  );
};
export default NewsList;
