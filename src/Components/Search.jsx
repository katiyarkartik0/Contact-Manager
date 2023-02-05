import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import { handleSearchContext } from "../App";
export const Search = () => {
  const [search, setSearch] = useState("");

  const handleSearch = useContext(handleSearchContext);

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  return (
    <div className="search">
      <input
        type="text"
        className="form-control search-box"
        placeholder="Search any contact"
        value={search}
        onChange={(e) => {
          setSearch(e.currentTarget.value);
        }}
      />
    </div>
  );
};
