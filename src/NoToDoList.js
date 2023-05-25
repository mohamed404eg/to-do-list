import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { ExternHandelModel } from "./Model";
export default function NoToDoList() {
  return (
    <div style={{display:"flex" , flexDirection:"column" , justifyContent:"center", padding:"10px"}}>
      {" "}
      <span style={{padding:"10px"}}>No ToDoList</span>
      <Box component="span" >
        <Button variant="outlined"
          onClick={() => {
            ExternHandelModel(true);
          }}
        >
          ADD ToDoList
        </Button>
      </Box>
    </div>
  );
}
