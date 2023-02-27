import React, { useContext } from "react";
import { AuthContext } from "../App";

function Dashboard() {
  const { setIsAuthenticated } = useContext(AuthContext);

  return (
    <div className="text-light text-center  w-100">
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem("auth_token");
          setIsAuthenticated(false);

        }}
        type="button"
        class="btn btn-primary"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
