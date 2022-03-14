import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./Sidebar.module.css";
import SidebarItems from "./SidebarItems";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo} />
      <List className={styles.list}>
        {SidebarItems.map((item, index) => (
          <Link key={index} href={item.path}>
            <ListItemButton
              disableRipple
              sx={{ "&:hover": { background: "rgba(107, 140, 255, 0.2)" } }}
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
          sx={{ "&:hover": { background: "rgba(107, 140, 255, 0.2)" } }}>
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

export default index;
