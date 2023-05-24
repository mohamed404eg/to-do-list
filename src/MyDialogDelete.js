import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Message } from "@mui/icons-material";
import { dbList } from "./db/db";
import { FUNHnadelMySnackbar } from "./MySnackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let FUNHnadelMyDialogDelete;
let myId;
export default function MyDialogDelete() {
  FUNHnadelMyDialogDelete = function (message, open, Id) {
    setMessage(message);
    setOpen(open);
    myId = Id;
  };

  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (event) => {
    setOpen(false);
    let resultDialog = event.target.name;
    if (resultDialog === "Agree") {
      dbList.dbList
        .where("id")
        .equals(parseInt(myId))
        .delete()
        .then((re) => {
          if (re) {
            FUNHnadelMySnackbar("success", "Deleted successfully", true);
          }
        });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{message}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button name="Disagree" onClick={handleClose}>
            Disagree
          </Button>
          <Button name="Agree" onClick={handleClose}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { FUNHnadelMyDialogDelete };
