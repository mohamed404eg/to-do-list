import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MyAlerts from "./MyAlert";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { FUNHnadelMySnackbar } from "./MySnackbar";
// api
import { dbList } from "./db/db";
// api \\

let EditHandelModel;
export default function Model({ ModelAppear, HandalModel }) {
  let [stateEditModel, SetStateEditModel] = useState(false);

  let [DataToDOList, SetDataToDOList] = useState({
    id: GenerateNumber(),
    title: "",
    body: "",
    img: null,
    done: false,
    DateCreated: GenerateDateCreated(),
  });

  // EditHandel
  let [EditHandelId, SetEditHandelId] = useState(null);
  EditHandelModel = (GetToDoList) => {
    SetDataToDOList(GetToDoList);
    HandalModel(null, true);
    SetStateEditModel(true);
    SetEditHandelId(GetToDoList.id);
  };
  // EditHandel \\

  // HandelMyAlerts

  let [DataMyAlerts, SetMyAlerts] = useState({
    props: "success",
    message: "This is a success add ",
    appear: false,
  });
  // HandelMyAlerts \\

  function GenerateNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  //  clear input
  function ClearInput() {
    SetDataToDOList({
      id: GenerateNumber(),
      title: "",
      body: "",
      img: null,
      DateCreated: null,
    });
  } //  clear input //

  async function HandalModelSand(e) {
    if (stateEditModel) {
      dbList.dbList
        .update(parseInt(EditHandelId), DataToDOList)
        .then(function (updated) {
          if (updated) {
            // SetMyAlerts

            FUNHnadelMySnackbar("success", `This is a success updated`, true);
            // SetMyAlerts \\

            ClearInput();
            HandalModel(null, false);
            setTimeout(() => {
              SetStateEditModel((e) => (e = false));
            }, 100);
          }
        });
    } else {
      try {
        // Add the new to do list
        const id = await dbList.dbList.add(DataToDOList);

        // Check if the item was added successfully
        const addedItem = await dbList.dbList.get(id);

        ClearInput();

        if (addedItem) {
          actionOk();
        } else {
          console.log("Failed to add item");
          actionError(0);
        }
      } catch (error) {}

      function actionOk() {
        // SetMyAlerts
        FUNHnadelMySnackbar("success", `This is a success add`, true);
        // SetMyAlerts \\

        HandalModel(null, false);
      }

      function actionError(error) {
        console.log(error);
      }
    }
  }

  // set GenerateDateCreated
  function GenerateDateCreated() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let DateFull = ` ${
      monthNames[date.getMonth()]
    } ${date.getDate()} , ${date.getFullYear()}`;
    return DateFull;
  }

  // set GenerateDateCreated \\

  function HandalModelDate(e) {
    let MyName = e.target.name;
    let MyValue = e.target.value;

    if (MyName === "Title") {
      SetDataToDOList({ ...DataToDOList, title: MyValue });
    }
    if (MyName === "Body") {
      SetDataToDOList({ ...DataToDOList, body: MyValue });
    }
    if (MyName === "CheckboxDone") {
      SetDataToDOList({ ...DataToDOList, done: e.target.checked });
    }

    if (MyName === "image") {
      let imageFiles = e.target.files[0];
      SetDataToDOList({ ...DataToDOList, img: imageFiles });
    }
  }

  if (ModelAppear) {
    return (
      <div>
        <Dialog name="Cancel" open={ModelAppear}>
          <DialogTitle>New To Do List</DialogTitle>
          <DialogContent>
            <DialogContentText>Write your own To Do List ✍️</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              onChange={HandalModelDate}
              name="Title"
              value={DataToDOList.title}
            />
          </DialogContent>

          <DialogContent>
            <TextField
              id="filled-multiline-static"
              label="Body"
              multiline
              rows={10}
              variant="filled"
              name="Body"
              onChange={HandalModelDate}
              value={DataToDOList.body}
            />
          </DialogContent>

          <DialogContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "3px",
              }}
            >
              <span>image your To Do List</span>
              <Button variant="outlined" style={{ height: "56px" }}>
                <label htmlFor="file-input">
                  <span style={{ cursor: "pointer" }}>
                    {DataToDOList.img ? "uploading done" : "upload"}
                  </span>
                </label>
                <label htmlFor="file-input">
                  {DataToDOList.img ? (
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
                  onChange={HandalModelDate}
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  type="file"
                ></input>
              </Button>
            </div>
          </DialogContent>

          <DialogContent>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={HandalModelDate}
                    name="CheckboxDone"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                }
                label="Done"
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button
              name="Cancel"
              onClick={(e) => {
                ClearInput();
                HandalModel(e);
              }}
            >
              Cancel
            </Button>
            <Button onClick={HandalModelSand}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return (
      <>
        <MyAlerts MyAlerts={DataMyAlerts}></MyAlerts>
      </>
    );
  }
}

export { EditHandelModel };
