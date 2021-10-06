import React from "react";
import "./SalesComponent.css";
import { Link } from "react-router-dom";

import repair from "../assets/repair-icon.png";
import buy from "../assets/buy-icon.png";
import swap from "../assets/swap-icon.png";
import register from "../assets/register-icon.png";
import insure from "../assets/insure-icon.png";
import sell from "../assets/sell-icon.png";
const salesData = [
  {
    info: "Buy",
    icon: buy,
    to: "buy-item",
  },
  {
    info: "Sell",
    icon: sell,
    to: "sell-item",
  },
  {
    info: "Swap",
    icon: swap,
    to: "swap-item",
  },
  {
    info: "Repair",
    icon: repair,
    to: "repair-device",
  },
  {
    info: "Gadget Insurance",
    icon: insure,
    to: "insurance",
  },
  {
    info: "Register Gadget",
    icon: register,
    to: "register-gadget",
  },
];
const SalesComponent = () => {
  const sell = salesData.map((item, index) => {
    return (
      <Link to={item.to}>
        <div key={index} className="sale-item">
          <p className="sale-icon">
            <img src={item.icon} alt={item.info.toUpperCase().slice(0, 1)} />
          </p>
          <p>{item.info}</p>
        </div>
      </Link>
    );
  });
  return (
    <div className="sales-container">
      <p className="sales-intro">What would you like to do?</p>
      <div className="sale-grid">{sell}</div>
    </div>
  );
};
export default SalesComponent;
