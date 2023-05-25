import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";
import { dbList } from "./db/db";
import { EditHandelModel } from "./Model";
import Model from "./Model";
import { useState } from "react";
import MySnackbar from "./MySnackbar";
import { FUNHnadelMySnackbar } from "./MySnackbar";
import { FUNHnadelMyDialogDelete } from "./MyDialogDelete";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MyItem({
  id,
  title,
  bodyAll,
  bodyShort,
  image,
  DateCreated,
  done,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // DoneHandel
  function DoneHandel(event) {
    let id = event.currentTarget.id;

    let done = event.currentTarget.getAttribute("done");

    if (done === "true") {
      done = false;
    } else {
      done = true;
    }

    dbList.dbList.update(parseInt(id), { done: done }).then(function (updated) {
      if (updated) {
        //  Alerts
        if (done === "true") {
          FUNHnadelMySnackbar(
            "success",
            ` done   id => " + ${parseInt(id)} `,
            true
          );
        } else {
          FUNHnadelMySnackbar(
            "info",
            `Cancel done   id => " + ${parseInt(id)} `,
            true
          );
        }
        //  Alerts \\
      } else console.log(`Nothing was updated - there were no friend with primary key: ${id}`);
    });
  }
  // DoneHandel \\

  // doneColor
  let doneColor;
  if (done === true) {
    doneColor = "primary";
  }

  // doneColor \\

  async function EditHandel(event) {
    // 1
    let id = event.currentTarget.id;
    // 2
    const GetToDoList = await dbList.dbList.get(parseInt(id));
    // 3
    EditHandelModel(GetToDoList);
  }

  function DeleteHandel(event) {
    let id = event.currentTarget.id;
    //onsole.log(id)
    FUNHnadelMyDialogDelete("Do you want to delete this to do list", true, id);
  }
  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          marginTop: "10px",
          marginBottom: "10px",
          boxShadow: "0px 5px 10px rgb(81 85 88 / 40%)",
        }}
      >
        <CardHeader title={title} subheader={DateCreated} />
        {image ? (
          <CardMedia component="img" height="194" image={image} alt={title} />
        ) : (
          ""
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {bodyShort}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={DoneHandel}
            id={id}
            name="Done"
            done={`${done}`}
            aria-label="add to favorites"
          >
            <DoneOutlineIcon color={doneColor} />
          </IconButton>

          <IconButton
            aria-label="Edit"
            onClick={EditHandel}
            id={id}
            name="Edit"
          >
            <EditIcon />
          </IconButton>

          <IconButton aria-label="share" id={id} onClick={DeleteHandel}>
            <DeleteIcon />
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{title}:</Typography>
            {bodyAll}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
export { MyItem };
