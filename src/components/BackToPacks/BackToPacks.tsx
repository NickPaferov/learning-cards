import React from "react";
import { PATHS } from "../../app/App";
import { useNavigate } from "react-router-dom";
import styles from "./BackToPacks.module.css";
import { useAppSelector } from "../../bll/store";
import { selectRequestProcessingStatus } from "../../utils/selectors";

export const BackToPacks = () => {
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const navigate = useNavigate();

  const onMoveToPacksList = () => {
    navigate(PATHS.PACKS);
  };

  return (
    <div className={styles.navToPacks}>
      {!isRequestProcessing ? (
        <span onClick={onMoveToPacksList}>🡨 Back to Packs List</span>
      ) : (
        <span>Please wait for the page refresh</span>
      )}
    </div>
  );
};
