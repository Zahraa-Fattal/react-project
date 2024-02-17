import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import Classes from "./CheckoutSummry.module.css";
const CheckoutSummry = (props) => {
  return (
    <div className={Classes.CheckoutSummry}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};
export default CheckoutSummry;
