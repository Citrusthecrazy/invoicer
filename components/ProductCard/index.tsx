import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import styles from "./ProductCard.module.css";

type Props = {
  image: string;
  name: string;
  stock: number;
  price: string;
};
const index = ({ image, name, price, stock }: Props) => {
  return (
    <Card className={styles.card} elevation={4}>
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <p className={styles.productInfo}>Price: {price} €</p>
        <p className={styles.productInfo}>Amount avaliable: x{stock}</p>
      </CardContent>
      <CardActions>
        <Button startIcon={<FaPen />} disableRipple sx={{ color: "#6b8cff" }}>
          Edit
        </Button>
        <Button color="error" startIcon={<FaTrash />} disableRipple>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default index;
