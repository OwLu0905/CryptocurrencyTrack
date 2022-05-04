import React, { useState, useEffect } from "react";
import { useGetCryptoNewsQuery } from "../api/cryptoNewsApi";
import NewsItem from "../components/CryptoList/NewsItem";
import NewsList from "../components/CryptoList/NewsList";
import CryptoCurrency from "./CryptoCurrency";

const News = (props) => {
  return (
    <div>
      <NewsList more={true} />
    </div>
  );
};
export default News;
