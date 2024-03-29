import React from "react";
import Classes from "./buildControl.module.css";
const buildControl = (props) => {
  return (
    <div className={Classes.BuildControl}>
      <div className={Classes.Label}>{props.label}</div>
      <button className={Classes.More} onClick={props.added}>
        More
      </button>
      <button
        className={Classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
    </div>
  );
};
export default buildControl;
