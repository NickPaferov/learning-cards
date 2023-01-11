import React, { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./BasicModal.module.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type PropsType = {
  children: ReactNode;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  title: string;
  label?: string;
  onConfirmIntention: () => void;
  buttonTitle: string;
  autoFocus?: boolean;
};

export const BasicModal: FC<PropsType> = ({
  children,
  isOpenModal,
  setIsOpenModal,
  title,
  label,
  onConfirmIntention,
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
          <label>{label}</label>
          {children}
          <div className={styles.btnBlock}>
            <button onClick={handleCloseModal}>Cancel</button>
            <button autoFocus={autoFocus} onClick={onConfirmIntention}>
              {buttonTitle}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
