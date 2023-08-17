import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import styles from "./PacksModals.module.css";
import { addPackTC } from "../../../bll/packs-reducer";
import { useAppDispatch } from "../../../bll/store";
import { InputTypeFile } from "../../../components/InputTypeFile/InputTypeFile";
import Button from "@mui/material/Button/Button";

type PropsType = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const AddPackModal: FC<PropsType> = ({
  isOpenModal,
  setIsOpenModal,
}) => {
  const dispatch = useAppDispatch();

  const [packName, setPackName] = useState("");
  const [privateStatus, setPrivateStatus] = useState(false);
  const [packCover, setPackCover] = useState("");

  console.log(packCover);

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value);
  };

  const onChangePackPrivateStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateStatus(e.currentTarget.checked);
  };

  const onAddPack = () => {
    const newPackName = packName.trim();
    dispatch(
      addPackTC({
        name: newPackName,
        deckCover: packCover,
        private: privateStatus,
      })
    );
    setIsOpenModal(false);
    setPackCover("");
  };

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      onAddPack();
    }
  };

  const onUploadPackCover = (file64: string) => {
    setPackCover(file64);
  };

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      title={"Add new pack"}
      onConfirmIntention={onAddPack}
      buttonTitle={"Save"}
    >
      <div className={styles.modal}>
        <label>Name pack</label>
        <input
          autoFocus={true}
          type="text"
          placeholder="Name pack"
          className={styles.packName}
          onChange={onChangePackName}
          onKeyPress={onEnterPress}
        />
        <InputTypeFile callBack={onUploadPackCover}>
          <Button
            style={{ width: "100%" }}
            variant="contained"
            component="span"
          >
            Upload pack cover
          </Button>
        </InputTypeFile>
        <div className={styles.packCover}>
          {packCover && (
            <img style={{ maxWidth: "200px" }} alt="cover" src={packCover} />
          )}
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={privateStatus}
            onChange={onChangePackPrivateStatus}
          />
          <span>Private pack</span>
        </div>
      </div>
    </BasicModal>
  );
};
