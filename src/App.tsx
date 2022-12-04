import "./App.css";
// react-popup css
import "reactjs-popup/dist/index.css";

import { SnackbarProvider } from "notistack";
import * as React from "react";
import { useNavigate } from "react-router";
import { Route, Routes } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import { BRAND_NAME } from "./config";
// import focus context
import { FocusProvider } from "./helpers/FocusContext";
import { PlayingVideoProvider } from "./helpers/PlayingVideoContext";
import { UserProvider } from "./helpers/UserDataContext";
import { VideosProvider } from "./helpers/VideosContext";
import AdminPanel from "./pages/admin-panel";
// routes
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserPanel from "./pages/user-panel";

const { useEffect, useContext } = React;

const backgroundImageURL =
  "https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

function App() {
  const navigate = useNavigate();
  return (
    <SnackbarProvider maxSnack={3}>
      <UserProvider>
        <FocusProvider>
          <VideosProvider>
            <PlayingVideoProvider>
              <div className="App">
                <Routes>
                  <Route index path="/" element={<Home />} />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/register" element={<SignUp />} />
                  <Route path="/forgot-password" element={<></>} />
                  // after login routes // user routes
                  <Route path="/user-panel/" element={<UserPanel />} />
                  <Route path="/user-panel/:view" element={<UserPanel />} />
                  // admin routes
                  <Route path="/admin-panel/:view" element={<AdminPanel />} />
                  <Route path="/admin-panel/" element={<AdminPanel />} />
                  <Route path="*" element={<div> 404 NO PAGE FOUND </div>} />
                </Routes>
              </div>
            </PlayingVideoProvider>
          </VideosProvider>
        </FocusProvider>
      </UserProvider>
    </SnackbarProvider>
  );
}

export default App;
