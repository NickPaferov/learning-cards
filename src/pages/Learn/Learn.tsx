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
  setCardsCountPerPageAC,
  updateCardGradeTC,
} from "../../bll/cards-reducer";
import { BackToPacks } from "../../components/BackToPacks/BackToPacks";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Button from "@mui/material/Button/Button";
import { limitDisplayedTextLength } from "../../utils/limitDisplayedTextLength";
import {
  DEFAULT_PAGE_SIZE,
  LEARNING_CARDS_PER_PAGE,
} from "../../constants/constants";

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

  const defaultSelectedGrade = grades.filter((grade) => grade.isSelected)[0]
    .value;
  const [selectedGrade, setSelectedGrade] = useState(defaultSelectedGrade);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (packId) {
      dispatch(setCardsCountPerPageAC(LEARNING_CARDS_PER_PAGE));
      dispatch(fetchCardsTC(packId));
    }
    return () => {
      dispatch(setCardsCountPerPageAC(DEFAULT_PAGE_SIZE));
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
      dispatch(
        updateCardGradeTC(packId, { card_id: cardId, grade: selectedGrade })
      );
    }
  };

  return (
    <div className={styles.learnPage}>
      <BackToPacks />
      {areCardsFetched && card ? (
        <div>
          <div className={styles.learnPack}>
            Learn pack "{limitDisplayedTextLength(cardsListName, 30)}"
          </div>
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
                <span className={styles.questionText}>
                  Question:{" "}
                  {card && limitDisplayedTextLength(card.question, 50)}
                </span>
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
                    <span className={styles.answerText}>
                      Answer:{" "}
                      {card && limitDisplayedTextLength(card.answer, 50)}
                    </span>
                  )}
                  <span>Rate yourself:</span>
                  {grades.map((grade, index) => (
                    <div className={styles.rate} key={index}>
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
                <Button
                  className={styles.btn}
                  variant="contained"
                  autoFocus
                  onClick={() => onSetNewQuestion(card?._id)}
                >
                  Next question
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  className={styles.btn}
                  variant="contained"
                  autoFocus
                  onClick={onShowAnswerArea}
                >
                  Show answer
                </Button>
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
