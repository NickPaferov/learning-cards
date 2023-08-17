import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import { addCardTC } from "../../../bll/cards-reducer";
import { useAppDispatch } from "../../../bll/store";
import styles from "./CardsModals.module.css";
import { InputTypeFile } from "../../../components/InputTypeFile/InputTypeFile";
import Button from "@mui/material/Button/Button";

type PropsType = {
  packId: string | undefined;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const AddCardModal: FC<PropsType> = ({ packId, isOpenModal, setIsOpenModal }) => {
  const dispatch = useAppDispatch();

  const [questionFormat, setQuestionFormat] = useState("text");
  const [question, setQuestion] = useState("");
  const [questionImage, setQuestionImage] = useState("");

  const [answerFormat, setAnswerFormat] = useState("text");
  const [answer, setAnswer] = useState("");
  const [answerImage, setAnswerImage] = useState("");

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };

  useEffect(() => {
    if (questionFormat === "text") {
      setQuestionImage("");
    }
  }, [questionFormat]);

  useEffect(() => {
    if (answerFormat === "text") {
      setAnswerImage("");
    }
  }, [answerFormat]);

  const onAddCard = () => {
    const newQuestion = question.trim();
    const newAnswer = answer.trim();
    if (packId) {
      dispatch(
        addCardTC({
          cardsPack_id: packId,
          question: newQuestion,
          questionImg: questionImage,
          answer: newAnswer,
          answerImg: answerImage
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
      title={"Add new card"}
      onConfirmIntention={onAddCard}
      buttonTitle={"Save"}
    >
      <div className={styles.modal}>
        <div className={styles.selector}>
          <span>Choose a question format</span>
          <select className={styles.format} onChange={onSelectQuestionFormat}>
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>
        {questionFormat === "text" && (
          <div className={styles.input}>
            <label>Question</label>
            <input autoFocus={true} placeholder="Card question" onChange={onChangeQuestion} />
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
          {questionImage && (
            <img style={{ maxWidth: "200px" }} alt={"questionImage"} src={questionImage} />
          )}
        </div>
        <div className={styles.selector}>
          <span>Choose an answer format</span>
          <select className={styles.format} onChange={onSelectAnswerFormat}>
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>
        {answerFormat === "text" && (
          <div className={styles.input}>
            <label>Answer</label>
            <input type="text" placeholder="Card answer" onChange={onChangeAnswer} />
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
          {answerImage && <img style={{ maxWidth: "200px" }} alt={"answerImage"} src={answerImage} />}
        </div>
      </div>
    </BasicModal>
  );
};
