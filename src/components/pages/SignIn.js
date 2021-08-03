import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const profile = require("../../assets/profile.png");

const Signin = () => {
  let history = useHistory();
  const [email, setEmail] = useState("email3@gmail.com");
  const [password, setPassword] = useState("1234");
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const state = useSelector((state) => state);
  // eslint-disable-next-line
  const user = useSelector((state) => state.userReducer.loggedInUser);
  const [newUser, setNewUser] = useState({
    id: 0,
    image:
      "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
    fname: "Roni",
    lname: "Bonim",
    phone: "050 9998376",
    address: {
      city: "Tel Aviv",
      street: "Rotchild",
      number: "22",
    },
    company: " Technology",
    roll: "",
    start_date: Date.now(),
    password: "1234",
    email: "shay2@gmail.com",
  });

  const responseGoogle = async (response) => {
    const email = response.Ts.Et;
    const fname = response.Ts.ST;
    const lname = response.Ts.UR;
    const image = response.Ts.iJ;
    const password = generatePassword();
    setNewUser({ ...newUser, email, fname, lname, image, password });
    try {
      const res = await axios.post("http://localhost:3003/users", newUser);
      dispatch({ type: "SET_USER", payload: res.data.user });
      history.push("/");
    } catch (error) {
      alert(error.response.data)
    }

  };

  const responseGoogleFail = (response) => {
    console.log(response);
  };

  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  const onLoginClick = async () => {
    try {
      const res = await axios.post("http://localhost:3003/signin", {
        email,
        password,
      });
      dispatch({ type: "SET_USER", payload: res.data.user });
      history.push("/");
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="signin-page container">
      <div>
        <h1>Sign In</h1>

        <div className="form-box">
          <img src={profile} alt="profile" />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLoginClick();
            }}
          >
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>

            <GoogleLogin
              clientId="295314922853-o99lf375jkmhmfisdk73v0rejs4mimgr.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
              cookiePolicy={"single_host_origin"}
            />

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
