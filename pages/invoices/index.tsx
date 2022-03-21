import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import Select from "../../components/Select";
import { Box } from "@mui/system";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import styles from "./Invoices.module.css";

const Invoices = () => {
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
          <Box>No items added</Box>
          <Box className={styles.newItem}>
            <FormControl sx={{ flex: 25, marginRight: ".5rem" }}>
              <InputLabel>Select Product</InputLabel>
              <Select>
                <MenuItem>Era</MenuItem>
                <MenuItem>Pera</MenuItem>
              </Select>
            </FormControl>
            <Input sx={{ flex: 25, margin: ".5rem" }} placeholder="Quantity" />
            <Input sx={{ flex: 25, margin: ".5rem" }} placeholder="Price" />
            <Input sx={{ flex: 25, margin: ".5rem" }} placeholder="Tax (%)" />
            <IconButton disableRipple className={styles.iconButton}>
              <AiOutlinePlus className={styles.buttonIcon} />
            </IconButton>
          </Box>
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
