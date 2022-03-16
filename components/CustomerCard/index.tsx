import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FaTrash, FaPen } from "react-icons/fa";

type Props = {
  image?: string;
  name: string;
  streetAddress: string;
  phoneNumber: string;
};
const index = ({ image, name, streetAddress, phoneNumber }: Props) => {
  return (
    <Card sx={{ width: 300, maxHeight: 225 }} elevation={4}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}>
          <Avatar
            sx={{
              bgcolor: "#6b8cff",
              marginRight: "1rem",
            }}
            aria-label="user avatar">
            {image ? (
              <img src={image} style={{ width: "100%", height: "100%" }} />
            ) : (
              name.substring(0, 1)
            )}
          </Avatar>
          <Typography variant="h6" fontWeight="medium" sx={{ height: "2em" }}>
            {name}
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ height: "2em", wordWrap: "wrap" }}
          gutterBottom>
          Address: {streetAddress}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ height: "2em", wordWrap: "wrap" }}
          gutterBottom>
          Phone number: {phoneNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Button startIcon={<FaPen />} disableRipple sx={{ color: "#6b8cff" }}>
          Edit
        </Button>
        <Button color="error" startIcon={<FaTrash />} disableRipple>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default index;
