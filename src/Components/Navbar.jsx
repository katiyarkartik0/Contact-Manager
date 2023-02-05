import React from "react";
import { Search } from "./Search";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <form className="form-inline">
        <div className="input-group" id="search">
          <Search/>
        </div>
      </form>
    </nav>
  );
};