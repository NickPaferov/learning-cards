import React, { ChangeEvent, useEffect, useState } from "react";
import { PacksListTable } from "./PacksListTable";
import styles from "./Packs.module.css";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { RangeSlider } from "../../components/RangeSlider/RangeSlider";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  setAreMyPacksAC,
  setPackNameSearchAC,
  setPacksCurrentPageAC,
  setResetAllPacksFiltersAC,
} from "../../bll/packs-reducer";
import { useDebounce } from "../../hooks/useDebounce";
import {
  selectAreMyPacksStatus,
  selectCurrentPacksPage,
  selectPackName,
  selectPacksPageSize,
  selectPacksTotalCount,
  selectRequestProcessingStatus,
} from "../../utils/selectors";
import { AddPackModal } from "./PacksModals/AddPackModal";

export const Packs = () => {
  const pageSize = useAppSelector(selectPacksPageSize);
  const packsTotalCount = useAppSelector(selectPacksTotalCount);
  const areMyPacks = useAppSelector(selectAreMyPacksStatus);
  const currentPage = useAppSelector(selectCurrentPacksPage);
  const packName = useAppSelector(selectPackName);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const dispatch = useAppDispatch();

  const [isOpenAddPackModal, setOpenAddPackModal] = useState(false);
  const [searchPack, setSearchPack] = useState(packName);
  const debouncedValue = useDebounce<string>(searchPack, 1000);

  const pagesCount = Math.ceil(packsTotalCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const onSetCurrentPage = (page: number) => {
    dispatch(setPacksCurrentPageAC(page));
  };

  const onChangeSearchPackName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPack(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(setPackNameSearchAC(searchPack));
  }, [debouncedValue]);

  const onSetMyPacks = () => {
    dispatch(setAreMyPacksAC(true));
  };

  const onSetAllPacks = () => {
    dispatch(setAreMyPacksAC(false));
  };

  const onResetAllPacksFilters = () => {
    dispatch(setResetAllPacksFiltersAC());
  };

  //to clean search value in UI after reset all filters
  useEffect(() => {
    setSearchPack(packName);
  }, [packName]);

  const onOpenAddPackModal = () => {
    setOpenAddPackModal(true);
  };

  return (
    <div className={styles.packsList}>
      <div className={styles.header}>
        <h3>Packs list</h3>
        <button disabled={isRequestProcessing} onClick={onOpenAddPackModal}>
          Add new pack
        </button>
      </div>
      <div className={styles.searchParams}>
        <div className={styles.searchName}>
          <label>Search</label>
          <input
            type="search"
            value={searchPack}
            disabled={isRequestProcessing}
            placeholder={"Provide your text"}
            onChange={onChangeSearchPackName}
          />
        </div>
        <div className={styles.whoseArePacks}>
          <label>Show packs cards</label>
          <div>
            <button
              className={`${styles.btn} ${areMyPacks && styles.activeBtn}`}
              disabled={isRequestProcessing}
              onClick={onSetMyPacks}
            >
              My
            </button>
            <button
              className={`${styles.btn} ${!areMyPacks && styles.activeBtn}`}
              disabled={isRequestProcessing}
              onClick={onSetAllPacks}
            >
              All
            </button>
          </div>
        </div>
        <RangeSlider />
        <button disabled={isRequestProcessing} onClick={onResetAllPacksFilters}>
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
          onClick={() => {
            onSetCurrentPage(p);
          }}
        >
          {p}
        </span>
      ))}
      {isOpenAddPackModal && (
        <AddPackModal isOpenModal={isOpenAddPackModal} setIsOpenModal={setOpenAddPackModal} />
      )}
    </div>
  );
};
