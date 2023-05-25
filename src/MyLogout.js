import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { dbList, dbUser } from "./db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { FUNHnadelMySnackbar } from "./MySnackbar";
import MyProgress from "./MyProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyLogout() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBtn = (event) => {
    console.log(event.currentTarget.name);
    if (event.currentTarget.name === "Agree") {
      dbList
        .delete()
        .then(() => {})
        .catch((err) => {
          FUNHnadelMySnackbar("error", "Could not delete database", true);
        })
        .finally(() => {
          // Do what should be done next...
          UserDelete();
        });
      function UserDelete() {
        dbUser
          .delete()
          .then(() => {
            FUNHnadelMySnackbar(
              "success",
              "Database successfully deleted",
              true
            );
            window.location.pathname = "./";
          })
          .catch((err) => {
            FUNHnadelMySnackbar(
              "error",
              "Could not delete database db account User",
              true
            );
          })
          .finally(() => {
            // Do what should be done next...
          });
      }
    } else if (event.currentTarget.name === "Disagree") {
      window.location.pathname = "./";
    }

    setOpen(false);
    clearTimeout(myTimeout);
  };

  let myTimeout = setTimeout(handleClickOpen, 1);

  return (
    <>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Do you want to log out?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              After logging out, all data will be deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button name="Disagree" onClick={handleBtn}>
              Disagree
            </Button>
            <Button name="Agree" onClick={handleBtn}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
