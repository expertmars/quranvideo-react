import React from "react";
import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled ? props.disabled : ""}
      className={props.btnClass ? props.btnClass : classes.btn}>
      {props.children}
    </button>
  );
};

export default Button;
