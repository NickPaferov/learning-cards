import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  deletePackTC,
  fetchPacksTC,
  setSortPacksParamAC,
  updatePackTC,
} from "../../bll/packs-reducer";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import { PATHS } from "../../app/App";
import {
  selectAreMyPacksStatus,
  selectCurrentPacksPage,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPackName,
  selectPacks,
  selectRequestProcessingStatus,
  selectSortPacksParam,
  selectUserId,
} from "../../utils/selectors";

export const PacksListTable = () => {
  const userId = useAppSelector(selectUserId);
  const packs = useAppSelector(selectPacks);
  const areMyPacks = useAppSelector(selectAreMyPacksStatus);
  const currentPage = useAppSelector(selectCurrentPacksPage);
  const minCardsCount = useAppSelector(selectMinCardsCount);
  const maxCardsCount = useAppSelector(selectMaxCardsCount);
  const packName = useAppSelector(selectPackName);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const sortPacksParam = useAppSelector(selectSortPacksParam);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPacksTC());
  }, [dispatch, packName, areMyPacks, currentPage, minCardsCount, maxCardsCount, sortPacksParam]);

  const onDeletePack = (id: string) => {
    if (isRequestProcessing) {
      return;
    }
    dispatch(deletePackTC(id));
  };

  const onUpdatePack = (id: string) => {
    if (isRequestProcessing) {
      return;
    }
    dispatch(updatePackTC({ _id: id, name: "My second updated pack" }));
  };

  const onSortPacks = (sortBy: string) => {
    if (isRequestProcessing) {
      return;
    }
    dispatch(setSortPacksParamAC(sortPacksParam[0] === "0" ? 1 + sortBy : 0 + sortBy));
  };

  return (
    <div>
      {packs.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
                <TableCell onClick={() => onSortPacks("name")}>
                  Name
                  {sortPacksParam.slice(1) === "name" &&
                    (sortPacksParam[0] === "0" ? <span>▲</span> : <span>▼</span>)}
                </TableCell>
                <TableCell align="right" onClick={() => onSortPacks("cardsCount")}>
                  Cards
                  {sortPacksParam.slice(1) === "cardsCount" &&
                    (sortPacksParam[0] === "0" ? <span>▲</span> : <span>▼</span>)}
                </TableCell>
                <TableCell align="right" onClick={() => onSortPacks("updated")}>
                  Last Updated
                  {sortPacksParam.slice(1) === "updated" &&
                    (sortPacksParam[0] === "0" ? <span>▲</span> : <span>▼</span>)}
                </TableCell>
                <TableCell align="right" onClick={() => onSortPacks("user_name")}>
                  Created By
                  {sortPacksParam.slice(1) === "user_name" &&
                    (sortPacksParam[0] === "0" ? <span>▲</span> : <span>▼</span>)}
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packs.map((pack) => (
                <TableRow key={pack._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Link to={`${PATHS.PACKS}/${pack._id}`}>{pack.name}</Link>
                  </TableCell>
                  <TableCell align="right">{pack.cardsCount}</TableCell>
                  <TableCell align="right">
                    {new Date(pack.updated).toLocaleString("ru-RU")}
                  </TableCell>
                  <TableCell align="right">{pack.user_name}</TableCell>
                  <TableCell align="right">
                    <SchoolOutlinedIcon
                      color={pack.cardsCount < 1 || isRequestProcessing ? "disabled" : "action"}
                    />
                    {userId === pack.user_id && (
                      <BorderColorOutlinedIcon
                        color={isRequestProcessing ? "disabled" : "action"}
                        onClick={(e) => onUpdatePack(pack._id)}
                      />
                    )}
                    {userId === pack.user_id && (
                      <DeleteOutlinedIcon
                        color={isRequestProcessing ? "disabled" : "action"}
                        onClick={(e) => onDeletePack(pack._id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>No packs</div>
      )}
    </div>
  );
};
