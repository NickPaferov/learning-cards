import React, { FC } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import { useAppDispatch } from "../../../businessLogicLayer/store";
import { deletePackTC } from "../../../businessLogicLayer/packs-reducer";
import { PackType } from "../../../api/packs-api";
import styles from "./PacksModals.module.css";
import { limitDisplayedTextLength } from "../../../utils/limitDisplayedTextLength";

type PropsType = {
  pack: null | PackType;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const DeletePackModal: FC<PropsType> = ({
  pack,
  isOpenModal,
  setIsOpenModal,
}) => {
  const dispatch = useAppDispatch();

  const onDeletePack = () => {
    if (pack) {
      dispatch(deletePackTC(pack._id));
      setIsOpenModal(false);
    }
  };

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      title={"Delete pack"}
      onConfirmIntention={onDeletePack}
      buttonColor={"error"}
      buttonTitle={"Delete"}
      autoFocus={true}
    >
      <div className={styles.clarification}>
        <span>
          Do you really want to remove pack{" "}
          {pack ? `"${limitDisplayedTextLength(pack.name, 30)}"` : "this pack"}?
        </span>
        <div className={styles.packCover}>
          {pack && pack.deckCover && (
            <img
              style={{ maxWidth: "200px" }}
              alt="cover"
              src={pack.deckCover}
            />
          )}
        </div>
        {pack && pack.cardsCount > 0 && <span>All cards will be deleted.</span>}
      </div>
    </BasicModal>
  );
};
