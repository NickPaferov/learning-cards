import React, { useState } from "react";
import styles from "./SetNewPassword.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { setNewPasswordTC } from "../bll/auth-reducer";
import { Navigate, useParams } from "react-router-dom";
import { PATHS } from "../App";

type FormInputsType = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .max(20, "Password should be at most 20 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

export const SetNewPassword = () => {
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const isPasswordChanged = useAppSelector((state) => state.authReducer.isPasswordChanged);
  const isRequestProcessing = useAppSelector((state) => state.appReducer.isRequestProcessing);
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({
    resolver: yupResolver(schema),
  });

  const { resetPasswordToken } = useParams<{ resetPasswordToken: string }>();

  const onSubmit = ({ password }: FormInputsType) => {
    if (resetPasswordToken) {
      dispatch(setNewPasswordTC({ password, resetPasswordToken }));
    } else {
      return;
    }
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  if (isLoggedIn) {
    return <Navigate to={PATHS.PROFILE} />;
  }

  if (isPasswordChanged) {
    return <Navigate to={PATHS.SIGNIN} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Create new password</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            disabled={isRequestProcessing}
            {...register("password")}
          />
          <span onClick={handlePasswordVisibility}>👁</span>
          <p className={styles.error}>{errors.password?.message}</p>
        </div>
        <div>
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm password"
            disabled={isRequestProcessing}
            {...register("confirmPassword")}
          />
          <span onClick={handleConfirmPasswordVisibility}>👁</span>
          <p className={styles.error}>{errors.confirmPassword?.message}</p>
        </div>
        <span className={styles.clarification}>
          Create new password and we will send you further instructions to email
        </span>
        <button disabled={isRequestProcessing}>Create new password</button>
      </form>
    </div>
  );
};
