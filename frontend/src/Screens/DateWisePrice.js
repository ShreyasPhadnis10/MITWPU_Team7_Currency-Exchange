import React, { useState } from "react";

// Assuming you have a list of currencies available
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
  { currency: "AED", country: "AE", name: "United Arab Emirates dirham (AED)" },
  { currency: "GBP", country: "GB", name: "British pound (GBP)" },
  { currency: "USD", country: "US", name: "United States dollar (USD)" },
  { currency: "UYU", country: "UY", name: "Uruguayan peso (UYU)" },
];

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
