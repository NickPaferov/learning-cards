import React from "react";
import { CardsListTable } from "../tables/CardsListTable";
import styles from "./Cards.module.css";

export const Cards = () => {
  return (
    <div className={styles.cardsList}>
      <div className={styles.header}>
        <h3>packName</h3>
        <button>Add new card</button>
      </div>
      <div className={styles.searchQuestion}>
        <label>Search</label>
        <input type="search" />
      </div>
      <CardsListTable />
    </div>
  );
};
