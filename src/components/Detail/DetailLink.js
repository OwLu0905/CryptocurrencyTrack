import React from "react";
import style from "./DetailLink.module.css";
import { AiOutlineLink } from "react-icons/ai";
const DetailLink = ({ links }) => {
  return (
    <>
      <ul className={style.links}>
        {links?.map((link) => (
          <a
            className={style.link}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            key={link.url}
          >
            <li className={style.para}>
              <div className={style.cite}>
                <AiOutlineLink />
                <p>{link.type}</p>
              </div>
              {link.name}
            </li>
          </a>
        ))}
      </ul>
    </>
  );
};

export default DetailLink;
