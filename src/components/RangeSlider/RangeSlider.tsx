import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { setMinMaxCardsCountAC, setPacksCurrentPageAC } from "../../bll/packs-reducer";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import styles from "./RangeSlider.module.css";
import {
  selectMaxCardsCount,
  selectMaxCardsSearchParam,
  selectMinCardsCount,
  selectMinCardsSearchParam,
  selectRequestProcessingStatus,
} from "../../utils/selectors";
import { DEFAULT_PAGE } from "../../constants/constants";

export const RangeSlider = () => {
  const minCardsCount = useAppSelector(selectMinCardsCount);
  const maxCardsCount = useAppSelector(selectMaxCardsCount);
  const minCardsSearchParam = useAppSelector(selectMinCardsSearchParam) || minCardsCount;
  const maxCardsSearchParam = useAppSelector(selectMaxCardsSearchParam) || maxCardsCount;
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number[]>([minCardsSearchParam, maxCardsSearchParam]);

  useEffect(() => {
    setValue([minCardsSearchParam, maxCardsSearchParam]);
  }, [minCardsSearchParam, maxCardsSearchParam]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => {
    if (Array.isArray(value)) {
      dispatch(setMinMaxCardsCountAC(value[0], value[1]));
      dispatch(setPacksCurrentPageAC(DEFAULT_PAGE));
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <div className={styles.slider}>
        <span className={styles.value}>{value[0]}</span>
        <Slider
          sx={{ margin: "0 20px" }}
          value={value}
          min={minCardsCount}
          max={maxCardsCount}
          disabled={isRequestProcessing}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="off"
        />
        <span className={styles.value}>{value[1]}</span>
      </div>
    </Box>
  );
};
