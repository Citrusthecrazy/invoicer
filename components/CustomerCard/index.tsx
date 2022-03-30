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
} from "@mui/material";
import { FaTrash, FaPen } from "react-icons/fa";
import { deleteCustomer } from "../../util/DbFunctions";
import EditCustomerDialog from "./EditCustomerDialog";

type Props = {
  id: string;
  companyName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  updateCustomers: Function;
};

const index = ({
  id,
  companyName,
  address,
  zip,
  city,
  country,
  updateCustomers,
}: Props) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteCustomer = async () => {
    setLoading(true);
    await deleteCustomer(id);
    await updateCustomers();
    setLoading(false);
  };

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
          disabled={loading}
          startIcon={<FaPen />}
          disableRipple
          sx={{ color: "#6b8cff" }}
          onClick={() => setEditDialogOpen(true)}>
          Edit
        </Button>
        <Button
          disabled={loading}
          color="error"
          startIcon={<FaTrash />}
          disableRipple
          onClick={handleDeleteCustomer}>
          Delete
        </Button>
      </CardActions>
      <EditCustomerDialog
        editDialogOpen={editDialogOpen}
        id={id}
        companyName={companyName}
        address={address}
        zip={zip}
        city={city}
        country={country}
        setEditDialogOpen={setEditDialogOpen}
        updateCustomers={updateCustomers}
      />
    </Card>
  );
};

export default index;
