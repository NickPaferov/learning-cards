import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { ForgotPassword } from "./pages/ForgotPassword";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { SetNewPassword } from "./pages/SetNewPassword";
import { useAppDispatch, useAppSelector } from "./bll/store";
import { initializeAppTC } from "./bll/app-reducer";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { ErrorSnackbar } from "./components/ErrorSnackbar";

export enum PATHS {
  INDEX = "/",
  SIGNUP = "/signup",
  SIGNIN = "/signin",
  PROFILE = "/profile",
  FORGOT_PASSWORD = "/forgot-password",
  SET_NEW_PASSWORD = "/set-new-password",
  NOT_FOUND = "*",
}

function App() {
  const isInit = useAppSelector((state) => state.appReducer.isInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!isInit) {
    return (
      <div
        style={{
          position: "fixed",
          top: "45%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <Routes>
        <Route path={PATHS.INDEX} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.SIGNUP} element={<SignUp />} />
          <Route path={PATHS.SIGNIN} element={<SignIn />} />
          <Route path={PATHS.PROFILE} element={<Profile />} />
          <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route
            path={`${PATHS.SET_NEW_PASSWORD}/:resetPasswordToken`}
            element={<SetNewPassword />}
          />
          <Route path={PATHS.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
