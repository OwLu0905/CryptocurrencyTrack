import React from "react";
import CryptoList from "../components/CryptoList/CryptoList";

const CryptoCurrency = () => {
  return (
    <>
      <h1>Cryptocurrencies</h1>
      <CryptoList more={true} />
    </>
  );
};

export default CryptoCurrency;
