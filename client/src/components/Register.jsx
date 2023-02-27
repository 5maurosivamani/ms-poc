import React, { useState } from "react";
import "../assets/register.css";
import axios from "axios";
import { Link } from "react-router-dom";
const host = "192.168.1.13";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = formData;

    if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
      axios
        .post(`http://${host}:4000/register`, formData)
        .then((res) => {
          console.log(res.data);
          alert("Successfully Created!");
          setFormData({
            name: "",
            email: "",
            password: "",
          });
        })
        .catch((err) => {
          console.log("Axios Error", err);
        });
    } else {
      alert("Please fill the all fields!");
    }
  };

  return (
    <div className="Auth d-flex  align-items-center h-100 container-fluid mh-100 w-100 bg-dark">
      <div className="col-md-6 mx-auto">
        <form className="w-100" autoComplete="off">
          <h1 className="text-light text-center">Register</h1>
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

          <div class="form-group  mb-4 ">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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

          <div className="w-100 text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              class="btn btn-primary w-50 mx-auto "
            >
              Submit
            </button>
          </div>

          <div className="w-100 text-center my-4">
            <p className="text-muted ">
              Already have an accout? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
