import React from "react";

const Button = (props) => {
  const chooseVariety = () => {
    const color = props.color;
    const outline = props.outline; //true or false, default false?
    if (!outline) {
      return "btn btn-" + color;
    }
    return "btn btn-" + color + "-outline";
  };

  const variety = chooseVariety();
  return (
    <div className={variety}>
      <button>{props.text}</button>
    </div>
  );
};

export default Button;
