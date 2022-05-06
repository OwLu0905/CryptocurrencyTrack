import React from "react";
import style from "./NewsItem.module.css";
import moment from "moment";
const NewsItem = (props) => {
  const description =
    props.news.description.length > 100
      ? `${props.news.description.substring(0, 100)} `
      : props.news.description;
  console.log();
  return (
    <>
      {/* <li
        className={style.item}
        style={{
          backgroundImage: `url(${
            props.news?.image?.thumbnail?.contentUrl || props.defaultImg
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "250px",
          opacity: "0.4",
        }}
      > */}
      <li className={style.item}>
        {/* <a
          className={style.pic}
          target="_blank"
          rel="noreferrer"
          href={props.news.url}
        > */}
        <div className={style.pic}>
          <p>{props.news.name}</p>
          <img
            src={props.news?.image?.thumbnail?.contentUrl || props.defaultImg}
            alt="crypto news"
          />
        </div>
        <div className={style.description}>
          <p>
            {description}
            <a target="_blank" rel="noreferrer" href={props.news.url}>
              ...see more
            </a>
          </p>
        </div>
        <div className={style.duration}>
          <img
            src={
              props.news.provider[0]?.image?.thumbnail?.contentUrl ||
              props.defaultImg
            }
            alt="news"
          />
          <p>{moment(props.news.datePublished).startOf("ss").fromNow()}</p>
        </div>
      </li>
    </>
  );
};

export default NewsItem;
