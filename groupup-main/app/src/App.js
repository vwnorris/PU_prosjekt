import db from "./utils/firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";
import ExploreGroups from "./pages/ExploreGroups";
import SignIn from "./pages/SignIn";
import WithNav from "./utils/WithNav";
import WithoutNav from "./utils/WithoutNav";
import SignUp from "./pages/SignUp";
import Event from "./pages/Event";
import ForgotPassword from "./pages/ForgotPassword";

/* Color palette in MUI */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#8bb174",
    },
    secondary: {
      main: "#a266c7",
    },
    info: {
      main: "#fff",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<ForgotPassword />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/home" element={<Home />} />
            <Route path="/groups" element={<ExploreGroups />} />
            <Route path="/event" element={<Event />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
