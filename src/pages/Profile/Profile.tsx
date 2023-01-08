import React, { useState } from "react";
import styles from "./Profile.module.css";
import avatarImg from "../../assets/images/avatar.jpg";
import { logoutTC, updateMeTC } from "../../bll/auth-reducer";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  selectRequestProcessingStatus,
  selectUserEmail,
  selectUserName,
} from "../../utils/selectors";
import { BackToPacks } from "../../components/BackToPacks/BackToPacks";

type FormInputsType = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required("Name is required").max(30, "Name should be at most 30 characters"),
  })
  .required();

export const Profile = () => {
  const userName = useAppSelector(selectUserName);
  const email = useAppSelector(selectUserEmail);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputsType) => {
    const name = data.name.trim();
    dispatch(updateMeTC({ name }));
    setEditMode(false);
  };

  const onClickLogOutHandler = () => {
    dispatch(logoutTC());
  };

  const onEditModeHandler = () => {
    setEditMode(true);
  };

  return (
    <div className={styles.profile}>
      <BackToPacks />
      <div className={styles.wrapper}>
        <h2>Personal information</h2>
        <img alt="avatar" src={avatarImg} className={styles.avatar} />
        {editMode ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input autoFocus={true} defaultValue={userName} {...register("name")} />
            <button disabled={isRequestProcessing}>Save</button>
            <p className={styles.error}>{errors.name?.message}</p>
          </form>
        ) : (
          <div>
            <span>{userName}</span>
            <button disabled={isRequestProcessing} onClick={onEditModeHandler}>
              🖉
            </button>
          </div>
        )}
        <span className={styles.email}>{email}</span>
        <button disabled={isRequestProcessing} onClick={onClickLogOutHandler}>
          Log out
        </button>
      </div>
    </div>
  );
};
