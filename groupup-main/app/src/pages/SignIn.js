import * as React from "react";
import ReactDOM from "react-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GroupUpLogo from "./../assets/logo.svg";
import { useState, useEffect } from "react";
import { Link as routerLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../utils/firebase";

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        GroupUp Limited Inc.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  // Email in input field
  const [email, setEmail] = useState("");

  // Password in input field
  const [password, setPassword] = useState("");

  // The user variable
  const [user, loading, error] = useAuthState(auth); // get user token from website
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen if we need
      return;
    }
    if (user) navigate("/home"); // If user is logged in navigate to /home
  }, [user, loading]);

  /**
   * A function that is called when "Logg inn" button is pressed
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget); // Create a new FormData object from input fields

    setPassword(data.get("password"));
    setEmail(data.get("email"));

    // Log in with email and password
    logInWithEmailAndPassword(email, password);
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 2, bgcolor: "transparent", height: 200, width: 200 }}
            variant="square"
          >
            <img src={GroupUpLogo} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logg inn
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-post"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passord"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div id="reply" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, color: "#ffffff" }}
            >
              Logg inn
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component={routerLink}
                  variant="body2"
                  color="#009dff"
                  to="/forgot"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={routerLink} to="/signup" variant="body2">
                  {"Har du ikke bruker? Registrer deg"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}
