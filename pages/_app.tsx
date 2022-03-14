import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../widgets/Sidebar";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#6b8cff",
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
