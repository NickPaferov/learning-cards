import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { loginTC } from "../../bll/auth-reducer";
import { PATHS } from "../../app/App";
import { selectRequestProcessingStatus } from "../../utils/selectors";

type FormInputsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const schema = yup
  .object({
    email: yup.string().required("Email is required").email("Must be a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .max(20, "Password should be at most 20 characters"),
  })
  .required();

export const SignIn = () => {
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputsType) => {
    dispatch(loginTC(data));
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.wrapper}>
      <h2>SignIn</h2>
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
            type="checkbox"
            defaultChecked={true}
            disabled={isRequestProcessing}
            {...register("rememberMe")}
          />
          <span>Remember me</span>
        </div>
        <button disabled={isRequestProcessing}>Sign In</button>
      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
      <span className={styles.clarification}>Don't have an account?</span>
      <Link to={PATHS.SIGNUP}>Sign Up</Link>
    </div>
  );
};
