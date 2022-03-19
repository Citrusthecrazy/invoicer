import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useMediaQuery } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const data = {
  labels,
  datasets: [
    {
      label: "Sale",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Recent sales",
    },
  },
};
const Home: NextPage = () => {
  const media = useMediaQuery("(max-width:768px)");

  return (
    <div className={styles.home}>
      <Box
        sx={{
          flex: "25",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}>
        <Paper
          elevation={4}
          className={styles.paper}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: "20",
          }}>
          <Typography variant="h6" textAlign="center">
            Recent sales
          </Typography>
          <Typography variant="h3" fontWeight="bold" textAlign="center">
            140.00K €
          </Typography>
        </Paper>

        <Paper elevation={4} className={styles.paper} sx={{ flex: "80" }}>
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            Recent invoices
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "rgba(0,0,0,0.5)" }}
            textAlign="center">
            Nothing to show
          </Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          flex: "75",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}>
        <Paper
          className={styles.paper + " " + styles.chart}
          elevation={4}
          sx={{ flex: "40" }}>
          <Line
            options={options}
            data={data}
            style={{ maxHeight: "22rem", maxWidth: "100%" }}
          />
        </Paper>
        <Box
          sx={{
            flex: "60",
            display: "flex",
            flexDirection: media ? "column" : "row",
            padding: "1rem",
          }}>
          <Paper
            className={styles.paper}
            elevation={4}
            sx={{ flex: "50", marginRight: ".5rem" }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold">
              Top Items
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "rgba(0,0,0,0.5)" }}
              textAlign="center">
              Nothing to show
            </Typography>
          </Paper>
          <Paper
            className={styles.paper}
            elevation={4}
            sx={{ flex: "50", marginLeft: ".5rem" }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold">
              Top Customers
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "rgba(0,0,0,0.5)" }}
              textAlign="center">
              Nothing to show
            </Typography>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
