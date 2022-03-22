import React, { useContext, useEffect, useState } from "react";
import styles from "./Products.module.css";
import { Box, Typography, Tooltip, Fab } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { faker } from "@faker-js/faker";
import { FaPlus } from "react-icons/fa";
import withAuth from "../../helpers/withAuth";

const Products = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Typography variant="h3" className={styles.title}>
          Products
        </Typography>
        <Box className={styles.grid}>
          <ProductCard
            image={faker.image.unsplash.technology()}
            name={faker.commerce.product()}
            price={faker.commerce.price()}
            stock={Math.floor(Math.random() * 100)}
          />
        </Box>
        <Tooltip title="New Product" placement="left" arrow disableInteractive>
          <Fab className={styles.floatingButton} aria-label="add">
            <FaPlus />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default withAuth(Products);
