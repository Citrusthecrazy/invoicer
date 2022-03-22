import React from "react";
import styles from "./CustomerCard.module.css";
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
  companyName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
};
const index = ({ companyName, address, zip, city, country }: Props) => {
  return (
    <Card className={styles.card} elevation={4}>
      <CardContent>
        <Box className={styles.cardHeader}>
          <Avatar className={styles.avatar} aria-label="user avatar">
            {companyName.substring(0, 1)}
          </Avatar>
          <Typography
            variant="h6"
            fontWeight="medium"
            className={styles.customerName}>
            {companyName}
          </Typography>
        </Box>
        <p className={styles.customerInfo}>Address: {address}</p>
        <p className={styles.customerInfo}>Zip: {zip}</p>
        <p className={styles.customerInfo}>City: {city}</p>
        <p className={styles.customerInfo}>Country: {country}</p>
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
