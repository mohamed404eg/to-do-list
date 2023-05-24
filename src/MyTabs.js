import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AllItems from "./AllItems";
import MyAdd from "./MyAdd";


export default function MyTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          sx={{ display: "flex" }}
        >
          <Tab icon={<AllInboxIcon />} label="All" />
          <Tab icon={<DoneOutlineIcon />} label="Done" />
          <Tab icon={<PendingActionsIcon />} label="Pending" />
        </Tabs>
      </div>

       <AllItems currentValue={value}></AllItems> 

       <MyAdd></MyAdd>
    </>
  );
}
