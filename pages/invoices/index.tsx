import { Autocomplete, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import styles from "./Invoices.module.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import easyinvoice, { download, InvoiceProduct } from "easyinvoice";
import withAuth from "../../helpers/withAuth";
import { getCustomerById, getCustomers } from "../../util/DbFunctions";
import { AuthContext } from "../../contexts/AuthContext";
import { DocumentData } from "firebase/firestore";

interface Item {
  product: string;
  quantity: string;
  price: string;
  tax: string;
}

const Invoices = () => {
  const user = useContext(AuthContext);
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Item>();
  const [items, setItems] = useState<Array<Item>>([]);
  const [options, setOptions] = useState<Array<any>>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCustomer, setSelectedCustomer] =
    useState<DocumentData | null>();
  const [note, setNote] = useState("");
  useEffect(() => {
    if (!user) return;
    getCustomers(user).then((customers) => {
      if (!customers) return;
      customers.forEach((customer) =>
        setOptions((options) => [
          ...options,
          { label: customer.companyName, id: customer.id },
        ])
      );
    });
  }, [user]);

  const handleSetCustomer = async (id: string) => {
    const customer = await getCustomerById(id);
    setSelectedCustomer(customer);
  };
  const onSubmit: SubmitHandler<Item> = (data) => {
    setItems((items) => [...items, data]);
    reset();
  };
  const downloadInvoice = async () => {
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
        company: "Drakula Inc",
        address: "Ustanicka 123",
        zip: "11000",
        city: "Belgrade",
        country: "Serbia",
      },
      client: {
        company: selectedCustomer?.companyName,
        address: selectedCustomer?.address,
        zip: selectedCustomer?.zip,
        city: selectedCustomer?.city,
        country: selectedCustomer?.country,
      },
      information: {
        number: `${yyyy}.${Math.floor(Math.random() * 999999)}`,
        date: todayString,
      },
      products: products,
      "bottom-notice": note,
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
          <Autocomplete
            onChange={(event: any, newValue) => {
              if (!newValue || !newValue.id) return setSelectedCustomer(null);
              handleSetCustomer(newValue.id);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            disablePortal
            id="customers-combo-box"
            options={options}
            sx={{ width: "50%", marginBottom: "1rem" }}
            onClick={() => console.log("era")}
            renderInput={(params) => (
              <Input {...params} label="Select recipient" />
            )}
          />
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
                rules={{
                  required: { value: true, message: "Please fill this field" },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    error={errors?.product ? true : false}
                    helperText={errors?.product?.message}
                    sx={{ flex: 25, margin: ".5rem" }}
                    label="Product"
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                rules={{
                  required: { value: true, message: "Please fill this field" },
                  pattern: {
                    value: /^[1-9]\d*(\d+)?$/i,
                    message: "Please enter a number",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    error={errors?.quantity ? true : false}
                    helperText={errors?.quantity?.message}
                    sx={{ flex: 25, margin: ".5rem" }}
                    label="Quantity"
                  />
                )}
              />

              <Controller
                name="price"
                control={control}
                defaultValue=""
                rules={{
                  required: { value: true, message: "Please fill this field" },
                  pattern: {
                    value: /^[1-9]\d*(\d+)?$/i,
                    message: "Please enter a number",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    error={errors?.price ? true : false}
                    helperText={errors?.price?.message}
                    sx={{ flex: 25, margin: ".5rem" }}
                    label="Price"
                  />
                )}
              />

              <Controller
                name="tax"
                control={control}
                defaultValue=""
                rules={{
                  required: { value: true, message: "Please fill this field" },
                  pattern: {
                    value: /^[1-9]\d*(\d+)?$/i,
                    message: "Please enter a number",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    error={errors?.tax ? true : false}
                    helperText={errors?.tax?.message}
                    sx={{ flex: 25, margin: ".5rem" }}
                    label="Tax (%)"
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
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Box className={styles.actions}>
            <CustomButton
              disabled={!selectedCustomer || items.length === 0}
              variant="contained"
              className={styles.button}>
              Save
            </CustomButton>
            <CustomButton
              disabled={!selectedCustomer || items.length === 0}
              variant="contained"
              className={styles.button}
              onClick={() => downloadInvoice()}>
              Download
            </CustomButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default withAuth(Invoices);
