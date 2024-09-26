import React, { useState, useEffect } from "react";
import axios from "axios";

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

export default function CurrencyConverter() {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [conversionResult, setConversionResult] = useState(null);
  const [error, setError] = useState(null);

  // Fetch exchange rate when currencies or amount changes
  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      fetchExchangeRate();
    }
  }, [baseCurrency, targetCurrency, amount]);

  const fetchExchangeRate = async () => {
    if (!baseCurrency || !targetCurrency) {
      setError("Please select both base and target currencies.");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
      );
      const rate = response.data.rates[targetCurrency];
      setExchangeRate(rate);
      setConversionResult(amount * rate);
      setError(null);
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
      setError("Failed to fetch exchange rate.");
    }
  };

  return (
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.inputsContainer}>
        <div style={styles.inputGroup}>
          <div style={styles.amountInput}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 10,
              }}
            >
              <label style={styles.label}>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                min="1"
                style={styles.amount}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={styles.label}>From</h3>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
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
        <div style={styles.inputGroup}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={styles.label}>To</h3>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              style={styles.selectInput}
            >
              <option value="">Select Target Currency</option>
              {currencyCountryMap.map((item) => (
                <option key={item.currency} value={item.currency}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button style={styles.fetchButton} onClick={fetchExchangeRate}>
        Fetch Exchange Rate
      </button>
      {conversionResult !== null && (
        <div style={styles.resultContainer}>
          <p style={styles.resultText}>
            {amount} {baseCurrency} = {conversionResult.toFixed(2)}{" "}
            {targetCurrency}
          </p>
        </div>
      )}
    </div>
  );
}

// Styles to match the first code's inputs and button positioning
// Updated styles with alignment and margin adjustments
const styles = {
  container: {
    fontFamily: "Poppins",
    height: "100%",
    width: "70%",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputsContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
    gap: "20px", // Add some gap between labels and inputs for better spacing
  },
  selectInput: {
    height: 40,
    width: 400,
    padding: "5px 10px",
    margin: "10px 0",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#f0f4f7",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    color: "#333",
    fontSize: "14px",
    outline: "none",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
  },
  fetchButton: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4caf50",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    outline: "none",
    fontFamily: "Poppins, sans-serif",
    marginTop: 40,
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  label: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "left", // Align labels to the left
  },
  resultContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  resultText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  amount: {
    width: 90,
    height: 40,
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    marginRight: "20px", // Add margin to the right of the amount input
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  amountInput: {
    display: "flex",
    flexDirection: "column",
    marginRight: "20px", // Add margin to separate amount from other elements
  },
};
