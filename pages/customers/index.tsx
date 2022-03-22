import {
  Box,
  Fab,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Customers.module.css";
import CustomerCard from "../../components/CustomerCard";
import { FaPlus } from "react-icons/fa";
import withAuth from "../../helpers/withAuth";
import Input from "../../components/Input";
import CustomButton from "../../components/CustomButton";
import { addCustomer, getCustomers, getUserRef } from "../../util/DbFunctions";
import { AuthContext } from "../../contexts/AuthContext";
import { DocumentData } from "firebase/firestore";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Customer } from "../../util/types";

interface IDialog {
  companyName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
}

const Customers = () => {
  const user = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customers, setCustomers] = useState<Array<DocumentData>>([]);

  const { control, reset, handleSubmit } = useForm<IDialog>();

  const onSubmit: SubmitHandler<IDialog> = async (data) => {
    if (!user) return;
    const userRef = await getUserRef(user);
    if (!userRef || !data.zip) return;
    const customer: Customer = {
      companyName: data.companyName,
      address: data.address,
      city: data.city,
      country: data.country,
      zip: Number(data.zip),
      owner: userRef,
    };
    await addCustomer(customer);
    setCustomers((customers) => [...customers, customer]);
    setDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    if (!user) return;
    getCustomers(user).then((customers) => {
      if (!customers) return;
      setCustomers(customers);
    });
  }, [user]);

  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Typography variant="h3" className={styles.title}>
          Customers
        </Typography>
        <Box className={styles.grid}>
          {customers.map((customer, key) => (
            <CustomerCard
              key={key}
              companyName={customer.companyName}
              address={customer.address}
              zip={customer.zip}
              city={customer.city}
              country={customer.country}
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
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>New Customer</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack direction="row" spacing={2} className={styles.stack}>
              <Controller
                name="companyName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    id="name"
                    label="Company name"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Stack>
            <Stack direction="row" spacing={2} className={styles.stack}>
              <Controller
                name="zip"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="zip"
                    label="Zip code"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="city"
                    label="City"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Stack>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="country"
                  label="Country"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              variant="text"
              disableRipple
              onClick={handleCloseDialog}>
              Cancel
            </Button>
            <CustomButton type="submit" variant="contained">
              Save
            </CustomButton>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default withAuth(Customers);
