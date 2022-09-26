import CategoryButton, { interest } from "./CategoryButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PickDate from "../PickDate";
import TextField from "@mui/material/TextField";
import { defaultInterests, locations } from "../../utils/constants";
import Slider from "@mui/material/Slider";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import PickDateRange from "./PickDateRange";

const Filter = (props) => {
  const [age, setAge] = React.useState([18, 50]);
  const [groupSize, setGroupSize] = React.useState([1, 15]);
  const [date, setDate] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [interest, setInterest] = React.useState("");

  let ageChange = props.ageChange;
  let sizeChange = props.sizeChange;
  let dateChange = props.dateChange;
  let locationChange = props.locationChange;
  let interestChange = props.interestChange;

  const handleAgeChange = (event, newAge) => {
    setAge(newAge);
    ageChange(event, newAge);
  };
  const handleGroupSizeChange = (event, newSize) => {
    setGroupSize(newSize);
    sizeChange(event, newSize);
  };
  const handleDateChange = (event, date) => {
    setDate(date);
    dateChange(event, date);
  };
  const handleLocationChange = (event, newLocation) => {
    setLocation(newLocation);
    locationChange(event, newLocation);
  };

  const handleInterestChange = (event, newInterest) => {
    setInterest(newInterest);
    interestChange(event, newInterest);
  };

  return (
    <div
      className="p-3 bg-green-lighter flex justify-center items-center"
      style={{
        width: "40vh",
        borderRadius: "10px",
      }}
    >
      <div>
        <Container>
          <h4 className="pt-2 pb-2">Filtrer grupper</h4>
          <div>
            <div className="pt-1 pb-2">
              <label>Interesser</label>
              <Autocomplete
                disablePortal
                sx={{ backgroundColor: "white" }}
                options={defaultInterests}
                onChange={handleInterestChange}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    name="interest"
                    type="interest"
                    id="interest"
                    autoComplete="interest"
                    placeholder="Velg interesse"
                  />
                )}
              />
            </div>
            <div className="pt-2 pb-2">
              <label>Dato for møte</label>
              <PickDateRange onChange={handleDateChange} />
            </div>
            <div className="pt-1 pb-2">
              <label>Alder</label>
              <Slider
                min={18}
                max={50}
                getAriaLabel={() => "Aldersspenn"}
                value={age}
                color="secondary"
                onChange={handleAgeChange}
                valueLabelDisplay="auto"
              />
            </div>
            <div className="pt-1 pb-2">
              <label>Lokasjon</label>
              <Autocomplete
                disablePortal
                sx={{ backgroundColor: "white" }}
                options={locations}
                onChange={handleLocationChange}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    name="location"
                    type="location"
                    id="location"
                    autoComplete="location"
                    placeholder="Velg lokasjon"
                  />
                )}
              />
            </div>
            <div className="mt-1 pb-2">
              <label>Velg gruppestørrelse</label>
              <Slider
                min={1}
                max={15}
                getAriaLabel={() => "Aldersspenn"}
                value={groupSize}
                color="secondary"
                onChange={handleGroupSizeChange}
                valueLabelDisplay="auto"
              />
            </div>
          </div>
        </Container>
      </div>
      <div></div>
    </div>
  );
};

export default Filter;
