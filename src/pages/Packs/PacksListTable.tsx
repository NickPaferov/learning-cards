import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { deletePackTC, fetchPacksTC, updatePackTC } from "../../bll/packs-reducer";
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPacksTC());
  }, [dispatch, packName, areMyPacks, currentPage, minCardsCount, maxCardsCount]);

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created By</TableCell>
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
              <TableCell align="right">{new Date(pack.updated).toLocaleString("ru-RU")}</TableCell>
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
  );
};
