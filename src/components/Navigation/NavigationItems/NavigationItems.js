import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import BurgerBuilder from "../../../containers/BurgerBuilder/BurgerBuilder";
import Checkout from "../../../containers/Checkout/Checkout";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem active link={'/'} exact comp={BurgerBuilder}>Burger Builder</NavigationItem>
      <NavigationItem link={'/checkout'} comp={Checkout}>Checkout</NavigationItem>
    </ul>
  );
};

export default navigationItems;