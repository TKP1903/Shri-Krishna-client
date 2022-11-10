import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { useNavigate } from "react-router";
import { Route, Routes } from "react-router-dom";

import { Helmet } from "react-helmet";
import { BRAND_NAME } from "./config";
// routes
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   document.title = BRAND_NAME;
  //   // scroll to top
  //   window.scrollTo(0, 0);
  //   // smooth scroll
  //   document.body.style.scrollBehavior = "smooth";
  //   // add # to url if not present
  //   if (window.location.hash === "") {
  //     navigate("/#");
  //   }
  //   // remove scroll behavior
  //   // return () => (document.body.style.scrollBehavior = "unset");
  // }, []);
  return (
    <>
      <Helmet>
        <title>{BRAND_NAME}</title>
        <style></style>
      </Helmet>
      <div className="App">
        <Routes>
          <Route index exactPath="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<></>} />
          <Route path="/classes" element={<></>} />
          <Route path="*" element={<div> 404 NO PAGE FOUND </div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
