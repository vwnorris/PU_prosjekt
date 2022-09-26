import * as React from "react";
import PlusSign from "./../../assets/icons/plus-sign.svg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { defaultInterests, friends } from "./../../utils/constants";
import { Group, groupConverter } from "./../../models/Group";
import { deprecatedPropType } from "@mui/material";
import { fetchUser } from "./../../utils/functions";
import db, { auth } from "./../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

let icon = PlusSign;
const CreateEvent = () => {
  const [currentGroup, setCurrentGroup] = useState();

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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let date = data.get("date");

    // Can be added later when we have more functionality
    let description = data.get("description");

    const createEvent = async (groupname) => {
      // Get path to group
      let path = `groups/${groupname}`;

      // Document reference to group
      let docRef = doc(db, path);

      const newFields = {
        event: date,
      };
      await updateDoc(docRef, newFields)
        .then(() => {
          alert("Event ble opprettet!");
        })
        .catch((e) => {
          console.log("Something went wrong when adding event", e);
        });
    };
    createEvent(currentGroup);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="secondary">
        Opprett event
      </Button>
      <Dialog open={open}>
        <DialogTitle sx={{ textAlign: "center" }}>Lag Event</DialogTitle>
        <DialogContent>
          <Container>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              onSubmit={handleSubmit}
            >
              <TextField required name="date" id="date" type="Date" fullWidth />

              <Autocomplete
                name="group"
                id="group"
                limitTags={2}
                options={myGroupList.map((group) => group.name)}
                onChange={(event, group) => {
                  setCurrentGroup(group);
                }}
                // getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="group"
                    id="group"
                    label="Gruppe"
                    placeholder="Velg gruppe"
                  />
                )}
                sx={{ width: "500px" }}
              />
              <TextField
                required
                fullWidth
                id="description"
                name="description"
                label="Beskrivelse"
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
                    handleClose();
                  }}
                >
                  Lag event
                </Button>
              </div>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateEvent;
