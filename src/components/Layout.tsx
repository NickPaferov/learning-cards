import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAppSelector } from "../bll/store";
import avatarImg from "../assets/images/avatar.jpg";
import { DropDownMenu } from "./DropDownMenu";

type IsActiveType = {
  isActive: boolean;
};

export const Layout = () => {
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const userName = useAppSelector((state) => state.authReducer.user?.name);
  const isRequestProcessing = useAppSelector((state) => state.appReducer.isRequestProcessing);
  const navigate = useNavigate();

  const setActive = ({ isActive }: IsActiveType) => (isActive ? styles.activeLink : "");

  const onClickHandler = () => {
    navigate("/signin");
  };

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
