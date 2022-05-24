import React from "react";
import Home from "./components/Home/Home";
import Summary from "./components/Summary/Summary";
import Add from "./components/Add/Add";
import Dispense from "./components/Dispense/Dispense";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/add" element={<Add />} />
        <Route path="/dispense" element={<Dispense />} />
      </Routes>
    </Router>
  </>
);

export default App;
