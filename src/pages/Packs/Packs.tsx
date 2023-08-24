import React, { useState } from "react";
import { PacksListTable } from "./PacksListTable";
import styles from "./Packs.module.css";
import { useAppDispatch, useAppSelector } from "../../businessLogicLayer/store";
import {
  setPacksCountPrePageAC,
  setPacksCurrentPageAC,
} from "../../businessLogicLayer/packs-reducer";
import {
  selectCurrentPacksPage,
  selectPacksCountPerPage,
  selectPacksTotalCount,
  selectRequestProcessingStatus,
} from "../../utils/selectors";
import { AddPackModal } from "./PacksModals/AddPackModal";
import { PaginationBlock } from "../../components/PaginationBlock/PaginationBlock";
import Button from "@mui/material/Button/Button";
import { PacksFilters } from "./PacksFilters";
import { useSearchParams } from "react-router-dom";

export const Packs = () => {
  const pageSize = useAppSelector(selectPacksCountPerPage);
  const packsTotalCount = useAppSelector(selectPacksTotalCount);
  const currentPage = useAppSelector(selectCurrentPacksPage);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const dispatch = useAppDispatch();

  const [isOpenAddPackModal, setOpenAddPackModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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
        <Button
          variant="contained"
          disabled={isRequestProcessing}
          onClick={onOpenAddPackModal}
        >
          Add new pack
        </Button>
      </div>
      <PacksFilters setSearchParams={setSearchParams} />
      <PacksListTable searchParams={searchParams} />
      <PaginationBlock
        itemsTotalCount={packsTotalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onSetCurrentPage={onSetCurrentPage}
        onSetItemsCountPerPage={onSetPacksCountPerPage}
        itemsName="packs"
      />
      {isOpenAddPackModal && (
        <AddPackModal
          isOpenModal={isOpenAddPackModal}
          setIsOpenModal={setOpenAddPackModal}
        />
      )}
    </div>
  );
};
