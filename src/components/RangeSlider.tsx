import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { setMinMaxCardsCountAC } from "../bll/packs-reducer";
import { useAppDispatch } from "../bll/store";
import styles from "./RangeSlider.module.css";

export const RangeSlider = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number[]>([0, 100]);

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
          onChange={handleChange}
          valueLabelDisplay="off"
          onMouseUp={onSetValues}
        />
        <span className={styles.value}>{value[1]}</span>
      </div>
    </Box>
  );
};
