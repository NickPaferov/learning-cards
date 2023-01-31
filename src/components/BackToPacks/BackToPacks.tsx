import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackToPacks.module.css";
import { useAppSelector } from "../../bll/store";
import { selectRequestProcessingStatus } from "../../utils/selectors";
import { PATHS } from "../../enums/paths";
import Button from "@mui/material/Button/Button";

export const BackToPacks = () => {
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const navigate = useNavigate();

  const onMoveToPacksList = () => {
    navigate(PATHS.PACKS);
  };

  return (
    <div className={styles.navToPacks}>
      <Button color="inherit" disabled={isRequestProcessing} onClick={onMoveToPacksList}>
        🡨 Back to Packs List
      </Button>
    </div>
  );
};
