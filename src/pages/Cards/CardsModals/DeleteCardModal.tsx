import React, { FC } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { CardType } from "../../../api/cards-api";
import { deleteCardTC } from "../../../bll/cards-reducer";
import styles from "./CardsModals.module.css";
import { selectCardsListName } from "../../../utils/selectors";
import { limitDisplayedTextLength } from "../../../utils/limitDisplayedTextLength";

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
      buttonColor={"error"}
      buttonTitle={"Delete"}
      autoFocus={true}
    >
      <div className={styles.clarification}>
        <span>
          Do you really want to remove this card from pack "
          {limitDisplayedTextLength(cardsListName, 30)}"?
        </span>
        {card?.questionImg && card?.questionImg !== "noData" ? (
          <div>
            <span>Question:</span>
            <div className={styles.imageWrapper}>
              <img style={{ maxWidth: "200px" }} alt={"questionImage"} src={card.questionImg} />
            </div>
          </div>
        ) : (
          <span>Question: {card && limitDisplayedTextLength(card.question, 30)}</span>
        )}
        {card?.answerImg && card?.answerImg !== "noData" ? (
          <div>
            <span>Answer:</span>
            <div className={styles.imageWrapper}>
              <img style={{ maxWidth: "200px" }} alt={"answerImage"} src={card.answerImg} />
            </div>
          </div>
        ) : (
          <span>Answer: {card && limitDisplayedTextLength(card.answer, 30)}</span>
        )}
      </div>
    </BasicModal>
  );
};
