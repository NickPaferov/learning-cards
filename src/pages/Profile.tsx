import React from "react";
import styles from "./Profile.module.css";
import avatarImg from "./../assets/images/avatar.jpg";
import { logoutTC } from "../bll/auth-reducer";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { Navigate } from "react-router-dom";

export const Profile = () => {
  const isAuth = useAppSelector((state) => !!state.authReducer.user);
  const dispatch = useAppDispatch();

  const onClickLogOutHandler = () => {
    dispatch(logoutTC());
  };

  if (!isAuth) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Personal information</h2>
      <img alt="avatar" src={avatarImg} className={styles.avatar} />
      <span>Nick</span>
      <span className={styles.email}>email</span>
      <button onClick={onClickLogOutHandler}>Log out</button>
    </div>
  );
};
