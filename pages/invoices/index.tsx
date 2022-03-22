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
import easyinvoice, { InvoiceProduct } from "easyinvoice";
import withAuth from "../../helpers/withAuth";
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
    reset();
  };
  const renderInvoice = async () => {
    let products: Array<InvoiceProduct | any> = [];
    items.forEach(
      (item) =>
        (products = [
          ...products,
          {
            quantity: item.quantity,
            description: item.product,
            price: Number(item.price),
            "tax-rate": Number(item.tax),
          },
        ])
    );
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const todayString = dd + "/" + mm + "/" + yyyy;
    const data = {
      sender: {
        company: "Sample Corp",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Sampletown",
        country: "Samplecountry",
      },
      client: {
        company: "Client Corp",
        address: "Clientstreet 456",
        zip: "4567 CD",
        city: "Clientcity",
        country: "Clientcountry",
      },
      information: {
        number: "2021.0001",
        date: todayString,
      },
      products: products,
      settings: {
        currency: "EUR",
        "tax-notation": "PDV",
      },
    };
    const result = await easyinvoice.createInvoice(data);
    await easyinvoice.download("era.pdf", result.pdf);
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
              <Box className={styles.header}>
                <Box className={styles.item}>Product</Box>
                <Box className={styles.item}>Quantity</Box>
                <Box className={styles.item}>Price per unit</Box>
                <Box className={styles.item}>Tax</Box>
                <Box className={styles.iconButton}></Box>
              </Box>
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
                    <Box className={styles.item}>{item.price} €</Box>
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
            <CustomButton
              variant="contained"
              className={styles.button}
              onClick={() => renderInvoice()}>
              Preview
            </CustomButton>
          </Box>
        </Paper>
        <Paper className={styles.paper} elevation={4}>
          <Box id="pdf"></Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default withAuth(Invoices);
