import React from "react";
import "../Footer/Footer.css";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/logo-2.png";
const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "10vmax",
  ProfileIconElement: MdAccountCircle,
  SearchIconElement: MdSearch,
  CartIconElement: MdAddShoppingCart,
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#ec5320",
  searchIcon: "True",
  cartIcon: "True",
  profileIcon: "True",
  link1Text: "Home",
  link2Text: "Product",
  link3Text: "Contact",
  link4Text: "About",
  link1Ur1: "/",
  linkzurl: "/product",
  link3ur1: "/contact",
  link4ur1: "/about",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "2vmax",
  profileIconColor: "rgba(35, 35,35,0.8)",
  searchIconColor: "rgba(35, 35,35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColorHover: "#ec5320",
  profileIconColorHover: "#ec5320",
  cartIconColorHover: "#ec5320",
  cartIconMargin: "1vmax",
};
const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
