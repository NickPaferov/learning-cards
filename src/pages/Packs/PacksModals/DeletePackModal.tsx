import React, { FC } from "react";
import { BasicModal } from "../../../components/BasicModal/BasicModal";
import { useAppDispatch } from "../../../bll/store";
import { deletePackTC } from "../../../bll/packs-reducer";
import { PackType } from "../../../api/packs-api";

type PropsType = {
  pack: null | PackType;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
};

export const DeletePackModal: FC<PropsType> = ({ pack, isOpenModal, setIsOpenModal }) => {
  const dispatch = useAppDispatch();

  const onDeletePack = () => {
    if (pack) {
      dispatch(deletePackTC(pack._id));
      setIsOpenModal(false);
    }
  };

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      title={"Delete pack"}
      onConfirmIntention={onDeletePack}
      buttonTitle={"Delete"}
      autoFocus={true}
    >
      <div>
        <span>Do you really want to remove {pack ? pack.name : "this pack"}?</span>
        <span>All cards will be deleted.</span>
      </div>
    </BasicModal>
  );
};
