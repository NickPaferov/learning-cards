import React, { ChangeEvent, FC } from "react";
import { Pagination } from "@mui/material";
import { useAppSelector } from "../../bll/store";
import styles from "./PaginationBlock.module.css";
import { selectRequestProcessingStatus } from "../../utils/selectors";
import { DEFAULT_PAGE } from "../../constants/constants";

type PropsType = {
  itemsTotalCount: number;
  pageSize: number;
  currentPage: number;
  onSetCurrentPage: (page: number) => void;
  onSetItemsCountPerPage: (itemsCountPerPage: number) => void;
  itemsName: string;
};

export const PaginationBlock: FC<PropsType> = ({
  itemsTotalCount,
  pageSize,
  currentPage,
  onSetCurrentPage,
  onSetItemsCountPerPage,
  itemsName,
}) => {
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const pagesCount = Math.ceil(itemsTotalCount / pageSize);

  const onChangeCurrentPage = (event: React.ChangeEvent<unknown>, page: number) => {
    onSetCurrentPage(page);
  };

  const onChangeItemsCountPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    onSetItemsCountPerPage(+e.currentTarget.value);
    onSetCurrentPage(DEFAULT_PAGE);
  };

  return (
    <div className={styles.paginationBlock}>
      <Pagination
        count={pagesCount}
        shape="rounded"
        color="primary"
        disabled={isRequestProcessing}
        page={currentPage}
        onChange={onChangeCurrentPage}
      />
      <div>
        <span>Show </span>
        <select
          disabled={isRequestProcessing}
          value={pageSize}
          onChange={onChangeItemsCountPerPage}
        >
          <option value={5}>{5}</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <span> {itemsName} per page</span>
      </div>
    </div>
  );
};
