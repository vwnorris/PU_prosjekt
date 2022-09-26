import Grid from "@mui/material/Grid";
import Card from "../components/explore/EventResult";
import Container from "@mui/material/Container";
import CreateEvent from "../components/events/CreateEvent";

const Event = () => {
  return (
    <Container maxWidth="xl">
      <div>
        <Container>
          <div className="flex p-2 mt-4 justify-center">
            <CreateEvent />
          </div>
          <Card />
        </Container>
      </div>
    </Container>
  );
};

export default Event;
