import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./CardsFilter.module.css";
import { useAppDispatch, useAppSelector } from "../../businessLogicLayer/store";
import {
  selectCardQuestion,
  selectRequestProcessingStatus,
} from "../../utils/selectors";
import { useDebounce } from "../../hooks/useDebounce";
import { setCardQuestionAC } from "../../businessLogicLayer/cards-reducer";

export const CardsFilters = () => {
  const cardQuestion = useAppSelector(selectCardQuestion);
  const isRequestProcessing = useAppSelector(selectRequestProcessingStatus);

  const dispatch = useAppDispatch();

  const [searchQuestion, setSearchQuestion] = useState(cardQuestion);
  const debouncedValue = useDebounce<string>(searchQuestion, 1000);

  useEffect(() => {
    dispatch(setCardQuestionAC(searchQuestion));
  }, [debouncedValue]);

  const onChangeSearchCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuestion(e.currentTarget.value);
  };

  return (
    <div className={styles.searchQuestion}>
      <label>Search</label>
      <input
        type="search"
        placeholder="Provide your text"
        value={searchQuestion}
        disabled={isRequestProcessing}
        onChange={onChangeSearchCardQuestion}
      />
    </div>
  );
};
