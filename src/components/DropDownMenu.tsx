import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../bll/store";
import { logoutTC } from "../bll/auth-reducer";

export const DropDownMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickHandler = () => {
    setIsMenuOpen(true);
  };

  const navigateToProfile = () => {
    navigate("/profile");
    setIsMenuOpen(false);
  };

  const logOut = () => {
    dispatch(logoutTC());
  };

  return (
    <div>
      {isMenuOpen ? (
        <div>
          <div onClick={navigateToProfile}>Profile</div>
          <div onClick={logOut}>LogOut</div>
        </div>
      ) : (
        <div onClick={onClickHandler}>☰</div>
      )}
    </div>
  );
};
