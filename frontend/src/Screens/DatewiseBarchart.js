import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"; // Make sure to install chart.js and react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import currencyCountryMap from "../Data/CurrencyCountryMap";
const apiKey = process.env.REACT_APP_API_KEY;

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function DatewiseBarchart() {
  const [baseCurrency, setBaseCurrency] = useState("USD"); // Default base currency
  const [date, setDate] = useState("2022-01-01"); // Default date
  const [data, setData] = useState([]);

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(
        `https://api.currencyapi.com/v3/historical?date=${date}&base_currency=${baseCurrency}`,
        {
          headers: {
            apikey: apiKey, // Replace with your actual API key
          },
        }
      );

      // Check if the response is ok (status 200)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      // Check if the data exists and is an object
      if (result.data && typeof result.data === "object") {
        const currencyValues = Object.entries(result.data).map(
          ([key, value]) => ({
            code: key,
            value: value.value,
          })
        );

        // Sort by value and take the top 10
        const topCurrencies = currencyValues
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);
        setData(topCurrencies);
      } else {
        console.error("Data is not available or not an object", result);
        setData([]); // Set data to an empty array if data is not available
      }
    } catch (error) {
      console.error("Failed to fetch currency data:", error);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
  }, [baseCurrency, date]); // Fetch data when baseCurrency or date changes

  // Prepare data for the bar chart
  const chartData = {
    labels: data.map((currency) => currency.code),
    datasets: [
      {
        label: "Currency Values",
        data: data.map((currency) => currency.value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Datewise Bar Chart</h2>

      <input
        type="text"
        placeholder="Enter base currency (default: USD)"
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
        style={{
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontFamily: "Poppins, sans-serif",
          width: "300px",
        }}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontFamily: "Poppins, sans-serif",
          width: "300px",
        }}
      />

      <Bar data={chartData} />
    </div>
  );
}
