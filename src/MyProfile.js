import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useEffect, useState } from "react";
import { dbUser } from "./db/db";
import { useLiveQuery } from "dexie-react-hooks";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { FUNHnadelMySnackbar } from "./MySnackbar";
export default function MyProfile() {
  const [myForm, setMyForm] = useState({
    id: 1,
    name: "",
    image: null,
  });

  // get User

  let isUser;
  function CheckRegistr() {
    return (isUser = useLiveQuery(() => dbUser.dbUser.toArray()));
  }
  CheckRegistr();

  let AvatarURL;
  let UserName;
  if (isUser != undefined && isUser.length > 0) {
    if (isUser[0].image !== null) {
      AvatarURL = URL.createObjectURL(isUser[0].image);
    }
    //  isUser[0].image
    UserName = isUser[0].name;
  }

  // get User \\

  function handleForm(event) {
    let inputName = event.currentTarget.name;
    if (inputName === "image") {
      let imageFiles = event.currentTarget.files[0];
      setMyForm({ ...myForm, image: imageFiles });
    }

    if (inputName === "name") {
      let nameValue = event.currentTarget.value;
      console.log(nameValue);
      setMyForm({ ...myForm, name: nameValue });
    }

    if (inputName === "Change") {
      ChangeUser();
    }
  }

  function ChangeUser() {
    // تحويل الحالة إلى مصفوفة وإزالة المفاتيح التي لها قيمة فارغة
    const entries = Object.entries(myForm).filter(
      ([_, value]) => value !== "" && value !== null
    );
    const newForm = Object.fromEntries(entries);

    dbUser.dbUser.update(myForm.id, newForm).then(function (updated) {
      if (updated) {
        // SetMyAlerts

        FUNHnadelMySnackbar("success", `This is a success updated`, true);
        // SetMyAlerts \\
      }
    });
  }

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <img src={AvatarURL} style={{ maxWidth: "30vw" }}></img>
        <h4>{UserName}</h4>
      </div>
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
            flexDirection: "column",
            marginTop: "100px",
            marginBottom: "30px",
          }}
        >
          <h3>Change Profile </h3>

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
              value={myForm.name}
              onChange={handleForm}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "3px",
              }}
            >
              <span>image your Profile</span>
              <Button variant="outlined" style={{ height: "56px" }}>
                <label htmlFor="file-input">
                  <span style={{ cursor: "pointer" }}>
                    {" "}
                    {myForm.image ? "uploading done" : "upload"}{" "}
                  </span>
                </label>
                <label htmlFor="file-input">
                  {myForm.image ? (
                    <CloudDoneIcon
                      style={{
                        cursor: "pointer",
                        padding: "3px",
                        paddingTop: "7px",
                      }}
                    />
                  ) : (
                    <FileUploadIcon
                      style={{
                        cursor: "pointer",
                        padding: "3px",
                        paddingTop: "7px",
                      }}
                    ></FileUploadIcon>
                  )}
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

          <Button name="Change" onClick={handleForm} variant="contained">
            {" "}
            updated{" "}
          </Button>
        </Box>
      </>
    </>
  );
}
