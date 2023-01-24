import React, { FC } from "react";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import IconButton from "@mui/material/IconButton/IconButton";

type PropsType = {
  disabled: boolean;
  callBack: () => void;
};

export const LearnItemIcon: FC<PropsType> = ({ disabled, callBack }) => {
  return (
    <IconButton disabled={disabled} onClick={callBack}>
      <SchoolOutlinedIcon />
    </IconButton>
  );
};
