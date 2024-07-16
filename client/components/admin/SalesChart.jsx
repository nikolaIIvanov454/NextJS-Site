"use client";

import React from "react";
import ChartJS from "chart.js/auto";
import { Line } from "react-chartjs-2";

const SalesChart = ({ x_values, y_dataset_objects }) => {
  const options = {
    responsive: true,
    scales: {
      y: {
        grid: {
          color: 'grey'
        }
      },
      x: {
        grid: {
          color: 'grey'
        }
      }
    }
  };

  return (
    <div className="">
      <Line
        options={options}
        data={{
          labels: x_values,
          datasets: [y_dataset_objects],
        }}
      />
    </div>
  );
};

export default SalesChart;
