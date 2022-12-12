import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <h2>HomePage</h2>
      <div className={styles.links}>
        <Link to="signup">SignUp</Link>
        <Link to="signin">SignIn</Link>
        <Link to="profile">Profile</Link>
        <Link to="forgot-password">ForgotPassword</Link>
        <Link to="new-password">NewPassword</Link>
        <Link to="*">NotFound</Link>
      </div>
    </div>
  );
};
