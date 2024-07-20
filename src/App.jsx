import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/Signup";
function App() {
  return (
    <>
  <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/manager" element={<Manager />} />
        </Routes>
        <Footer />
      </div>
    </Router>
      
    </>
  );
}

export default App;
