import * as React from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function BasicDateRangePicker(onChange) {
  const [value, setValue] = React.useState([null, null]);

  const onDateChange = (event) => {
    onChange.onChange(event, value);
    setValue(event);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Fra"
        endText="Til"
        value={value}
        onChange={onDateChange}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField
              sx={{ backgroundColor: "white", marginRight: 2 }}
              color="secondary"
              {...startProps}
            />
            <TextField
              sx={{ backgroundColor: "white" }}
              color="secondary"
              {...endProps}
            />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
