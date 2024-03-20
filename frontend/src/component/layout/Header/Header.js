import React from "react";
import "../Footer/Footer.css";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/blogo.png";
const options = {
  burgerColorHover: "#ad8a5d",
  logo,
  logoWidth: "10vmax",
  ProfileIconElement: MdAccountCircle,
  SearchIconElement: MdSearch,
  CartIconElement: MdAddShoppingCart,
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#ad8a5d",
  searchIcon: "True",
  cartIcon: "True",
  profileIcon: "True",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  logoUrl: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#ad8a5d",
  link1Margin: "2vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35,35,0.8)",
  searchIconColor: "rgba(35, 35,35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColorHover: "#ad8a5d",
  profileIconColorHover: "#ad8a5d",
  cartIconColorHover: "#ad8a5d",
  cartIconMargin: "1vmax",
};
const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
