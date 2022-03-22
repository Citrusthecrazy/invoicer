import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import SidebarItems from "./SidebarItems";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "../../util/AuthFunctions";
import withAuth from "../../helpers/withAuth";
import { AuthContext } from "../../contexts/AuthContext";

const index = () => {
  const router = useRouter();
  const user = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  if (!user) return null;
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo} />
      <List className={styles.list}>
        {SidebarItems.map((item, index) => (
          <Link key={index} href={item.path}>
            <ListItemButton
              disableRipple
              sx={{
                "&:hover":
                  item.path === router.pathname
                    ? { background: "rgba(107, 140, 255, 0.4)" }
                    : { background: "transparent" },
              }}
              className={
                item.path === router.pathname
                  ? styles.listItemActive
                  : styles.listItem
              }>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>
                <Typography className={styles.listItemText}>
                  {item.text}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </Link>
        ))}
        <div style={{ flexGrow: 1 }}></div>
        <ListItemButton
          disableRipple
          className={styles.listItem}
          sx={{ "&:hover": { background: "rgba(255, 100, 150, 0.3)" } }}
          onClick={() => handleLogout()}>
          <ListItemIcon>
            <IoLogOut
              style={{ width: "1.5rem", height: "1.5rem", color: "black" }}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography className={styles.listItemText}>Logout</Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </nav>
  );
};

export default withAuth(index);
