import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { setMinMaxCardsCountAC } from "../../bll/packs-reducer";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import styles from "./RangeSlider.module.css";

export const RangeSlider = () => {
  const minValue = useAppSelector((state) => state.packs.min);
  const maxValue = useAppSelector((state) => state.packs.max);
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);

  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number[]>([0, 100]);

  //to change slider values in UI after reset all filters
  useEffect(() => {
    setValue([minValue, maxValue]);
  }, [minValue, maxValue]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const onSetValues = () => {
    dispatch(setMinMaxCardsCountAC(value[0], value[1]));
  };

  return (
    <Box sx={{ width: 300 }}>
      <div className={styles.slider}>
        <span className={styles.value}>{value[0]}</span>
        <Slider
          getAriaLabel={() => "Cards count"}
          value={value}
          disabled={isRequestProcessing}
          onChange={handleChange}
          valueLabelDisplay="off"
          onMouseUp={onSetValues}
        />
        <span className={styles.value}>{value[1]}</span>
      </div>
    </Box>
  );
};
