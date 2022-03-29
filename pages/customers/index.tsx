import { Box, Fab, Tooltip, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Customers.module.css";
import CustomerCard from "../../components/CustomerCard";
import { FaPlus } from "react-icons/fa";
import withAuth from "../../helpers/withAuth";
import { getCustomers } from "../../util/DbFunctions";
import { AuthContext } from "../../contexts/AuthContext";
import { DocumentData } from "firebase/firestore";
import UpdateCustomerDialog from "./UpdateCustomerDialog";

const Customers = () => {
  const user = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customers, setCustomers] = useState<Array<DocumentData>>([]);

  useEffect(() => {
    updateCustomers();
  }, [user]);

  const updateCustomers = async () => {
    if (!user) return;
    const customers = await getCustomers(user);
    if (!customers) return;
    setCustomers(customers);
  };
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Typography variant="h3" className={styles.title}>
          Customers
        </Typography>
        <Box className={styles.grid}>
          {customers.map((customer, key) => (
            <CustomerCard
              id={customer.id}
              key={key}
              companyName={customer.companyName}
              address={customer.address}
              zip={customer.zip}
              city={customer.city}
              country={customer.country}
              updateCustomers={updateCustomers}
            />
          ))}
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
      <UpdateCustomerDialog
        dialogOpen={dialogOpen}
        setCustomers={setCustomers}
        setDialogOpen={setDialogOpen}
      />
    </Box>
  );
};

export default withAuth(Customers);
