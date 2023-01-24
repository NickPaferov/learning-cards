import React, { FC } from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useAppSelector } from "../../bll/store";
import { selectRequestProcessingStatus } from "../../utils/selectors";

type PropsType = {
  callBack: () => void;
};

export const DeleteItemIcon: FC<PropsType> = ({ callBack }) => {
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  return (
    <IconButton disabled={isRequestProcessing} onClick={callBack}>
      <DeleteOutlinedIcon />
    </IconButton>
  );
};
