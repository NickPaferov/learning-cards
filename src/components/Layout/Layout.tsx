import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAppSelector } from "../../bll/store";
import defaultAvatar from "../../assets/images/avatar.png";
import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import {
  selectLoginStatus,
  selectRequestProcessingStatus,
  selectUserAvatar,
  selectUserName,
} from "../../utils/selectors";
import Button from "@mui/material/Button/Button";
import { PATHS } from "../../enums/paths";

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
              <span>{userName}</span>
              <img alt="avatar" src={avatar || defaultAvatar} className={styles.avatar} />
              <DropDownMenu />
            </div>
          ) : (
            <Button variant="contained" onClick={onSignIn}>
              Sign In
            </Button>
          )}
        </div>
      </header>
      <Outlet />
      <footer className={styles.footer}>2022</footer>
    </div>
  );
};
