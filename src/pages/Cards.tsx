import React from "react";
import { CardsListTable } from "../tables/CardsListTable";
import styles from "./Cards.module.css";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { addCardTC, fetchCardsTC, setCardsCurrentPageAC } from "../bll/cards-reducer";

export const Cards = () => {
  const pageSize = useAppSelector((state) => state.cards.pageCount);
  const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount);
  const currentPage = useAppSelector((state) => state.cards.page);
  const dispatch = useAppDispatch();

  const pagesCount = Math.ceil(cardsTotalCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const onSetCurrentPage = (page: number) => {
    dispatch(setCardsCurrentPageAC(page));
    dispatch(fetchCardsTC());
  };

  const onAddCard = () => {
    dispatch(
      addCardTC({
        cardsPack_id: "63a9a657e55132182084ce35",
        question: "What is the highest mountain?",
        answer: "Everest",
      })
    );
  };

  return (
    <div className={styles.cardsList}>
      <div className={styles.header}>
        <h3>packName</h3>
        <button onClick={onAddCard}>Add new card</button>
      </div>
      <div className={styles.searchQuestion}>
        <label>Search</label>
        <input type="search" />
      </div>
      <CardsListTable />
      {pages.map((p) => (
        <span
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
