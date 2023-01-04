import React, { ChangeEvent, useEffect, useState } from "react";
import { PacksListTable } from "../tables/PacksListTable";
import styles from "./Packs.module.css";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { RangeSlider } from "../components/RangeSlider";
import { useAppDispatch, useAppSelector } from "../bll/store";
import {
  addPackTC,
  setAreMyPacksAC,
  setPackNameSearchAC,
  setPacksCurrentPageAC,
} from "../bll/packs-reducer";

export const Packs = () => {
  const pageSize = useAppSelector((state) => state.packs.pageCount);
  const packsTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);
  const areMyPacks = useAppSelector((state) => state.packs.areMyPacks);
  const currentPage = useAppSelector((state) => state.packs.page);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);
  const dispatch = useAppDispatch();

  const [searchPack, setSearchPack] = useState("");
  const [timerId, setTimerId] = useState(0);

  const pagesCount = Math.ceil(packsTotalCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const onSetCurrentPage = (page: number) => {
    dispatch(setPacksCurrentPageAC(page));
  };

  const onAddPack = () => {
    dispatch(addPackTC({ name: "My second new pack" }));
  };

  const onChangeSearchPackName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPack(e.currentTarget.value);
  };

  useEffect(() => {
    setTimerId(
      +setTimeout(() => {
        dispatch(setPackNameSearchAC(searchPack));
      }, 2000)
    );
    clearTimeout(timerId);
  }, [dispatch, searchPack]);

  const onSetMyPacks = () => {
    dispatch(setAreMyPacksAC(true));
  };

  const onSetAllPacks = () => {
    dispatch(setAreMyPacksAC(false));
  };

  return (
    <div className={styles.packsList}>
      <div className={styles.header}>
        <h3>Packs list</h3>
        <button disabled={isRequestProcessing} onClick={onAddPack}>
          Add new pack
        </button>
      </div>
      <div className={styles.searchParams}>
        <div className={styles.searchName}>
          <label>Search</label>
          <input
            type="search"
            placeholder={"Provide your text"}
            onChange={onChangeSearchPackName}
          />
        </div>
        <div className={styles.whoseArePacks}>
          <label>Show packs cards</label>
          <div>
            <button
              className={`${styles.btn} ${areMyPacks && styles.activeBtn}`}
              onClick={onSetMyPacks}
            >
              My
            </button>
            <button
              className={`${styles.btn} ${!areMyPacks && styles.activeBtn}`}
              onClick={onSetAllPacks}
            >
              All
            </button>
          </div>
        </div>
        <RangeSlider />
        <button>
          <FilterAltOffIcon />
        </button>
      </div>
      <PacksListTable />
      {pages.map((p, index) => (
        <span
          key={index}
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
