import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
//import AdbIcon from '@mui/icons-material/Adb';
import BallotIcon from "@mui/icons-material/Ballot";
import LinkStyle from "@mui/material/Link";
// db
import { dbUser } from "./db/db";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
// db //

const settings = [
  {
    name: "HOME",
    path: "/",
    key: 3,
  },
  {
    name: "Profile",
    path: "Profile",
    key: 1,
  },
  {
    name: "Logout",
    path: "Logout",
    key: 2,
  },
 
];


function NavBar() {


  // get User
  let isUser;
  function CheckRegistr() {
    return (isUser = useLiveQuery(() => dbUser.dbUser.toArray()));
  }
  CheckRegistr();

  let AvatarURL;
  let UserName;
  if (isUser != undefined && isUser.length > 0) {
    if (isUser[0].image != null) {
      AvatarURL = URL.createObjectURL(isUser[0].image);
    }
    //  isUser[0].image
    UserName = isUser[0].name.split(" ")[0];
  }

  // get User \\

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    if(isUser.length !== 0) { 
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function NavBarHandelClick(event) {
    event.preventDefault();
    console.log(event.currentTarget.name);
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <BallotIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="./"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,

                color: "inherit",
                textDecoration: "none",
              }}
            >
              To Do List
            </Typography>
          </div>

          <BallotIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="./"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "1px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            To Do List
          </Typography>

          <Box sx={{ flexGrow: 0, right: "0" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="./"
              sx={{
                mr: 2,
                display: { xs: "none", md: "black", xl: "black", lg: "black" },
                fontFamily: "monospace",
                fontWeight: 700,

                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {UserName}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={UserName} src={AvatarURL} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link to={setting.path} key={setting.key} name={setting.name}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <LinkStyle component="button" variant="body2">
                      <Typography textAlign="center">{setting.name}</Typography>
                    </LinkStyle>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
