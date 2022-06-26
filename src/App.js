import React from "react";
import Home from "./components/Home/Home";
import Summary from "./components/Summary/Summary";
import Add from "./components/Add/Add";
import Dispense from "./components/Dispense/Dispense";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/add" element={<Add />} />
        <Route path="/dispense" element={<Dispense />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  </>
);

export default App;
