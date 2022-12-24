import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { registerTC } from "../bll/auth-reducer";
import { PATHS } from "../App";

type FormInputsType = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    email: yup.string().required("Email is required").email("Must be a valid email"),
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

export const SignUp = () => {
  const isRegistered = useAppSelector((state) => state.authReducer.isRegistered);
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

  const onSubmit = ({ email, password }: FormInputsType) => {
    dispatch(registerTC({ email, password }));
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  if (isRegistered) {
    return <Navigate to={PATHS.SIGNIN} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2>SignUp</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Email" disabled={isRequestProcessing} {...register("email")} />
          <p className={styles.error}>{errors.email?.message}</p>
        </div>
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
        <button disabled={isRequestProcessing}>Sign Up</button>
      </form>
      <span className={styles.clarification}>Already have an account?</span>
      <Link to={PATHS.SIGNIN}>Sign In</Link>
    </div>
  );
};
