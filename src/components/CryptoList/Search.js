import React from "react";
import style from "./Search.module.css";
const Search = (prop) => {
  return (
    <div className={style.form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Search :</label>
        <input
          type="text"
          onChange={prop.onSearch}
          placeholder="Search Cryptocurrency"
        />
      </form>
    </div>
  );
};

export default Search;
