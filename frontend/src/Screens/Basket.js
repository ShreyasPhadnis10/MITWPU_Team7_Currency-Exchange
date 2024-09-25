import React, { useState } from "react";
import currencyapi from "@everapi/currencyapi-js";

// Currency and country mapping
const currencyCountryMap = [
  { currency: "DZD", country: "DZ" },
  { currency: "AUD", country: "AU" },
  { currency: "BHD", country: "BH" },
  { currency: "VEF", country: "VE" },
  { currency: "BWP", country: "BW" },
  { currency: "BRL", country: "BR" },
  { currency: "BND", country: "BN" },
  { currency: "CAD", country: "CA" },
  { currency: "CLP", country: "CL" },
  { currency: "CNY", country: "CN" },
  { currency: "COP", country: "CO" },
  { currency: "CZK", country: "CZ" },
  { currency: "DKK", country: "DK" },
  { currency: "EUR", country: "EU" },
  { currency: "HUF", country: "HU" },
  { currency: "ISK", country: "IS" },
  { currency: "INR", country: "IN" },
  { currency: "IDR", country: "ID" },
  { currency: "IRR", country: "IR" },
  { currency: "ILS", country: "IL" },
  { currency: "JPY", country: "JP" },
  { currency: "KZT", country: "KZ" },
  { currency: "KRW", country: "KR" },
  { currency: "KWD", country: "KW" },
  { currency: "LYD", country: "LY" },
  { currency: "MYR", country: "MY" },
  { currency: "MUR", country: "MU" },
  { currency: "MXN", country: "MX" },
  { currency: "NPR", country: "NP" },
  { currency: "NZD", country: "NZ" },
  { currency: "NOK", country: "NO" },
  { currency: "OMR", country: "OM" },
  { currency: "PKR", country: "PK" },
  { currency: "PEN", country: "PE" },
  { currency: "PHP", country: "PH" },
  { currency: "PLN", country: "PL" },
  { currency: "QAR", country: "QA" },
  { currency: "RUB", country: "RU" },
  { currency: "SAR", country: "SA" },
  { currency: "SGD", country: "SG" },
  { currency: "ZAR", country: "ZA" },
  { currency: "LKR", country: "LK" },
  { currency: "SEK", country: "SE" },
  { currency: "CHF", country: "CH" },
  { currency: "THB", country: "TH" },
  { currency: "TTD", country: "TT" },
  { currency: "TND", country: "TN" },
  { currency: "AED", country: "AE" },
  { currency: "GBP", country: "GB" },
  { currency: "USD", country: "US" },
  { currency: "UYU", country: "UY" },
];

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
      <h1 style={styles.title}>Currency Basket</h1>
      <button style={styles.fetchButton} onClick={fetchCurrencyData}>
        Fetch Currency Data
      </button>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.inputsContainer}>
        <div style={styles.leftInputsContainer}>
          {leftInputs.map((input, index) => (
            <div key={index} style={styles.inputGroup}>
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
                    {item.currency}
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
          <button style={styles.addButton} onClick={addLeftInput}>
            +
          </button>
        </div>

        <div style={styles.rightInputContainer}>
          <select
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
            style={styles.selectInput}
          >
            <option value="">Select Base Currency</option>
            {currencyCountryMap.map((item) => (
              <option key={item.currency} value={item.currency}>
                {item.currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currencyData && (
        <div style={styles.currencyDataContainer}>
          <h2 style={styles.subTitle}>Latest Currency Data:</h2>
          {Object.keys(currencyData.data).map((currencyCode) => (
            <div key={currencyCode} style={styles.currencyRow}>
              <p>
                <strong>Currency Code:</strong> {currencyCode} <br />
                <strong>Value (to {rightInput}):</strong>{" "}
                {currencyData.data[currencyCode].value}
              </p>
            </div>
          ))}
          <p>
            <strong>Total Basket Value in {rightInput}:</strong> {totalValue}
          </p>
          <p>
            <strong>Last Updated:</strong> {currencyData.meta.last_updated_at}
          </p>
        </div>
      )}
    </div>
  );
}

// Styles for the Basket component
const styles = {
  container: {
    fontFamily: "Poppins",
    height: "100%",
    width: "100vw",
    marginLeft: "40",
    marginRight: "40",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  fetchButton: {
    display: "block",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px auto",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  inputsContainer: {
    display: "flex",
    justifyContent: "space-between",

    margin: "20px 0",
  },
  leftInputsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  rightInputContainer: {
    flex: 1,
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  selectInput: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "5px",
    width: 400,
  },
  percentageInput: {
    width: "80px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "white",
    height: 40,
    width: 80,
    border: "none",
    padding: "5px 10px",

    cursor: "pointer",
    marginTop: "10px",
  },
  currencyDataContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  subTitle: {
    fontSize: "18px",
    color: "#333",
  },
  currencyRow: {
    marginBottom: "10px",
  },
};
