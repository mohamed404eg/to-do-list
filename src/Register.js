import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import { dbUser } from "./db/db";

export default function Register() {
  const [myForm, setMyForm] = useState({
    id: 1,
    name: "",
    image: null,
  });

  function handleForm(event) {
    let inputName = event.currentTarget.name;
    if (inputName === "image") {
      let imageFiles = event.currentTarget.files[0];
      setMyForm({ ...myForm, image: imageFiles });
    }

    if (inputName === "name") {
      let nameValue = event.currentTarget.value;
      setMyForm({ ...myForm, name: nameValue });
    }

    if (inputName === "Register") {
      addFriend();
    }
  }

  const [status, setStatus] = useState("");
  async function addFriend() {
    try {
      // Add the new friend!
      const id = await dbUser.dbUser.add(myForm);

      setStatus((e) => (e = 1));

      actionOk()
    } catch (error) {
      setStatus((e) => (e = 0));
      actionError(error)
    }
    
  }

  function actionOk() {
   window.location.pathname = "/"
   console.log(window.location.pathname)
  }
  function actionError(error) {
   alert(error)
  }


  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": { m: 1 },
          flexDirection: "column",
          marginTop: "30vh",
          marginBottom: "30px",
        }}
      >
        <h3>Register Local</h3>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          style={{ rowGap: "10px" }}
        >
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-aligned"
            label="Name"
            name="name"
            onChange={handleForm}
          />

          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "3px" }}
          >
            <span>image your Profile</span>
            <Button variant="outlined" style={{ height: "56px" }}>
              <label htmlFor="file-input">
                <span style={{ cursor: "pointer" }}> upload </span>
              </label>
              <label htmlFor="file-input">
                <FileUploadIcon
                  style={{
                    cursor: "pointer",
                    padding: "3px",
                    paddingTop: "7px",
                  }}
                ></FileUploadIcon>
              </label>
              <input
                hidden
                id="file-input"
                onChange={handleForm}
                name="image"
                accept=".jpg, .jpeg, .png"
                type="file"
              ></input>
            </Button>
          </div>
        </Box>

        <Button name="Register" onClick={handleForm} variant="contained">
          {" "}
          Register{" "}
        </Button>
      </Box>
    </>
  );
}
