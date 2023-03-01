import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../bll/store";
import { selectLoginStatus } from "./selectors";

type PropsType = {
  userIsAuth: boolean;
  redirectTo: string;
};

export const ProtectedRoutes = ({ userIsAuth, redirectTo }: PropsType) => {
  const isLoggedIn = useAppSelector(selectLoginStatus);

  return userIsAuth === isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
