import React from "react";
import styles from "./Profile.module.css";
import avatarImg from "./../assets/images/avatar.jpg";

export const Profile = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Personal information</h2>
      <img alt="avatar" src={avatarImg} className={styles.avatar} />
      <span>Nick</span>
      <span className={styles.email}>email</span>
      <button>Log out</button>
    </div>
  );
};
