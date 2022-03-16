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
  image?: string;
  name: string;
  streetAddress: string;
  phoneNumber: string;
};
const index = ({ image, name, streetAddress, phoneNumber }: Props) => {
  return (
    <Card className={styles.card} elevation={4}>
      <CardContent>
        <Box className={styles.cardHeader}>
          <Avatar className={styles.avatar} aria-label="user avatar">
            {image ? (
              <img src={image} className={styles.image} />
            ) : (
              name.substring(0, 1)
            )}
          </Avatar>
          <Typography
            variant="h6"
            fontWeight="medium"
            className={styles.customerName}>
            {name}
          </Typography>
        </Box>
        <p className={styles.customerInfo}>
          Address: {streetAddress} asd asd asd as dasd a
        </p>
        <p className={styles.customerInfo}>Phone number: {phoneNumber}</p>
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
