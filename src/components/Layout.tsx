import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAppSelector } from "../bll/store";
import avatarImg from "../assets/images/avatar.jpg";
import { DropDownMenu } from "./DropDownMenu";
import { PATHS } from "../App";

type IsActiveType = {
  isActive: boolean;
};

export const Layout = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userName = useAppSelector((state) => state.auth.user?.name);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);
  const navigate = useNavigate();

  const setActive = ({ isActive }: IsActiveType) => (isActive ? styles.activeLink : "");

  const onClickHandler = () => {
    navigate(PATHS.SIGNIN);
  };

  return (
    <div className={styles.layout}>
      {isRequestProcessing && <LinearProgress />}
      <header>
        <NavLink to={PATHS.INDEX} className={setActive}>
          HomePage
        </NavLink>
        <NavLink to={PATHS.SIGNUP} className={setActive}>
          SignUp
        </NavLink>
        <NavLink to={PATHS.SIGNIN} className={setActive}>
          SignIn
        </NavLink>
        <NavLink to={PATHS.PROFILE} className={setActive}>
          Profile
        </NavLink>
        <NavLink to={PATHS.FORGOT_PASSWORD} className={setActive}>
          ForgotPassword
        </NavLink>
        <NavLink to={PATHS.SET_NEW_PASSWORD} className={setActive}>
          NewPassword
        </NavLink>
        {isLoggedIn ? (
          <div className={styles.userInfo}>
            <img alt="avatar" src={avatarImg} className={styles.avatar} />
            <span>{userName}</span>
            <DropDownMenu />
          </div>
        ) : (
          <button onClick={onClickHandler}>SignIn</button>
        )}
      </header>
      <Outlet />
      <footer className={styles.footer}>2022</footer>
    </div>
  );
};
