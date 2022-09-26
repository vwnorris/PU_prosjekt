import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import friends from "./../../assets/img/friends.jpg";
import Interest from "./../Interest";
import GroupAttribute from "./GroupAttribute";
import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { defaultInterests } from "./../../utils/constants";
import { locations } from "./../../utils/constants";
import db, { auth } from "./../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUser } from "../../utils/functions";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { Grid } from "@mui/material";

export default function GroupCard(props) {
  const [user, loading, error] = useAuthState(auth); // get user token from website
  const [myGroupList, setMyGroupList] = useState([]);
  useEffect(() => {
    if (loading) return;
    if (error) return;
    if (user) {
      // Fetches groups based on user
      fetchUser(user).then((data) => {
        data.myGroups.map((d) => {
          // Get each group
          getDoc(d).then((group) => {
            // Set groups, oldarr= oldarray
            setMyGroupList((oldarr) => [...oldarr, group.data()]);
          });
        });
      });
    }
  }, [user, loading]);

  const [leader, setLeader] = useState("");
  useEffect(() => {
    const getLeader = async () => {
      const doc = await getDoc(props.leader);
      const data = doc.data();
      setLeader(data.email);
    };
    getLeader();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let myGroup = data.get("myGroups");
    let description = data.get("description");

    const createMatch = async () => {
      const ref = doc(db, "groups", props.groupName);
      const newFields = { match: myGroup };
      await updateDoc(ref, newFields);
    };
    createMatch();
  };

  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
    if (props.match != null) {
      setShow(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const groupPic = props.pic;
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Match</DialogTitle>
        <DialogContent>
          {show ? (
            <Container>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1 },
                }}
                noValidate
                onSubmit={handleSubmit}
              >
                <div>{props.event}</div>
                <p>Velg hvilken av dine grupper som skal matche</p>
                <Autocomplete
                  required
                  name="myGroups"
                  label="Mine grupper"
                  options={myGroupList.map((g) => g.name)}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      type="myGroups"
                      name="myGroups"
                      label="Mine grupper"
                      id="myGroups"
                    />
                  )}
                />

                <TextField
                  fullWidth
                  type="description"
                  id="description"
                  name="description"
                  label="Kommentar"
                  multiline
                  rows={4}
                />
                <div className="flex justify-center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ margin: "5px" }}
                    onClick={handleClose}
                  >
                    Avbryt
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ margin: "5px", color: "#fff" }}
                    onClick={() => {
                      alert("Dere har matchet!");
                      handleClose();
                    }}
                  >
                    Match
                  </Button>
                </div>
              </Box>
            </Container>
          ) : null}

          {!show ? <p>Denne gruppen er dessverre booket.</p> : null}
        </DialogContent>
      </Dialog>
      <div className="hover:scale-102 p-5">
        <Card onClick={handleClickOpen} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            image={groupPic}
            alt="group avatar"
            sx={{ height: 140 }}
          />
          <CardContent>
            <div>
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="flex-start"
              >
                <Grid item flex>
                  <GroupAttribute
                    text={props.event}
                    type="calendar"
                  ></GroupAttribute>
                </Grid>
                <Grid item flex>
                  <GroupAttribute
                    text={props.location}
                    type="location"
                  ></GroupAttribute>
                </Grid>
                <Grid item flex>
                  <GroupAttribute
                    text={props.groupSize}
                    type="group"
                  ></GroupAttribute>
                </Grid>
              </Grid>
            </div>
            <Typography gutterBottom variant="h5" component="div">
              <div>{props.groupName}</div>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              paddingBottom={1}
            >
              <div>{props.description}</div>
            </Typography>
            <Typography
              variant="body1"
              borderBottom={1}
              borderTop={1}
              component="div"
            >
              <div>{leader}</div>
            </Typography>
          </CardContent>
          <CardActions>
            <div className="interests">
              {props.interest.map((element, i) => (
                <Interest key={i} color="green" text={element}></Interest>
              ))}
            </div>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
