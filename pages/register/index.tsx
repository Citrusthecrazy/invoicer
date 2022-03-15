import styles from "./Register.module.css";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Image from "next/image";
import logo from "../../assets/No Bg Logo.png";
import printingInvoices from "../../assets/printing-invoices.svg";
import { useTheme } from "styled-components";
import Input from "../../components/Input";
import Link from "next/link";

const Register: NextPage = () => {
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
          <Input
            className={styles.input}
            variant="outlined"
            type="password"
            placeholder="Confirm password"
          />
          <Box className={styles.formFooter}>
            <p style={{ fontSize: ".8rem" }}>
              Already have an account?{" "}
              <Link href="/login">
                <span className={styles.link}>Log in</span>
              </Link>
            </p>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.colors.primary,
                borderRadius: "10px",
              }}>
              Register
            </Button>
          </Box>
        </Box>
        <Box className={styles.imageContainer}>
          <Image src={printingInvoices} height="313px" width="445px" />
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
