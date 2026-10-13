import react, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainHeader from "./Layouts/MainLayouts/Header/MainHeader";
import Home from "./Pages/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainHeader />}>
          <Route path="/" element={<Home />} />
        </Route>

     

      
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
