import React from "react";
import styles from "./NewPassword.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

export const NewPassword = () => {
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
      <h2>Create new password</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Password" {...register("password")} />
        <p className={styles.error}>{errors.password?.message}</p>
        <input placeholder="Confirm password" {...register("confirmPassword")} />
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
        <span className={styles.clarification}>
          Create new password and we will send you further instructions to email
        </span>
        <button>Create new password</button>
      </form>
    </div>
  );
};
