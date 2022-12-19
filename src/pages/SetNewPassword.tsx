import React from "react";
import styles from "./SetNewPassword.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { setNewPasswordTC } from "../bll/auth-reducer";
import { Navigate, useParams } from "react-router-dom";

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
  const isRequestProcessing = useAppSelector((state) => state.appReducer.isRequestProcessing);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({
    resolver: yupResolver(schema),
  });

  const { resetPasswordToken } = useParams<{ resetPasswordToken: string }>();

  if (!resetPasswordToken) {
    return <Navigate to="/" />;
  }

  const onSubmit = ({ password }: FormInputsType) => {
    dispatch(setNewPasswordTC({ password, resetPasswordToken }));
  };

  return (
    <div className={styles.wrapper}>
      <h2>Create new password</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Password" disabled={isRequestProcessing} {...register("password")} />
        <p className={styles.error}>{errors.password?.message}</p>
        <input
          placeholder="Confirm password"
          disabled={isRequestProcessing}
          {...register("confirmPassword")}
        />
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
        <span className={styles.clarification}>
          Create new password and we will send you further instructions to email
        </span>
        <button disabled={isRequestProcessing}>Create new password</button>
      </form>
    </div>
  );
};
