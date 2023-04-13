import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/Header.module.css";

function Header() {
	

	return (
		<div className={styles.header}>
			<Link  to="/" >Home page</Link>
			<Link to='/reportsAdmin'>Reports</Link>
		</div>
	);
}

export default Header;
