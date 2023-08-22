import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { loginTC } from "../../bll/auth-reducer";
import { selectRequestProcessingStatus } from "../../utils/selectors";
import Button from "@mui/material/Button/Button";
import { PATHS } from "../../enums/paths";
import { PasswordVisibilityIcon } from "../../components/PasswordVisiblityIcon/PasswordVisibilityIcon";

type FormInputsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
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
      <div className={styles.testAccount}>
        <div>
          <span>To use application sign up </span>
          <Link to={PATHS.SIGNUP}>here</Link>
        </div>
        <div>or you can use test account:</div>
        <div>Email: cards@gmail.com</div>
        <div>Password: 0123456789</div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Email"
            disabled={isRequestProcessing}
            {...register("email")}
          />
          <span className={styles.error}>{errors.email?.message}</span>
        </div>
        <div>
          <div className={styles.password}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              disabled={isRequestProcessing}
              {...register("password")}
            />
            <PasswordVisibilityIcon
              isPasswordVisible={isPasswordVisible}
              handlePasswordVisibility={handlePasswordVisibility}
            />
          </div>
          <span className={styles.error}>{errors.password?.message}</span>
        </div>
        <div>
          <input
            className={styles.checkbox}
            type="checkbox"
            defaultChecked={true}
            disabled={isRequestProcessing}
            {...register("rememberMe")}
          />
          <span>Remember me</span>
        </div>
        <Button
          className={styles.btn}
          type="submit"
          variant="contained"
          disabled={isRequestProcessing}
        >
          Sign In
        </Button>
      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
      <span className={styles.clarification}>Don't have an account?</span>
      <Link to={PATHS.SIGNUP}>Sign Up</Link>
    </div>
  );
};
