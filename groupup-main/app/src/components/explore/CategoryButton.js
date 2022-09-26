import Button from "@mui/material/Button";
import React from "react";

const CategoryButton = (props) => {
  let text = props.text;
  const [flag, setFlag] = React.useState(true);
  const handleClick = () => {
    setFlag(!flag);
  };

  return (
    <Button
      color={flag ? "info" : "secondary"}
      fullWidth
      variant={flag ? "outlined" : "contained"}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default CategoryButton;
