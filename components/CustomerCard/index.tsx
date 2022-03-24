import React, { useState } from "react";
import styles from "./CustomerCard.module.css";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
} from "@mui/material";
import { FaTrash, FaPen } from "react-icons/fa";
import Input from "../Input";
import CustomButton from "../CustomButton";

type Props = {
  id: string;
  companyName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
};

const index = ({ id, companyName, address, zip, city, country }: Props) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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
        <Button
          startIcon={<FaPen />}
          disableRipple
          sx={{ color: "#6b8cff" }}
          onClick={() => setEditDialogOpen(true)}>
          Edit
        </Button>
        <Button color="error" startIcon={<FaTrash />} disableRipple>
          Delete
        </Button>
      </CardActions>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit {companyName}</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} sx={{ marginY: "1rem" }}>
            <Input
              autoFocus
              fullWidth
              id="companyName"
              label="Company name"
              type="text"
              variant="outlined"
              defaultValue={companyName}
            />
            <Input
              fullWidth
              id="address"
              label="Address"
              type="text"
              variant="outlined"
              defaultValue={address}
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ marginBottom: "1rem" }}>
            <Input
              fullWidth
              id="zip"
              label="Zip"
              type="text"
              variant="outlined"
              defaultValue={zip}
            />
            <Input
              fullWidth
              id="city"
              label="City"
              type="text"
              variant="outlined"
              defaultValue={city}
            />
          </Stack>
          <Input
            fullWidth
            id="country"
            label="Country"
            type="text"
            variant="outlined"
            defaultValue={country}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
          <CustomButton
            variant="contained"
            onClick={() => setEditDialogOpen(false)}>
            Update
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default index;
