import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
const product = {
  name: "Blue tshirt",
  price: "₹3000",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  _id: "aniket",
};
const Home = () => {
  return (
    <>
      <div className="banner">
        <p>
          Welcome to<span style={{ color: "#ec5320" }}> Shopee</span> Website
        </p>
        <h1>Find Amazing Products Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeheading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
