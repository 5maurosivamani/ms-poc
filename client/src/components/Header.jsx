import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

function Header() {
  const { setIsAuthenticated, isAuthendicated } = useContext(AuthContext);

  return (
    <div className="header px-4 py-2 bg-light d-flex justify-content-between align-items-center">
      <div className="left d-flex">
        <h1>Microservice</h1>
        <ul
          className="m-0 d-flex list-unstyled align-items-center ms-5"
          style={{ visibility: isAuthendicated ? "visible" : "hidden" }}
        >
          <li className="me-2">
            <Link className="nav-link text-info" to="/">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>

      {isAuthendicated ? (
        <div className="d-flex align-items-center">
          <p className="text-muted  me-3 mb-0">Welcome, <span className="text-info">{localStorage.getItem("username") && localStorage.getItem("username")}</span></p>
          <button
            type="button"
            class="btn btn-info text-white"
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("username");
              setIsAuthenticated(false);
            }}
            style={{ visibility: isAuthendicated ? "visible" : "hidden" }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link class="btn btn-info text-white" to="/login">
          Login
        </Link>
      )}
    </div>
  );
}

export default Header;
