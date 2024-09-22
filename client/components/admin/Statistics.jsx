import React from "react";

import SalesChartComponent from "@/client/components/admin/SalesChart";
import FavouriteChartComponent from "@/client/components/admin/FavouriteChart";

function Statistics() {
  return (
    <div className="flex justify-center flex-wrap items-center gap-x-48 gap-y-10 p-4 sm:ml-64 ">
      <div className="w-6/12 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 dark:bg-gray-800">
        <SalesChartComponent
          x_values={[
            "Понеделник",
            "Вторник",
            "Сряда",
            "Четвъртък",
            "Петък",
            "Събота",
            "Неделя",
          ]}
          y_dataset_objects={{
            label: "Продажби",
            data: [100, 200, 300, 400, 500, 200, 300],
            tension: 0.1,
          }}
        />
      </div>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 dark:bg-gray-800">
        <FavouriteChartComponent
          x_values={[
            "Понеделник",
            "Вторник",
            "Сряда",
            "Четвъртък",
            "Петък",
            "Събота",
            "Неделя",
          ]}
          y_dataset_objects={{
            label: "Продажби",
            data: [100, 200, 300, 400, 500, 200, 300],
          }}
        />
      </div>
    </div>
  );
}

export default Statistics;
