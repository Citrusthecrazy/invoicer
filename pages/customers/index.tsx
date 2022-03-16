import { Box, Fab, Tooltip, Typography } from "@mui/material";
import React from "react";
import styles from "./Products.module.css";
import CustomerCard from "../../components/CustomerCard";
import { faker } from "@faker-js/faker";
import { FaPlus } from "react-icons/fa";
const Customers = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Typography variant="h3" className={styles.title}>
          Customers
        </Typography>
        <Box className={styles.grid}>
          <CustomerCard
            image={faker.image.avatar()}
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
          <CustomerCard
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
          <CustomerCard
            image={faker.image.avatar()}
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
          <CustomerCard
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
          <CustomerCard
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
        </Box>
        <Tooltip title="New Customer" placement="left" arrow disableInteractive>
          <Fab className={styles.floatingButton} aria-label="add">
            <FaPlus />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Customers;
