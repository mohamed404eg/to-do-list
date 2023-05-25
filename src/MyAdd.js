import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Model from "./Model";
import { useState } from "react";
import { ExternHandelModel } from "./Model";
export default function MyAdd() {
 
  



  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            ExternHandelModel(true)
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Model/>
    </>
  );
}
