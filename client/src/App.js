import { useState, createContext, useEffect } from "react";

import "./App.css";
// import Dashboard from "./pages/Dashboard";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";

export const AuthContext = createContext();

function App() {
  const [isAuthendicated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth_Token = localStorage.getItem("auth_token");

    if (auth_Token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{isAuthendicated, setIsAuthenticated}}>
        <Auth />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
