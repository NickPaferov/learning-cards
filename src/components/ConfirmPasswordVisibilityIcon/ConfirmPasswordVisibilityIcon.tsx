import React, { FC } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./ConfirmPasswordVisibilityIcon.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

type PropsType = {
  isConfirmPasswordVisible: boolean;
  handleConfirmPasswordVisibility: () => void;
};

export const ConfirmPasswordVisibilityIcon: FC<PropsType> = ({
  isConfirmPasswordVisible,
  handleConfirmPasswordVisibility,
}) => {
  return (
    <div>
      {isConfirmPasswordVisible ? (
        <VisibilityOffIcon
          className={styles.confirmPasswordVisibility}
          fontSize="small"
          onClick={handleConfirmPasswordVisibility}
        />
      ) : (
        <VisibilityIcon
          className={styles.confirmPasswordVisibility}
          fontSize="small"
          onClick={handleConfirmPasswordVisibility}
        />
      )}
    </div>
  );
};
