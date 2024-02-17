import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/buildControls/buildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummery from "../../components/Burger/orderSummery/orderSummery";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6,
};
class burgerbuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://react-my-burger-daebc-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {});
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngrediends = {
      ...this.state.ingredients,
    };
    updatedIngrediends[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newprice = oldPrice + priceAddition;
    this.setState({ totalPrice: newprice, ingredients: updatedIngrediends });
    this.updatePurchaseState(updatedIngrediends);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngrediends = {
      ...this.state.ingredients,
    };
    updatedIngrediends[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newprice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newprice, ingredients: updatedIngrediends });
    this.updatePurchaseState(updatedIngrediends);
  };
  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("$");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummery = null;

    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <>
          {" "}
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchasingHandler}
          />
        </>
      );
      orderSummery = (
        <OrderSummery
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummery = <Spinner />;
    }
    return (
      <div>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummery}
        </Modal>
        {burger}
      </div>
    );
  }
}

export default withErrorHandler(burgerbuilder, axios);
