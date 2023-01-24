import React, { FC } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import IconButton from "@mui/material/IconButton/IconButton";
import { useAppSelector } from "../../bll/store";
import { selectRequestProcessingStatus } from "../../utils/selectors";

type PropsType = {
  callBack: () => void;
};

export const EditItemIcon: FC<PropsType> = ({ callBack }) => {
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  return (
    <IconButton disabled={isRequestProcessing} onClick={callBack}>
      <BorderColorOutlinedIcon />
    </IconButton>
  );
};
