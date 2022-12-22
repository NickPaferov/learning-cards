import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../App";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <h2>HomePage</h2>
      <div className={styles.links}>
        <Link to={PATHS.SIGNUP}>SignUp</Link>
        <Link to={PATHS.SIGNIN}>SignIn</Link>
        <Link to={PATHS.PROFILE}>Profile</Link>
        <Link to={PATHS.FORGOT_PASSWORD}>ForgotPassword</Link>
        <Link to={PATHS.SET_NEW_PASSWORD}>NewPassword</Link>
        <Link to="*">NotFound</Link>
      </div>
    </div>
  );
};
