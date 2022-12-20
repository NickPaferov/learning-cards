import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "./Profile.module.css";
import avatarImg from "./../assets/images/avatar.jpg";
import { logoutTC, updateMeTC } from "../bll/auth-reducer";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { Navigate } from "react-router-dom";

export const Profile = () => {
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const userName = useAppSelector((state) => state.authReducer.user?.name);
  const email = useAppSelector((state) => state.authReducer.user?.email);
  const isRequestProcessing = useAppSelector((state) => state.appReducer.isRequestProcessing);
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(userName);

  const onClickLogOutHandler = () => {
    dispatch(logoutTC());
  };

  if (!isLoggedIn) {
    return <Navigate to={"/signin"} />;
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onDoubleClickHandler = () => {
    setEditMode(true);
  };

  const onBlurHandler = () => {
    setEditMode(false);
    if (name?.length) {
      dispatch(updateMeTC({ name }));
    } else {
      return;
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditMode(false);
      if (name?.length) {
        dispatch(updateMeTC({ name }));
      } else {
        return;
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Personal information</h2>
      <img alt="avatar" src={avatarImg} className={styles.avatar} />
      {editMode ? (
        <input
          autoFocus={true}
          value={name}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onKeyPress={onKeyPressHandler}
        />
      ) : (
        <span onDoubleClick={onDoubleClickHandler}>{name}</span>
      )}
      <span className={styles.email}>{email}</span>
      <button disabled={isRequestProcessing} onClick={onClickLogOutHandler}>
        Log out
      </button>
    </div>
  );
};
