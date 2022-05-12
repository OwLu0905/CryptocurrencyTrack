import React from "react";
import style from "./NewsItem.module.css";
import moment from "moment";
const NewsItem = (props) => {
  const description =
    props.news.description.length > 100
      ? `${props.news.description.substring(0, 100)} `
      : props.news.description;
  return (
    <>
      <li className={style.item}>
        <div className={style.pic}>
          <p>{props.news.name}</p>
          <img
            src={props.news?.image?.thumbnail?.contentUrl || props.defaultImg}
            alt="crypto news"
          />
        </div>
        <div className={style.description}>
          <p>
            {description} ...
            <span>
              <a target="_blank" rel="noreferrer" href={props.news.url}>
                {" "}
                more
                {/* <BiMessageRoundedDetail size={"1rem"} /> */}
              </a>
            </span>
          </p>
        </div>
        <div className={style.duration}>
          <div className={style.provider}>
            <img
              src={
                props.news.provider[0]?.image?.thumbnail?.contentUrl ||
                props.defaultImg
              }
              alt="news"
            />
            <p>{props.news.provider[0]?.name}</p>
          </div>
          <p>{moment(props.news.datePublished).startOf("ss").fromNow()}</p>
        </div>
      </li>
    </>
  );
};

export default NewsItem;
