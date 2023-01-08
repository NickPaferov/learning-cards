import * as React from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  deleteCardTC,
  fetchCardsTC,
  setSortCardsParamAC,
  updateCardTC,
} from "../../bll/cards-reducer";
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

export const CardsListTable = () => {
  const userId = useAppSelector(selectUserId);
  const packUserId = useAppSelector(selectPackUserId);
  const cards = useAppSelector(selectCards);
  const currentPage = useAppSelector(selectCurrentCardsPage);
  const cardQuestion = useAppSelector(selectCardQuestion);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const sortCardsParam = useAppSelector(selectSortCardsParam);

  const dispatch = useAppDispatch();

  const { packId } = useParams();

  useEffect(() => {
    dispatch(fetchCardsTC(packId));
  }, [dispatch, currentPage, packId, cardQuestion, sortCardsParam]);

  const onUpdateCard = (id: string) => {
    if (isRequestProcessing) {
      return;
    }
    dispatch(
      updateCardTC(packId, {
        _id: id,
        question: "What is the largest island?",
        answer: "Greenland",
      })
    );
  };

  const onDeleteCard = (id: string) => {
    if (isRequestProcessing) {
      return;
    }
    dispatch(deleteCardTC(packId, id));
  };

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
                        onClick={(e) => onUpdateCard(card._id)}
                      />
                      <DeleteOutlinedIcon
                        color={isRequestProcessing ? "disabled" : "action"}
                        onClick={(e) => onDeleteCard(card._id)}
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
    </div>
  );
};
