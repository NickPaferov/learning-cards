import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import styles from "./PacksModals.module.css";
import { useAppDispatch } from "../../../bll/store";
import { updatePackTC } from "../../../bll/packs-reducer";
import { PackType } from "../../../api/packs-api";

type PropsType = {
  pack: null | PackType;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const EditPackModal: FC<PropsType> = ({ pack, isOpenModal, setIsOpenModal }) => {
  const [packName, setPackName] = useState(pack ? pack.name : "");
  const [privateStatus, setPrivateStatus] = useState(pack ? pack.private : false);
  const dispatch = useAppDispatch();

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value);
  };

  const onChangePackPrivateStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateStatus(e.currentTarget.checked);
  };

  const onUpdatePack = () => {
    const newPackName = packName.trim();
    if (pack) {
      dispatch(updatePackTC({ _id: pack._id, name: newPackName, private: privateStatus }));
      setIsOpenModal(false);
    }
  };

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      onUpdatePack();
    }
  };

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      title={"Edit pack"}
      label={"Name pack"}
      onConfirmIntention={onUpdatePack}
      buttonTitle={"Save"}
    >
      <div className={styles.modal}>
        <input
          autoFocus={true}
          type="text"
          placeholder="Name Pack"
          value={packName}
          className={styles.packName}
          onChange={onChangePackName}
          onKeyPress={onEnterPress}
        />
        <div>
          <input type="checkbox" checked={privateStatus} onChange={onChangePackPrivateStatus} />
          <span>Private pack</span>
        </div>
      </div>
    </BasicModal>
  );
};
