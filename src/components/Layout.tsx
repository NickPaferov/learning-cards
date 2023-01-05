import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAppSelector } from "../bll/store";
import avatarImg from "../assets/images/avatar.jpg";
import { DropDownMenu } from "./DropDownMenu";
import { PATHS } from "../App";

export const Layout = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userName = useAppSelector((state) => state.auth.user?.name);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);
  const navigate = useNavigate();

  const onSignIn = () => {
    navigate(PATHS.SIGNIN);
  };

  return (
    <div className={styles.layout}>
      {isRequestProcessing && <LinearProgress />}
      <header>
        <NavLink to={PATHS.INDEX} className={styles.link}>
          Learning Cards
        </NavLink>
        {isLoggedIn ? (
          <div className={styles.userInfo}>
            <img alt="avatar" src={avatarImg} className={styles.avatar} />
            <span>{userName}</span>
            <DropDownMenu />
          </div>
        ) : (
          <button className={styles.btnSignIn} onClick={onSignIn}>
            SignIn
          </button>
        )}
      </header>
      <Outlet />
      <footer className={styles.footer}>2022</footer>
    </div>
  );
};
