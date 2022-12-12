import React from "react";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <div className={styles.wrapper}>
      <h2>SignIn</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <div>
          <input type="checkbox" />
          <span>Remember me</span>
        </div>
        <button>Sign In</button>
      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
      <span className={styles.clarification}>Already have an account?</span>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};
