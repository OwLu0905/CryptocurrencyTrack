import React, { useState, useEffect } from "react";
import { useGetCryptoNewsQuery } from "../api/cryptoNewsApi";
import NewsItem from "../components/CryptoList/NewsItem";
import NewsList from "../components/CryptoList/NewsList";
import HomeCard from "../layout/HomeCard/HomeCard";
import CryptoCurrency from "./CryptoCurrency";

const News = (props) => {
  return (
    <HomeCard>
      <h1>News</h1>
      <NewsList more={true} />
    </HomeCard>
  );
};
export default News;
