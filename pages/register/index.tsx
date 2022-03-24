import styles from "./Register.module.css";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Image from "next/image";
import logo from "../../assets/No Bg Logo.png";
import printingInvoices from "../../assets/printing-invoices.svg";
import { useTheme } from "styled-components";
import Input from "../../components/Input";
import Link from "next/link";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { login, register } from "../../util/AuthFunctions";
import { useRouter } from "next/router";

interface Register {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Register: NextPage = () => {
  const { control, reset, handleSubmit } = useForm<Register>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Register> = async (data) => {
    if (data.password !== data.passwordConfirmation) return;
    await register(data.email, data.password);
    await login(data.email, data.password);
    router.push("/");
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
            <Controller
              name="passwordConfirmation"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  className={styles.input}
                  variant="outlined"
                  type="password"
                  placeholder="Confirm password"
                />
              )}
            />
            <Box className={styles.formFooter}>
              <p style={{ fontSize: ".8rem" }}>
                Already have an account?{" "}
                <Link href="/login">
                  <span className={styles.link}>Log in</span>
                </Link>
              </p>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#6b8cff",
                  borderRadius: "10px",
                }}>
                Register
              </Button>
            </Box>
          </form>
        </Box>
        <Box className={styles.imageContainer}>
          <Image src={printingInvoices} height="313px" width="445px" />
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
