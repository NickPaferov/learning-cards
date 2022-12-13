import React from "react";
import styles from "./ForgotPassword.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormInputsType = {
  email: string;
};

const schema = yup.object({
  email: yup.string().required("Email is required").email("Must be a valid email"),
});

export const ForgotPassword = () => {
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
      <h2>Forgot your password?</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email")} />
        <p className={styles.error}>{errors.email?.message}</p>
        <span className={styles.clarification}>
          Enter your email address and we will send you further instructions
        </span>
        <button>Send instructions</button>
      </form>
      <span className={styles.clarification}>Did you remember your password?</span>
      <Link to="/signin">Try logging in</Link>
    </div>
  );
};
