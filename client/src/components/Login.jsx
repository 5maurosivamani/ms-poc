import React, { useContext, useState } from "react";
import "../assets/register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../App";
const host = "192.168.1.13";

function Login() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(null);

  const [err, setErr] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, password } = formData;

    if (name.trim() !== "" && password.trim() !== "") {
      axios
        .post(`http://${host}:4001/login`, formData)
        .then((res) => {
          const token = res.data.token;

          localStorage.setItem("auth_token", token);
          localStorage.setItem("username", res.data.name);

          setFormData({
            name: "",
            password: "",
          });

          setIsAuthenticated(true);
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setErr((pre) => ({
              ...pre,
              message: "Invalid username or password!",
            }));
          } else {
            console.log("Somethine went wrong!");
          }
        });
    } else {
      alert("Please fill the all fields!");
    }
  };

  return (
    <div className="Auth d-flex  align-items-center h-100 container-fluid mh-100 w-100 bg-dark">
      <div className="col-md-5 mx-auto">
        <form className="w-100" autoComplete="off">
          <h1 className="text-light text-center">Login</h1>

          <div class="form-group mb-4">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div class="form-group  mb-4">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {err?.message && (
            <div className="mb-4">
              <span className="text-danger ">{err.message}</span>
            </div>
          )}

          <div className="w-100 text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              class="btn btn-info text-white px-5 mx-auto "
            >
              Submit
            </button>
          </div>

          <div className="w-100 text-center my-4">
            <p className="text-muted ">
              You have don't an accout? <Link to="/register" className="text-info">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
