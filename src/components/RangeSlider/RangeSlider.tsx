import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { setMinMaxCardsCountAC } from "../../bll/packs-reducer";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import styles from "./RangeSlider.module.css";
import {
  selectMaxCardsCount,
  selectMaxCardsSearchParam,
  selectMinCardsCount,
  selectMinCardsSearchParam,
  selectRequestProcessingStatus,
} from "../../utils/selectors";

export const RangeSlider = () => {
  const minCardsCount = useAppSelector(selectMinCardsCount);
  const maxCardsCount = useAppSelector(selectMaxCardsCount);
  const minCardsSearchParam = useAppSelector(selectMinCardsSearchParam);
  const maxCardsSearchParam = useAppSelector(selectMaxCardsSearchParam);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number[]>([minCardsSearchParam, maxCardsSearchParam]);

  // to set min/max slider values after server response
  useEffect(() => {
    setValue([minCardsCount, maxCardsCount]);
  }, [minCardsCount, maxCardsCount]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => {
    if (Array.isArray(value)) {
      dispatch(setMinMaxCardsCountAC(value[0], value[1]));
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <div className={styles.slider}>
        <span className={styles.value}>{value[0]}</span>
        <Slider
          getAriaLabel={() => "Cards count"}
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
