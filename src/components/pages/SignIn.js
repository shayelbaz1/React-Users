import React from "react";
import { Link } from "react-router-dom";
const profile = require("../../assets/profile.png")

const Signin = () => {
  return (
    <div className="signin-page container">
      <div>
        <h1>Sign In</h1>

        <div className="form-box">
          <img src={profile} alt="profile"/>
          <form>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>

            <Link to="/signup">Forgot password?</Link>
          </form>
        </div>

        <div className="signup-link">
          <p>Don’t have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>

      <div className="terms">
        <Link to="/signin">Our Terms of Use and Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Signin;
