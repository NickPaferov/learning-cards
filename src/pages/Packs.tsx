import React from "react";
import { PacksListTable } from "../tables/PacksListTable";
import styles from "./Packs.module.css";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { RangeSlider } from "../components/RangeSlider";

export const Packs = () => {
  return (
    <div className={styles.packsList}>
      <div className={styles.header}>
        <h3>Packs list</h3>
        <button>Add new pack</button>
      </div>
      <div className={styles.searchParams}>
        <div className={styles.searchName}>
          <label>Search</label>
          <input type="search" />
        </div>
        <div className={styles.whoseArePacks}>
          <label>Show packs cards</label>
          <div>
            <button className={styles.btn}>My</button>
            <button className={styles.btn}>All</button>
          </div>
        </div>
        <RangeSlider />
        <button>
          <FilterAltOffIcon />
        </button>
      </div>
      <PacksListTable />
    </div>
  );
};
