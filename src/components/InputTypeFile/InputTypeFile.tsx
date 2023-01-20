import React, { ChangeEvent, FC, ReactNode } from "react";
import { useAppDispatch } from "../../bll/store";
import { setAppErrorAC } from "../../bll/app-reducer";

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
        const reader = new FileReader();

        reader.onloadend = () => {
          const file64 = reader.result as string;
          callBack(file64);
        };
        reader.readAsDataURL(file);
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
