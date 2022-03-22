import {
  Box,
  Fab,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Customers.module.css";
import CustomerCard from "../../components/CustomerCard";
import { faker } from "@faker-js/faker";
import { FaPlus } from "react-icons/fa";
import withAuth from "../../helpers/withAuth";
import Input from "../../components/Input";
import CustomButton from "../../components/CustomButton";

const Customers = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Typography variant="h3" className={styles.title}>
          Customers
        </Typography>
        <Box className={styles.grid}>
          <CustomerCard
            image={faker.image.avatar()}
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
          <CustomerCard
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
          <CustomerCard
            image={faker.image.avatar()}
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
          <CustomerCard
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
          <CustomerCard
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
        </Box>
        <Tooltip title="New Customer" placement="left" arrow disableInteractive>
          <Fab
            className={styles.floatingButton}
            aria-label="add"
            onClick={() => handleOpenDialog()}>
            <FaPlus />
          </Fab>
        </Tooltip>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <Input
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <Input
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
          />
          <Input
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Phone number"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <CustomButton variant="contained" onClick={handleCloseDialog}>
            Cancel
          </CustomButton>
          <CustomButton variant="contained" onClick={handleCloseDialog}>
            Save
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default withAuth(Customers);
