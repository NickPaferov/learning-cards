import React, { ChangeEvent, useEffect, useState } from "react";
import { PacksListTable } from "./PacksListTable";
import styles from "./Packs.module.css";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { RangeSlider } from "../../components/RangeSlider/RangeSlider";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  setAreMyPacksAC,
  setPackNameSearchAC,
  setPacksCountPrePageAC,
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
import { PaginationBlock } from "../../components/PaginationBlock/PaginationBlock";
import Button from "@mui/material/Button/Button";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";

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

  const onChangeSearchPackName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPack(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(setPackNameSearchAC(searchPack));
  }, [debouncedValue]);

  const onSetMyPacks = () => {
    dispatch(setResetAllPacksFiltersAC());
    dispatch(setPackNameSearchAC(searchPack));
    dispatch(setAreMyPacksAC(true));
  };

  const onSetAllPacks = () => {
    dispatch(setResetAllPacksFiltersAC());
    dispatch(setPackNameSearchAC(searchPack));
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

  const onSetCurrentPage = (page: number) => {
    dispatch(setPacksCurrentPageAC(page));
  };

  const onSetPacksCountPerPage = (itemsCountPerPage: number) => {
    dispatch(setPacksCountPrePageAC(itemsCountPerPage));
  };

  return (
    <div className={styles.packsList}>
      <div className={styles.header}>
        <h3>Packs list</h3>
        <Button variant="contained" disabled={isRequestProcessing} onClick={onOpenAddPackModal}>
          Add new pack
        </Button>
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
            <ButtonGroup disabled={isRequestProcessing}>
              <Button variant={areMyPacks ? "contained" : "outlined"} onClick={onSetMyPacks}>
                My
              </Button>
              <Button variant={areMyPacks ? "outlined" : "contained"} onClick={onSetAllPacks}>
                All
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className={styles.numbersOfCards}>
          <label>Number of cards</label>
          <RangeSlider />
        </div>
        <Button variant="outlined" disabled={isRequestProcessing} onClick={onResetAllPacksFilters}>
          <FilterAltOffIcon />
        </Button>
      </div>
      <PacksListTable />
      <PaginationBlock
        itemsTotalCount={packsTotalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onSetCurrentPage={onSetCurrentPage}
        onSetItemsCountPerPage={onSetPacksCountPerPage}
        itemsName="packs"
      />
      {isOpenAddPackModal && (
        <AddPackModal isOpenModal={isOpenAddPackModal} setIsOpenModal={setOpenAddPackModal} />
      )}
    </div>
  );
};
