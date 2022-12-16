import React from "react";
import styles from "./SignUp.module.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { registerTC } from "../bll/auth-reducer";

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
  const isAuth = useAppSelector((state) => !!state.authReducer.user);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ email, password }: FormInputsType) => {
    console.log({ email, password });
    dispatch(registerTC({ email, password }));
  };

  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2>SignUp</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email")} />
        <p className={styles.error}>{errors.email?.message}</p>
        <input placeholder="Password" {...register("password")} />
        <p className={styles.error}>{errors.password?.message}</p>
        <input placeholder="Confirm password" {...register("confirmPassword")} />
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
        <button>Sign Up</button>
      </form>
      <span className={styles.clarification}>Already have an account?</span>
      <Link to="/signin">Sign In</Link>
    </div>
  );
};
