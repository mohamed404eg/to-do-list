import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

export default function MyAlerts(MyAlerts) {
  let { props, message, appear } = MyAlerts.MyAlerts;
  const [open, setOpen] = React.useState(false);

  if (MyAlerts != "undefined") {
    if (open != appear) setOpen(appear);
  }

  if (appear) {
    return (
      <Collapse in={open}>
        <Stack
          sx={{ width: "40%", position: "fixed", bottom: 16, left: 16 }}
          spacing={2}
        >
          <Alert severity={props}>{message}</Alert>
        </Stack>
      </Collapse>
    );
  }
}
