import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="formTitle">Login</span>
                <div className="formContent">
                    <form>
                        <div className="formField">
                            <label htmlFor="email">
                                <i
                                    class="icon fa fa-envelope"
                                    aria-hidden="true"
                                    style={{ fontSize: "20px" }}
                                ></i>
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
                            <i
                                class="showPassword icon fa fa-eye-slash"
                                aria-hidden="true"
                            ></i>
                        </div>
                    </form>
                </div>
                <button className="btnLogin">Login</button>
                <p className="notAccount">
                    You don't have an account?{" "}
                    <Link to="/register" style={{ color: "#fff" }}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
