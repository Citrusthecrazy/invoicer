import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "./Products.module.css";
import CustomerCard from "../../components/CustomerCard";
import { faker } from "@faker-js/faker";
const index = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Typography variant="h3" className={styles.title}>
          Customers
        </Typography>
        <Box className={styles.grid}>
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
          <CustomerCard
            image={faker.image.avatar()}
            name={faker.name.findName()}
            streetAddress={faker.address.streetAddress()}
            phoneNumber={faker.phone.phoneNumberFormat()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default index;
