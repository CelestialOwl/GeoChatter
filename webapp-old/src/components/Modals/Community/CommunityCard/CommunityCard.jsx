import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from "../../../../API/ChatterAPI";

export default function CommunityCard({ community }) {
  const localData = localStorage.getItem("profile");
  const paredData = JSON.parse(localData);

  const joinCommunity = async () => {
    const formData = {
      CommunityId: community._id,
      userId: paredData._id,
    };
    const response = await api.post("/add-user", formData);
    console.log(response);
  };

  return (
    <Card sx={{ maxWidth: 240 }}>
      <CardMedia sx={{ height: 10 }}></CardMedia>
      <CardContent sx={{ maxHeight: 200, overflow: "hidden" }}>
        <Typography gutterBottom variant="h5" component="div">
          {community.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {community.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => joinCommunity()} size="small">
          Join
        </Button>
      </CardActions>
    </Card>
  );
}
