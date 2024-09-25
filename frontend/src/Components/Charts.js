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

export default function Charts() {
  const data = {
    labels: [
      "May 8",
      "May 9",
      "May 10",
      "May 11",
      "May 12",
      "May 13",
      "May 14",
    ],
    datasets: [
      {
        data: [6, 7, 8, 9, 10, 12, 13],
        backgroundColor: "transparent",
        borderColor: "green",
        pointBorderColor: "#06402b",
      },
    ],
  };

  const options = {};

  return (
    <div style={styles.container}>
      <Line data={data} options={options} style={styles.container} />
    </div>
  );
}

const styles = Stylesheet.create({
  container: {
    height: 800,
    width: 1400,
  },
});
