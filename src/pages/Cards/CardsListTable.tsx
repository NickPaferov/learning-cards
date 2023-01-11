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
  selectCurrentCardsPage,
  selectPackUserId,
  selectRequestProcessingStatus,
  selectSortCardsParam,
  selectUserId,
} from "../../utils/selectors";
import { CardType } from "../../api/cards-api";
import { EditCardModal } from "./CardsModals/EditCardModal";
import { DeleteCardModal } from "./CardsModals/DeleteCardModal";

export const CardsListTable = () => {
  const userId = useAppSelector(selectUserId);
  const packUserId = useAppSelector(selectPackUserId);
  const cards = useAppSelector(selectCards);
  const currentPage = useAppSelector(selectCurrentCardsPage);
  const cardQuestion = useAppSelector(selectCardQuestion); //for Search
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const sortCardsParam = useAppSelector(selectSortCardsParam);

  const dispatch = useAppDispatch();

  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
  const [card, setCard] = useState<CardType | null>(null);

  const { packId } = useParams();

  useEffect(() => {
    dispatch(fetchCardsTC(packId));
  }, [dispatch, currentPage, packId, cardQuestion, sortCardsParam]);

  const onSortCards = (sortBy: string) => {
    if (isRequestProcessing) {
      return;
    }
    dispatch(setSortCardsParamAC(sortCardsParam[0] === "0" ? 1 + sortBy : 0 + sortBy));
  };

  return (
    <div>
      {cards.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
                <TableCell onClick={() => onSortCards("question")}>
                  Question
                  {sortCardsParam.slice(1) === "question" &&
                    (sortCardsParam[0] === "0" ? <span>▲</span> : <span>▼</span>)}
                </TableCell>
                <TableCell align="right" onClick={() => onSortCards("answer")}>
                  Answer
                  {sortCardsParam.slice(1) === "answer" &&
                    (sortCardsParam[0] === "0" ? <span>▲</span> : <span>▼</span>)}
                </TableCell>
                <TableCell align="right" onClick={() => onSortCards("updated")}>
                  Last Updated
                  {sortCardsParam.slice(1) === "updated" &&
                    (sortCardsParam[0] === "0" ? <span>▲</span> : <span>▼</span>)}
                </TableCell>
                <TableCell align="right" onClick={() => onSortCards("grade")}>
                  Grade
                  {sortCardsParam.slice(1) === "grade" &&
                    (sortCardsParam[0] === "0" ? <span>▲</span> : <span>▼</span>)}
                </TableCell>
                {userId === packUserId && <TableCell align="right">Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map((card) => (
                <TableRow key={card._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {card.question}
                  </TableCell>
                  <TableCell align="right">{card.answer}</TableCell>
                  <TableCell align="right">
                    {new Date(card.updated).toLocaleString("ru-RU")}
                  </TableCell>
                  <TableCell align="right">{card.grade}</TableCell>
                  {userId === card.user_id && (
                    <TableCell align="right">
                      <BorderColorOutlinedIcon
                        color={isRequestProcessing ? "disabled" : "action"}
                        onClick={() => {
                          if (isRequestProcessing) {
                            return;
                          }
                          setCard(card);
                          setIsEditCardModalOpen(true);
                        }}
                      />
                      <DeleteOutlinedIcon
                        color={isRequestProcessing ? "disabled" : "action"}
                        onClick={() => {
                          if (isRequestProcessing) {
                            return;
                          }
                          setCard(card);
                          setIsDeleteCardModalOpen(true);
                        }}
                      />
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
