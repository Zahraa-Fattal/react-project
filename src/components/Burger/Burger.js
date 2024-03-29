import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
const burger = (props) => {
  let transformIngredients = props.ingredients
    ? Object.keys(props.ingredients)
        .map((igkey) => {
          return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngredients key={igkey + i} type={igkey} />;
          });
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, [])
    : null;
  if (transformIngredients.length === 0) {
    transformIngredients = <p>please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};
export default burger;
