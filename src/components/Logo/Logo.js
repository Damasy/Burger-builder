import React from "react";
import burgerLogo from "../../assets/burger-logo.png";
import classes from "./Logo.module.css";

const logo = (props) => {
  return (
    <div className={classes.Logo} style={{height: props.height ? props.height : '100%'}}>
      <img src={burgerLogo} alt="myBurger"/>
    </div>
  );
};

export default logo;