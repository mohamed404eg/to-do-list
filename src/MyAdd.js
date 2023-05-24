import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Model from "./Model";
import { useState } from "react";
export default function MyAdd() {
  const [IsAppear, SetIsAppear] = useState(false);

  function HandalModel(event , prams) {
    if (prams === true) {
      SetIsAppear(true);
      return;
    }  else{
      SetIsAppear(false);
    }
    
    if(event === null) return;
    if (event.target.name === "Cancel") {
      SetIsAppear(false);
    }
    
  }

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
            SetIsAppear((t) => (t = true));
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Model ModelAppear={IsAppear} HandalModel={HandalModel} />
    </>
  );
}
