import React from "react";

const BestCoin = ({ coin }) => {
  return (
    <>
      <li>
        <img src={coin.iconUrl} alt={coin.name} width={"30px"} />
        <span>{coin.name}</span>
        {/* <li>{coin.name}</li> */}
      </li>
    </>
  );
};

export default BestCoin;
