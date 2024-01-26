import React from "react";
import play from "../../../images/game.png";
import app from "../../../images/app-store.png";
import "./Footer.css";
import logo from "../../../images/logo-1.png";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Download app for Android and IOS Mobile Phone</p>
        <img src={play} alt="playstore" />
        <img src={app} alt="appstore" />
      </div>
      <div className="midfooter">
        <img src={logo} alt="" width="180vmax" />
        <p>High Quality is our first priority</p>
        <p>Coyrights 2024 &copy; AniketRajani</p>
      </div>
      <div className="rightfooter">
        <h4>Follow Us</h4>
        <a href="">Instagram</a>
        <a href="">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
