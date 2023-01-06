import React, { ChangeEvent, useEffect, useState } from "react";
import { CardsListTable } from "./CardsListTable";
import styles from "./Cards.module.css";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { addCardTC, setCardQuestionAC, setCardsCurrentPageAC } from "../../bll/cards-reducer";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../app/App";
import {
  selectCardQuestion,
  selectCardsListName,
  selectCardsPageSize,
  selectCardsTotalCount,
  selectCurrentCardsPage,
  selectRequestProcessingStatus,
} from "../../utils/selectors";
import { useDebounce } from "../../hooks/useDebounce";

export const Cards = () => {
  const pageSize = useAppSelector(selectCardsPageSize);
  const cardsTotalCount = useAppSelector(selectCardsTotalCount);
  const currentPage = useAppSelector(selectCurrentCardsPage);
  const cardsListName = useAppSelector(selectCardsListName);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const cardQuestion = useAppSelector(selectCardQuestion);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchQuestion, setSearchQuestion] = useState(cardQuestion);
  const debouncedValue = useDebounce<string>(searchQuestion, 1000);

  const { packId } = useParams();

  const pagesCount = Math.ceil(cardsTotalCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const onSetCurrentPage = (page: number) => {
    dispatch(setCardsCurrentPageAC(page));
  };

  const onAddCard = () => {
    dispatch(
      addCardTC({
        cardsPack_id: packId,
        question: "What is the highest mountain?",
        answer: "Everest",
      })
    );
  };

  const onMoveToPacksList = () => {
    navigate(PATHS.PACKS);
  };

  const onChangeSearchCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuestion(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(setCardQuestionAC(searchQuestion));
  }, [debouncedValue]);

  return (
    <div className={styles.cardsList}>
      <span className={styles.backToPacks} onClick={onMoveToPacksList}>
        🡨 Back to Packs List
      </span>
      <div className={styles.header}>
        <h3>{cardsListName}</h3>
        <button disabled={isRequestProcessing} onClick={onAddCard}>
          Add new card
        </button>
      </div>
      <div className={styles.searchQuestion}>
        <label>Search</label>
        <input
          type="search"
          placeholder="Provide your text"
          value={searchQuestion}
          disabled={isRequestProcessing}
          onChange={onChangeSearchCardQuestion}
        />
      </div>
      <CardsListTable />
      {pages.map((p, index) => (
        <span
          key={index}
          className={
            currentPage === p ? `${styles.pagination} ${styles.selectedPage}` : styles.pagination
          }
          onClick={(e) => onSetCurrentPage(p)}
        >
          {p}
        </span>
      ))}
    </div>
  );
};
