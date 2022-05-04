import React from "react";
import style from "./Navbar.module.css";

import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className={style.nav}>
        <ul className={style.navbar}>
          <li className={style["nav-logo"]}>
            <span className={`${style["link-text"]}  ${style["logo-text"]} `}>
              CryptoTracker
            </span>
            <BsCoin size={30} />
          </li>
          <li className={style["nav-item"]}>
            <Link to="/">
              <AiOutlineHome size={30} />
              <span className={style["link-text"]}>Home</span>
            </Link>
          </li>
          <li className={style["nav-item"]}>
            <Link to="cryptocurrency">
              <AiOutlineLineChart size={30} />
              <span className={style["link-text"]}>CryptoCurrency</span>
            </Link>
          </li>

          <li className={style["nav-item"]}>
            <Link to="/favorite">
              <MdOutlineFavoriteBorder size={30} />
              {/* <AiOutlineLineChart size={30} /> */}
              <span className={style["link-text"]}>Favorites</span>
            </Link>
          </li>
          <li className={style["nav-item"]}>
            <Link to="/news">
              <BiNews size={30} />
              <span className={style["link-text"]}>News</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
