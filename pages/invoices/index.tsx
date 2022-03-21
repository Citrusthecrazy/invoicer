import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import Select from "../../components/Select";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import styles from "./Invoices.module.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface Item {
  product: string;
  quantity: string;
  price: string;
  tax: string;
}

const Invoices = () => {
  const { control, reset, handleSubmit } = useForm<Item>();
  const [items, setItems] = useState<Array<Item>>([]);

  const onSubmit: SubmitHandler<Item> = (data) => {
    console.log(data);
    setItems((items) => [...items, data]);
    // reset();
  };
  return (
    <Box className={styles.container}>
      <Typography variant="h3" textAlign="center" fontWeight="medium">
        New Invoice
      </Typography>
      <Box className={styles.content}>
        <Paper className={styles.paper} elevation={4}>
          <FormControl className={styles.formControl}>
            <InputLabel>Select Recipient</InputLabel>
            <Select>
              <MenuItem>Era</MenuItem>
              <MenuItem>Pera</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            Items
          </Typography>
          <Box className={styles.addedItems}>
            {items.length > 0 && (
              <div className={styles.header}>
                <Box className={styles.item}>Product</Box>
                <Box className={styles.item}>Quantity</Box>
                <Box className={styles.item}>Price</Box>
                <Box className={styles.item}>Tax</Box>
                <Box className={styles.iconButton}></Box>
              </div>
            )}
            {items.length > 0
              ? items.map((item, key) => (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginBottom: ".3rem",
                    }}>
                    <Box className={styles.item}>{item.product}</Box>
                    <Box className={styles.item}>{item.quantity}</Box>
                    <Box className={styles.item}>{item.price}</Box>
                    <Box className={styles.item}>{item.tax}%</Box>
                    <IconButton
                      disableRipple
                      className={styles.iconButton}
                      onClick={() =>
                        setItems(
                          items.filter((filterItem) => filterItem !== item)
                        )
                      }>
                      <AiOutlinePlus className={styles.buttonIconRemove} />
                    </IconButton>
                  </Box>
                ))
              : "No items added"}
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={styles.newItem}>
              <Controller
                name="product"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    sx={{ flex: 25, margin: ".5rem" }}
                    placeholder="Product"
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    sx={{ flex: 25, margin: ".5rem" }}
                    placeholder="Quantity"
                  />
                )}
              />

              <Controller
                name="price"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    sx={{ flex: 25, margin: ".5rem" }}
                    placeholder="Price"
                  />
                )}
              />

              <Controller
                name="tax"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    sx={{ flex: 25, margin: ".5rem" }}
                    placeholder="Tax (%)"
                  />
                )}
              />

              <IconButton
                type="submit"
                disableRipple
                className={styles.iconButton}>
                <AiOutlinePlus className={styles.buttonIcon} />
              </IconButton>
            </Box>
          </form>
          <Box sx={{ flexGrow: 1 }} />
          <Input
            multiline
            rows={5}
            placeholder="Note (optional)"
            sx={{ width: "50%" }}
          />
          <Box className={styles.actions}>
            <CustomButton variant="contained" className={styles.button}>
              Save
            </CustomButton>
            <CustomButton variant="contained" className={styles.button}>
              Download
            </CustomButton>
            <CustomButton variant="contained" className={styles.button}>
              Preview
            </CustomButton>
          </Box>
        </Paper>
        <Paper className={styles.paper} elevation={4}>
          Pera
        </Paper>
      </Box>
    </Box>
  );
};

export default Invoices;
