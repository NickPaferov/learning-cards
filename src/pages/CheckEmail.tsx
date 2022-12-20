import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CheckEmail.module.css";
import letterImg from "../assets/images/letter.png";

type PropsType = {
  email: string;
};

export const CheckEmail = (props: PropsType) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/signin");
  };

  return (
    <div className={styles.wrapper}>
      <h2>Check Email</h2>
      <img alt="letter" src={letterImg} className={styles.letter} />
      <span className={styles.clarification}>
        We've sent an Email with instructions to {props.email}
      </span>
      <button onClick={onClickHandler}>Back to login</button>
    </div>
  );
};
