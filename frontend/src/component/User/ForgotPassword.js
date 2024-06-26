import React, { Fragment, useEffect, useState } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { forgotPassword, clearErrors } from "../../actions/userActions";
import { useAlert } from "react-alert";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();

    myform.set("email", email);
    dispatch(forgotPassword(myform));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
