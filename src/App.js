import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Myfooter from "./Myfooter";
import Register from "./Register";
import NavBar from "./NavBar";
import MyTabs from "./MyTabs.js";
import MySnackbar from "./MySnackbar";
import MyDialogDelete from "./MyDialogDelete";
import MyProfile from "./MyProfile";
import MyLogout from "./MyLogout";
import { CheckRegistr } from "./CheckRegistr";

function App() {
  return (
    <div
      className="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md" sx={{}}>
        <CheckRegistr  />
        <NavBar></NavBar>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="/" element={<MyTabs></MyTabs>} />
          <Route path="/Profile" element={<MyProfile></MyProfile>}></Route>
          <Route path="/Logout" element={<MyLogout></MyLogout>}></Route>
        </Routes>

        <MySnackbar></MySnackbar>
        <Myfooter></Myfooter>
        <MyDialogDelete></MyDialogDelete>
      </Container>
    </div>
  );
}

export default App;
