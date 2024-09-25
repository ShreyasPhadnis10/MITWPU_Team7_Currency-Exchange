import React from "react";
import Stylesheet from "reactjs-stylesheet";
export default function Navbar() {
  return (
    <div style={styles.container}>
      <div style={styles.navbarBtn}>
        <span style={styles.btn}>Comparison</span>
        <span style={styles.btn}>Basket</span>
        <span style={styles.btn}>Tabular</span>
        <span style={styles.btn}>Conversion</span>
        <span style={styles.btn}>Predict</span>
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
  },
});
