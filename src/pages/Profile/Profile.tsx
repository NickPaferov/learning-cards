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
import { setAppErrorAC } from "../../bll/app-reducer";
import Button from "@mui/material/Button/Button";

type FormInputsType = {
  name: string;
};

const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .max(30, "Name should be at most 30 characters"),
  })
  .required();

export const Profile = () => {
  const userName = useAppSelector(selectUserName);
  const avatar = useAppSelector(selectUserAvatar);
  const email = useAppSelector(selectUserEmail);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);

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
    setIsAvatarBroken(false);
    dispatch(updateMeTC({ avatar: file64 }));
  };

  const onLogOut = () => {
    dispatch(logoutTC());
  };

  const onEditMode = () => {
    setEditMode(true);
  };

  const handleError = () => {
    setIsAvatarBroken(true);
    dispatch(setAppErrorAC("uploading image is broken"));
  };

  return (
    <div className={styles.profile}>
      <BackToPacks />
      <div className={styles.wrapper}>
        <h2>Personal information</h2>
        <img
          alt="avatar"
          src={isAvatarBroken ? defaultAvatar : avatar}
          className={styles.avatar}
          onError={handleError}
        />
        <InputTypeFile callBack={onUpdateAvatar}>
          <IconButton component="span">
            <PhotoCameraIcon />
          </IconButton>
        </InputTypeFile>
        {editMode ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              autoFocus={true}
              defaultValue={userName}
              {...register("name")}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isRequestProcessing}
            >
              Save
            </Button>
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
        <Button
          variant="contained"
          disabled={isRequestProcessing}
          onClick={onLogOut}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};
