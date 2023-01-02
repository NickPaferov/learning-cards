import React from "react";
import { PacksListTable } from "../tables/PacksListTable";
import styles from "./Packs.module.css";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { RangeSlider } from "../components/RangeSlider";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { addPackTC, fetchPacksTC, setPacksCurrentPageAC } from "../bll/packs-reducer";

export const Packs = () => {
  const pageSize = useAppSelector((state) => state.packs.pageCount);
  const packsTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);
  const currentPage = useAppSelector((state) => state.packs.page);
  const dispatch = useAppDispatch();

  const pagesCount = Math.ceil(packsTotalCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const onSetCurrentPage = (page: number) => {
    dispatch(setPacksCurrentPageAC(page));
    dispatch(fetchPacksTC());
  };

  const onAddPack = () => {
    dispatch(addPackTC({ name: "My second new pack" }));
  };

  return (
    <div className={styles.packsList}>
      <div className={styles.header}>
        <h3>Packs list</h3>
        <button onClick={onAddPack}>Add new pack</button>
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
      {pages.map((p) => (
        <span
          className={
            currentPage === p ? `${styles.pagination} ${styles.selectedPage}` : styles.pagination
          }
          onClick={(e) => {
            onSetCurrentPage(p);
          }}
        >
          {p}
        </span>
      ))}
    </div>
  );
};
