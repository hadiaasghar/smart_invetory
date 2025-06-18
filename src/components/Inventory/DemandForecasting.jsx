import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DemandForecasting = () => {
  // Dummy data for forecasting (You can replace this with actual data)
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"], // Months
    datasets: [
      {
        label: "Demand Forecast",
        data: [120, 150, 180, 130, 160, 200], // Forecasted stock demand
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Demand Forecasting for the Next Months",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Forecasted Demand: ${tooltipItem.raw} units`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Stock Demand",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Demand Forecasting
      </h2>
      <p className="mb-4 text-gray-600">
        Predict future stock needs based on current trends.
      </p>
      <div className="w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DemandForecasting;
