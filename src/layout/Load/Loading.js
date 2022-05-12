import React from "react";
import style from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={style.loadingCard}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default Loading;
