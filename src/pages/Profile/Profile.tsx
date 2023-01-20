import React, { useState } from "react";
import styles from "./Profile.module.css";
import defaultAvatar from "../../assets/images/avatar.png";
import { logoutTC, updateMeTC } from "../../bll/auth-reducer";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  selectRequestProcessingStatus,
  selectUserAvatar,
  selectUserEmail,
  selectUserName,
} from "../../utils/selectors";
import { BackToPacks } from "../../components/BackToPacks/BackToPacks";
import IconButton from "@mui/material/IconButton/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { InputTypeFile } from "../../components/InputTypeFile/InputTypeFile";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

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
  const avatar = useAppSelector(selectUserAvatar);
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

  const onUpdateAvatar = (file64: string) => {
    dispatch(updateMeTC({ avatar: file64 }));
  };

  const onLogOut = () => {
    dispatch(logoutTC());
  };

  const onEditMode = () => {
    setEditMode(true);
  };

  return (
    <div className={styles.profile}>
      <BackToPacks />
      <div className={styles.wrapper}>
        <h2>Personal information</h2>
        <img alt="avatar" src={avatar || defaultAvatar} className={styles.avatar} />
        <InputTypeFile callBack={onUpdateAvatar}>
          <IconButton component="span">
            <PhotoCameraIcon />
          </IconButton>
        </InputTypeFile>
        {editMode ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input autoFocus={true} defaultValue={userName} {...register("name")} />
            <button disabled={isRequestProcessing}>Save</button>
            <p className={styles.error}>{errors.name?.message}</p>
          </form>
        ) : (
          <div>
            <span>{userName}</span>
            <IconButton disabled={isRequestProcessing} onClick={onEditMode}>
              <BorderColorOutlinedIcon />
            </IconButton>
          </div>
        )}
        <span className={styles.email}>{email}</span>
        <button disabled={isRequestProcessing} onClick={onLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};
