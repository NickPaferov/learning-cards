import React, { ChangeEvent, FC, useState } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import { addCardTC } from "../../../bll/cards-reducer";
import { useAppDispatch } from "../../../bll/store";
import styles from "./CardsModals.module.css";

type PropsType = {
  packId: string | undefined;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const AddCardModal: FC<PropsType> = ({ packId, isOpenModal, setIsOpenModal }) => {
  const dispatch = useAppDispatch();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };

  const onAddCard = () => {
    const newQuestion = question.trim();
    const newAnswer = answer.trim();
    if (packId) {
      dispatch(
        addCardTC({
          cardsPack_id: packId,
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
      title={"Add new card"}
      onConfirmIntention={onAddCard}
      buttonTitle={"Save"}
    >
      <div className={styles.input}>
        <label>Question</label>
        <input autoFocus={true} placeholder="Card question" onChange={onChangeQuestion} />
      </div>
      <div className={styles.input}>
        <label>Answer</label>
        <input type="text" placeholder="Card answer" onChange={onChangeAnswer} />
      </div>
    </BasicModal>
  );
};
