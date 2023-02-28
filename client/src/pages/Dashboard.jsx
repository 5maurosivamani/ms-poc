import React, {  useState, useEffect } from "react";
// import { AuthContext } from "../App";
import { v4 as uuid } from "uuid";
import axios from "axios";

function Dashboard() {
  // const { setIsAuthenticated } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5002/users");
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.log("Failed to Fetched!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="text-center d-flex flex-column justify-content-start  w-100">
      <h1 className="text-light my-4">Dashboard</h1>
      <hr class="bg-danger border-2 border-top border-secondary"></hr>
      <h3 className=" my-2">Users</h3>
      <table class="table table-light  table-striped table-hover w-50 mx-auto mt-3 rounded">
        <thead>
          <tr className="table-warning">
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => (
            <tr key={uuid()}>
              <th scope="row">{i + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
