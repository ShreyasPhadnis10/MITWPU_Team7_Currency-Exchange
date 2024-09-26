import React, { useState } from "react";
import currencyapi from "@everapi/currencyapi-js";
import currencyCountryMap from "../Data/CurrencyCountryMap";
// Currency and country mapping

const apiKey = process.env.REACT_APP_API_KEY;
const client = new currencyapi(apiKey);

export default function Basket() {
  const [currencyData, setCurrencyData] = useState(null);
  const [error, setError] = useState(null);
  const [leftInputs, setLeftInputs] = useState([
    { currency: "", percentage: "" },
  ]);
  const [rightInput, setRightInput] = useState("");
  const [totalValue, setTotalValue] = useState(null);

  const fetchCurrencyData = async () => {
    const baseCurrency = rightInput;
    if (!baseCurrency || leftInputs.length === 0) {
      setError(
        "Please select a base currency and add currencies to the basket."
      );
      return;
    }
    try {
      const currencyCodes = leftInputs.map((input) => input.currency).join(",");
      const response = await client.latest({
        base_currency: baseCurrency,
        currencies: currencyCodes,
      });

      let total = 0;
      leftInputs.forEach((input) => {
        const currencyValue = response.data[input.currency]?.value;
        if (currencyValue) {
          total += currencyValue * (parseFloat(input.percentage) / 100);
        }
      });

      setCurrencyData(response);
      setTotalValue(total.toFixed(2));
      setError(null);
    } catch (err) {
      console.error("Error fetching currency data:", err);
      setError("Failed to fetch currency data.");
      setCurrencyData(null);
      setTotalValue(null);
    }
  };

  const addLeftInput = () => {
    setLeftInputs([...leftInputs, { currency: "", percentage: "" }]);
  };

  const handleLeftCurrencyChange = (index, value) => {
    const newInputs = [...leftInputs];
    newInputs[index].currency = value;
    setLeftInputs(newInputs);
  };

  const handleLeftPercentageChange = (index, value) => {
    const newInputs = [...leftInputs];
    newInputs[index].percentage = value;
    setLeftInputs(newInputs);
  };

  return (
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.inputsContainer}>
        <div style={styles.leftInputsContainer}>
          <h3 style={styles.label}>From</h3> {/* "From" Label */}
          {leftInputs.map((input, index) => (
            <div key={index} style={styles.inputGroup}>
              <button style={styles.addButton} onClick={addLeftInput}>
                +
              </button>
              <select
                value={input.currency}
                onChange={(e) =>
                  handleLeftCurrencyChange(index, e.target.value)
                }
                style={styles.selectInput}
              >
                <option value="">Select Currency</option>
                {currencyCountryMap.map((item) => (
                  <option key={item.currency} value={item.currency}>
                    {item.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={input.percentage}
                onChange={(e) =>
                  handleLeftPercentageChange(index, e.target.value)
                }
                placeholder="Percentage"
                style={styles.percentageInput}
              />
            </div>
          ))}
        </div>

        <div style={styles.rightInputContainer}>
          <h3 style={styles.label}>To</h3> {/* "To" Label */}
          <select
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
            style={styles.selectInput}
          >
            <option value="">Select Base Currency</option>
            {currencyCountryMap.map((item) => (
              <option key={item.currency} value={item.currency}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button style={styles.fetchButton} onClick={fetchCurrencyData}>
        Fetch Currency Data
      </button>
      {currencyData && (
        <div style={styles.currencyDataContainer}>
          <h2 style={styles.subTitle}>Latest Currency Data:</h2>
          <div style={styles.dataCardsContainer}>
            {Object.keys(currencyData.data).map((currencyCode) => (
              <div key={currencyCode} style={styles.currencyCard}>
                <p style={styles.currencyText}>
                  <strong>Currency Code:</strong> {currencyCode}
                </p>
                <p style={styles.currencyText}>
                  <strong>Value (to {rightInput}):</strong>{" "}
                  {currencyData.data[currencyCode].value}
                </p>
              </div>
            ))}
          </div>
          <div style={styles.summaryContainer}>
            <p style={styles.summaryText}>
              <strong>Total Basket Value in {rightInput}:</strong> {totalValue}
            </p>
            <p style={styles.summaryText}>
              <strong>Last Updated:</strong> {currencyData.meta.last_updated_at}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles for the Basket component
// Styles for the Basket component
const styles = {
  container: {
    fontFamily: "Poppins",
    height: "100%",
    width: "70%",
    margin: "0 auto", // Center the container horizontally
    padding: "20px", // Add some padding for better appearance
    display: "flex", // Use flexbox for centering
    flexDirection: "column", // Stack items vertically
    alignItems: "center", // Center items horizontally
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  inputsContainer: {
    display: "flex",
    justifyContent: "space-around", // Center inputs container
    width: "100%", // Make it take full width
  },
  leftInputsContainer: {
    marginRight: "20px",
  },
  rightInputContainer: {
    marginLeft: "20px",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  addButton: {
    marginRight: "10px",
    padding: "5px 10px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "50%", // Rounded shape
    border: "none",
    backgroundColor: "#4CAF50", // Green background
    color: "#fff", // White text
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Subtle shadow
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  selectInput: {
    height: 40,
    width: 400,
    padding: "5px 10px",
    marginRight: "10px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#f0f4f7",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    color: "#333",
    fontSize: "14px",
    outline: "none",
    transition: "background-color 0.3s ease",
    fontFamily: "Poppins, sans-serif", // Change font family
    fontWeight: "500", // Change font weight
  },
  percentageInput: {
    width: 90,
    height: 40,
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif", // Font family
    fontWeight: "500", // Font weight
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  currencyDataContainer: {
    textAlign: "center",
    marginTop: "60px",
  },
  currencyRow: {
    textAlign: "center",
  },
  fetchButton: {
    marginTop: 50,
    padding: "12px 24px", // Increase padding for a larger button
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4caf50", // Green color for the button
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease", // Smooth transition for background and scaling
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Light shadow for depth
    outline: "none",
    fontFamily: "Poppins, sans-serif",
  },
  fetchButtonHover: {
    backgroundColor: "#45a049", // Slightly darker shade for hover effect
    transform: "scale(1.05)", // Slight scaling on hover for a 'pop' effect
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  subTitle: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  label: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
};
