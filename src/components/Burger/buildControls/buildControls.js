import React from "react";
import Classes from "./buildControls.module.css";
import BuildControl from "./buildControl/buildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = (props) => {
  return (
    <div className={Classes.buildControl}>
      <p>
        Current Price=<strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((clt) => (
        <BuildControl
          key={clt.label}
          label={clt.label}
          added={() => props.ingredientAdded(clt.type)}
          removed={() => props.ingredientRemoved(clt.type)}
          disabled={props.disabled[clt.type]}
        />
      ))}
      <button
        className={Classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        Order Now
      </button>
    </div>
  );
};
export default BuildControls;
