import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import Stylesheet from "reactjs-stylesheet";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

export default function Charts({ selectedCurrency, data }) {
  // Prepare chart data using the props passed from Comparison component
  const isDataValid = Array.isArray(data) && data.length > 0;

  // Function to calculate standard deviation
  const calculateStandardDeviation = (values) => {
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const squaredDiffs = values.map((value) => Math.pow(value - mean, 2));
    const variance =
      squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
    return Math.sqrt(variance);
  };

  // Extract currency values for the selected currency
  const currencyValues = isDataValid
    ? data.map((item) => item[selectedCurrency])
    : [];

  let standardDeviation = 0;

  // Calculate standard deviation if data is valid
  if (currencyValues.length > 0) {
    standardDeviation = calculateStandardDeviation(currencyValues);
    console.log("Standard Deviation:", standardDeviation);
  }

  // Determine line color based on the first digit of standard deviation
  const lineColor = standardDeviation.toString()[0] === "0" ? "green" : "red";

  const chartData = {
    labels: isDataValid ? data.map((item) => item.Date) : [], // Extract dates as labels
    datasets: isDataValid
      ? [
          {
            label: selectedCurrency,
            data: currencyValues, // Extract currency values based on selected currency
            backgroundColor: "transparent",
            borderColor: lineColor, // Set border color based on the first digit of standard deviation
            pointBorderColor: "#06402b",
            pointHoverBorderColor: "#ff0000", // Change color on hover
          },
        ]
      : [], // Provide an empty dataset if data is invalid
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const date = context.label; // Get the date label
            const value = context.raw; // Get the corresponding value
            return [`Date: ${date}`, `${selectedCurrency}: ${value}`]; // Format the tooltip
          },
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      {isDataValid ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No valid data available to display.</p>
      )}
    </div>
  );
}

const styles = Stylesheet.create({
  container: {
    height: 800,
    width: 1400,
  },
});
