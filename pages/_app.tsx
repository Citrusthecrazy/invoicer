import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../widgets/Sidebar";
import { AuthProvider } from "../providers/AuthProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </>
  );
};

export default MyApp;
