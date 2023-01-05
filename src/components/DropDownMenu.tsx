import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../bll/store";
import { logoutTC } from "../bll/auth-reducer";
import { PATHS } from "../App";
import styles from "./DropDownMenu.module.css";

export const DropDownMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const navigateToProfile = () => {
    navigate(PATHS.PROFILE);
    setIsMenuOpen(false);
  };

  const logOut = () => {
    dispatch(logoutTC());
  };

  return (
    <div className={styles.dropDownMenu}>
      {isMenuOpen ? (
        <div>
          <div onClick={navigateToProfile}>Profile</div>
          <div onClick={logOut}>LogOut</div>
        </div>
      ) : (
        <div onClick={onOpenMenu}>☰</div>
      )}
    </div>
  );
};
