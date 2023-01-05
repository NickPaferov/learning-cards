import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../bll/store";

type PropsType = {
  userIsAuth: boolean;
  redirectTo: string;
};

export const ProtectedRoutes = ({ userIsAuth, redirectTo }: PropsType) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return userIsAuth === isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
