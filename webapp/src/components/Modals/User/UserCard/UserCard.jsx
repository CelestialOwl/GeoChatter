import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { url } from "../../../../API/ChatterAPI";

export default function UserCard({ user }) {
  return (
    <Card sx={{ maxWidth: 345, margin: 3 }}>
      <CardMedia
        sx={{ height: 140, objectFit: "fill" }}
        // image={`${url}/${user.img}`}
        // title="green iguana"
      >
        <img
          style={{ objectFit: "contain", height: "140px", width: "150px" }}
          src={`${url}/${user.img}`}
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${Math.floor(user.distance)} Km away`}
        </Typography>
        <CardActions>
          <Button sx={{ textAlign: "left" }} size="small">
            Send Message
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
