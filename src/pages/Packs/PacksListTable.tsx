import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { fetchPacksTC, setSortPacksParamAC } from "../../bll/packs-reducer";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../app/App";
import {
  selectAreMyPacksStatus,
  selectCurrentPacksPage,
  selectMaxCardsSearchParam,
  selectMinCardsSearchParam,
  selectPackName,
  selectPacks,
  selectPacksCountPerPage,
  selectRequestProcessingStatus,
  selectSortPacksParam,
  selectUserId,
} from "../../utils/selectors";
import { EditPackModal } from "./PacksModals/EditPackModal";
import { PackType } from "../../api/packs-api";
import { DeletePackModal } from "./PacksModals/DeletePackModal";
import IconButton from "@mui/material/IconButton/IconButton";

export const PacksListTable = () => {
  const userId = useAppSelector(selectUserId);
  const packs = useAppSelector(selectPacks);
  const areMyPacks = useAppSelector(selectAreMyPacksStatus);
  const currentPage = useAppSelector(selectCurrentPacksPage);
  const minCardsSearchParam = useAppSelector(selectMinCardsSearchParam);
  const maxCardsSearchParam = useAppSelector(selectMaxCardsSearchParam);
  const packName = useAppSelector(selectPackName); // for Search
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);
  const sortPacksParam = useAppSelector(selectSortPacksParam);
  const packsCountPerPage = useAppSelector(selectPacksCountPerPage);
  const dispatch = useAppDispatch();

  const [isOpenEditPackModal, setIsOpenEditPackModal] = useState(false);
  const [isOpenDeletePackModal, setIsOpenDeletePackModal] = useState(false);
  const [pack, setPack] = useState<null | PackType>(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPacksTC());
  }, [
    dispatch,
    packName,
    areMyPacks,
    currentPage,
    minCardsSearchParam,
    maxCardsSearchParam,
    sortPacksParam,
    packsCountPerPage,
  ]);

  const onSortPacks = (sortBy: string) => {
    if (isRequestProcessing) {
      return;
    }
    dispatch(setSortPacksParamAC(sortPacksParam[0] === "0" ? 1 + sortBy : 0 + sortBy));
  };

  const onStartLearning = (pack: PackType) => {
    navigate(`${PATHS.LEARN}/${pack._id}`);
  };

  const sortPacksDirection = sortPacksParam[0] === "0" ? <span>▲</span> : <span>▼</span>;

  return (
    <div>
      {packs.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
                <TableCell align="left" onClick={() => onSortPacks("name")}>
                  Name
                  {sortPacksParam.slice(1) === "name" && sortPacksDirection}
                </TableCell>
                <TableCell align="left" onClick={() => onSortPacks("cardsCount")}>
                  Cards
                  {sortPacksParam.slice(1) === "cardsCount" && sortPacksDirection}
                </TableCell>
                <TableCell align="left" onClick={() => onSortPacks("updated")}>
                  Last Updated
                  {sortPacksParam.slice(1) === "updated" && sortPacksDirection}
                </TableCell>
                <TableCell align="left" onClick={() => onSortPacks("user_name")}>
                  Created By
                  {sortPacksParam.slice(1) === "user_name" && sortPacksDirection}
                </TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packs.map((pack) => (
                <TableRow key={pack._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Link to={`${PATHS.CARDS}/${pack._id}`}>{pack.name}</Link>
                  </TableCell>
                  <TableCell align="left">{pack.cardsCount}</TableCell>
                  <TableCell align="left">
                    {new Date(pack.updated).toLocaleString("ru-RU")}
                  </TableCell>
                  <TableCell align="left">{pack.user_name}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      disabled={pack.cardsCount < 1 || isRequestProcessing}
                      onClick={() => onStartLearning(pack)}
                    >
                      <SchoolOutlinedIcon />
                    </IconButton>
                    {userId === pack.user_id && (
                      <IconButton
                        disabled={isRequestProcessing}
                        onClick={() => {
                          setPack(pack);
                          setIsOpenEditPackModal(true);
                        }}
                      >
                        <BorderColorOutlinedIcon />
                      </IconButton>
                    )}
                    {userId === pack.user_id && (
                      <IconButton
                        disabled={isRequestProcessing}
                        onClick={() => {
                          setPack(pack);
                          setIsOpenDeletePackModal(true);
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
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
      {isOpenEditPackModal && (
        <EditPackModal
          pack={pack}
          isOpenModal={isOpenEditPackModal}
          setIsOpenModal={setIsOpenEditPackModal}
        />
      )}
      {isOpenDeletePackModal && (
        <DeletePackModal
          pack={pack}
          isOpenModal={isOpenDeletePackModal}
          setIsOpenModal={setIsOpenDeletePackModal}
        />
      )}
    </div>
  );
};
