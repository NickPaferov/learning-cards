import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAppSelector } from "../bll/store";

type IsActiveType = {
  isActive: boolean;
};

export const Layout = () => {
  const isRequestProcessing = useAppSelector((state) => state.appReducer.isRequestProcessing);

  const setActive = ({ isActive }: IsActiveType) => (isActive ? styles.activeLink : "");

  return (
    <div className={styles.layout}>
      {isRequestProcessing && <LinearProgress />}
      <header>
        <NavLink to="/" className={setActive}>
          HomePage
        </NavLink>
        <NavLink to="/signup" className={setActive}>
          SignUp
        </NavLink>
        <NavLink to="/signin" className={setActive}>
          SignIn
        </NavLink>
        <NavLink to="/profile" className={setActive}>
          Profile
        </NavLink>
        <NavLink to="/forgot-password" className={setActive}>
          ForgotPassword
        </NavLink>
        <NavLink to="/set-new-password" className={setActive}>
          NewPassword
        </NavLink>
      </header>
      <Outlet />
      <footer className={styles.footer}>2022</footer>
    </div>
  );
};
