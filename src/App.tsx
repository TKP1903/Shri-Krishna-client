import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./App.css";

import { useNavigate } from "react-router";
import { Route, Routes } from "react-router-dom";
import { BRAND_NAME } from "./config";
// routes
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
const backgroundImageURL
 = "https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<></>} />
          <Route path="*" element={<div> 404 NO PAGE FOUND </div>} />
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
