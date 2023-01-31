import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { logoutTC } from "../../bll/auth-reducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import IconButton from "@mui/material/IconButton/IconButton";
import { PATHS } from "../../enums/paths";
import { selectRequestProcessingStatus } from "../../utils/selectors";

export const DropDownMenu = () => {
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onNavigateToProfile = () => {
    navigate(PATHS.PROFILE);
  };

  const onLogOut = () => {
    dispatch(logoutTC());
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color={"inherit"}
        disabled={isRequestProcessing}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={onNavigateToProfile}>Profile</MenuItem>
        <MenuItem onClick={onLogOut}>LogOut</MenuItem>
      </Menu>
    </div>
  );
};
