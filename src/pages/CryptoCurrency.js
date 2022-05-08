import React from "react";
import CryptoList from "../components/CryptoList/CryptoList";
import HomeCard from "../layout/HomeCard/HomeCard";

const CryptoCurrency = () => {
  return (
    <HomeCard>
      <h1>Cryptocurrencies</h1>
      <CryptoList more={true} />
    </HomeCard>
  );
};

export default CryptoCurrency;
