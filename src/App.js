import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import Login from "./pages/Login";

const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#f0f0f0",
    text: "#333",
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
