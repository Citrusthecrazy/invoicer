import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
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
          <Box>Added items</Box>
          <Box className={styles.newItem}>
            <FormControl sx={{ flex: 25, margin: ".5rem" }}>
              <InputLabel>Select Product</InputLabel>
              <Select>
                <MenuItem>Era</MenuItem>
                <MenuItem>Pera</MenuItem>
              </Select>
            </FormControl>
            <Input sx={{ flex: 25, margin: ".5rem" }} placeholder="Quantity" />
            <Input sx={{ flex: 25, margin: ".5rem" }} placeholder="Price" />
            <IconButton disableRipple className={styles.iconButton}>
              <AiOutlinePlus className={styles.buttonIcon} />
            </IconButton>
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
