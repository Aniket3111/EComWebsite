import React from "react";
import play from "../../../images/game.png";
import app from "../../../images/app-store.png";
import "./Footer.css";
import logo from "../../../images/blogo.png";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="midfooter">
        <img src={logo} alt="" className="mdimg" />
        <ul className="menu">
          <li className="menu__item">
            <a className="menu__link" href="/">
              Home
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="/products">
              Products
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="/about">
              About
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="/contact">
              Contact
            </a>
          </li>
        </ul>
        <p>Copyrights 2024 &copy; CloudNest</p>
      </div>
    </footer>
  );
};

export default Footer;
