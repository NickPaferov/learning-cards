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
import { useNavigate } from "react-router-dom";
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
import noCover from "./../../assets/images/noCover.png";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { LearnItemIcon } from "../../components/LearnItemIcon/LearnItemIcon";
import { EditItemIcon } from "../../components/EditItemIcon/EditItemIcon";
import { DeleteItemIcon } from "../../components/DeleteItemIcon/DeleteItemIcon";
import { PATHS } from "../../enums/paths";

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

  const onMoveToCards = (pack: PackType) => {
    navigate(`${PATHS.CARDS}/${pack._id}`);
  };

  const onStartLearning = (pack: PackType) => {
    navigate(`${PATHS.LEARN}/${pack._id}`);
  };

  const onOpenEditPackModal = (pack: PackType) => {
    setPack(pack);
    setIsOpenEditPackModal(true);
  };

  const onOpenDeletePackModal = (pack: PackType) => {
    setPack(pack);
    setIsOpenDeletePackModal(true);
  };

  const sortPacksDirection = sortPacksParam[0] === "0" ? <span>▲</span> : <span>▼</span>;

  return (
    <div>
      {packs.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
                <TableCell align="left">Cover</TableCell>
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
                  <TableCell sx={{ maxWidth: 100 }} align="left">
                    <img style={{ maxWidth: "100%" }} alt="cover" src={pack.deckCover || noCover} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "darkblue",
                        opacity: isRequestProcessing ? "0.5" : "1",
                        fontSize: "14px",
                        textDecorationLine: "underline",
                        cursor: "pointer",
                      }}
                      disabled={isRequestProcessing}
                      onClick={() => onMoveToCards(pack)}
                    >
                      {pack.name}
                    </button>
                  </TableCell>
                  <TableCell align="left">{pack.cardsCount}</TableCell>
                  <TableCell align="left">
                    {new Date(pack.updated).toLocaleString("ru-RU")}
                  </TableCell>
                  <TableCell align="left">{pack.user_name}</TableCell>
                  <TableCell align="left">
                    <LearnItemIcon
                      disabled={pack.cardsCount < 1 || isRequestProcessing}
                      callBack={() => onStartLearning(pack)}
                    />
                    {userId === pack.user_id && (
                      <EditItemIcon callBack={() => onOpenEditPackModal(pack)} />
                    )}
                    {userId === pack.user_id && (
                      <DeleteItemIcon callBack={() => onOpenDeletePackModal(pack)} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : !isRequestProcessing ? (
        <div>No packs</div>
      ) : (
        <CircularProgress />
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
