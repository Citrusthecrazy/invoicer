import styles from "./Login.module.css";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Image from "next/image";
import logo from "../../assets/No Bg Logo.png";
import receiptIllustration from "../../assets/receipt.svg";
import { useTheme } from "styled-components";
import Input from "../../components/Input";
import Link from "next/link";

const index: NextPage = () => {
  const theme = useTheme() as any;

  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.loginForm}>
          <Image src={logo} width="200px" height="200px" />
          <Input
            className={styles.input}
            variant="outlined"
            type="text"
            placeholder="E-mail"
          />
          <Input
            className={styles.input}
            variant="outlined"
            type="password"
            placeholder="Password"
          />
          <Box className={styles.formFooter}>
            <p style={{ fontSize: ".8rem" }}>
              Don't have an account?{" "}
              <Link href="/register">
                <span className={styles.link}>Register</span>
              </Link>
            </p>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.colors.primary,
                borderRadius: "10px",
              }}>
              log in
            </Button>
          </Box>
        </Box>
        <Box className={styles.imageContainer}>
          <Image src={receiptIllustration} height="313px" width="445px" />
        </Box>
      </Box>
    </Box>
  );
};

export default index;
