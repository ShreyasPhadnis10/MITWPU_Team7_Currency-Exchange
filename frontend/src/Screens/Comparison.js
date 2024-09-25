import React, { useState, useRef } from "react";
import TinyFlag from "tiny-flag-react";
import Countries from "../Components/Countries";
import Charts from "../Components/Charts"; // Import Charts component
import axios from "axios";
// Sample list of currencies with their corresponding country codes
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

export default function Comparison() {
  const [selectedCountry, setSelectedCountry] = useState(null); // Single selected country
  const [chartData, setChartData] = useState(null); // State to store the data fetched from the backend
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
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

  // Function to handle country selection and fetch data from backend
  const handleCountryClick = async (currency) => {
    setSelectedCountry(currency); // Set the selected country directly
    setLoading(true); // Set loading to true when fetching data
    setError(null); // Reset error state

    try {
      // Replace with your backend API endpoint
      const response = await axios.get(
        `http://127.0.0.1:8000/weekly?currency=${encodeURIComponent(currency)}`
      );

      // Pass the correct data part from the response
      setChartData(response.data.data);
      console.log(response.data.data); // Updated to check the actual data
    } catch (err) {
      setError("Failed to load chart data"); // Handle error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
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
          {currencyCountryMap.map(({ currency, country, name }) => (
            <Countries
              name={currency}
              key={currency}
              flag={country}
              isSelected={selectedCountry === currency} // Check if the selected country matches
              onClick={() => handleCountryClick(name)} // Pass click handler
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
      {selectedCountry && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            chartData && (
              <Charts selectedCurrency={selectedCountry} data={chartData} />
            ) // Pass the fetched data to Charts
          )}
        </div>
      )}
    </div>
  );
}
