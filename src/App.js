import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ListStadium from "./pages/ListStadium";
import Booking from "./pages/Booking";
import Account from "./pages/Account";
const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#f0f0f0",
    text: "#333",
  },
};

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const jwt = Cookies.get("jwt");
    const savedUser = localStorage.getItem("user");
    if (savedUser && !jwt) {
      localStorage.removeItem("user");
      setUser(null);
    } else if (savedUser && jwt) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/list-stadium" element={<ListStadium user={user} />} />
          <Route path="/booking/:id" element={<Booking user={user} />} />
          <Route path="/account" element={<Account user={user} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
