import React, { Component } from "react";
import Order from "../../components/Order/order";
import axios from "../../axios-order";
import withErrorHandler from "../../withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchOrder = [];
        for (let key in res.data) {
          fetchOrder.push({ ...res.data[key], id: key });
        }

        this.setState({ loading: false, orders: fetchOrder });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}
export default withErrorHandler(Orders, axios);
