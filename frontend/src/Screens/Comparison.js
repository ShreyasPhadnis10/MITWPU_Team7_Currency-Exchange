import React, { useState, useRef } from "react";
import TinyFlag from "tiny-flag-react";
import Countries from "../Components/Countries";
import Charts from "../Components/Charts"; // Import Charts component
import axios from "axios";
// Sample list of currencies with their corresponding country codes
import currencyCountryMap from "../Data/CurrencyCountryMap";

export default function Comparison() {
  const [selectedCountry, setSelectedCountry] = useState(null); // Single selected country
  const [chartData, setChartData] = useState(null); // State to store the data fetched from the backend
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedDuration, setSelectedDuration] = useState("1W"); // Default selected duration
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
      // Replace with your backend API endpoint using the selected duration
      const response = await axios.get(
        `http://127.0.0.1:8000/${selectedDuration.toLowerCase()}?currency=${encodeURIComponent(
          currency
        )}`
      );

      // Pass the correct data part from the response
      setChartData(response.data.data);
    } catch (err) {
      setError("Failed to load chart data"); // Handle error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Function to handle duration selection
  const handleDurationClick = (duration) => {
    setSelectedDuration(duration); // Update the selected duration
  };

  // Calculate max and min values from chartData if available
  const calculateMinMax = (data) => {
    const values = data.map((item) => item[selectedCountry]); // Extract values for the selected currency
    const max = Math.max(...values);
    const min = Math.min(...values);
    return { max, min };
  };

  const { max, min } = chartData
    ? calculateMinMax(chartData)
    : { max: null, min: null };

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

      {/* Buttons for time range selection */}
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        {[
          "weekly",
          "monthly",
          "quarterly",
          "yearly",
          "two-year",
          "five-year",
        ].map((label) => (
          <button
            key={label}
            onClick={() => handleDurationClick(label)} // Update duration on click
            style={{
              cursor: "pointer",
              background: selectedDuration === label ? "lightgreen" : "none", // Change background for selected
              border: "none",
              outline: "none",
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              margin: "20px 10px", // Add some space between buttons
              padding: "10px 20px", // Add padding for better visuals
              borderRadius: "5px", // Slight rounding of corners
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Render Charts component below the buttons */}
      {selectedCountry && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column", // Stack the chart and min/max values
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            chartData && (
              <>
                <Charts selectedCurrency={selectedCountry} data={chartData} />
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bolder",
                  }}
                >
                  <span style={{ color: "green", marginRight: "30px" }}>
                    Max: {max !== null ? max : "N/A"}
                  </span>
                  <span style={{ color: "red" }}>
                    Min: {min !== null ? min : "N/A"}
                  </span>
                </div>
              </>
            ) // Pass the fetched data to Charts
          )}
        </div>
      )}
    </div>
  );
}
