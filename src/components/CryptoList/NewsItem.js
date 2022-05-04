import React from "react";

const NewsItem = (props) => {
  return (
    <>
      <li>
        <a target="_blank" rel="noreferrer" href={props.news.url}>
          {props.news.name}
        </a>
      </li>
    </>
  );
};

export default NewsItem;
