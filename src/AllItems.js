import { MyItem } from "./MyItem";
// db
import { dbList } from "./db/db";
import { useLiveQuery } from "dexie-react-hooks";
// db //

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

// get list
let ToDoList;


export default function AllItems({ currentValue }) {

// filter list
if (currentValue === 0) {
  function V1() {
    ToDoList = useLiveQuery(() => dbList.dbList.toArray());
    }
    V1();
  } else if (currentValue === 1) {
    function V2() {
      let before = useLiveQuery(() => dbList.dbList.toArray());
      ToDoList = before.filter(({ done }) => {
        if (done === "true") {
          return true;
        } else {
          return false;
        }
      });
    }
    V2();
  } else if (currentValue === 2) {
    function V3() {
      let before = useLiveQuery(() => dbList.dbList.toArray());
      ToDoList = before.filter(({ done }) => {
        if (done === "false") {
          return true;
        } else {
          return false;
        }
      });
    }
    V3();
  }
  // filter list \\

  

  let ToDoListMap;
  if (ToDoList !== undefined) {
    ToDoListMap = ToDoList.map((itme) => {
      let ItmeBodyShort = itme.body.substring(0, 100);

      // image
      let MyImage;
      if (itme.img) {
        MyImage = URL.createObjectURL(itme.img);
      }

      // image \\

      return (
        <MyItem
          key={itme.id}
          id={itme.id}
          title={itme.title}
          bodyAll={itme.body}
          bodyShort={ItmeBodyShort}
          image={MyImage}
          DateCreated={itme.DateCreated}
          done={itme.done}
        ></MyItem>
      );
    });
  }

  // get list \\

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "10px",
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 3 }}
        columns={{ xs: 1, sm: 2, md: 12 }}
        sx={{
          justifyContent: "space-evenly",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {ToDoListMap}
      </Grid>
    </Box>
  );
}
