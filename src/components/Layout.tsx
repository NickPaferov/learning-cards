import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { logoutTC } from "../bll/auth-reducer";
import { useAppDispatch } from "../bll/store";

type IsActiveType = {
  isActive: boolean;
};

export const Layout = () => {
  const dispatch = useAppDispatch();
  const setActive = ({ isActive }: IsActiveType) => (isActive ? styles.activeLink : "");

  const onClickLogOutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <div className={styles.layout}>
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
        <button onClick={onClickLogOutHandler}>Log Out</button>
      </header>
      <Outlet />
      <footer className={styles.footer}>2022</footer>
    </div>
  );
};
