import React, { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./BasicModal.module.css";
import Button from "@mui/material/Button/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

type ButtonColorType =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

type PropsType = {
  children: ReactNode;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  title: string;
  onConfirmIntention: () => void;
  buttonColor?: ButtonColorType;
  buttonTitle: string;
  autoFocus?: boolean;
};

export const BasicModal: FC<PropsType> = ({
  children,
  isOpenModal,
  setIsOpenModal,
  title,
  onConfirmIntention,
  buttonColor,
  buttonTitle,
  autoFocus,
}) => {
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <Modal open={isOpenModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <div className={styles.header}>
            <div className={styles.modalTitle}>{title}</div>
            <CloseIcon onClick={handleCloseModal} />
          </div>
          <hr />
          {children}
          <div className={styles.btnBlock}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              color={buttonColor}
              variant="contained"
              autoFocus={autoFocus}
              onClick={onConfirmIntention}
            >
              {buttonTitle}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
