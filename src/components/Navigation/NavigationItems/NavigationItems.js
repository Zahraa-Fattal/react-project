import React from "react";
import Classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = (props) => {
  return (
    <>
      <ul className={Classes.NavigationItems}>
        <NavigationItem link="/" exact>
          BurgerBuilder
        </NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
      </ul>
    </>
  );
};
export default NavigationItems;
