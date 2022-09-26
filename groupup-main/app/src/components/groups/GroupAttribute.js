import LocationOnIcon from "@mui/icons-material/LocationOn";
import Chip from "@mui/material/Chip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";

const GetIcon = (props) => {
  switch (props.type) {
    case "calendar":
      return (
        <>
          <Chip
            icon={<CalendarMonthIcon />}
            label={props.text ? props.text : "Ingen dato"}
            color="primary"
          />
        </>
      );
    case "group":
      return (
        <>
          <Chip
            icon={<GroupsIcon />}
            label={props.text ? props.text : ""}
            color="primary"
          />
        </>
      );
    case "location":
      return (
        <>
          <Chip
            icon={<LocationOnIcon sx={{ mr: 1 }} />}
            label={props.text ? props.text : "Ingen lokasjon"}
            color="primary"
          />
        </>
      );
  }
  return <></>;
};

const GroupAttribute = (props) => {
  return (
    <>
      <GetIcon text={props.text} type={props.type} sx={{ p: 0.5 }} />
    </>
  );
};

export default GroupAttribute;
