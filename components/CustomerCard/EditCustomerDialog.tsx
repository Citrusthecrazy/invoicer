import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Button,
} from "@mui/material";
import Input from "../Input";
import CustomButton from "../CustomButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { updateCustomer } from "../../util/DbFunctions";

interface IDialog {
  companyName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
}

interface Props {
  editDialogOpen: boolean;
  id: string;
  companyName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  setEditDialogOpen: Function;
  updateCustomers: Function;
}

const EditCustomerDialog = ({
  editDialogOpen,
  id,
  companyName,
  address,
  zip,
  city,
  country,
  setEditDialogOpen,
  updateCustomers,
}: Props) => {
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

  return (
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
  );
};

export default EditCustomerDialog;
