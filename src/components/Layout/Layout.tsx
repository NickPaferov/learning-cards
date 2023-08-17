import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAppDispatch, useAppSelector } from "../../bll/store";
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
import MenuItem from "@mui/material/MenuItem";
import { logoutTC } from "../../bll/auth-reducer";

export const Layout = () => {
  const isLoggedIn = useAppSelector(selectLoginStatus);
  const userName = useAppSelector(selectUserName);
  const avatar = useAppSelector(selectUserAvatar);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onMoveToStartPage = () => {
    navigate(PATHS.INDEX);
  };

  const onSignIn = () => {
    navigate(PATHS.SIGNIN);
  };

  const onNavigateToProfile = () => {
    navigate(PATHS.PROFILE);
  };

  const onLogOut = () => {
    dispatch(logoutTC());
  };

  return (
    <div className={styles.layout}>
      {isRequestProcessing && <LinearProgress />}
      <header>
        <div className={styles.wrapper}>
          <Button
            sx={{ fontSize: "20px", fontWeight: "bold" }}
            color="inherit"
            disabled={isRequestProcessing}
            onClick={onMoveToStartPage}
          >
            Learning Cards
          </Button>
          {isLoggedIn ? (
            <div className={styles.userInfo}>
              <span>{userName}</span>
              <img
                alt="avatar"
                src={avatar || defaultAvatar}
                className={styles.avatar}
              />
              <DropDownMenu>
                <MenuItem onClick={onNavigateToProfile}>Profile</MenuItem>
                <MenuItem onClick={onLogOut}>LogOut</MenuItem>
              </DropDownMenu>
            </div>
          ) : (
            <Button
              variant="contained"
              disabled={isRequestProcessing}
              onClick={onSignIn}
            >
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
