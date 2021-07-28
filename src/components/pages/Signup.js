import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
const profile = require("../../assets/profile.png");

const Signup = () => {
  let history = useHistory();
  const [repassword , setRepassword] = React.useState("1234")
  const [user, setUser] = React.useState({
    id:0,
    image: "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
    fname: "Roni",
    lname: "Bonim",
    phone: "050 9998376",
    address:{
      city: "Tel Aviv",
      street: "Rotchild",
      number: "22"
    },
    company: " Technology",
    roll: "",
    start_date: Date.now(),
    password:"1234",
    email: "email3@gmail.com"
  });


  const { fname, lname, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3003/users", user);
      console.log('res:', res.statusText)
      history.push("/");
    } catch (error) {
      console.log('error: Cannot sign up')
      alert("Email already exists")
    }
    // const lastIdx = users[0].id
    // user.id = lastIdx+1
    // setUser({...user})
    // setHomeUsers([user,...users ]);
    // setIsAddUser(false)
    // history.push("/");
  };

  return (
    <div className="signup-page container">
      <div>
        <h1>Sign up</h1>

        <div className="form-box">
          <img src={profile} alt="profile" />
          <form onSubmit={(e) => onSubmit(e)}>
            <h6>Personal Details</h6>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="First Name"
                value={fname}
                name="fname"
                onChange={(e)=>onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="lname"
                value={lname}
                name="lname"
                onChange={(e)=>onInputChange(e)}
                placeholder="Last Name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                name="email"
                onChange={(e)=>onInputChange(e)}
                placeholder="Email"
                aria-describedby="emailHelp"
              />
            </div>

            <h6 id="password">Password</h6>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                name="password"
                onChange={(e)=>onInputChange(e)}
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="repassword"
                value={repassword}
                name="repassword"
                onChange={(e)=>setRepassword(e.target.value)}
                placeholder="Retype Password"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>

        <div className="signin-link">
          <p>Have an account?</p>
          <Link to="/signin">Sign In</Link>
        </div>
      </div>

      <div className="terms">
        <Link to="/signin">Our Terms of Use and Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Signup;
