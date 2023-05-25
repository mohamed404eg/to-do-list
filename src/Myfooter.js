import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import LinkStyle from "@mui/material/Link";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
export default function Myfooter() {




  return (
    <Box>
      <Paper variant="outlined">
        <Link to={"https://www.linkedin.com/in/mohamed404eg"}>
          <LinkStyle component="button" variant="body2">
            <h4>By Mohamed404eg</h4>
          </LinkStyle>
        </Link>
      </Paper>
    </Box>
  );
}
