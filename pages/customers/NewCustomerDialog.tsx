import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "../../components/Input";
import styles from "./Customers.module.css";
import { Customer } from "../../util/types";
import { AuthContext } from "../../contexts/AuthContext";
import { addCustomer, getUserRef } from "../../util/DbFunctions";
import CustomButton from "../../components/CustomButton";

interface IDialog {
  id: string;
  companyName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
}

interface Props {
  dialogOpen: boolean;
  setCustomers: Function;
  setDialogOpen: Function;
}

const NewCustomerDialog = ({
  dialogOpen,
  setCustomers,
  setDialogOpen,
}: Props) => {
  const user = useContext(AuthContext);
  const { control, reset, handleSubmit } = useForm<IDialog>();
  const onSubmit: SubmitHandler<IDialog> = async (data) => {
    if (!user) return;
    const userRef = await getUserRef(user);
    if (!userRef || !data.zip) return;
    const customer: Customer = {
      id: data.id,
      companyName: data.companyName,
      address: data.address,
      city: data.city,
      country: data.country,
      zip: Number(data.zip),
      owner: userRef,
    };
    await addCustomer(customer);
    setCustomers((customers: Array<Customer>) => [...customers, customer]);
    setDialogOpen(false);
    reset();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
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
  );
};

export default NewCustomerDialog;
