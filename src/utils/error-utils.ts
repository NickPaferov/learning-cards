import { setAppErrorAC, SetAppErrorType } from "../bll/app-reducer";
import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";

export const handleError = (e: unknown, dispatch: Dispatch<SetAppErrorType>) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message;
    dispatch(setAppErrorAC(error));
  } else {
    dispatch(setAppErrorAC("some error has occurred"));
  }
};
