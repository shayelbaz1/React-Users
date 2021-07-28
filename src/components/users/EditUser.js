import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditUser = ({setIsEditUser,users,setHomeUsers}) => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
      id: id,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWSwL6QEGjHRyGx0Dv4tpZjxelnG2MWh1A-9MFs2rw9MZDG-gWgWj86z5e0prysSigS6I&usqp=CAU",
      fname: "",
      lname: "",
      phone: "",
      address: {
        street: "Rotchild",
        number: 22,
        city:"Tel Aviv"
      },
      company: "ls Technology",
      roll: "HR",
      start_date: 1626701437857
    }
  );

  const { fname,lname,phone,address,roll } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loadUser = useCallback(async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(res.data);
  }, [id])

  useEffect(() => {
    loadUser();
  }, [loadUser]);


  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/users/${id}`, user);
    const idx = users.findIndex(user=>+id===user.id)
    users.splice(idx,1,user)
    setHomeUsers(users);
    setIsEditUser(false)
    history.push("/");
  };


  return (
    <div className="edit-user container">
      <div className="mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="First Name"
              name="fname"
              value={fname}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Last Name"
              name="lname"
              value={lname}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="City"
              name="city"
              value={address.city}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Street"
              name="street"
              value={address.street}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Street Number"
              name="number"
              value={address.number}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <select
              id="formsel"
              className="form-control form-control-lg"
              name="roll"
              onChange={(e) => onInputChange(e)}
              value={roll}
            >
              <option value="" disabled selected>
                Roll
              </option>
              <option value="HR">HR</option>
              <option value="FS">FS</option>
              <option value="CEO">CEO</option>
            </select>
          </div>
          
          <button className="btn btn-primary btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
