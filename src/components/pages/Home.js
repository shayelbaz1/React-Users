import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

  return (
    <div className="home-page container">
      <div className="py-4">

        <section className="home-title flex space-between align-center">

          <h1>Managing Employees</h1>

          <Link className="btn btn-primary" to="/users/add">+ Add Employee</Link>
          
        </section>

        <table class="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Roll</th>
              <th scope="col">Start Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <img src={user.image} alt="user" width="70"/> 
                </td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.phone}</td>
                <td>{user.address.street} {user.address.numebr} , {user.address.city}</td>
                <td>{user.roll}</td>
                <td>{user.start_date}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
