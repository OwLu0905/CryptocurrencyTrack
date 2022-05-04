import React from "react";
import Navbar from "./Navbar/Navbar";
import style from "./Layout.module.css";
const Layout = (props) => {
  return (
    <>
      <Navbar />
      <main className={style.main}>{props.children}</main>
    </>
  );
};

export default Layout;
