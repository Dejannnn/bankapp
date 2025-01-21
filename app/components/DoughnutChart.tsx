"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { plugin } from "postcss";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      label: "Banks",
      data: [1250, 2500, 3750],
      backgroundColor: ["#0747b6", "rgba(54, 162, 235, 0.2)", "#2f91fa"],
    },
  ],
  labels: ["Bank 1", "Bank 2", "Bank 3"],
};
const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  return (
    <Doughnut
      data={data}
      options={{ cutout: "60%", plugins: { legend: { display: false } } }}
    />
  );
};

export default DoughnutChart;
