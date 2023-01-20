import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import styles from "./PacksModals.module.css";
import { useAppDispatch } from "../../../bll/store";
import { updatePackTC } from "../../../bll/packs-reducer";
import { PackType } from "../../../api/packs-api";
import { InputTypeFile } from "../../../components/InputTypeFile/InputTypeFile";
import Button from "@mui/material/Button/Button";

type PropsType = {
  pack: null | PackType;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const EditPackModal: FC<PropsType> = ({ pack, isOpenModal, setIsOpenModal }) => {
  const dispatch = useAppDispatch();

  const [packName, setPackName] = useState(pack ? pack.name : "");
  const [privateStatus, setPrivateStatus] = useState(pack ? pack.private : false);
  const [packCover, setPackCover] = useState(pack ? pack.deckCover : "");

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value);
  };

  const onChangePackPrivateStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateStatus(e.currentTarget.checked);
  };

  const onUpdatePack = () => {
    const newPackName = packName.trim();
    if (pack) {
      dispatch(
        updatePackTC({
          _id: pack._id,
          name: newPackName,
          deckCover: packCover,
          private: privateStatus,
        })
      );
      setIsOpenModal(false);
    }
  };

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      onUpdatePack();
    }
  };

  const onUploadPackCover = (file64: string) => {
    setPackCover(file64);
  };

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      title={"Edit pack"}
      onConfirmIntention={onUpdatePack}
      buttonTitle={"Save"}
    >
      <div className={styles.modal}>
        <label>Name pack</label>
        <input
          autoFocus={true}
          type="text"
          placeholder="Name Pack"
          value={packName}
          className={styles.packName}
          onChange={onChangePackName}
          onKeyPress={onEnterPress}
        />
        <InputTypeFile callBack={onUploadPackCover}>
          <Button style={{ width: "100%" }} variant="contained" component="span">
            Update pack cover
          </Button>
        </InputTypeFile>
        <div className={styles.packCover}>
          {packCover && <img style={{ maxWidth: "200px" }} alt="cover" src={packCover} />}
        </div>
        <div>
          <input type="checkbox" checked={privateStatus} onChange={onChangePackPrivateStatus} />
          <span>Private pack</span>
        </div>
      </div>
    </BasicModal>
  );
};
