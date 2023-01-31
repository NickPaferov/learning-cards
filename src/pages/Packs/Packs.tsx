import React, { useState } from "react";
import { PacksListTable } from "./PacksListTable";
import styles from "./Packs.module.css";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { setPacksCountPrePageAC, setPacksCurrentPageAC } from "../../bll/packs-reducer";
import {
  selectCurrentPacksPage,
  selectPacksPageSize,
  selectPacksTotalCount,
  selectRequestProcessingStatus,
} from "../../utils/selectors";
import { AddPackModal } from "./PacksModals/AddPackModal";
import { PaginationBlock } from "../../components/PaginationBlock/PaginationBlock";
import Button from "@mui/material/Button/Button";
import { PacksFilters } from "./PacksFilters";

export const Packs = () => {
  const pageSize = useAppSelector(selectPacksPageSize);
  const packsTotalCount = useAppSelector(selectPacksTotalCount);
  const currentPage = useAppSelector(selectCurrentPacksPage);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const dispatch = useAppDispatch();

  const [isOpenAddPackModal, setOpenAddPackModal] = useState(false);

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
      <PacksFilters />
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
