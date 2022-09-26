import Container from "@mui/material/Container";
import Result from "../components/explore/Result";
import Grid from "@mui/material/Grid";
import Filter from "../components/explore/Filter";
import * as React from "react";

const ExploreGroups = () => {
  const [age, setAge] = React.useState([18, 100]);
  const [groupSize, setGroupSize] = React.useState([1, 100]);
  const [date, setDate] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [interest, setInterest] = React.useState("");

  const handleAgeChange = (event, newAge) => {
    setAge(newAge);
  };
  const handleSizeChange = (event, newSize) => {
    setGroupSize(newSize);
  };
  const handleDateChange = (event, newDate) => {
    console.log(event, newDate);
    setDate(newDate);
  };
  const handleLocationChange = (event, newLocation) => {
    setLocation(newLocation);
  };
  const handleInterestChange = (event, newInterest) => {
    setInterest(newInterest);
  };

  return (
    <Container maxWidth="xl">
      <div>
        <div style={{ float: "left", marginTop: "5vh" }}>
          <Filter
            ageChange={handleAgeChange}
            sizeChange={handleSizeChange}
            dateChange={handleDateChange}
            locationChange={handleLocationChange}
            interestChange={handleInterestChange}
          />
        </div>
        <div style={{ marginLeft: "45vh", marginTop: "5vh", height: "100vh" }}>
          <Container>
            <h3 className="text-center">Utforsk gruppene</h3>
            <div>
              <Grid container spacing={2}>
                <Result
                  age={age}
                  date={date}
                  interest={interest}
                  location={location}
                  groupSize={groupSize}
                />
              </Grid>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  );
};

export default ExploreGroups;
