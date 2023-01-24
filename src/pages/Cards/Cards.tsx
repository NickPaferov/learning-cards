import React, { ChangeEvent, useEffect, useState } from "react";
import { CardsListTable } from "./CardsListTable";
import styles from "./Cards.module.css";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  setCardQuestionAC,
  setCardsCountPrePageAC,
  setCardsCurrentPageAC,
} from "../../bll/cards-reducer";
import { useParams } from "react-router-dom";
import {
  selectAreCardsFetchedStatus,
  selectCardQuestion,
  selectCards,
  selectCardsListName,
  selectCardsPageSize,
  selectCardsTotalCount,
  selectCurrentCardsPage,
  selectPackUserId,
  selectRequestProcessingStatus,
  selectUserId,
} from "../../utils/selectors";
import { useDebounce } from "../../hooks/useDebounce";
import { BackToPacks } from "../../components/BackToPacks/BackToPacks";
import { AddCardModal } from "./CardsModals/AddCardModal";
import { PaginationBlock } from "../../components/PaginationBlock/PaginationBlock";

export const Cards = () => {
  const userId = useAppSelector(selectUserId);
  const packUserId = useAppSelector(selectPackUserId);
  const cards = useAppSelector(selectCards);
  const pageSize = useAppSelector(selectCardsPageSize);
  const cardsTotalCount = useAppSelector(selectCardsTotalCount);
  const currentPage = useAppSelector(selectCurrentCardsPage);
  const cardsListName = useAppSelector(selectCardsListName);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const cardQuestion = useAppSelector(selectCardQuestion);
  const areCardsFetched = useAppSelector(selectAreCardsFetchedStatus);

  const dispatch = useAppDispatch();

  const [isOpenAddCardModal, setIsOpenAddCardModal] = useState(false);
  const [searchQuestion, setSearchQuestion] = useState(cardQuestion);
  const debouncedValue = useDebounce<string>(searchQuestion, 1000);

  const { packId } = useParams();

  const onChangeSearchCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuestion(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(setCardQuestionAC(searchQuestion));
  }, [debouncedValue]);

  const onOpenAddCardModal = () => {
    setIsOpenAddCardModal(true);
  };

  const onSetCurrentPage = (page: number) => {
    dispatch(setCardsCurrentPageAC(page));
  };

  const onSetCardsCountPerPage = (itemsCountPerPage: number) => {
    dispatch(setCardsCountPrePageAC(itemsCountPerPage));
  };

  return (
    <div className={styles.cardsList}>
      <BackToPacks />
      <div>
        <div className={styles.header}>
          <h3>{areCardsFetched && cardsListName}</h3>
          {userId === packUserId ? (
            <button disabled={isRequestProcessing} onClick={onOpenAddCardModal}>
              Add new card
            </button>
          ) : (
            <button disabled={isRequestProcessing || !cards.length}>Learn to pack</button>
          )}
        </div>
        <div className={styles.searchQuestion}>
          <label>Search</label>
          <input
            type="search"
            placeholder="Provide your text"
            value={searchQuestion}
            disabled={isRequestProcessing}
            onChange={onChangeSearchCardQuestion}
          />
        </div>
        <CardsListTable />
        <PaginationBlock
          itemsTotalCount={cardsTotalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onSetCurrentPage={onSetCurrentPage}
          onSetItemsCountPerPage={onSetCardsCountPerPage}
          itemsName="cards"
        />
        {isOpenAddCardModal && (
          <AddCardModal
            packId={packId}
            isOpenModal={isOpenAddCardModal}
            setIsOpenModal={setIsOpenAddCardModal}
          />
        )}
      </div>
    </div>
  );
};
