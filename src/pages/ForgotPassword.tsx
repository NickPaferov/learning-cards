import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordTC } from "../bll/auth-reducer";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { CheckEmail } from "./CheckEmail";
import { PATHS } from "../App";

type FormInputsType = {
  email: string;
};

const schema = yup.object({
  email: yup.string().required("Email is required").email("Must be a valid email"),
});

export const ForgotPassword = () => {
  const isInstructionsSent = useAppSelector((state) => state.auth.isInstructionsSent);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);
  const dispatch = useAppDispatch();

  const [emailForInstructions, setEmailForInstructions] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ email }: FormInputsType) => {
    const from = "test-front-admin <ai73a@yandex.by>";
    const message = `<div style="background-color: lime; padding: 15px"> 
                    password recovery link:  
                    <a href="${process.env.REACT_APP_FRONTEND_BASE_URL}/#${PATHS.SET_NEW_PASSWORD}/$token$">
                    ${process.env.REACT_APP_FRONTEND_BASE_URL}/#${PATHS.SET_NEW_PASSWORD}/$token$</a></div>`;
    dispatch(forgotPasswordTC({ email, from, message }));
    setEmailForInstructions(email);
  };

  if (isInstructionsSent && emailForInstructions?.length) {
    return <CheckEmail email={emailForInstructions} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Forgot your password?</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" disabled={isRequestProcessing} {...register("email")} />
        <p className={styles.error}>{errors.email?.message}</p>
        <span className={styles.clarification}>
          Enter your email address and we will send you further instructions
        </span>
        <button disabled={isRequestProcessing}>Send instructions</button>
      </form>
      <span className={styles.clarification}>Did you remember your password?</span>
      <Link to={PATHS.SIGNIN}>Try logging in</Link>
    </div>
  );
};
