import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useMediaQuery } from "@mui/material";

const Home: NextPage = () => {
  const media = useMediaQuery("(max-width:1280px)");
  return (
    <div className={styles.home}>
      <Paper
        className={styles.paper}
        elevation={4}
        sx={{
          gridColumn: "span 1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography variant="caption" fontSize="1.25rem" textAlign="center">
          Total sales in the past week
        </Typography>
        <Typography
          sx={{ fontSize: "3rem", fontWeight: "bold" }}
          textAlign="center">
          170.00K €
        </Typography>
      </Paper>

      <Paper
        className={styles.paper}
        elevation={4}
        sx={!media ? { gridColumn: "3 / main-end", gridRow: "span 2" } : null}>
        Chart
      </Paper>

      <Paper
        className={styles.paper}
        elevation={4}
        sx={{ gridColumn: "1/1", gridRow: "span 4" }}>
        <Box sx={{ padding: "0.5rem" }}>
          <Typography
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
            textAlign="center">
            Recent Invoices
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ color: "rgba(0,0,0,0.4)" }}>
            Nothing to show here
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={
          !media
            ? {
                display: "flex",
                flexDirection: "row",
                gridColumn: "3 / main-end",
                gridRow: "span 3",
                height: "95%",
                paddingY: "1rem",
              }
            : {
                display: "flex",
                flexDirection: "column",
                gridRow: "span 4",
                height: "95%",
              }
        }>
        <Paper
          className={styles.paper}
          elevation={4}
          sx={
            !media
              ? {
                  flex: "50",
                  gridColumn: "3",
                  gridRow: "span calc(main-end/2)",
                  marginRight: ".5rem",
                }
              : { flex: "50", marginBottom: ".5rem" }
          }>
          <Box sx={{ padding: "0.5rem" }}>
            <Typography
              sx={{ fontSize: "2rem", fontWeight: "bold" }}
              textAlign="center">
              Top Items
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{ color: "rgba(0,0,0,0.4)" }}>
              Nothing to show here
            </Typography>
          </Box>
        </Paper>

        <Paper
          className={styles.paper}
          elevation={4}
          sx={
            !media
              ? {
                  flex: "50",
                  gridColumn: "4",
                  gridRow: "span calc(main-end/2)",
                  marginLeft: ".5rem",
                }
              : { flex: "50", marginTop: ".5rem" }
          }>
          <Box sx={{ padding: "0.5rem" }}>
            <Typography
              sx={{ fontSize: "2rem", fontWeight: "bold" }}
              textAlign="center">
              Top Customers
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{ color: "rgba(0,0,0,0.4)" }}>
              Nothing to show here
            </Typography>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Home;
