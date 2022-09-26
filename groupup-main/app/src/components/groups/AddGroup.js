import * as React from "react";
import PlusSign from "./../../assets/icons/plus-sign.svg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import db, { auth } from "../../utils/firebase";
import {
  setDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  where,
  query,
} from "firebase/firestore";
import { defaultInterests, locations } from "./../../utils/constants";
import { Group, groupConverter } from "./../../models/Group";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUser } from "../../utils/functions";

let icon = PlusSign;
let ageRange = [100, 18];

const AddGroup = () => {
  // Members
  const [members, setMembers] = useState([]);
  const [user, loading, error] = useAuthState(auth); // get user token from website

  const [name, setName] = useState("");
  useEffect(() => {
    if (loading) return;
    // Set name in navbar
    fetchUser(user).then((data) => {
      setName(data.firstname);
    });
  }, [user, loading]);

  // Fetch users in database to populate member choices
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const usersCollectionRef = collection(db, "users");
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((user) => user.firstname !== name)
      );
    };
    getAllUsers();
  }, [name]);

  // Interests
  const [interests, setInterests] = useState([]);

  // Locations
  const [location, setLocation] = useState([]);
  /**
   * Runs when "lag gruppe" is clicked
   * Creates a new group and pushes a new document to the database
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get("groupname");
    let description = data.get("description");
    let newGroup = new Group(name, interests, [], location, description);

    const createGroup = async () => {
      // Add group to group collection
      const groupRef = doc(db, "groups", name).withConverter(groupConverter);
      await setDoc(groupRef, newGroup)
        .then(() => {
          alert("Gruppe opprettet");
        })
        .catch((e) => {
          alert(e);
        });

      // Add group to user
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const userDocs = await getDocs(q);
      const userDocRef = userDocs.docs[0].ref;

      await updateDoc(userDocRef, {
        myGroups: arrayUnion(groupRef),
      })
        .then(() => {
          console.log("Gruppe ble lagt til bruker");
        })
        .catch((e) => {
          console.log("Something went wrong when adding group to user", e);
        });

      // Add users to group
      members.forEach(async (member) => {
        const memberQuery = query(
          collection(db, "users"),
          where("firstname", "==", member)
        );
        const memberDocs = await getDocs(memberQuery);
        const memberDocRef = memberDocs.docs[0].ref;
        const memberDoc = await getDoc(memberDocRef);
        const memberData = memberDoc.data();

        if (memberData.age < ageRange[0]) {
          ageRange[0] = memberData.age;
        } else if (memberData.age > ageRange[1]) {
          ageRange[1] = memberData.age;
        }

        await updateDoc(groupRef, {
          members: arrayUnion(userDocRef, memberDocRef),
          ageRange: ageRange,
        })
          .then(() => {
            console.log("Gruppe ble lagt til ", member);
          })
          .catch((e) => {
            console.log("Something went wrong when adding members to group", e);
          });

        // Update group for member chosen
        await updateDoc(memberDocRef, {
          myGroups: arrayUnion(groupRef),
        }).catch((e) => {
          console.log("Something went wrong when adding group to member", e);
        });
      });
    };
    createGroup();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen} className="add-group">
        <img className="p-2" src={icon} alt="add group" />
      </button>
      <p>Lag gruppe</p>
      <Dialog open={open}>
        <DialogTitle sx={{ textAlign: "center" }}>Lag Gruppe</DialogTitle>
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
              <TextField
                required
                name="groupname"
                id="groupname"
                label="Gruppenavn"
                fullWidth
              />
              <Autocomplete
                required
                multiple
                name="interests"
                id="interests"
                limitTags={2}
                options={defaultInterests}
                onChange={(event, interests) => {
                  setInterests(interests);
                }}
                // getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Interesser"
                    variant="outlined"
                    placeholder="Velg interesse"
                  />
                )}
                sx={{ width: "500px" }}
              />
              <Autocomplete
                required
                multiple
                label="Venner"
                limitTags={2}
                options={users.map((member) => member.firstname)}
                onChange={(event, members) => {
                  setMembers(members);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="members"
                    id="members"
                    label="Venner"
                    placeholder="Velg venner"
                  />
                )}
                sx={{ width: "500px" }}
              />
              <Autocomplete
                required
                name="location"
                id="location"
                options={locations}
                onChange={(event, location) => {
                  setLocation(location);
                }}
                // getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lokasjon"
                    variant="outlined"
                    placeholder="Velg lokasjon"
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
                  Lag gruppe
                </Button>
              </div>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddGroup;
