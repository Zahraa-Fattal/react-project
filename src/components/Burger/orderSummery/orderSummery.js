import React, { Component } from "react";
import Button from "../../UI/Button/Button";
class OrderSummery extends Component {
  componentDidUpdate() {
    console.log("[order summary] will update");
  }
  render() {
    const ingredientsSummery = Object.keys(this.props.ingredients).map(
      (igkey) => {
        return (
          <li key={igkey}>
            <span style={{ textTransform: "capitalize" }}>{igkey}</span>:
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientsSummery}</ul>
        <p>Continue to Checkout?</p>
        <p>
          <strong>total price:{this.props.price.toFixed(2)}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </>
    );
  }
}
export default OrderSummery;
