import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="formTitle">Register</span>
        <div className="formContent">
          <form>
            <div className="formField">
              <label htmlFor="fullName">
                <i class="icon fa fa-user" aria-hidden="true"></i>
              </label>
              <input
                className="input"
                type="text"
                id="fullName"
                placeholder="Input your fullName"
              />
            </div>
            <div className="formField">
              <label htmlFor="email">
                <i class="icon fa fa-envelope" aria-hidden="true" style={{ fontSize: "20px" }}></i>
              </label>
              <input
                className="input"
                type="email"
                id="email"
                placeholder="Input your email"
              />
            </div>
            <div className="formField">
              <label htmlFor="password">
                <i class="icon fa fa-lock" aria-hidden="true"></i>
              </label>
              <input
                className="input"
                type="password"
                id="password"
                placeholder="Input your password"
              />
              <i class="showPassword icon fa fa-eye-slash" aria-hidden="true"></i>
            </div>
            <div className="formField">
              <label htmlFor="confirmPassword">
                <i class="icon fa fa-lock" aria-hidden="true"></i>
              </label>
              <input
                className="input"
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
              />
              <i class="showPassword icon fa fa-eye-slash" aria-hidden="true"></i>
            </div>
          </form>
        </div>
        <button className="btnRegister">Sign Up</button>
        <p className="notAccount">
          You have an account?{" "}
          <Link to="/login" style={{ color: "#fff" }}>
            Sign in
          </Link>
        </p>
      </div >
    </div >
  );
};

export default Register;
