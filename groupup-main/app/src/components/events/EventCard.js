import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GroupAttribute from "../groups/GroupAttribute";
import StarRating from "../StarRating";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function EventCard(props) {
  const ShowStars = (props) => {
    let show = props.show;
    if (show) {
      return <StarRating name={props.name} />;
    } else {
      return <></>;
    }
  };

  return (
    <div className="p-5">
      <Card sx={{ maxWidth: 250 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <div className="p-0 pb-1 ml-0 mr-0 flex justify-left max-w-max items-center border-b-1">
            <GroupAttribute text={props.date} type="calendar"></GroupAttribute>
            <GroupAttribute
              text={props.location}
              type="location"
            ></GroupAttribute>
          </div>
          <Typography variant="body1" component="div" className="m-1 p-1">
            <p>Din Gruppe</p>
            <h4>{props.groupName1}</h4>
          </Typography>
          <div className="text-center">
            <FavoriteIcon fontSize="medium" color="secondary" />
          </div>
          <Typography variant="body1" component="div" className="m-1 p-1">
            <p>Skal på date med...</p>
            <h4>{props.groupName2 ? props.groupName2 : "Ingen enda..."}</h4>
          </Typography>
          <ShowStars
            show={props.groupName2 ? true : false}
            name={props.groupName2}
          />
        </CardContent>
      </Card>
    </div>
  );
}
