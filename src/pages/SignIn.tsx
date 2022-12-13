import React from "react";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputsType) => console.log(data);

  return (
    <div className={styles.wrapper}>
      <h2>SignIn</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email")} />
        <p className={styles.error}>{errors.email?.message}</p>
        <input placeholder="Password" {...register("password")} />
        <p className={styles.error}>{errors.password?.message}</p>
        <div>
          <input type="checkbox" {...register("rememberMe")} />
          <span>Remember me</span>
        </div>
        <button>Sign In</button>
      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
      <span className={styles.clarification}>Already have an account?</span>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};
