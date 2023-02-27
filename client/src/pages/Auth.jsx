import React, {  useContext } from "react";
import "../assets/auth.css";
import Register from "../components/Register";
import Login from "../components/Login";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../App";

function Auth() {

  const {isAuthendicated} = useContext(AuthContext);

  

  return (
    <div className="Auth d-flex  align-items-center h-100 container-fluid mh-100 w-100 bg-dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthendicated ? <Dashboard /> : <Login />} />
          <Route path="/login" element={isAuthendicated ? <Dashboard /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Auth;
