import React from "react";
import style from "./HomeCard.module.css";
const HomeCard = (props) => {
  return <div className={style.card}>{props.children}</div>;
};

export default HomeCard;
