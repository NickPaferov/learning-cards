import React, { useState } from "react";
import { CardsListTable } from "./CardsListTable";
import styles from "./Cards.module.css";
import { useAppDispatch, useAppSelector } from "../../businessLogicLayer/store";
import {
  setCardsCountPerPageAC,
  setCardsCurrentPageAC,
} from "../../businessLogicLayer/cards-reducer";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectAreCardsFetchedStatus,
  selectCards,
  selectCardsListName,
  selectCardsCountPerPage,
  selectCardsTotalCount,
  selectCurrentCardsPage,
  selectPackUserId,
  selectRequestProcessingStatus,
  selectUserId,
} from "../../utils/selectors";
import { BackToPacks } from "../../components/BackToPacks/BackToPacks";
import { AddCardModal } from "./CardsModals/AddCardModal";
import { PaginationBlock } from "../../components/PaginationBlock/PaginationBlock";
import Button from "@mui/material/Button/Button";
import { PATHS } from "../../enums/paths";
import { CardsFilters } from "./CardsFilter";
import { limitDisplayedTextLength } from "../../utils/limitDisplayedTextLength";
import { DropDownMenu } from "../../components/DropDownMenu/DropDownMenu";
import MenuItem from "@mui/material/MenuItem";
import { LearnItemIcon } from "../../components/LearnItemIcon/LearnItemIcon";

export const Cards = () => {
  const userId = useAppSelector(selectUserId);
  const packUserId = useAppSelector(selectPackUserId);
  const cards = useAppSelector(selectCards);
  const pageSize = useAppSelector(selectCardsCountPerPage);
  const cardsTotalCount = useAppSelector(selectCardsTotalCount);
  const currentPage = useAppSelector(selectCurrentCardsPage);
  const cardsListName = useAppSelector(selectCardsListName);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const areCardsFetched = useAppSelector(selectAreCardsFetchedStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpenAddCardModal, setIsOpenAddCardModal] = useState(false);

  const { packId } = useParams();

  const onOpenAddCardModal = () => {
    setIsOpenAddCardModal(true);
  };

  const onSetCurrentPage = (page: number) => {
    dispatch(setCardsCurrentPageAC(page));
  };

  const onSetCardsCountPerPage = (itemsCountPerPage: number) => {
    dispatch(setCardsCountPerPageAC(itemsCountPerPage));
  };

  const onStartLearning = () => {
    navigate(`${PATHS.LEARN}/${packId}`);
  };

  return (
    <div className={styles.cardsList}>
      <BackToPacks />
      <div>
        <div className={styles.header}>
          <div className={styles.packMenu}>
            <h3>
              {areCardsFetched && limitDisplayedTextLength(cardsListName, 30)}
            </h3>
            {userId === packUserId && (
              <DropDownMenu>
                <MenuItem>
                  <LearnItemIcon
                    disabled={cards.length < 1 || isRequestProcessing}
                    callBack={onStartLearning}
                  />
                </MenuItem>
              </DropDownMenu>
            )}
          </div>
          {userId === packUserId ? (
            <Button
              variant="contained"
              disabled={isRequestProcessing}
              onClick={onOpenAddCardModal}
            >
              Add new card
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={isRequestProcessing || !cards.length}
              onClick={onStartLearning}
            >
              Learn pack
            </Button>
          )}
        </div>
        <CardsFilters />
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
