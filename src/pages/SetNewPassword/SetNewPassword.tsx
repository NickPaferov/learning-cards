import React, { useState } from "react";
import styles from "./SetNewPassword.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { setNewPasswordTC } from "../../bll/auth-reducer";
import { Navigate, useParams } from "react-router-dom";
import { selectPasswordChangeStatus, selectRequestProcessingStatus } from "../../utils/selectors";
import Button from "@mui/material/Button/Button";
import { PATHS } from "../../enums/paths";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  const isPasswordChanged = useAppSelector(selectPasswordChangeStatus);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
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

  if (isPasswordChanged) {
    return <Navigate to={PATHS.SIGNIN} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Create new password</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.password}>
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            disabled={isRequestProcessing}
            {...register("password")}
          />
          {isPasswordVisible
            ? <VisibilityOffIcon className={styles.passwordVisibility} fontSize="small"
                                 onClick={handlePasswordVisibility} />
            : <VisibilityIcon className={styles.passwordVisibility} fontSize="small"
                              onClick={handlePasswordVisibility} />
          }
        </div>
          <span className={styles.error}>{errors.password?.message}</span>
        <div className={styles.confirmPassword}>
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm password"
            disabled={isRequestProcessing}
            {...register("confirmPassword")}
          />
          {isConfirmPasswordVisible
            ? <VisibilityOffIcon className={styles.confirmPasswordVisibility} fontSize="small"
                                 onClick={handleConfirmPasswordVisibility} />
            : <VisibilityIcon className={styles.confirmPasswordVisibility} fontSize="small"
                              onClick={handleConfirmPasswordVisibility} />
          }
        </div>
          <span className={styles.error}>{errors.confirmPassword?.message}</span>
        <span className={styles.clarification}>
          Create new password and we will send you further instructions to email
        </span>
        <Button type="submit" variant="contained" disabled={isRequestProcessing}>
          Create new password
        </Button>
      </form>
    </div>
  );
};
