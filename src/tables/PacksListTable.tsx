import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../bll/store";
import { deletePackTC, fetchPacksTC, updatePackTC } from "../bll/packs-reducer";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const PacksListTable = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const areMyPacks = useAppSelector((state) => state.packs.areMyPacks);
  const currentPage = useAppSelector((state) => state.packs.page);
  const minCardsCount = useAppSelector((state) => state.packs.min);
  const maxCardsCount = useAppSelector((state) => state.packs.max);
  const packName = useAppSelector((state) => state.packs.packName);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);
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
        {packs.length ? (
          <TableBody>
            {packs.map((pack) => (
              <TableRow key={pack._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {pack.name}
                </TableCell>
                <TableCell align="right">{pack.cardsCount}</TableCell>
                <TableCell align="right">
                  {new Date(pack.updated).toLocaleString("ru-RU")}
                </TableCell>
                <TableCell align="right">{pack.user_name}</TableCell>
                <TableCell align="right">
                  <SchoolOutlinedIcon color={isRequestProcessing ? "disabled" : "action"} />
                  {areMyPacks && (
                    <BorderColorOutlinedIcon
                      color={isRequestProcessing ? "disabled" : "action"}
                      onClick={(e) => onUpdatePack(pack._id)}
                    />
                  )}
                  {areMyPacks && (
                    <DeleteOutlinedIcon
                      color={isRequestProcessing ? "disabled" : "action"}
                      onClick={(e) => onDeletePack(pack._id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <div>No packs with the entered name were found. Change query parameters</div>
        )}
      </Table>
    </TableContainer>
  );
};
