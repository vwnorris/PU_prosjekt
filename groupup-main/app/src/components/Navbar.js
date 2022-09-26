import * as React from "react";
import ReactDOM from "react-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from "./../assets/logos/Logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import { Link } from "react-router-dom";
import db, { auth as Auth } from "./../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { fetchUser } from "./../utils/functions";

let logo = Logo;

function MenuAppBar() {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [user, loading, error] = useAuthState(Auth);
  const [name, setName] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    // Set name in navbar
    fetchUser(user).then((data) => {
      setName(data.firstname);
    });
  }, [user, loading]);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    signOut(Auth).then(() => {
      console.log("SIGNED OUT!!!");
      navigate("/");
    });
  };

  return (
    <div className="navbar">
      <Box>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <img src={logo} alt="logo" />
            <div className="menu-buttons">
              <Link to="/home">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, ml: 2, color: "#fff" }}
                >
                  <HomeIcon />
                  <p className="text-white">Hjem</p>
                </IconButton>
              </Link>
              <Link to="/groups">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, ml: 2, color: "#fff" }}
                >
                  <SearchIcon />
                  <p className="text-white">Finn gruppe</p>
                </IconButton>
              </Link>
              <Link to="/event">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, ml: 2, color: "#fff" }}
                >
                  <EventIcon />
                  <p className="text-white">Events</p>
                </IconButton>
              </Link>
            </div>
            {auth && (
              <div className="mr-8">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ flexGrow: 1, color: "#fff" }}
                >
                  <AccountCircle />
                  <p className="text-white">{name}</p>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={logout}>Sign Out</MenuItem>
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default MenuAppBar;
