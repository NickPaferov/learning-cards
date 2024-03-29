import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./PacksFilter.module.css";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";
import Button from "@mui/material/Button/Button";
import { RangeSlider } from "../../components/RangeSlider/RangeSlider";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useAppDispatch, useAppSelector } from "../../businessLogicLayer/store";
import {
  selectAreMyPacksStatus,
  selectPackName,
  selectRequestProcessingStatus,
} from "../../utils/selectors";
import {
  setAreMyPacksAC,
  setPackNameSearchAC,
  setResetAllPacksFiltersAC,
} from "../../businessLogicLayer/packs-reducer";
import { useDebounce } from "../../hooks/useDebounce";

type PropsType = {
  setSearchParams: (params: { areMyPacks: string }) => void;
};

export const PacksFilters: FC<PropsType> = ({ setSearchParams }) => {
  const packName = useAppSelector(selectPackName);
  const areMyPacks = useAppSelector(selectAreMyPacksStatus);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const dispatch = useAppDispatch();

  const [searchPack, setSearchPack] = useState(packName);
  const debouncedValue = useDebounce<string>(searchPack, 1000);

  useEffect(() => {
    dispatch(setPackNameSearchAC(searchPack));
  }, [debouncedValue]);

  //to clean search value in UI after reset all filters
  useEffect(() => {
    setSearchPack(packName);
  }, [packName]);

  const onChangeSearchPackName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPack(e.currentTarget.value);
  };

  const onSetMyPacks = () => {
    dispatch(setResetAllPacksFiltersAC());
    dispatch(setPackNameSearchAC(searchPack));
    dispatch(setAreMyPacksAC(true));
    setSearchParams({ areMyPacks: "true" });
  };

  const onSetAllPacks = () => {
    dispatch(setResetAllPacksFiltersAC());
    dispatch(setPackNameSearchAC(searchPack));
    dispatch(setAreMyPacksAC(false));
    setSearchParams({ areMyPacks: "false" });
  };

  const onResetAllPacksFilters = () => {
    dispatch(setResetAllPacksFiltersAC());
    setSearchParams({ areMyPacks: "false" });
  };

  return (
    <div className={styles.searchParams}>
      <div className={styles.searchName}>
        <label>Search</label>
        <input
          type="search"
          value={searchPack}
          disabled={isRequestProcessing}
          placeholder={"Provide your text"}
          onChange={onChangeSearchPackName}
        />
      </div>
      <div className={styles.whoseArePacks}>
        <label>Show packs cards</label>
        <div>
          <ButtonGroup disabled={isRequestProcessing}>
            <Button
              variant={areMyPacks ? "contained" : "outlined"}
              onClick={onSetMyPacks}
            >
              My
            </Button>
            <Button
              variant={areMyPacks ? "outlined" : "contained"}
              onClick={onSetAllPacks}
            >
              All
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className={styles.numbersOfCards}>
        <label>Number of cards</label>
        <RangeSlider />
      </div>
      <Button
        variant="outlined"
        disabled={isRequestProcessing}
        onClick={onResetAllPacksFilters}
      >
        <FilterAltOffIcon />
      </Button>
    </div>
  );
};
