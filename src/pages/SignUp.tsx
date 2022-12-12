import React from "react";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className={styles.wrapper}>
      <h2>SignUp</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm password" />
        <button>Sign Up</button>
      </form>
      <span className={styles.clarification}>Already have an account?</span>
      <Link to="/signin">Sign In</Link>
    </div>
  );
};
