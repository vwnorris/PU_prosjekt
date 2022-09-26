import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "./../utils/firebase.js";
import GroupUpLogo from "./../assets/logo.svg";
import Link from "@mui/material/Link";
import { Autocomplete, Modal } from "@mui/material";
import { Link as routerLink, useNavigate } from "react-router-dom";
import { defaultInterests, locations } from "./../utils/constants";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {"Copyright © GroupUp Limited Inc."}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  // The auth variable from firebase
  const auth = getAuth();

  // Email in input field
  const [email, setEmail] = useState("");

  // Password in input field
  const [password, setPassword] = useState("");

  // Interests in input field
  const [interests, setInterests] = useState([]);

  const navigate = useNavigate();

  /**
   * A function that is called when the "Lag bruker" button is clicked
   * Sends a request to the database to create a user and adds the user to the data
   * @param {@} event
   * @returns
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    if (Number(data.get("age") < 18)) {
      //age too low
      alert("Du må være over 18 år for å lage en bruker");
      return;
    }

    setEmail(data.get("email"));
    setPassword(data.get("password"));
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(res);
      console.log(email);
      console.log(password);

      // Add user to user collection with user id
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstname: data.get("firstName"),
        authProvider: "local",
        email,
        age: Number(data.get("age")),
        interest: data.get("interest"),
        location: data.get("location"),
        interests: interests,
      });
      // Send user a confirmation
      alert("Bruker opprettet!");
      sendForward();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  /**
   * Send user back to login page
   */
  const sendForward = () => {
    navigate("/", { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 1, bgcolor: "transparent", height: 200, width: 200 }}
          variant="square"
        >
          <img src={GroupUpLogo} />
        </Avatar>
        <Typography component="h1" variant="h5" id="overskrift">
          Registrer en bruker!
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Fornavn"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Etternavn"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="E-post"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Passord"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="age"
                label="Alder"
                type="age"
                id="age"
                autoComplete="age"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="combobox2"
                options={locations}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    name="location"
                    label="Sted"
                    type="location"
                    id="location"
                    autoComplete="location"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "#ffffff" }}
            color="primary"
          >
            Registrer konto
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={sendForward} color="#009dff">
                Har du allerede en konto? Logg inn.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
