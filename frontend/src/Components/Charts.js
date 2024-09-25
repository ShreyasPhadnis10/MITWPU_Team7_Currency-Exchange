import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import Stylesheet from "reactjs-stylesheet";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Charts({ selectedCurrency, data }) {
  // Prepare chart data using the props passed from Comparison component
  const isDataValid = Array.isArray(data) && data.length > 0;

  const chartData = {
    labels: isDataValid ? data.map((item) => item.Date) : [], // Extract dates as labels
    datasets: isDataValid
      ? [
          {
            label: selectedCurrency,
            data: data.map((item) => item[selectedCurrency]), // Extract currency values based on selected currency
            backgroundColor: "transparent",
            borderColor: "green",
            pointBorderColor: "#06402b",
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
