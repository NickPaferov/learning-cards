import React from "react";
import { PATHS } from "../../app/App";
import { useNavigate } from "react-router-dom";
import styles from "./BackToPacks.module.css";

export const BackToPacks = () => {
  const navigate = useNavigate();

  const onMoveToPacksList = () => {
    navigate(PATHS.PACKS);
  };
  return (
    <div className={styles.navToPacks}>
      <span onClick={onMoveToPacksList}>🡨 Back to Packs List</span>
    </div>
  );
};
