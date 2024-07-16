import React from "react";

import StatisticsComponent from "@/client/components/admin/Statistics";
import { AdminProvider } from "@/libs/contexts/AdminContext";

function Page() {
  return (
    <>
      <AdminProvider>
        <StatisticsComponent />
      </AdminProvider>
    </>
  );
}

export default Page;
