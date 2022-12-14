import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { Profile } from "../pages/Profile/Profile";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { HomePage } from "../pages/HomePage/HomePage";
import { NotFound } from "../pages/NotFound/NotFound";
import { Layout } from "../components/Layout/Layout";
import { SetNewPassword } from "../pages/SetNewPassword/SetNewPassword";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { initializeAppTC } from "../bll/app-reducer";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { ProtectedRoutes } from "../hooks/ProtectedRoute";
import { Packs } from "../pages/Packs/Packs";
import { Cards } from "../pages/Cards/Cards";
import { selectAppInitStatus } from "../utils/selectors";

export enum PATHS {
  INDEX = "/",
  PACKS = "/packs",
  CARDS = "/cards",
  SIGNUP = "/signup",
  SIGNIN = "/signin",
  PROFILE = "/profile",
  FORGOT_PASSWORD = "/forgot-password",
  SET_NEW_PASSWORD = "/set-new-password",
  NOT_FOUND = "*",
}

function App() {
  const isInit = useAppSelector(selectAppInitStatus);
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
      <Routes>
        <Route path={PATHS.INDEX} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route element={<ProtectedRoutes userIsAuth={false} redirectTo={PATHS.PACKS} />}>
            <Route path={PATHS.SIGNUP} element={<SignUp />} />
            <Route path={PATHS.SIGNIN} element={<SignIn />} />
            <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route
              path={`${PATHS.SET_NEW_PASSWORD}/:resetPasswordToken`}
              element={<SetNewPassword />}
            />
          </Route>
          <Route element={<ProtectedRoutes userIsAuth={true} redirectTo={PATHS.SIGNIN} />}>
            <Route path={PATHS.PACKS} element={<Packs />} />
            <Route path={`${PATHS.PACKS}/:packId`} element={<Cards />} />
            <Route path={PATHS.PROFILE} element={<Profile />} />
          </Route>
          <Route path={PATHS.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
      <ErrorSnackbar />
    </div>
  );
}

export default App;
