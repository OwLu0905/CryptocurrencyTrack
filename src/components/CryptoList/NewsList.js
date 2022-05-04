import React, { useState, useEffect } from "react";
import { useGetCryptoNewsQuery } from "../../api/cryptoNewsApi";
import NewsItem from "./NewsItem";

const NewsList = (props) => {
  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: !props.more ? 10 : 30,
  });
  const [newsValue, setNewsValue] = useState([]);

  useEffect(() => {
    setNewsValue(data?.value);
  }, [data]);

  console.log(data);
  if (!data?.value) return <h1>Loading ...</h1>;

  return (
    <div>
      <ul>
        {newsValue?.map((news) => (
          <NewsItem key={news.name} news={news} />
        ))}
      </ul>
    </div>
  );
};
export default NewsList;
