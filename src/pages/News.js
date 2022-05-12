import React, { useState, useEffect } from "react";
import { useGetCryptoNewsQuery } from "../api/cryptoNewsApi";
import NewsList from "../components/CryptoList/NewsList";
import HomeCard from "../layout/HomeCard/HomeCard";

const News = (props) => {
  return (
    <HomeCard>
      <h1>News</h1>
      <NewsList more={true} />
    </HomeCard>
  );
};
export default News;
