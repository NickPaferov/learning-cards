import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { fetchCardsTC, setAreCardsFetchedAC, setSortCardsParamAC } from "../../bll/cards-reducer";
import { useParams } from "react-router-dom";
import {
  selectAreCardsFetchedStatus,
  selectCardQuestion,
  selectCards,
  selectCardsCountPerPage,
  selectCurrentCardsPage,
  selectPackUserId,
  selectRequestProcessingStatus,
  selectSortCardsParam,
  selectUserId,
} from "../../utils/selectors";
import { CardType } from "../../api/cards-api";
import { EditCardModal } from "./CardsModals/EditCardModal";
import { DeleteCardModal } from "./CardsModals/DeleteCardModal";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { EditItemIcon } from "../../components/EditItemIcon/EditItemIcon";
import { DeleteItemIcon } from "../../components/DeleteItemIcon/DeleteItemIcon";
import { limitDisplayedTextLength } from "../../utils/limitDisplayedTextLength";

export const CardsListTable = () => {
  const userId = useAppSelector(selectUserId);
  const packUserId = useAppSelector(selectPackUserId);
  const cards = useAppSelector(selectCards);
  const currentPage = useAppSelector(selectCurrentCardsPage);
  const cardQuestion = useAppSelector(selectCardQuestion); // for Search
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const cardsCountPerPage = useAppSelector(selectCardsCountPerPage);
  const sortCardsParam = useAppSelector(selectSortCardsParam);
  const areCardsFetched = useAppSelector(selectAreCardsFetchedStatus);

  const dispatch = useAppDispatch();

  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
  const [card, setCard] = useState<CardType | null>(null);

  const { packId } = useParams();

  useEffect(() => {
    if (packId) {
      dispatch(fetchCardsTC(packId));
    }
    return () => {
      dispatch(setAreCardsFetchedAC(false));
    };
  }, [dispatch, currentPage, packId, cardQuestion, sortCardsParam, cardsCountPerPage]);

  const onSortCards = (sortBy: string) => {
    if (isRequestProcessing) {
      return;
    }
    dispatch(setSortCardsParamAC(sortCardsParam[0] === "0" ? 1 + sortBy : 0 + sortBy));
  };

  const onOpenEditCardModal = (card: CardType) => {
    setCard(card);
    setIsEditCardModalOpen(true);
  };

  const onOpenDeleteCardModal = (card: CardType) => {
    setCard(card);
    setIsDeleteCardModalOpen(true);
  };

  const sortCardsDirection = sortCardsParam[0] === "0" ? <span>▲</span> : <span>▼</span>;

  return (
    <div>
      {areCardsFetched && cards.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
                <TableCell align="left" onClick={() => onSortCards("question")}>
                  Question
                  {sortCardsParam.slice(1) === "question" && sortCardsDirection}
                </TableCell>
                <TableCell align="left" onClick={() => onSortCards("answer")}>
                  Answer
                  {sortCardsParam.slice(1) === "answer" && sortCardsDirection}
                </TableCell>
                <TableCell align="left" onClick={() => onSortCards("updated")}>
                  Last Updated
                  {sortCardsParam.slice(1) === "updated" && sortCardsDirection}
                </TableCell>
                <TableCell align="left" onClick={() => onSortCards("grade")}>
                  Grade
                  {sortCardsParam.slice(1) === "grade" && sortCardsDirection}
                </TableCell>
                {userId === packUserId && <TableCell align="left">Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map((card) => (
                <TableRow key={card._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={{ maxWidth: 200 }} align="left" component="th" scope="row">
                    {card.questionImg && card.questionImg !== "noData" ? (
                      <img
                        style={{ maxWidth: "100%", height: "100px" }}
                        alt="questionImg"
                        src={card.questionImg}
                      />
                    ) : (
                      limitDisplayedTextLength(card.question, 30)
                    )}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200 }} align="left">
                    {card.answerImg && card.answerImg !== "noData" ? (
                      <img
                        style={{ maxWidth: "100%", height: "100px" }}
                        alt="answerImg"
                        src={card.answerImg}
                      />
                    ) : (
                      limitDisplayedTextLength(card.answer, 30)
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(card.updated).toLocaleString("ru-RU")}
                  </TableCell>
                  <TableCell align="left">
                    <Rating name="grade" value={card.grade} precision={0.1} readOnly />
                  </TableCell>
                  {userId === card.user_id && (
                    <TableCell align="left">
                      <EditItemIcon callBack={() => onOpenEditCardModal(card)} />
                      <DeleteItemIcon callBack={() => onOpenDeleteCardModal(card)} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : !isRequestProcessing ? (
        <div>No cards</div>
      ) : (
        <CircularProgress />
      )}
      {isEditCardModalOpen && (
        <EditCardModal
          packId={packId}
          card={card}
          isOpenModal={isEditCardModalOpen}
          setIsOpenModal={setIsEditCardModalOpen}
        />
      )}
      {isDeleteCardModalOpen && (
        <DeleteCardModal
          packId={packId}
          card={card}
          isOpenModal={isDeleteCardModalOpen}
          setIsOpenModal={setIsDeleteCardModalOpen}
        />
      )}
    </div>
  );
};
