import react, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import MainLayout from "./Layouts/MainLayouts/MainLayout";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import AuthLayout from "./Layouts/AuthLayouts/AuthLayout";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import MemberDashboard from "./Components/MemberDashboard/MemberDashboard";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import SubmitContribution from "./Components/SubmitContribution/SubmitContribution";
import NewsAndAnnouncements from "./Pages/NewsAndAnnouncement/NewsAndAnnouncements";
import AnnouncementManager from "./Components/AnnouncementManager/AnnouncementManager";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route
            path="/NewsAndAnnouncements"
            element={<NewsAndAnnouncements />}
          />
          <Route
            path="/AnnouncementManager"
            element={<AnnouncementManager />}
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Route>{" "}
        <Route path="/MemberDashboard" element={<MemberDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/SubmitContribution" element={<SubmitContribution />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
