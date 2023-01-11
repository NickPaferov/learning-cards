import React, { ChangeEvent, FC, useState } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import { updateCardTC } from "../../../bll/cards-reducer";
import { useAppDispatch } from "../../../bll/store";
import styles from "./CardsModals.module.css";
import { CardType } from "../../../api/cards-api";

type PropsType = {
  packId: string | undefined;
  card: CardType | null;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const EditCardModal: FC<PropsType> = ({ packId, card, isOpenModal, setIsOpenModal }) => {
  const dispatch = useAppDispatch();

  const [question, setQuestion] = useState(card ? card.question : "");
  const [answer, setAnswer] = useState(card ? card.answer : "");

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };

  const onUpdateCard = () => {
    const newQuestion = question.trim();
    const newAnswer = answer.trim();
    if (packId && card) {
      dispatch(
        updateCardTC(packId, {
          _id: card._id,
          question: newQuestion,
          answer: newAnswer,
        })
      );
      setIsOpenModal(false);
    }
  };

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      title={"Edit card"}
      onConfirmIntention={onUpdateCard}
      buttonTitle={"Save"}
    >
      <div className={styles.input}>
        <label>Question</label>
        <input
          autoFocus={true}
          placeholder="Card question"
          value={question}
          onChange={onChangeQuestion}
        />
      </div>
      <div className={styles.input}>
        <label>Answer</label>
        <input type="text" placeholder="Card answer" value={answer} onChange={onChangeAnswer} />
      </div>
    </BasicModal>
  );
};
