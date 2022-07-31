import React from "react";
import {
  Home,
  Summary,
  Add,
  Dispense,
  Login,
  Register,
  Logout,
  Machine,
} from "./r";
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
        <Route path="/machine" element={<Machine />} />
      </Routes>
    </Router>
  </>
);

export default App;
