"use client";

import React from "react";
import ChartJS from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const SalesChart = ({ x_values, y_dataset_objects }) => {
  const options = {
    color: "grey"
  };

  return (
    <div className="w-96">
      <Pie
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
