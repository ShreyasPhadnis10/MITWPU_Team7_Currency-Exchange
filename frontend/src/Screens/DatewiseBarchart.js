import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"; // Make sure to install chart.js and react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
const apiKey = process.env.REACT_APP_API_KEY;
// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function DatewiseBarchart() {
  const [baseCurrency, setBaseCurrency] = useState("USD"); // Default base currency
  const [data, setData] = useState([]);

  // List of currencies for the input
  const currencyCountryMap = [
    { currency: "DZD", country: "DZ", name: "Algerian dinar (DZD)" },
    { currency: "AUD", country: "AU", name: "Australian dollar (AUD)" },
    { currency: "BHD", country: "BH", name: "Bahrain dinar (BHD)" },
    { currency: "VEF", country: "VE", name: "Bolivar Fuerte (VEF)" },
    { currency: "BWP", country: "BW", name: "Botswana pula (BWP)" },
    { currency: "BRL", country: "BR", name: "Brazilian real (BRL)" },
    { currency: "BND", country: "BN", name: "Brunei dollar (BND)" },
    { currency: "CAD", country: "CA", name: "Canadian dollar (CAD)" },
    { currency: "CLP", country: "CL", name: "Chilean peso (CLP)" },
    { currency: "CNY", country: "CN", name: "Chinese yuan (CNY)" },
    { currency: "COP", country: "CO", name: "Colombian peso (COP)" },
    { currency: "CZK", country: "CZ", name: "Czech koruna (CZK)" },
    { currency: "DKK", country: "DK", name: "Danish krone (DKK)" },
    { currency: "EUR", country: "EU", name: "Euro (EUR)" },
    { currency: "HUF", country: "HU", name: "Hungarian forint (HUF)" },
    { currency: "ISK", country: "IS", name: "Icelandic krona (ISK)" },
    { currency: "INR", country: "IN", name: "Indian rupee (INR)" },
    { currency: "IDR", country: "ID", name: "Indonesian rupiah (IDR)" },
    { currency: "IRR", country: "IR", name: "Iranian rial (IRR)" },
    { currency: "ILS", country: "IL", name: "Israeli New Shekel (ILS)" },
    { currency: "JPY", country: "JP", name: "Japanese yen (JPY)" },
    { currency: "KZT", country: "KZ", name: "Kazakhstani tenge (KZT)" },
    { currency: "KRW", country: "KR", name: "Korean won (KRW)" },
    { currency: "KWD", country: "KW", name: "Kuwaiti dinar (KWD)" },
    { currency: "LYD", country: "LY", name: "Libyan dinar (LYD)" },
    { currency: "MYR", country: "MY", name: "Malaysian ringgit (MYR)" },
    { currency: "MUR", country: "MU", name: "Mauritian rupee (MUR)" },
    { currency: "MXN", country: "MX", name: "Mexican peso (MXN)" },
    { currency: "NPR", country: "NP", name: "Nepalese rupee (NPR)" },
    { currency: "NZD", country: "NZ", name: "New Zealand dollar (NZD)" },
    { currency: "NOK", country: "NO", name: "Norwegian krone (NOK)" },
    { currency: "OMR", country: "OM", name: "Omani rial (OMR)" },
    { currency: "PKR", country: "PK", name: "Pakistani rupee (PKR)" },
    { currency: "PEN", country: "PE", name: "Peruvian sol (PEN)" },
    { currency: "PHP", country: "PH", name: "Philippine peso (PHP)" },
    { currency: "PLN", country: "PL", name: "Polish zloty (PLN)" },
    { currency: "QAR", country: "QA", name: "Qatari riyal (QAR)" },
    { currency: "RUB", country: "RU", name: "Russian ruble (RUB)" },
    { currency: "SAR", country: "SA", name: "Saudi Arabian riyal (SAR)" },
    { currency: "SGD", country: "SG", name: "Singapore dollar (SGD)" },
    { currency: "ZAR", country: "ZA", name: "South African rand (ZAR)" },
    { currency: "LKR", country: "LK", name: "Sri Lankan rupee (LKR)" },
    { currency: "SEK", country: "SE", name: "Swedish krona (SEK)" },
    { currency: "CHF", country: "CH", name: "Swiss franc (CHF)" },
    { currency: "THB", country: "TH", name: "Thai baht (THB)" },
    { currency: "TTD", country: "TT", name: "Trinidadian dollar (TTD)" },
    { currency: "TND", country: "TN", name: "Tunisian dinar (TND)" },
    {
      currency: "AED",
      country: "AE",
      name: "United Arab Emirates dirham (AED)",
    },
    { currency: "GBP", country: "GB", name: "British pound (GBP)" },
    { currency: "USD", country: "US", name: "United States dollar (USD)" },
    { currency: "UYU", country: "UY", name: "Uruguayan peso (UYU)" },
  ];

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(
        `https://api.currencyapi.com/v3/historical?date=2022-01-01&base_currency=${baseCurrency}`,
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
        console.log(data);
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
  }, [baseCurrency]);

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

      <Bar data={chartData} />
    </div>
  );
}
