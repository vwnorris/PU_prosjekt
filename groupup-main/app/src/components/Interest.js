const Interest = (props) => {
  const chooseVariety = () => {
    let color = props.color;
    let variety = Math.floor(Math.random() * 2);

    if (variety === 1) {
      color = "green";
    } else color = "purple";
    return "interest interest-" + color;
  };
  const variety = chooseVariety();

  return <div className="interest interest-purple">{props.text}</div>;
};
export default Interest;
