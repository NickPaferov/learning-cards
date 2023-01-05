import React from "react";
import { CardsListTable } from "../tables/CardsListTable";
import styles from "./Cards.module.css";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { addCardTC, setCardsCurrentPageAC } from "../bll/cards-reducer";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../App";

export const Cards = () => {
  const pageSize = useAppSelector((state) => state.cards.pageCount);
  const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount);
  const currentPage = useAppSelector((state) => state.cards.page);
  const packName = useAppSelector((state) => state.cards.packName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return (
    <div className={styles.cardsList}>
      <span className={styles.backToPacks} onClick={onMoveToPacksList}>
        🡨 Back to Packs List
      </span>
      <div className={styles.header}>
        <h3>{packName}</h3>
        <button onClick={onAddCard}>Add new card</button>
      </div>
      <div className={styles.searchQuestion}>
        <label>Search</label>
        <input type="search" />
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
