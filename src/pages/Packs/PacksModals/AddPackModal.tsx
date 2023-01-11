import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import styles from "./PacksModals.module.css";
import { addPackTC } from "../../../bll/packs-reducer";
import { useAppDispatch } from "../../../bll/store";

type PropsType = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const AddPackModal: FC<PropsType> = ({ isOpenModal, setIsOpenModal }) => {
  const dispatch = useAppDispatch();

  const [packName, setPackName] = useState("");
  const [privateStatus, setPrivateStatus] = useState(false);

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value);
  };

  const onChangePackPrivateStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateStatus(e.currentTarget.checked);
  };

  const onAddPack = () => {
    const newPackName = packName.trim();
    dispatch(addPackTC({ name: newPackName, private: privateStatus }));
    setPackName("");
    setPrivateStatus(false);
    setIsOpenModal(false);
  };

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      onAddPack();
    }
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
          placeholder="Name Pack"
          className={styles.packName}
          onChange={onChangePackName}
          onKeyPress={onEnterPress}
        />
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
