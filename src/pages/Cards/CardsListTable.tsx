import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { fetchCardsTC, setSortCardsParamAC } from "../../bll/cards-reducer";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useParams } from "react-router-dom";
import {
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
import IconButton from "@mui/material/IconButton/IconButton";

export const CardsListTable = () => {
  const userId = useAppSelector(selectUserId);
  const packUserId = useAppSelector(selectPackUserId);
  const cards = useAppSelector(selectCards);
  const currentPage = useAppSelector(selectCurrentCardsPage);
  const cardQuestion = useAppSelector(selectCardQuestion); // for Search
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const cardsCountPerPage = useAppSelector(selectCardsCountPerPage);
  const sortCardsParam = useAppSelector(selectSortCardsParam);

  const dispatch = useAppDispatch();

  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
  const [card, setCard] = useState<CardType | null>(null);

  const { packId } = useParams();

  useEffect(() => {
    if (packId) {
      dispatch(fetchCardsTC(packId));
    }
  }, [dispatch, currentPage, packId, cardQuestion, sortCardsParam, cardsCountPerPage]);

  const onSortCards = (sortBy: string) => {
    if (isRequestProcessing) {
      return;
    }
    dispatch(setSortCardsParamAC(sortCardsParam[0] === "0" ? 1 + sortBy : 0 + sortBy));
  };

  const sortCardsDirection = sortCardsParam[0] === "0" ? <span>▲</span> : <span>▼</span>;

  return (
    <div>
      {cards.length ? (
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
                  <TableCell align="left" component="th" scope="row">
                    {card.question}
                  </TableCell>
                  <TableCell align="left">{card.answer}</TableCell>
                  <TableCell align="left">
                    {new Date(card.updated).toLocaleString("ru-RU")}
                  </TableCell>
                  <TableCell align="left">
                    <Rating name="grade" value={card.grade} precision={0.1} readOnly />
                  </TableCell>
                  {userId === card.user_id && (
                    <TableCell align="left">
                      <IconButton
                        disabled={isRequestProcessing}
                        onClick={() => {
                          setCard(card);
                          setIsEditCardModalOpen(true);
                        }}
                      >
                        <BorderColorOutlinedIcon />
                      </IconButton>
                      <IconButton
                        disabled={isRequestProcessing}
                        onClick={() => {
                          setCard(card);
                          setIsDeleteCardModalOpen(true);
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>No cards</div>
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
