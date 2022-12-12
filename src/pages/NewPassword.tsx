import React from "react";
import styles from "./NewPassword.module.css";

export const NewPassword = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Create new password</h2>
      <input type="password" placeholder="Password" />
      <span className={styles.clarification}>
        Create new password and we will send you further instructions to email
      </span>
      <button>Create new password</button>
    </div>
  );
};
