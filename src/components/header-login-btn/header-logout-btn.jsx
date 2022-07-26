import React from "react";
import styles from "./header-logout-btn.module.css";

const HeaderLogoutBtn = (props) => (
  <button className={styles.logoutBtn} onClick={props.onLogout}>
    Logout
  </button>
);

export default HeaderLogoutBtn;
