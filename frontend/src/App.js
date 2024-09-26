import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Stylesheet from "reactjs-stylesheet";
import Comparison from "./Screens/Comparison";
import Navbar from "./Components/Navbar";
import Basket from "./Screens/Basket"; // Import Basket component
import Conversion from "./Screens/Conversion";
import DateWisePrice from "./Screens/DateWisePrice";
import DatewiseBarchart from "./Screens/DatewiseBarchart";

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <Navbar />

        <Routes>
          {" "}
          {/* Use Routes instead of Switch */}
          <Route path="/" element={<Comparison />} /> {/* Default route */}
          <Route path="/basket" element={<Basket />} /> {/* Route for Basket */}
          <Route path="/conversion" element={<Conversion />} />
          <Route path="/optional" element={<DateWisePrice />} />
          <Route path="/optional2" element={<DatewiseBarchart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

const styles = Stylesheet.create({
  container: {
    fontFamily: "Poppins",
    height: "100vh",
    width: "100vw",
  },
});
