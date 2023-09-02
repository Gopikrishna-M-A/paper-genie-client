import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import GeneratePaper from "./components/GeneratePaper/GeneratePaper";
import Questions from "./components/Questions/Questions";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import QuestionPaper from "./components/QuestionPaper/QuestionPaper"
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Settings from "./components/Settings/Settings";
import baseURL from './components/baseURL'
import axios from 'axios'
function App() {

  const [user, setUser] = useState(null);
  

  useEffect(() => {
      axios
        .get(`${baseURL}/auth/check-auth`, { withCredentials: true })
        .then((response) => {
          if (response.data.isAuthenticated) {
            console.log("app:",response);
            setUser(response.data.user);
          } else {
            console.log("app else");
            setUser(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
  }, []);



  return (
    <Router>
      <Navbar user={user} setUser={setUser} className="nav" ></Navbar>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/Add-question" element={<AddQuestion user={user} />} />
        <Route path="/Create-paper" element={<GeneratePaper user={user} />} />
        <Route path="/view-questions" element={<Questions user={user} />} />
        <Route path="/question-paper" element={<QuestionPaper user={user} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
      <Footer></Footer>

    </Router>
  )
}

export default App;
