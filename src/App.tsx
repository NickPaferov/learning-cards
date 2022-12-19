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
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="set-new-password/:resetPasswordToken" element={<SetNewPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
