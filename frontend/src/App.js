import Stylesheet from "reactjs-stylesheet";
import Comparison from "./Screens/Comparison";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div style={styles.container}>
      <Navbar />

      <Comparison />
    </div>
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
