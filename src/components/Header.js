import React, { useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./Header.css";
import { GlobalContext } from "../reducers/context";
import { Link } from "react-router-dom";
import LgNav from "./LgNav";
import { BsCheckCircle } from "react-icons/bs";
const Header = () => {
  const headerRef = useRef(null);

  const { toggleNav } = GlobalContext();
  return (
    <>
      <div className="header-container" id="tdop" ref={headerRef}>
        <div className="logo">
          <BsCheckCircle />
          <Link to="/">HOOVAA</Link>
        </div>

        <span className="menu" onClick={toggleNav}>
          <AiOutlineMenu className="menu" />
        </span>
        <LgNav />
      </div>
    </>
  );
};

export default Header;
