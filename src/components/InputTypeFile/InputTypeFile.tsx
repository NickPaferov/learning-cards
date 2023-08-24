import React, { ChangeEvent, FC, ReactNode } from "react";
import { useAppDispatch } from "../../businessLogicLayer/store";
import { setAppErrorAC } from "../../businessLogicLayer/app-reducer";
import { convertFileToBase64 } from "../../utils/convertFileToBase64";

type PropsType = {
  children: ReactNode;
  callBack: (file64: string) => void;
};

export const InputTypeFile: FC<PropsType> = ({ children, callBack }) => {
  const dispatch = useAppDispatch();

  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 1000000) {
        convertFileToBase64(file, (file64: string) => {
          callBack(file64);
        });
      } else {
        dispatch(setAppErrorAC("uploading file is too large"));
      }
    }
  };

  return (
    <label>
      <input type="file" onChange={onUploadFile} style={{ display: "none" }} />
      {children}
    </label>
  );
};
