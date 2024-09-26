import React, { useState } from "react";
import currencyCountryMap from "../Data/CurrencyCountryMap";

export default function DateWisePrice() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currencyData, setCurrencyData] = useState({});
  const apiKey = process.env.REACT_APP_API_KEY;
  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(
        `https://api.currencyapi.com/v3/historical?date=${selectedDate}`,
        {
          method: "GET",
          headers: {
            apikey: apiKey, // Replace with your actual API key
          },
        }
      );
      const data = await response.json();
      setCurrencyData(data.data); // Set the currency data to state
      console.log(data);
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <datalist id="currencies">
          {currencyCountryMap.map((currency) => (
            <option key={currency.currency} value={currency.currency}>
              {currency.name}
            </option>
          ))}
        </datalist>
      </div>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontFamily: "Poppins, sans-serif",
          width: "300px",
        }}
      />

      <button
        onClick={() => {
          fetchCurrencyData();
        }}
        style={{
          cursor: "pointer",
          background: "lightgreen",
          border: "none",
          outline: "none",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Poppins, sans-serif",
          margin: "20px 10px",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
      >
        Get Price
      </button>

      <h2 style={{ margin: "20px 0" }}>
        Currency Values compared to USD on {selectedDate}
      </h2>
      <table
        style={{
          width: "40%",
          margin: "20px auto", // Centers the table horizontally
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>Currency Code</th>
            <th style={{ padding: "10px" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(currencyData).map(([key, value]) => (
            <tr key={key}>
              <td style={{ padding: "10px" }}>{value.code}</td>
              <td style={{ padding: "10px" }}>{value.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
