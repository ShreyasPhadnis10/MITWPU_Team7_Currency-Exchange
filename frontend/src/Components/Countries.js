import React from "react";
import Stylesheet from "reactjs-stylesheet";
import TinyFlag from "tiny-flag-react";

export default function Countries({ name, flag, isSelected, onClick }) {
  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isSelected ? "green" : "white", // Change background based on selection
        color: isSelected ? "white" : "black",
      }}
      onClick={onClick} // Call onClick when the country is clicked
    >
      <TinyFlag
        country={flag}
        alt={`${flag} Flag`}
        fallbackImageURL={`https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${flag}.svg`}
        style={{ width: "24px", marginLeft: "10px" }}
      />
      <div style={styles.name}>{name}</div>
    </div>
  );
}

const styles = Stylesheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 10px",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexShrink: 0,
    marginRight: 20,
    border: "black 0.5px solid",
    fontFamily: "Poppins",
    cursor: "pointer",
  },

  name: {
    marginLeft: 15,
    fontWeight: "500",
  },
});
