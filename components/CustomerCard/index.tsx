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
  DialogActions,
  Stack,
} from "@mui/material";
import { FaTrash, FaPen } from "react-icons/fa";
import Input from "../Input";
import CustomButton from "../CustomButton";
import {
  deleteCustomer,
  getUserRef,
  updateCustomer,
} from "../../util/DbFunctions";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IDialog {
  companyName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
}

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
  const { control, reset, handleSubmit } = useForm<IDialog>();

  const onSubmit: SubmitHandler<IDialog> = async (data) => {
    await updateCustomer(
      id,
      data.companyName,
      data.address,
      Number(data.zip),
      data.city,
      data.country
    ).catch((e) => console.log(e.message));
    setEditDialogOpen(false);
    await updateCustomers();
  };

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
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit {companyName}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack direction="row" spacing={2} sx={{ marginY: "1rem" }}>
              <Controller
                name="companyName"
                control={control}
                defaultValue={companyName}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    fullWidth
                    id="companyName"
                    label="Company name"
                    type="text"
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                defaultValue={address}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    fullWidth
                    id="address"
                    label="Address"
                    type="text"
                    variant="outlined"
                  />
                )}
              />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ marginBottom: "1rem" }}>
              <Controller
                name="zip"
                control={control}
                defaultValue={zip}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[1-9]\d*(\d+)?$/i,
                    message: "Please enter a number",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    fullWidth
                    id="zip"
                    label="Zip"
                    type="text"
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                defaultValue={city}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    fullWidth
                    id="city"
                    label="City"
                    type="text"
                    variant="outlined"
                  />
                )}
              />
            </Stack>
            <Controller
              name="country"
              control={control}
              defaultValue={country}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  fullWidth
                  id="country"
                  label="Country"
                  type="text"
                  variant="outlined"
                />
              )}
            />
            <DialogActions>
              <Button color="error" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <CustomButton type="submit" variant="contained">
                Update
              </CustomButton>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </Card>
  );
};

export default index;
