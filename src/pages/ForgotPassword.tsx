import React from "react";
import styles from "./ForgotPassword.module.css";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Forgot your password?</h2>
      <input type="email" placeholder="Email" />
      <span className={styles.clarification}>
        Enter your email address and we will send you further instructions
      </span>
      <button>Send instructions</button>
      <span className={styles.clarification}>Did you remember your password?</span>
      <Link to="/signin">Try logging in</Link>
    </div>
  );
};
