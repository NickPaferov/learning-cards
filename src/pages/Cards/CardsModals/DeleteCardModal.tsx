import React, { FC } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { CardType } from "../../../api/cards-api";
import { deleteCardTC } from "../../../bll/cards-reducer";
import styles from "./CardsModals.module.css";
import { selectCardsListName } from "../../../utils/selectors";

type PropsType = {
  packId: string | undefined;
  card: CardType | null;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const DeleteCardModal: FC<PropsType> = ({ packId, card, isOpenModal, setIsOpenModal }) => {
  const cardsListName = useAppSelector(selectCardsListName);
  const dispatch = useAppDispatch();

  const onDeleteCard = () => {
    if (packId && card) {
      dispatch(deleteCardTC(packId, card._id));
      setIsOpenModal(false);
    }
  };

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      title={"Delete pack"}
      onConfirmIntention={onDeleteCard}
      buttonTitle={"Delete"}
      autoFocus={true}
    >
      <div className={styles.clarification}>
        <span>Do you really want to remove this card from pack "{cardsListName}"?</span>
        {card && <span>Question: "{card.question}"</span>}
      </div>
    </BasicModal>
  );
};
