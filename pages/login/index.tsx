import styles from "./Login.module.css";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Image from "next/image";
import logo from "../../assets/No Bg Logo.png";
import receiptIllustration from "../../assets/receipt.svg";
import Input from "../../components/Input";
import Link from "next/link";
import { login } from "../../util/AuthFunctions";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
interface Login {
  email: string;
  password: string;
}

const index: NextPage = () => {
  const { control, reset, handleSubmit } = useForm<Login>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Login> = async (data) => {
    await login(data.email, data.password);
    await router.push("/");
  };
  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.loginForm}>
          <Image src={logo} width="200px" height="200px" />
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  className={styles.input}
                  variant="outlined"
                  type="text"
                  placeholder="E-mail"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  className={styles.input}
                  variant="outlined"
                  type="password"
                  placeholder="Password"
                />
              )}
            />
            <Box className={styles.formFooter}>
              <p style={{ fontSize: ".8rem" }}>
                Don't have an account?{" "}
                <Link href="/register">
                  <span className={styles.link}>Register</span>
                </Link>
              </p>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#6b8cff",
                  borderRadius: "10px",
                }}>
                log in
              </Button>
            </Box>
          </form>
        </Box>
        <Box className={styles.imageContainer}>
          <Image src={receiptIllustration} height="313px" width="445px" />
        </Box>
      </Box>
    </Box>
  );
};

export default index;
