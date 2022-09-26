import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

let groupRating = 0;
let isGiven = false;

export default function StarRating(props) {
  let name = props.name ? props.name : "gruppa";
  if (isGiven) {
    const [value, setValue] = React.useState(groupRating);
    return (
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography component="legend">Takk for din vurdering!</Typography>
        <Rating name="read-only" value={groupRating} precision={0.5} readOnly />
      </Box>
    );
  } else {
    const [value, setValue] = React.useState(0);
    return (
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography component="legend">Rate {name}</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
            groupRating = newValue;
            isGiven = true;
          }}
        />
      </Box>
    );
  }
}
