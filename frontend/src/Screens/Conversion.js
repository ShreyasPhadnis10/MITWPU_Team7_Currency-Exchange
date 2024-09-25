import React, { useState, useEffect } from "react";
import axios from "axios";

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

export default function Conversion() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1); // Default amount for conversion
  const [conversionResult, setConversionResult] = useState(null);

  // Fetch conversion rate when currencies or amount changes
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      axios
        .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then((response) => {
          const rate = response.data.rates[toCurrency];
          if (rate) {
            setConversionResult(amount * rate);
          } else {
            setConversionResult("Conversion rate not available.");
          }
        })
        .catch((error) => {
          console.error("Error fetching conversion rate", error);
        });
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <label>
          From:
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            {currencyCountryMap.map(({ currency }) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>

        <label>
          To:
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            {currencyCountryMap.map(({ currency }) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />
        </label>
      </div>

      <div>
        <button
          disabled={!fromCurrency || !toCurrency}
          onClick={() => {
            // This button is only needed to trigger the conversion, effect handles the fetch.
            if (!fromCurrency || !toCurrency) {
              alert("Please select both currencies.");
            }
          }}
        >
          Convert
        </button>
      </div>

      {conversionResult !== null && (
        <p>
          {amount} {fromCurrency} is equal to {conversionResult} {toCurrency}
        </p>
      )}
    </div>
  );
}
