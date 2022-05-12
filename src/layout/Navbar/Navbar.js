import React from "react";
import style from "./Navbar.module.css";

import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { IoPlanetOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className={style.nav}>
        <ul className={style.navbar}>
          <li className={style["nav-logo"]}>
            <span className={` ${style["logo-text"]} `}>CryptoTracker</span>
            <IoPlanetOutline size={40} />
          </li>

          <Link className={style.link} to="/">
            <li className={style["nav-item"]}>
              <AiOutlineHome size={60} />
              <span className={style["link-text"]}>Home</span>
            </li>
          </Link>

          <Link className={style.link} to="/cryptocurrency">
            <li className={style["nav-item"]}>
              <AiOutlineLineChart size={60} />
              <span className={style["link-text"]}>CryptoCurrency</span>
            </li>
          </Link>

          <Link className={style.link} to="/news">
            <li className={style["nav-item"]}>
              <BiNews size={60} />
              <span className={style["link-text"]}>News</span>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
