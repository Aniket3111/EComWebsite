import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { resetPassword, clearErrors } from "../../actions/userActions";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { token } = useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();

    myform.set("password", password);
    myform.set("confirmpassword", confirmpassword);
    dispatch(resetPassword(token, myform));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
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

export default ResetPassword;
