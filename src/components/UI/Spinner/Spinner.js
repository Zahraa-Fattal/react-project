import React from "react";
import Classes from "./spinner.module.css";
const Spinner = () => {
  return (
    <>
      <div className={Classes.Lds}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};
export default Spinner;
