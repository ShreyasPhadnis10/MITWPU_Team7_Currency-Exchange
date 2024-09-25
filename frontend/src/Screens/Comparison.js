import React, { useState, useRef } from "react";
import TinyFlag from "tiny-flag-react";
import Countries from "../Components/Countries";
import Charts from "../Components/Charts"; // Import Charts component

// Sample list of currencies with their corresponding country codes
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

export default function Comparison() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const scrollRef = useRef(null); // Reference to the scrollable container

  // Scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" }); // Adjust the value to scroll more or less
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" }); // Adjust the value to scroll more or less
    }
  };

  // Function to handle country selection
  const handleCountryClick = (currency) => {
    setSelectedCountries((prevSelected) => {
      if (prevSelected.includes(currency)) {
        return prevSelected.filter((item) => item !== currency); // Deselect if already selected
      } else {
        return [...prevSelected, currency]; // Add to selected countries
      }
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <button
          onClick={scrollLeft}
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            outline: "none",
            fontSize: 25,
            fontWeight: "bolder",
          }}
        >
          {"<"}
        </button>
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            overflowX: "hidden", // Hides the scrollbar
            maxWidth: "100%", // Ensures it doesn't exceed the screen width
            padding: "10px",
            whiteSpace: "nowrap", // Prevents wrapping
          }}
        >
          {currencyCountryMap.map(({ currency, country }) => (
            <Countries
              name={currency}
              key={currency}
              flag={country}
              isSelected={selectedCountries.includes(currency)}
              onClick={() => handleCountryClick(currency)} // Pass click handler
            />
          ))}
        </div>
        <button
          onClick={scrollRight}
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            outline: "none",
            fontSize: 25,
            fontWeight: "bolder",
          }}
        >
          {">"}
        </button>
      </div>

      {/* Render Charts component below the buttons */}
      {selectedCountries.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Charts /> {/* Show chart for the first selected currency */}
        </div>
      )}
    </div>
  );
}
