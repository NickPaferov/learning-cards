import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAppSelector } from "../../bll/store";
import defaultAvatar from "../../assets/images/avatar.png";
import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import { PATHS } from "../../app/App";
import {
  selectLoginStatus,
  selectRequestProcessingStatus,
  selectUserAvatar,
  selectUserName,
} from "../../utils/selectors";

export const Layout = () => {
  const isLoggedIn = useAppSelector(selectLoginStatus);
  const userName = useAppSelector(selectUserName);
  const avatar = useAppSelector(selectUserAvatar);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const navigate = useNavigate();

  const onSignIn = () => {
    navigate(PATHS.SIGNIN);
  };

  return (
    <div className={styles.layout}>
      {isRequestProcessing && <LinearProgress />}
      <header>
        <div className={styles.wrapper}>
          <NavLink to={PATHS.INDEX} className={styles.link}>
            Learning Cards
          </NavLink>
          {isLoggedIn ? (
            <div className={styles.userInfo}>
              <img alt="avatar" src={avatar || defaultAvatar} className={styles.avatar} />
              <span>{userName}</span>
              <DropDownMenu />
            </div>
          ) : (
            <button className={styles.btnSignIn} onClick={onSignIn}>
              SignIn
            </button>
          )}
        </div>
      </header>
      <Outlet />
      <footer className={styles.footer}>2022</footer>
    </div>
  );
};
