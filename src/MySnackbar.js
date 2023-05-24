import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let FUNHnadelMySnackbar;

export default function MySnackbar() {
  const [open, setOpen] = React.useState(false);
  let [HnadelMySnackbar, SetHnadelMySnackbar] = useState({
    props: "success",
    message: "This is a success add ",
  });

// if want use alert use this function
  FUNHnadelMySnackbar = function (props, message, open) {
    SetHnadelMySnackbar({
      props: props,
      message: message,
    });
    setOpen(open)
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  return (
    <Stack
      spacing={2}
      sx={{
        width: "40%",
        position: "fixed",
        bottom: 16,
        left: 16,
        boxShadow: "none",
        zIndex:100
      }}
    >
      <Snackbar
        name="btnClose"
        open={open}
        autoHideDuration={8000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={HnadelMySnackbar.props}
          sx={{
            width: "160px",
            position: "fixed",
            bottom: 16,
            left: 16,
            boxShadow: "none",
          }}
        >
          {HnadelMySnackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export { FUNHnadelMySnackbar };
