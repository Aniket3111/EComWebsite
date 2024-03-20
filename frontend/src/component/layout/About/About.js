import React from "react";
import "./About.css";
import img from "../../../images/ar.png";
import { Button, Typography, Avatar } from "@mui/material";
const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={img}
              className="imag"
              alt="Founder"
            />
            <Typography className="headi">Aniket Rajani</Typography>
            <span></span>
          </div>
          <div className="aboutSectionContainer2">
            <div className="about-desc">
              <p className="about-p">
                <li>
                  Hello, I'm Aniket Rajani, a recent Computer Engineering
                  graduate from Pune University. I am enthusiastic about web
                  development and data analysis.
                </li>
              </p>

              <p className="about-p">
                <li>
                  I'm committed to delivering excellence, thriving in
                  collaborative environments, and eager to contribute to
                  innovative projects.
                </li>
              </p>

              <p className="about-p">
                <li>
                  {" "}
                  I'm driven by a passion for learning and dedicated to putting
                  in the hard work necessary to meet deadlines.
                </li>
              </p>

              <p className="about-p">
                <li>Let's connect and explore opportunities together!</li>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
