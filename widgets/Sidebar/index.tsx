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

const index = () => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo} />
      <List className={styles.list}>
        {SidebarItems.map((item, index) => (
          <Link href={item.path}>
            <ListItemButton
              key={index}
              disableRipple
              className={styles.listItem}>
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
        <ListItemButton disableRipple className={styles.listItem}>
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
