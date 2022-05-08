import React from "react";
import style from "./DetailStatistic.module.css";
const DetailStatistic = ({ name, stats, other }) => {
  let titles;
  let para;

  if (!other) {
    titles = `${name}  Value Statistics`;
    para = `An overview showing the states of ${name}`;
  } else {
    titles = `Other Statistics`;
    para = `An overview showing the states of all cryptocurrencies`;
  }

  return (
    <div className={style.form}>
      <h1>{titles}</h1>
      <p>{para}</p>
      <ul className={style.ul}>
        {stats.map(({ icon, title, value }) => (
          <li key={title} className={style.li}>
            <div className={style.icon}>
              {icon}
              {title}
            </div>
            <p style={{ fontWeight: "bold" }}>{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailStatistic;
