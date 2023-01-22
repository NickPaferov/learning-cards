import React, { useEffect, useState } from "react";
import styles from "./Learn.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  selectAreCardsFetchedStatus,
  selectCards,
  selectCardsListName,
  selectRequestProcessingStatus,
} from "../../utils/selectors";
import { CardType } from "../../api/cards-api";
import {
  fetchCardsTC,
  setAreCardsFetchedAC,
  setCardsCountPrePageAC,
  updateCardGradeTC,
} from "../../bll/cards-reducer";
import { BackToPacks } from "../../components/BackToPacks/BackToPacks";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const grades = [
  { value: 1, name: "Didn't know", isSelected: false },
  { value: 2, name: "Forgot", isSelected: false },
  { value: 3, name: "Thought a lot", isSelected: false },
  { value: 4, name: "Confused", isSelected: false },
  { value: 5, name: "Knew the answer", isSelected: true },
];

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + Math.pow(6 - card.grade, 2), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + Math.pow(6 - card.grade, 2);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 }
  );
  return cards[res.id + 1];
};

export const Learn = () => {
  const { packId } = useParams();
  const cards = useAppSelector(selectCards);
  const cardsListName = useAppSelector(selectCardsListName);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const areCardsFetched = useAppSelector(selectAreCardsFetchedStatus);

  const [card, setCard] = useState<CardType | null>(null);

  const [isAnswerAreaVisible, setIsAnswerAreaVisible] = useState(false);

  const defaultSelectedGrade = grades.filter((grade) => grade.isSelected)[0].value;
  const [selectedGrade, setSelectedGrade] = useState(defaultSelectedGrade);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (packId) {
      dispatch(setCardsCountPrePageAC(100));
      dispatch(fetchCardsTC(packId));
    }
    return () => {
      dispatch(setCardsCountPrePageAC(5));
      dispatch(setAreCardsFetchedAC(false));
    };
  }, [dispatch, packId]);

  useEffect(() => {
    setCard(getCard(cards));
    setIsAnswerAreaVisible(false);
  }, [dispatch, cards]);

  const onSelectGrade = (gradeValue: number) => {
    setSelectedGrade(gradeValue);
  };

  const onShowAnswerArea = () => {
    setIsAnswerAreaVisible(true);
  };

  const onSetNewQuestion = (cardId: string | undefined) => {
    if (packId && cardId) {
      dispatch(updateCardGradeTC(packId, { card_id: cardId, grade: selectedGrade }));
    }
  };

  return (
    <div className={styles.learnPage}>
      <BackToPacks />
      {areCardsFetched && card ? (
        <div>
          <div>Learn pack "{cardsListName}"</div>
          <div className={styles.wrapper}>
            <div className={styles.questionInfo}>
              {card?.questionImg && card?.questionImg !== "noData" ? (
                <div className={styles.questionImage}>
                  <span>Question:</span>
                  <img
                    style={{ maxWidth: "200px", margin: "10px 0" }}
                    alt={"questionImage"}
                    src={card.questionImg}
                  />
                </div>
              ) : (
                <span>Question: {card?.question}</span>
              )}
              <span className={styles.clarification}>
                Number of attempts to answer this question: {card?.shots}
              </span>
            </div>
            {isAnswerAreaVisible ? (
              <div>
                <div className={styles.answerArea}>
                  {card?.answerImg && card?.answerImg !== "noData" ? (
                    <div className={styles.answerImage}>
                      <span>Answer:</span>
                      <img
                        style={{ maxWidth: "200px", margin: "10px 0" }}
                        alt={"answerImage"}
                        src={card.answerImg}
                      />
                    </div>
                  ) : (
                    <span>Answer: {card?.answer}</span>
                  )}
                  <span>Rate yourself:</span>
                  {grades.map((grade, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="radio"
                          name="grade"
                          disabled={isRequestProcessing}
                          defaultChecked={grade.isSelected}
                          onChange={() => onSelectGrade(grade.value)}
                        />
                        <span>{grade.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
                <button autoFocus onClick={() => onSetNewQuestion(card?._id)}>
                  Next question
                </button>
              </div>
            ) : (
              <div>
                <button autoFocus onClick={onShowAnswerArea}>
                  Show answer
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
