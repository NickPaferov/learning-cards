import React, { FC } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./PasswordVisibilityIcon.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

type PropsType = {
  isPasswordVisible: boolean;
  handlePasswordVisibility: () => void;
};

export const PasswordVisibilityIcon: FC<PropsType> = ({
  isPasswordVisible,
  handlePasswordVisibility,
}) => {
  return (
    <div>
      {isPasswordVisible ? (
        <VisibilityOffIcon
          className={styles.passwordVisibility}
          fontSize="small"
          onClick={handlePasswordVisibility}
        />
      ) : (
        <VisibilityIcon
          className={styles.passwordVisibility}
          fontSize="small"
          onClick={handlePasswordVisibility}
        />
      )}
    </div>
  );
};
