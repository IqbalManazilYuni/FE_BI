import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };
  
  return (
    <div className="container mt-5">
      <div className="columns is-centered">
        <div className="column is-four-fifths">
          <Link to={"add"} className="button is-primary is-rounded">
            Tambah
          </Link>
          <div className="table-container">
            <table className="table is-fullwidth is-striped is-hoverable is-responsive">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Point</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.point}</td>
                    <td>
                      <Link to={`edit/${user._id}`} className="button is-warning is-rounded">
                        Edit
                      </Link>
                      <button className="button is-danger is-rounded">
                        Delete
                      </button>
                      <Link to={`detail/${user._id}`} className="button is-info is-rounded">
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
