import React from "react";
import { Link } from "react-router-dom"; // Import Link
import Stylesheet from "reactjs-stylesheet";

export default function Navbar() {
  return (
    <div style={styles.container}>
      <div style={styles.navbarBtn}>
        <Link to="/" style={styles.btn}>
          Comparison
        </Link>
        <Link to="/basket" style={styles.btn}>
          Basket
        </Link>
        <Link to="/conversion" style={styles.btn}>
          Conversion
        </Link>

        <Link to="/optional" style={styles.btn}>
          Datewise
        </Link>
        <Link to="/optional2" style={styles.btn}>
          Datewise_comparison
        </Link>
      </div>
    </div>
  );
}

const styles = Stylesheet.create({
  container: {
    fontFamily: "Poppins",
    height: "15%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navbarBtn: {
    height: "80%",
    width: "60%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    fontSize: 18,
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none", // Remove underline for Link
    color: "inherit", // Use inherited color for the link
  },
});
