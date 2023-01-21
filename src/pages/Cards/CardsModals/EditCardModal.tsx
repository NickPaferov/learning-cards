import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import { updateCardTC } from "../../../bll/cards-reducer";
import { useAppDispatch } from "../../../bll/store";
import styles from "./CardsModals.module.css";
import { CardType } from "../../../api/cards-api";
import { InputTypeFile } from "../../../components/InputTypeFile/InputTypeFile";
import Button from "@mui/material/Button/Button";

type PropsType = {
  packId: string | undefined;
  card: CardType | null;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const EditCardModal: FC<PropsType> = ({ packId, card, isOpenModal, setIsOpenModal }) => {
  const dispatch = useAppDispatch();

  const [questionFormat, setQuestionFormat] = useState(
    card?.questionImg && card?.questionImg !== "noData" ? "image" : "text"
  );
  const [question, setQuestion] = useState(card?.question || "");
  const [questionImage, setQuestionImage] = useState(card?.questionImg || "");

  const [answerFormat, setAnswerFormat] = useState(
    card?.answerImg && card?.answerImg !== "noData" ? "image" : "text"
  );
  const [answer, setAnswer] = useState(card?.answer || "");
  const [answerImage, setAnswerImage] = useState(card?.answerImg || "");

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };

  useEffect(() => {
    if (card && questionFormat === "text") {
      setQuestionImage("noData");
      setQuestion(card.question);
    }
    if (card && questionFormat === "image") {
      setQuestionImage(card.questionImg);
      setQuestion("no question");
    }
  }, [card, questionFormat]);

  useEffect(() => {
    if (card && answerFormat === "text") {
      setAnswerImage("noData");
      setAnswer(card.answer);
    }
    if (card && answerFormat === "image") {
      setAnswerImage(card.answerImg);
      setAnswer("no answer");
    }
  }, [card, answerFormat]);

  const onUpdateCard = () => {
    const newQuestion = question.trim();
    const newAnswer = answer.trim();
    if (packId && card) {
      dispatch(
        updateCardTC(packId, {
          _id: card._id,
          question: newQuestion,
          questionImg: questionImage,
          answer: newAnswer,
          answerImg: answerImage,
        })
      );
      setIsOpenModal(false);
    }
  };

  const onSelectQuestionFormat = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuestionFormat(e.currentTarget.value);
  };

  const onUploadQuestionImage = (file64: string) => {
    setQuestionImage(file64);
  };

  const onSelectAnswerFormat = (e: ChangeEvent<HTMLSelectElement>) => {
    setAnswerFormat(e.currentTarget.value);
  };

  const onUploadAnswerImage = (file64: string) => {
    setAnswerImage(file64);
  };

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      title={"Edit card"}
      onConfirmIntention={onUpdateCard}
      buttonTitle={"Save"}
    >
      <div className={styles.selector}>
        <span>Choose a question format</span>
        <select defaultValue={questionFormat} onChange={onSelectQuestionFormat}>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
      </div>
      {questionFormat === "text" && (
        <div className={styles.input}>
          <label>Question</label>
          <input
            autoFocus={true}
            placeholder="Card question"
            value={question}
            onChange={onChangeQuestion}
          />
        </div>
      )}
      {questionFormat === "image" && (
        <InputTypeFile callBack={onUploadQuestionImage}>
          <Button style={{ width: "100%" }} variant="contained" component="span">
            Upload question image
          </Button>
        </InputTypeFile>
      )}
      <div className={styles.imageWrapper}>
        {questionFormat === "image" && questionImage && questionImage !== "noData" && (
          <img style={{ maxWidth: "200px" }} alt={"questionImage"} src={questionImage} />
        )}
      </div>
      <div className={styles.selector}>
        <span>Choose an answer format</span>
        <select defaultValue={answerFormat} onChange={onSelectAnswerFormat}>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
      </div>
      {answerFormat === "text" && (
        <div className={styles.input}>
          <label>Answer</label>
          <input type="text" placeholder="Card answer" value={answer} onChange={onChangeAnswer} />
        </div>
      )}
      {answerFormat === "image" && (
        <InputTypeFile callBack={onUploadAnswerImage}>
          <Button style={{ width: "100%" }} variant="contained" component="span">
            Upload answer image
          </Button>
        </InputTypeFile>
      )}
      <div className={styles.imageWrapper}>
        {answerFormat === "image" && answerImage && answerImage !== "noData" && (
          <img style={{ maxWidth: "200px" }} alt={"answerImage"} src={answerImage} />
        )}
      </div>
    </BasicModal>
  );
};
