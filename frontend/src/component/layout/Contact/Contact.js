import React from "react";
import "./contact.css";
import contactimg from "../../../images/cnt.png";
function Contact() {
  return (
    <div className="c" id="contact">
      <div className="contacthead">Contact</div>
      <div className="lr">
        <div className="leftt">
          <img src={contactimg} alt="" />
        </div>
        <div className="rightt">
          <div className="righthead">
            <span className="rhb">Want</span> to work on a{" "}
            <span className="rhb">Project</span> Together
            <br />
            or
            <div>
              {" "}
              <span className="rhb">Want</span> to Know more about{" "}
              <span className="rhb">me</span>
            </div>
          </div>
          <div className="rightlow">
            <div className="mail">
              Mail me at:{" "}
              <span className="rhb">
                {" "}
                <a className="mailBtn" href="mailto:aniketrajani03@gmail.com">
                  aniketrajani03@gmail.com
                </a>
              </span>
            </div>
            <div className="mail">
              You can look my work at:{" "}
              <span className="rhb">
                {" "}
                <a
                  className="mailBtn"
                  href="https://github.com/Aniket3111"
                  target="blank"
                >
                  https://github.com/Aniket3111
                </a>{" "}
              </span>
            </div>
            <div className="mail">
              Connect with me on LinkedIn{" "}
              <span className="rhb">
                <a
                  className="mailBtn"
                  href="  https://www.linkedin.com/in/aniket-rajani-9487b6191"
                  target="blank"
                >
                  https://www.linkedin.com/in/aniket-rajani-9487b6191
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
