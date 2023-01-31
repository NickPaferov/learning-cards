import Button from "@mui/material/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import error404 from "../../assets/images/error404.png";
import { PATHS } from "../../enums/paths";

export const NotFound = () => {
  const navigate = useNavigate();

  const backToHomePage = () => {
    navigate(PATHS.INDEX);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.exclamation}>Ooops!</span>
        <span className={styles.notification}>Sorry! Page not found!</span>
        <Button variant="contained" onClick={backToHomePage}>
          Back to home page
        </Button>
      </div>
      <img src={error404} alt="Page not found" />
    </div>
  );
};
